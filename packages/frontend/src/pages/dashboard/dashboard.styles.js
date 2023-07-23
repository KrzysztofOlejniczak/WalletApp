import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../../stylesheet/vars.css';
// import ellipsePurple from '../../images/ellipse-purple.svg';


export const StyledBox = styled(Box)({
  backgroundColor: 'var(--gray-background)',
  backdropFilter: 'blur(25px)',
});



// const StyledSvgContainer = styled(Box)({
//     position: 'fixed',
//     bottom: 0,
//     left: 0,
//     width: '618px',
//     height: '547px',
//     transform: 'rotate(16.862deg)',
//     fill: '#C5BAFF',
//     zIndex: 1,
//   });

// const SvgImage = styled.svg`
//   width: 100%;
//   height: 100%;
// `;

// export const EllipsePurple = () => {
//   return (
//     <StyledSvgContainer>
//       <SvgImage xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 333">
//         <image href={ellipsePurple} />
//       </SvgImage>
//     </StyledSvgContainer>
//   );
// };


