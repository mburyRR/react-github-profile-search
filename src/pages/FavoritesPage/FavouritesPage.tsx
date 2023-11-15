import AppBar from '@components/AppBar';
import CardOption from '@components/CardOption';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { UserListItem } from '@store/types';
import { FC } from 'react';

import * as S from './FavouritesPage.styles';
import { useFavouritesPage } from './hooks/useFavouritesPage';

export const FavouritesPage: FC = () => {
  const { favouriteUsers, handleRemoveFromFavourites, handleSelectUser } =
    useFavouritesPage();

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
