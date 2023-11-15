/* eslint-disable indent */
import { Action, GithubActionTypes, GithubState } from './types';
import { appendListData, mapUserListData, mapUsers } from './utils';

const githubReducer = (state: GithubState, action: Action): GithubState => {
  const { type, payload } = action;

  switch (type) {
    case GithubActionTypes.SET_USERS:
      return {
        ...state,
        userList: mapUserListData(payload),
        isLoading: false,
      };
    case GithubActionTypes.APPEND_USERS:
      return {
        ...state,
        userList: appendListData(payload, state.userList),
        isLoading: false,
      };
    case GithubActionTypes.SET_USER:
      return {
        ...state,
        users: mapUsers(payload, state.users),
        isLoading: false,
      };
    case GithubActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case GithubActionTypes.SET_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      throw new Error(`No case for type ${type} found in githubReducer.`);
  }
};

export default githubReducer;
