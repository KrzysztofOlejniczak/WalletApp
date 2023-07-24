import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import ellipsePurple from '../images/ellipse-purple.svg';
import ellipsePink from '../images/ellipse-pink.svg';
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

export const EllipsePurple = styled(Box)({
  backgroundImage: `url(${ellipsePurple})`,
  width: '618px',
  height: '547px',
  position: 'absolute',
  bottom: 0,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundPositionY: 'bottom',
});

export const EllipsePink = styled(Box)({
  backgroundImage: `url(${ellipsePink})`,
  width: '618px',
  height: '547px',
  position: 'absolute',
  top: 0,
  right: 0,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  backgroundPositionY: 'top',
});
