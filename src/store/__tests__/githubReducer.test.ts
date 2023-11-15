import {
  GithuStateFactory,
  UserListResFactoryItem,
} from '@store/__fixtures__/githubData';
import { GithubActionTypes, GithubState } from '@store/types';

import githubReducer from '../githubReducer';

const defaultGithubStateData: GithubState = GithuStateFactory.build();
const defaultUserListResData = UserListResFactoryItem.buildList(1);
const defaultActionData = {
  type: GithubActionTypes.SET_USERS,
  payload: defaultUserListResData,
};

describe('githubReducer', () => {
  it('should return proper schema', () => {
    const results = githubReducer(defaultGithubStateData, defaultActionData);

    expect(results).toEqual({
      userList: [
        {
          id: defaultUserListResData[0].id,
          login: defaultUserListResData[0].login,
          avatarUrl: defaultUserListResData[0].avatar_url,
        },
      ],
      isLoading: false,
    });
  });
});
