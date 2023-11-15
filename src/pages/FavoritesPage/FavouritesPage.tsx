import { FAVOURITE_USERS_STORAGE } from '@common/constants';
import AppBar from '@components/AppBar';
import CardOption from '@components/CardOption';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { UserList, UserListItem } from '@store/types';
import { getLocalStorageItem, setLocalStorageItem } from '@utils/localStorage';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './FavouritesPage.styles';

export const FavouritesPage: FC = () => {
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

  return (
    <>
      <AppBar isAddedToFavourites>
        <S.InputBase
          fullWidth
          defaultValue="Favourites"
          inputProps={{ 'aria-label': 'favourites' }}
        />
      </AppBar>
      <S.ContentWrapper>
        {favouriteUsers.length ? (
          <S.Card data-testid="favourite-users-list">
            {favouriteUsers.map((user: UserListItem) => (
              <CardOption
                key={user.id}
                option={user}
                isAddedToFavourites={true}
                onSelect={handleSelectUser}
                onAddToFavourites={handleRemoveFromFavourites}
              />
            ))}
          </S.Card>
        ) : (
          <Stack data-testid="favourite-users-no-items" alignItems="center">
            <Typography variant="body2" fontSize={14}>
              No favourite users...
            </Typography>
          </Stack>
        )}
      </S.ContentWrapper>
    </>
  );
};
