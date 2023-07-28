import React, { useState } from 'react';
import { useMediaQuery } from '@mui/material';
import Table from '../table/table';
import { TableCard } from '../tableCard/tableCard';
import { Balance } from '../balance/balance';
import { ButtonAddTransactions } from '../../components/buttonAddTransactions/buttonAddTransactions';
import { ModalAddTransaction } from '../../components/modalAddTransaction/modalAddTransaction';
import { ModalEditTransaction } from '../modalEditTransaction/modalEditTransaction';
import { closeModal, openModal } from '../../redux/global/operations';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsModalAddTransactionOpen,
  selectIsModalEditTransactionOpen,
} from '../../redux/global/selectors';
import { selectTransactions } from '../../redux/finance/selectors.js';
import { deleteTransaction } from '../../redux/finance/operations.js';
import { TableWrapper } from './homeTab.styles';

export default function HomeTab() {
  const dispatch = useDispatch();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const isModalAddTransactionOpen = useSelector(
    selectIsModalAddTransactionOpen
  );

  const isModalEditTransactionOpen = useSelector(
    selectIsModalEditTransactionOpen
  );

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    dispatch(openModal('isModalEditTransactionOpen'));
  };

  const handleDeleteTransaction = (transactionId) => {
    dispatch(deleteTransaction(transactionId));
  };

  const transactions = useSelector(selectTransactions);


  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const renderDeskTabLayout = () => {
    return (
      <TableWrapper>
        <Table
          data={sortedTransactions}
          handleEditTransaction={handleEditTransaction}
          handleDeleteTransaction={handleDeleteTransaction}
        />
      </TableWrapper>
    );
  };

  const renderMobileLayout = () => {
    return (
      <div>
        <Balance />
        <TableCard
          data={sortedTransactions}
          handleEditTransaction={handleEditTransaction}
          handleDeleteTransaction={handleDeleteTransaction}
        />
      </div>
    );
  };

  return (
    <div>
      {!isMobile ? renderDeskTabLayout() : renderMobileLayout()}

      <ButtonAddTransactions
        handleClick={() => {
          dispatch(openModal('isModalAddTransactionOpen'));
        }}
      />
      {isModalAddTransactionOpen && (
        <ModalAddTransaction
          closeModal={() => dispatch(closeModal('isModalAddTransactionOpen'))}
        />
      )}

      {isModalEditTransactionOpen && (
        <ModalEditTransaction
          closeModal={() => dispatch(closeModal('isModalEditTransactionOpen'))}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
}
