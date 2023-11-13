import type { NormalizedCacheObject } from '@apollo/client';
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { GITHUB_BASE_URL } from '@common/constants';

export const getApolloClient = (() => {
  let apolloClient: ApolloClient<NormalizedCacheObject>;

  return () => {
    if (apolloClient) return apolloClient;

    const httpLink = createHttpLink({
      uri: GITHUB_BASE_URL,
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    });
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) {
        console.error(`[Network error]: ${networkError}`);
      }
    });
    const link = ApolloLink.from([errorLink, httpLink]);

    const cache = new InMemoryCache();

    apolloClient = new ApolloClient({
      link,
      cache,
      connectToDevTools: process.env.STAGE !== 'production',
    });

    return apolloClient;
  };
})();
