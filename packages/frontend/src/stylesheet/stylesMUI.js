import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
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
            height: '100vh',
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

export const StyledContainer = styled(Container)({
  height: '100vh',
});
