import FavouriteButton from '@components/FavouriteButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Stack from '@mui/system/Stack';
import { FC } from 'react';

import * as S from './CardOption.styles';
import { CardOptionProps } from './CardOption.types';

export const CardOption: FC<CardOptionProps> = ({
  option,
  isAddedToFavourites,
  onSelect,
  onAddToFavourites,
}) => {
  const handleAddToFavourites = () => {
    onAddToFavourites(option);
  };

  const handleSelectUser = () => {
    onSelect(option);
  };

  return (
    <>
      <S.Option data-testid="card-option" onClick={handleSelectUser}>
        <Avatar alt="Avatar" src={option.avatarUrl} />
        <S.CardContent>
          <Typography component="div" variant="body2" fontSize={14}>
            {`@${option.login}`}
          </Typography>
        </S.CardContent>
        <Stack>
          <FavouriteButton
            isAddedToFavourites={isAddedToFavourites}
            onAddToFavourites={handleAddToFavourites}
          />
        </Stack>
      </S.Option>
      <S.Divider className="list-divider" />
    </>
  );
};
