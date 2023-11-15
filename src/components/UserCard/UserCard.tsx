import FavouriteButton from '@components/FavouriteButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';

import * as S from './UserCard.styles';
import { UserCardProps } from './UserCard.types';

export const UserCard: FC<UserCardProps> = ({
  user,
  isAddedToFavourites,
  onAddToFavourites,
}) => {
  if (!user) return null;

  return (
    <S.Card>
      <S.CardMedia component="img" src={user.avatarUrl} alt="User Avatar" />
      <S.CardContent>
        <S.Name component="div" variant="h5" fontSize={28}>
          {user.name}
        </S.Name>
        <S.Email href={user.url} variant="body2">
          {`@${user.login}`}
        </S.Email>
        <S.Bio component="div" variant="body2">
          {user.bio}
        </S.Bio>
        <Stack
          flexDirection="row"
          width="100%"
          gap={3.5}
          flexGrow={1}
          alignItems="flex-end"
        >
          <S.Kpi>
            <Typography component="div" variant="body1" fontSize={28}>
              {user.followers}
            </Typography>
            <S.KpiLabel component="div" variant="overline" fontSize={10}>
              followers
            </S.KpiLabel>
          </S.Kpi>
          <S.MiddleKpi>
            <Typography component="div" variant="body1" fontSize={28}>
              {user.following}
            </Typography>
            <S.KpiLabel component="div" variant="overline" fontSize={10}>
              following
            </S.KpiLabel>
          </S.MiddleKpi>
          <S.Kpi>
            <Typography component="div" variant="body1" fontSize={28}>
              {user.publicRepos}
            </Typography>
            <S.KpiLabel component="div" variant="overline" fontSize={10}>
              repos
            </S.KpiLabel>
          </S.Kpi>
        </Stack>
      </S.CardContent>
      <Stack>
        <FavouriteButton
          isAddedToFavourites={isAddedToFavourites}
          onAddToFavourites={onAddToFavourites}
        />
      </Stack>
    </S.Card>
  );
};
