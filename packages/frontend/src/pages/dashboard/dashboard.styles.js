import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../../stylesheet/vars.css';

export const StyledBox = styled(Box)({
  backgroundColor: 'var(--gray-background)',
  position: 'relative',
  display: 'flex',
  flexGrow: 1,
});

export const Vector = styled(Box)({
  width: 0,
  height: '100%',
  borderLeft: '1px solid var(--gray-divider-vertical)',
  boxShadow:
    'rgba(0, 0, 0, 0.05) -1px 0px 0px, rgba(255, 255, 255, 0.6) 1px 0px 0px',
  zIndex: 1,
});
