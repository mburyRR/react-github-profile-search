import MUIStack from '@mui/material/Stack';
import { styled } from '@theme/styled';

export const App = styled(MUIStack)(({ theme }) => ({
  minHeight: '100vh',
  width: '100%',
  alignItems: 'center',
  backgroundColor: theme.palette.grey.background,
}));

export const ContentWrapper = styled(MUIStack)(({ theme }) => ({
  padding: theme.spacing(1.75, 1.5),
  maxWidth: '100%',

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1.75, 0),
  },
}));
