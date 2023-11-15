import { User, UserList, UserListRes, UserRes } from './types';

export const mapUserListData = (userList: UserListRes): UserList => {
  const filteredList = userList.map(({ id, login, avatar_url }) => ({
    id,
    login,
    avatarUrl: avatar_url,
  }));
  return filteredList;
};

export const appendListData = (
  newUserList: UserListRes,
  currentUserList: UserList,
): UserList => {
  const filteredList = mapUserListData(newUserList);
  return [...currentUserList, ...filteredList];
};

export const mapUsers = (
  newUser: UserRes,
  currentUsers: User[] = [],
): User[] => {
  const {
    id,
    login,
    name,
    html_url,
    bio,
    avatar_url,
    followers,
    following,
    public_repos,
  } = newUser;

  const userExists = currentUsers.some(
    (currentUser) => currentUser.login === newUser.login,
  );

  if (userExists) {
    return currentUsers;
  }
  return [
    ...currentUsers,
    {
      id,
      login,
      name,
      url: html_url,
      bio,
      avatarUrl: avatar_url,
      followers,
      following,
      publicRepos: public_repos,
    },
  ];
};

export const mapUserData = (newUser: UserRes): User => {
  const {
    id,
    login,
    name,
    html_url,
    bio,
    avatar_url,
    followers,
    following,
    public_repos,
  } = newUser;

  return {
    id,
    login,
    name,
    url: html_url,
    bio,
    avatarUrl: avatar_url,
    followers,
    following,
    publicRepos: public_repos,
  };
};
