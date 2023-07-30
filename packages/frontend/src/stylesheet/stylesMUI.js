import { createTheme } from '@mui/material/styles';
import './vars.css';
import './base/fonts.scss';

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
    fontFamily: `'Poppins', 'Circe', sans-serif`,
  },
  components: {
    MuiGrid: {
      variants: [
        {
          props: { variant: 'limitedWidth' },
          style: {
            minWidth: '464px',
          },
        },
        {
          props: { variant: 'fullWidth' },
          style: {
            width: '100%',
          },
        },
      ],
    },
  },
});
