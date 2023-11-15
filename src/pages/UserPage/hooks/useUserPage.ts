import { FAVOURITE_USERS_STORAGE } from '@common/constants';
import useGithubContext from '@store/GithubContext';
import { fetchGithubUser } from '@store/services';
import { UserList, UserListItem } from '@store/types';
import { getLocalStorageItem, setLocalStorageItem } from '@utils/localStorage';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useUserPage = () => {
  const { login } = useParams();
  const [favouriteUsers, setFavouriteUsers] = useState<UserList>([]);
  const { setUsers, setError, users, error } = useGithubContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchGithubUser(login);
        setUsers(data);
      } catch (error) {
        if (error instanceof Error) setError(error.message);
        else setError(String(error));
      }
    };
    if (!users.find((u) => u.login === login)) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    const storedFavouriteUsers =
      getLocalStorageItem<UserList>(FAVOURITE_USERS_STORAGE) ?? [];
    setFavouriteUsers(storedFavouriteUsers);
  }, []);

  const user = users.find((u) => u.login === login);
  const isAddedToFavourites = favouriteUsers.some(
    (favouriteUser: UserListItem) => favouriteUser.login === login,
  );

  const handleAddToFavourites = () => {
    if (isAddedToFavourites) {
      const newFavourites = favouriteUsers.filter(
        (favouriteUser: UserListItem) => favouriteUser.login !== user?.login,
      );

      setLocalStorageItem(FAVOURITE_USERS_STORAGE, newFavourites);
      setFavouriteUsers(newFavourites);
    } else {
      const newFavourites = [...favouriteUsers, user!];

      setLocalStorageItem(FAVOURITE_USERS_STORAGE, newFavourites);
      setFavouriteUsers(newFavourites);
    }
  };

  return {
    user,
    error,
    isAddedToFavourites,
    handleAddToFavourites,
  };
};
