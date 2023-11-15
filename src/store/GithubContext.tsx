import React, { createContext, useContext, useReducer } from 'react';

import githubReducer from './githubReducer';
import { GithubActionTypes, GithubState, UserListRes, UserRes } from './types';

export const initialState: GithubState = {
  userList: [],
  users: [],
  error: null,
  isLoading: false,
  setUserList: () => {},
  appendUserList: () => {},
  setUsers: () => {},
  setLoading: () => {},
  setError: () => {},
};

export const GithubContext = createContext<GithubState>(initialState);

export const GithubProvider = ({
  children,
}: React.PropsWithChildren<object>) => {
  const [state, dispatch] = useReducer(githubReducer, initialState);

  const setUserList = (userList: UserListRes) => {
    dispatch({
      type: GithubActionTypes.SET_USERS,
      payload: userList,
    });
  };

  const appendUserList = (userList: UserListRes) => {
    dispatch({
      type: GithubActionTypes.APPEND_USERS,
      payload: userList,
    });
  };

  const setUsers = (users: UserRes) => {
    dispatch({
      type: GithubActionTypes.SET_USER,
      payload: users,
    });
  };

  const setLoading = (isLoading: boolean) => {
    dispatch({
      type: GithubActionTypes.SET_LOADING,
      payload: isLoading,
    });
  };

  const setError = (error: string | null) => {
    dispatch({
      type: GithubActionTypes.SET_ERROR,
      payload: {
        error,
      },
    });
  };

  const value = {
    userList: state.userList,
    users: state.users,
    error: state.error,
    isLoading: state.isLoading,
    setUserList,
    appendUserList,
    setUsers,
    setLoading,
    setError,
  };

  return (
    <GithubContext.Provider value={value}>{children}</GithubContext.Provider>
  );
};

const useGithubContext = () => {
  const context = useContext(GithubContext);

  if (context === undefined) {
    throw new Error('useGithubContext must be used within GithubContext');
  }

  return context;
};

export default useGithubContext;
