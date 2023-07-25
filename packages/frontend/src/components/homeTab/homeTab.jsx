import React, { useState } from 'react';
import Media from 'react-media';

import { Table } from '../table/table';
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

export default function HomeTab() {
  const dispatch = useDispatch();

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

  const renderDesktopLayout = () => {
    return (
      <div>
        <Table />
      </div>
    );
  };

  const renderMobileLayout = () => {
    return (
      <div>
        <Balance />
        <TableCard handleEditTransaction={handleEditTransaction} />
      </div>
    );
  };

  return (
    <div>
      <Media query="(min-width: 768px)">
        {(matches) => (matches ? renderDesktopLayout() : renderMobileLayout())}
      </Media>
      <ButtonAddTransactions
        handleClick={() => {
          dispatch(openModal('isModalAddTransactionOpen'));
          console.log(isModalAddTransactionOpen);
        }}

        // setIsModalAddTransactionOpen(!isModalAddTransactionOpen)
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