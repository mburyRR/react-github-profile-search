import MUIIconButton from '@mui/material/IconButton';
import { styled } from '@theme/styled';

export const FavouriteButton = styled(MUIIconButton, {
  shouldForwardProp: (propName: string) =>
    !['isAddedToFavourites'].includes(propName),
})<{
  isAddedToFavourites: boolean;
}>(({ theme, isAddedToFavourites }) => ({
  padding: 0,

  '& svg *': {
    ...(isAddedToFavourites
      ? { fill: theme.palette.base.yellow }
      : { fill: theme.palette.grey.lightAction }),
  },
}));
