import * as React from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  SvgIcon,
} from '@mui/material';

import { ReactComponent as Edit } from '../../images/edit.svg';
import { StyledTableCell } from './table.styles';

export default function TransactionsTable({
  data,
  handleEditTransaction,
  handleDeleteTransaction,
}) {
  const formatDate = (date) => {
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('pl-PL', options);
  };

  const formatAmount = (amount) => {
    const formattedAmount = parseFloat(amount).toLocaleString('pl-PL', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    });

    return formattedAmount.replace(',', '.');
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Date</StyledTableCell>
            <StyledTableCell align="left">Type</StyledTableCell>
            <StyledTableCell align="left">Category</StyledTableCell>
            <StyledTableCell align="left">Comment</StyledTableCell>
            <StyledTableCell align="right">Sum</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((el) => (
            <TableRow
              key={el._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell align="left">
                {formatDate(el.date)}
              </StyledTableCell>
              <StyledTableCell align="left">
                {el.isExpense === true ? '-' : '+'}
              </StyledTableCell>
              <StyledTableCell align="left">{el.category}</StyledTableCell>
              <StyledTableCell align="left">{el.comment}</StyledTableCell>
              <StyledTableCell align="right">
                {formatAmount(el.amount)}
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  aria-label="edit"
                  onClick={() => handleEditTransaction(el)}
                >
                  <SvgIcon
                    component={Edit}
                    viewBox="0 0 14 14"
                    sx={{ fill: 'none' }}
                  />
                </IconButton>
                <Button
                  variant="delete"
                  type="button"
                  onClick={() => handleDeleteTransaction(el._id)}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
