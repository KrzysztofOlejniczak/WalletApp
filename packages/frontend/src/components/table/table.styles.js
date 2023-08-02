import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material/styles';

export const CustomTablePagination = styled(TablePagination)({
  '& .MuiSelect-select': {
    minHeight: 'auto',
  },
  '& .MuiToolbar-root': {
    display: 'inline-flex',
    paddingLeft: '143.7px',
  },
  '& .MuiSvgIcon-root': {
    width: '20px',
    height: '20px',
  },
  '@media (max-width: 767px)': {
    '& .MuiToolbar-root': {
      paddingLeft: '15px',
    },
    '& .MuiTablePagination-selectLabel': {
        display: 'none',
      },
  },
});
