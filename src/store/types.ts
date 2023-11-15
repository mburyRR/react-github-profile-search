export interface UserRes {
  id: number;
  login: string;
  name: string | null;
  html_url: string;
  bio: string | null;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
}

export interface User {
  id: number;
  login: string;
  name: string | null;
  url: string;
  bio: string | null;
  avatarUrl: string;
  followers: number;
  following: number;
  publicRepos: number;
}

export type UserListRes = Pick<UserRes, 'id' | 'login' | 'avatar_url'>[];

export type UserListItem = Pick<User, 'id' | 'login' | 'avatarUrl'>;
export type UserList = UserListItem[];

export type GithubState = {
  userList: UserList;
  users: User[];
  isLoading?: boolean;
  error?: string | null;
  setUserList: (userList: UserListRes) => void;
  appendUserList: (userList: UserListRes) => void;
  setUsers: (users: UserRes) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
};

export enum GithubActionTypes {
  SET_USERS = 'SET_USERS',
  APPEND_USERS = 'APPEND_USERS',
  SET_USER = 'SET_USER',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
}

export interface Action {
  type: GithubActionTypes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any; // Payload can be of any type
}
