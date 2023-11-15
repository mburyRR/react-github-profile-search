import AppBar from '@components/AppBar';
import UserCard from '@components/UserCard';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

import { useUserPage } from './hooks/useUserPage';
import * as S from './UserPage.styles';

export const UserPage: FC = () => {
  const { user, error, isAddedToFavourites, handleAddToFavourites } =
    useUserPage();

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
