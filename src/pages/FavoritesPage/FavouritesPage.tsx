/* eslint-disable @typescript-eslint/no-explicit-any */
import { FAVOURITE_USERS_STORAGE } from '@common/constants';
import AppBar from '@components/AppBar';
import CardOption from '@components/CardOption';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getLocalStorageItem, setLocalStorageItem } from '@utils/localStorage';
import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './FavouritesPage.styles';

export const FavouritesPage: FC = () => {
  const navigate = useNavigate();
  const [favouriteUsers, setFavouriteUsers] = useState<any[]>([]);

  useEffect(() => {
    const storedFavouriteUsers =
      getLocalStorageItem<any>(FAVOURITE_USERS_STORAGE) ?? [];
    setFavouriteUsers(storedFavouriteUsers);
  }, []);

  const handleAddToFavourites = (user: any) => {
    const newFavourites = favouriteUsers.filter(
      (key: any) => key.id !== user.id,
    );
    setLocalStorageItem(FAVOURITE_USERS_STORAGE, newFavourites);
    setFavouriteUsers(newFavourites);
  };

  const handleSelectUser = (user: any) => {
    navigate(`/user/${user.id}`);
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
          <S.Card>
            {favouriteUsers.map((user: any) => (
              <CardOption
                key={user.id}
                option={user}
                isAddedToFavourites={true}
                onSelect={handleSelectUser}
                onAddToFavourites={handleAddToFavourites}
              />
            ))}
          </S.Card>
        ) : (
          <Stack alignItems="center">
            <Typography variant="body2" fontSize={14}>
              No favourite users...
            </Typography>
          </Stack>
        )}
      </S.ContentWrapper>
    </>
  );
};
