import { Box, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import ellipsePurple from '../../images/ellipse-purple.svg';
import ellipsePink from '../../images/ellipse-pink.svg';

export const DashboardWrapper = styled('div')({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',

  '@media (max-width: 767px)': {
    '& .MuiContainer-fixed': {
      padding: '0 20px',
    },
  },
  '@media (min-width: 768px) and (max-width: 1279px)': {
    '& .MuiContainer-fixed': {
      padding: '0 32px',
    },
  },
  '@media (min-width: 1280px)': {
    '& .MuiContainer-fixed': {
      padding: '0 16px',
    },
  },
});

export const BackgroundContainer = styled('div')({
  position: 'relative',
  minWidth: '100vw',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    backgroundColor: 'var(--secondary-background-color)',
    opacity: 1,
    '@media (min-width: 768px)': {
      background: `url(${ellipsePurple}), url(${ellipsePink}) `,
      backgroundPosition: 'left bottom, right top',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundColor: 'var(--gray-background)',
      filter: 'blur(25px)',
    },
  },
});

export const AdaptiveContainer = styled(Container)({
  height: '100%',
});

export const Vector = styled(Box)({
  width: 0,
  height: '100%',
  borderLeft: '1px solid var(--transactions-line)',
  boxShadow:
    'rgba(0, 0, 0, 0.05) -1px 0px 0px, rgba(255, 255, 255, 0.6) 1px 0px 0px',
  zIndex: 1,
});

export const NavGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  '@media (min-width: 768px) and (max-width: 1279px)': {
    display: 'row',
    flexWrap: 'wrap',
  },
});

export const DataGrid = styled(Grid)({
  display: 'flex',
});
