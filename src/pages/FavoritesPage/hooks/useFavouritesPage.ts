import { FAVOURITE_USERS_STORAGE } from '@common/constants';
import { UserList, UserListItem } from '@store/types';
import { getLocalStorageItem, setLocalStorageItem } from '@utils/localStorage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useFavouritesPage = () => {
  const navigate = useNavigate();
  const [favouriteUsers, setFavouriteUsers] = useState<UserList>([]);

  useEffect(() => {
    const storedFavouriteUsers =
      getLocalStorageItem<UserList>(FAVOURITE_USERS_STORAGE) ?? [];
    setFavouriteUsers(storedFavouriteUsers);
  }, []);

  const handleRemoveFromFavourites = (user: UserListItem) => {
    const newFavourites = favouriteUsers.filter(
      (key: UserListItem) => key.id !== user.id,
    );
    setLocalStorageItem(FAVOURITE_USERS_STORAGE, newFavourites);
    setFavouriteUsers(newFavourites);
  };

  const handleSelectUser = (user: UserListItem) => {
    navigate(`/user/${user.login}`);
  };

  return {
    favouriteUsers,
    handleRemoveFromFavourites,
    handleSelectUser,
  };
};
