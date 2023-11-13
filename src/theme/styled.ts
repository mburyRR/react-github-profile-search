import { createStyled, shouldForwardProp } from '@mui/system';

import { defaultTheme } from './defaultTheme';

const rootShouldForwardProp = (prop: PropertyKey) =>
  shouldForwardProp(prop) && prop !== 'classes';

export const styled = createStyled({
  defaultTheme: defaultTheme,
  rootShouldForwardProp,
});
