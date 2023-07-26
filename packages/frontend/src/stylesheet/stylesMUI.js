import { createTheme } from '@mui/material/styles';
// import iconSprite from '../images/icons.svg';

import './vars.css';

const defaultTheme = createTheme();

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
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          width: '14px',
          height: '14px',
          transition: '200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiIconButton: {
styleOverrides: {
  root: {
    ':hover': {
      backgroundColor: 'transparent',
    }

  }
}
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: '200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          '&:hover': {
            transform: 'scale(1.1)',
          },
          color: 'var(--white)',
          backgroundColor: 'var(--green-light)',
          textTransform: 'none',
          boxShadow:
            '0 20px 20px -20px rgba(0, 0, 0, 0.3), 0 0 15px rgba(0, 0, 0, 0.06)',
          '&:active': {
            boxShadow: defaultTheme.shadows[4],
          },
        },
      },
      variants: [
        {
          props: { variant: 'delete' },
          style: {
            width: '67px',
            height: '26px',
            padding: '4px 12px',
            borderRadius: '18px',
            fontSize: '14px',
            fontWeight: 400,
            '&:hover': {
              backgroundColor: 'var(--green-light)',
            },
            '&.active': {
              border: 'none',
            },
          },
        },
        {
          props: { variant: 'large' },
          style: {
            minWidth: 80,
            padding: '4px 6px',
            border: '1px solid #FF5F6D',
            color: '#FF5F6D',
          },
        },
      ],
    },
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
