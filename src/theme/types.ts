import type { Theme as MuiTheme } from '@mui/material/styles';
import type { Shadows } from '@mui/material/styles/shadows';

export type CustomColor = Record<string, string>;

export type CustomPalette = Omit<MuiTheme['palette'], 'grey'> & {
  base: CustomColor;
  grey: CustomColor;
};

export type CustomTheme = Omit<MuiTheme, 'palette'> & {
  palette: CustomPalette;
};

export type CustomShadows = Shadows;
