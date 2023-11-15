import StarBorderOutlined from '@assets/star-border-outlined.svg?react';
import StarFilled from '@assets/star-filled.svg?react';
import React, { FC, MouseEvent } from 'react';

import * as S from './FavouriteButton.styles';
import { FavouriteButtonProps } from './FavouriteButton.types';

export const FavouriteButton: FC<FavouriteButtonProps> = ({
  isAddedToFavourites,
  onAddToFavourites,
}) => {
  const handleSelectFavourite = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onAddToFavourites();
  };

  return (
    <S.FavouriteButton
      aria-label="toggle favourite option"
      data-testid="favourite-button"
      isAddedToFavourites={isAddedToFavourites}
      onClick={handleSelectFavourite}
    >
      {isAddedToFavourites ? (
        <StarFilled data-testid="star-filled" />
      ) : (
        <StarBorderOutlined data-testid="star-border-outlined" />
      )}
    </S.FavouriteButton>
  );
};
