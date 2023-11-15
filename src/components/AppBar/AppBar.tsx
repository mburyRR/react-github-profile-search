import ArrowBackIcon from '@assets/arrow-back-filled.svg?react';
import SearchIcon from '@assets/search-filled.svg?react';
import FavouriteButton from '@components/FavouriteButton';
import Stack from '@mui/material/Stack';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import * as S from './AppBar.styles';
import { AppBarProps } from './AppBar.types';

export const AppBar: FC<AppBarProps> = ({
  children,
  hasSearchField = false,
  isAddedToFavourites = false,
}) => {
  const navigate = useNavigate();

  const handleBackToHomepage = () => {
    navigate('/');
  };

  const handleFavouriteSelect = () => {
    if (isAddedToFavourites) {
      navigate('/');
    } else {
      navigate('/favourites');
    }
  };

  return (
    <S.AppBar position="static">
      <S.Toolbar variant="dense">
        <S.Search>
          {hasSearchField ? (
            <S.IconWrapper disablePointerEvents>
              <SearchIcon data-testid="search-icon" />
            </S.IconWrapper>
          ) : (
            <S.IconWrapper>
              <S.BackButton
                aria-label="Back to homepage"
                data-testid="back-button"
                onClick={handleBackToHomepage}
              >
                <ArrowBackIcon data-testid="back-button-icon" />
              </S.BackButton>
            </S.IconWrapper>
          )}
          {children}
        </S.Search>
        <Stack px={1.75}>
          <FavouriteButton
            isAddedToFavourites={isAddedToFavourites}
            onAddToFavourites={handleFavouriteSelect}
          />
        </Stack>
      </S.Toolbar>
    </S.AppBar>
  );
};
