import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import ellipsePurple from '../../images/ellipse-purple.svg';
import ellipsePink from '../../images/ellipse-pink.svg';
import '../../stylesheet/vars.css';


export const ContainerWrapper = styled('div')({
  position: 'relative',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    background: `url(${ellipsePurple}), url(${ellipsePink}) `,
    backgroundPosition: 'left bottom, right top',
    backgroundRepeat: 'no-repeat, no-repeat',
    backgroundColor: 'var(--gray-background)',
    opacity: 1,
    filter: 'blur(25px)'
  },
});

export const StyledContainer = styled(Container)({
  height: '100%',
})


export const Vector = styled(Box)({
  width: 0,
  height: '100%',
  borderLeft: '1px solid var(--gray-divider-vertical)',
  boxShadow:
    'rgba(0, 0, 0, 0.05) -1px 0px 0px, rgba(255, 255, 255, 0.6) 1px 0px 0px',
  zIndex: 1,
});
