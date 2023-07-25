import { createTheme } from '@mui/material/styles';

import './vars.css';

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 768,
      lg: 1280,
    },
  },
  components: {
    MuiGrid: {
      variants: [
        {
          props: { variant: 'desktop' },
          style: {
            width: '480px',
          },
        },
        {
          props: { variant: 'tablet' },
          style: {
            width: '100%',
          },
        },
      ],
    },
    MuiLink: {
      variants: [
        {
          props: { variant: 'nav' },
          style: {
            color: 'black',
            textDecoration: 'none',

            '&.active': {
              color: 'red',
            },
          },
        },
      ],
    },
  },
});
