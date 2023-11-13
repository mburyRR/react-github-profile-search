/* eslint-disable @typescript-eslint/no-explicit-any */
import { FAVOURITE_USERS_STORAGE } from '@common/constants';
import AppBar from '@components/AppBar';
import UserCard from '@components/UserCard';
import { mockedUserList } from '@pages/SearchPage';
import { getLocalStorageItem, setLocalStorageItem } from '@utils/localStorage';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as S from './UserPage.styles';

export const UserPage: FC = () => {
  const { id } = useParams();
  const [favouriteUsers, setFavouriteUsers] = useState<any[]>([]);

  useEffect(() => {
    const storedFavouriteUsers =
      getLocalStorageItem<any>(FAVOURITE_USERS_STORAGE) ?? [];
    setFavouriteUsers(storedFavouriteUsers);
  }, []);

  const mockedUser = mockedUserList.find((user) => user.id === Number(id));
  const isAddedToFavourites = favouriteUsers.some(
    (user: any) => user.id === Number(id),
  );

  console.log(isAddedToFavourites);

  const handleAddToFavourites = () => {
    if (isAddedToFavourites) {
      const newFavourites = favouriteUsers.filter(
        (key: any) => key.id !== mockedUser?.id,
      );

      setLocalStorageItem(FAVOURITE_USERS_STORAGE, newFavourites);
      setFavouriteUsers(newFavourites);
    } else {
      const newFavourites = [...favouriteUsers, mockedUser];

      setLocalStorageItem(FAVOURITE_USERS_STORAGE, newFavourites);
      setFavouriteUsers(newFavourites);
    }
  };

  if (!mockedUser) return null;

  return (
    <>
      <AppBar isAddedToFavourites={isAddedToFavourites}>
        <S.InputBase
          fullWidth
          value={`@${mockedUser.login}`}
          inputProps={{ 'aria-label': 'favourites' }}
        />
      </AppBar>
      <S.ContentWrapper>
        <UserCard
          user={mockedUser}
          isAddedToFavourites={isAddedToFavourites}
          onAddToFavourites={handleAddToFavourites}
        />
      </S.ContentWrapper>
    </>
  );
};
