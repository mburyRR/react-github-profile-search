import MUICard from '@mui/material/Card';
import MUIInputBase from '@mui/material/InputBase';
import MUIStack from '@mui/material/Stack';
import { styled } from '@theme/styled';

export const ContentWrapper = styled(MUIStack)(({ theme }) => ({
  padding: theme.spacing(1.75, 0),
  minWidth: 'fit-content',
}));

export const Card = styled(MUICard)(({ theme }) => ({
  display: 'flex',
  boxShadow: theme.shadows[2],
  padding: theme.spacing(1.75, 0),
  width: '92vw',
  flexDirection: 'column',

  '& .list-divider:last-of-type': {
    display: 'none',
  },

  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(70),
  },
  [theme.breakpoints.up('md')]: {
    width: theme.spacing(75),
  },
}));

export const InputBase = styled(MUIInputBase)(({ theme }) => ({
  color: 'inherit',

  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(0.875em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}));
