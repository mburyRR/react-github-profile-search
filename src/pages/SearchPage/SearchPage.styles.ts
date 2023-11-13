import MUICard from '@mui/material/Card';
import MUIInputBase from '@mui/material/InputBase';
import { styled } from '@theme/styled';

/*
  I tried to be pixel perfect, according to the designs BUT I used to follow the 4-point grid system as a template
  for creating the layout: https://www.thedesignership.com/blog/the-ultimate-spacing-guide-for-ui-designers
*/

export const InputBase = styled(MUIInputBase)(({ theme }) => ({
  color: 'inherit',

  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(0.875em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}));

export const Card = styled(MUICard)(({ theme }) => ({
  display: 'flex',
  boxShadow: theme.shadows[2],
  padding: theme.spacing(1.75, 0),
  marginTop: theme.spacing(3),
  width: '100%',

  '& ul': {
    width: '100%',
    padding: 0,

    '& .list-divider:last-of-type': {
      display: 'none',
    },
  },

  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(70),
  },
  [theme.breakpoints.up('md')]: {
    width: theme.spacing(75),
  },
}));
