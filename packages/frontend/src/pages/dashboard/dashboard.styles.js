import { Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../../stylesheet/vars.css';
// import ellipsePurple from '../../images/ellipse-purple.svg';

export const StyledBox = styled(Box)({
  backgroundColor: 'var(--gray-background)',
  backdropFilter: 'blur(25px)',
});

export const StyledDivider = styled(Divider)({
  borderWidth: '1px',
  borderRight: '1px solid var(--gray-divider-vertical)',
  boxShadow:
    'rgba(0, 0, 0, 0.05) -1px 0px 0px, rgba(255, 255, 255, 0.6) 1px 0px 0px',
});


// export const EllipsePurple = styled(Box)({
//   position: 'absolute',
//   backgroundImage: `url(${ellipsePurple})`,
//   bottom: 0,
//   left: 0,
//   width: '618px',
//   height: '547px',
//   transform: 'rotate(16.862deg)',
//   // fill: '#C5BAFF',
//   zIndex: 1,
// });

// const SvgImage = styled(SvgIcon)({
//   width: '100%',
//   height: '100%',
// });

// export const EllipsePurple = () => {
//   return (
//     <SvgContainer>
//       <SvgImage xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 333">
//         <image href={ellipsePurple} />
//       </SvgImage>
//     </SvgContainer>
//   );
// };
