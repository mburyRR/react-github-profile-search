import MUIAppBar from '@mui/material/AppBar';
import MUIIconButton from '@mui/material/IconButton';
import MUIStack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import MUIToolbar from '@mui/material/Toolbar';
import { styled } from '@theme/styled';

export const AppBar = styled(MUIAppBar)(({ theme }) => ({
  height: theme.spacing(7.5),
  boxShadow: theme.shadows[1],
  backgroundColor: theme.palette.base.white,
}));

export const Toolbar = styled(MUIToolbar)(({ theme }) => ({
  justifyContent: 'center',
  minHeight: theme.spacing(7.5),
}));

export const Search = styled(MUIStack)(({ theme }) => ({
  flexDirection: 'row',
  position: 'relative',
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),

  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(63.5),
  },

  [theme.breakpoints.up('md')]: {
    width: theme.spacing(68.5),
  },
}));

export const IconWrapper = styled(MUIStack, {
  shouldForwardProp: (propName: string) =>
    !['disablePointerEvents'].includes(propName),
})<{
  disablePointerEvents?: boolean;
}>(({ theme, disablePointerEvents }) => ({
  padding: theme.spacing(0, 1.75),
  height: '100%',
  position: 'absolute',
  flexDirection: 'row',
  alignItems: 'center',
  zIndex: 1000,
  ...(disablePointerEvents && { pointerEvents: 'none' }),

  '& svg *': {
    fill: theme.palette.grey.lightAction,
  },
}));

export const BackButton = styled(MUIIconButton)(() => ({
  padding: 0,
}));
