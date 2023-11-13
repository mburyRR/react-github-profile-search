import MUICardContent from '@mui/material/CardContent';
import MUIDivider from '@mui/material/Divider';
import { styled } from '@theme/styled';

export const CardContent = styled(MUICardContent)(() => ({
  width: '100%',
  padding: 0,

  '&:last-child': {
    padding: 0,
  },
}));

export const Option = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme.spacing(0, 1.75),
  gap: theme.spacing(1.25),
  cursor: 'pointer',

  '&:hover': {
    background: theme.palette.grey.background,
  },
}));

export const Divider = styled(MUIDivider)(({ theme }) => ({
  margin: theme.spacing(1.75, 0),
  color: theme.palette.grey.lightDivider,
}));
