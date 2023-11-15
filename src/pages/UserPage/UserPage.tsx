import { FAVOURITE_USERS_STORAGE } from '@common/constants';
import AppBar from '@components/AppBar';
import UserCard from '@components/UserCard';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useGithubContext from '@store/GithubContext';
import { fetchGithubUser } from '@store/services';
import { UserList, UserListItem } from '@store/types';
import { getLocalStorageItem, setLocalStorageItem } from '@utils/localStorage';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import * as S from './UserPage.styles';

export const UserPage: FC = () => {
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

  if (!user) return null;

  return (
    <>
      <AppBar isAddedToFavourites={isAddedToFavourites}>
        <S.InputBase
          fullWidth
          value={`@${user.login}`}
          inputProps={{ 'aria-label': 'favourites' }}
        />
      </AppBar>
      <S.ContentWrapper>
        {error ? (
          <Stack data-testid="error-message" mt={3} alignItems="center">
            <Typography variant="body2" fontSize={14}>
              Error fetching user data...
            </Typography>
          </Stack>
        ) : (
          <UserCard
            user={user}
            isAddedToFavourites={isAddedToFavourites}
            onAddToFavourites={handleAddToFavourites}
          />
        )}
      </S.ContentWrapper>
    </>
  );
};
