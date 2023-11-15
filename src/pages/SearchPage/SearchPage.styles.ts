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
  padding: theme.spacing(0, 0),
  marginTop: theme.spacing(3),
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(70),
  },
  [theme.breakpoints.up('md')]: {
    width: theme.spacing(75),
  },
}));

export const List = styled('ul')(({ theme }) => ({
  width: '100%',
  height: theme.spacing(40),

  '& .infinite-scroll-component__outerdiv': {
    width: '100%',

    '& .infinite-scroll-component': {
      width: '100%',
      padding: 0,

      '& .list-divider:last-of-type': {
        display: 'none',
      },
    },
  },

  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));
