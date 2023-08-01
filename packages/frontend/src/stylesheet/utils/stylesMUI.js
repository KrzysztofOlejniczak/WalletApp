import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 768,
      lg: 1280,
    },
  },
  typography: {
    fontFamily: `'Circe', sans-serif`,
    fontSize: '16px',
  },
});
