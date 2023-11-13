import { createTheme } from '@mui/material/styles';

import { CustomColor, CustomShadows, CustomTheme } from './types';

const materialDefaultTheme = createTheme({});

const base: CustomColor = {
  black: '#000',
  white: '#fff',
  yellow: '#f2c94c',
  blue: '#2d9cdb',
};

const grey: CustomColor = {
  background: '#efefef',
  lightAction: '#0000008a',
  placeholderText: '#909090',
  lightText: '#8d8d8d',
  lightDivider: '#9d9d9d',
};

const shadows: CustomShadows = [
  'none',
  '0px 4px 4px 0px rgba(0, 0, 0, 0.12)',
  '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
  'none',
];

const {
  palette: materialDefaultPalette,
  components: materialDefaultComponents,
  ...MUITheme
} = materialDefaultTheme;

export const defaultTheme: CustomTheme = {
  ...MUITheme,
  palette: {
    ...materialDefaultPalette,
    base,
    grey,
  },
  shadows,
  components: {
    ...materialDefaultComponents,
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: base.black,
          '&::placeholder': {
            color: grey.placeholderText,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 7,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          lineHeight: '150%',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        noOptions: {
          color: 'red',
          backgroundColor: 'pink',
        },
      },
    },
  },
};
