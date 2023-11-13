import MUICard from '@mui/material/Card';
import MUICardContent from '@mui/material/CardContent';
import MUICardMedia, { CardMediaTypeMap } from '@mui/material/CardMedia';
import MUIIconButton from '@mui/material/IconButton';
import MUIInputBase from '@mui/material/InputBase';
import MUILink from '@mui/material/Link';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import MUIStack from '@mui/material/Stack';
import MUITypography, { TypographyTypeMap } from '@mui/material/Typography';
import { styled } from '@theme/styled';

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
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: theme.shadows[2],
  gap: theme.spacing(1.75),
  padding: theme.spacing(1.75),
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    width: theme.spacing(70),
    flexDirection: 'row',
    alignItems: 'initial',
  },
  [theme.breakpoints.up('md')]: {
    width: theme.spacing(75),
  },
}));

export const CardMedia = styled(MUICardMedia)(({ theme }) => ({
  width: theme.spacing(18.75),
  height: theme.spacing(18.75),
})) as OverridableComponent<CardMediaTypeMap<unknown, 'div'>>;

export const CardContent = styled(MUICardContent)(() => ({
  width: '100%',
  padding: 0,

  '&:last-child': {
    padding: 0,
  },
}));

export const Name = styled(MUITypography)(({ theme }) => ({
  textAlign: 'center',

  [theme.breakpoints.up('sm')]: {
    textAlign: 'initial',
  },
})) as OverridableComponent<TypographyTypeMap<unknown, 'div'>>;

export const Email = styled(MUILink)(({ theme }) => ({
  display: 'block',
  textAlign: 'center',

  [theme.breakpoints.up('sm')]: {
    textAlign: 'initial',
  },
}));

export const Bio = styled(MUITypography)(({ theme }) => ({
  color: theme.palette.grey.lightText,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  marginBottom: theme.spacing(0.875),

  [theme.breakpoints.up('sm')]: {
    maxWidth: theme.spacing(41),
    textAlign: 'initial',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: theme.spacing(46),
  },
})) as OverridableComponent<TypographyTypeMap<unknown, 'div'>>;

export const Kpi = styled(MUIStack)(({ theme }) => ({
  flex: 1,
  textAlign: 'center',

  [theme.breakpoints.up('sm')]: {
    flex: 'initial',
    textAlign: 'initial',
  },
}));

export const MiddleKpi = styled(MUIStack)(({ theme }) => ({
  textAlign: 'center',

  [theme.breakpoints.up('sm')]: {
    textAlign: 'initial',
  },
}));

export const KpiLabel = styled(MUITypography)(({ theme }) => ({
  color: theme.palette.grey.lightText,
})) as OverridableComponent<TypographyTypeMap<unknown, 'span'>>;

export const FavouriteButton = styled(MUIIconButton, {
  shouldForwardProp: (propName: string) =>
    !['isFavouriteSelected'].includes(propName),
})<{
  isFavouriteSelected: boolean;
}>(({ theme, isFavouriteSelected }) => ({
  padding: 0,

  '& svg *': {
    ...(isFavouriteSelected
      ? { fill: theme.palette.base.yellow }
      : { fill: theme.palette.grey.lightAction }),
  },
}));
