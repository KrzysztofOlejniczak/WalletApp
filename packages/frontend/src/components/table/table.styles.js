import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import '../../stylesheet/vars.css';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    '@media (min-width: 1280px)': {
     // width: '715px',
    },
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: 'transparent',
  },
}));
