import React, { useState } from 'react';
import Media from 'react-media';
import { useSelector } from 'react-redux';

import Table from '../table/table';
import { TableCard } from '../tableCard/tableCard';
import { Balance } from '../balance/balance';
import { ButtonAddTransactions } from '../../components/buttonAddTransactions/buttonAddTransactions';
import { ModalAddTransaction } from '../../components/modalAddTransaction/modalAddTransaction';
import { ModalEditTransaction } from '../modalEditTransaction/modalEditTransaction';
import { selectTransactions } from '../../redux/finance/selectors.js';
import { TableWrapper } from './homeTab.styles';

export default function HomeTab() {
  const [isModalAddTransactionOpen, setIsModalAddTransactionOpen] =
    useState(false);

  const [isModalEditTransactionOpen, setIsModalEditTransactionOpen] =
    useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalEditTransactionOpen(true);
  };

  const transactions = useSelector(selectTransactions);

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const renderDesktopLayout = () => {
    return (
      <TableWrapper>
        <Table data={sortedTransactions} />
      </TableWrapper>
    );
  };

  const renderMobileLayout = () => {
    return (
      <div>
        <Balance />
        <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <TableCard handleEditTransaction={handleEditTransaction} />
        </div>
      </div>
    );
  };

  return (
    <div>
      <Media query="(min-width: 768px)">
        {(matches) => (matches ? renderDesktopLayout() : renderMobileLayout())}
      </Media>
      <ButtonAddTransactions
        handleClick={() =>
          setIsModalAddTransactionOpen(!isModalAddTransactionOpen)
        }
      />
      {isModalAddTransactionOpen && (
        <ModalAddTransaction
          closeModal={() => setIsModalAddTransactionOpen(false)}
        />
      )}
      {isModalEditTransactionOpen && (
        <ModalEditTransaction
          closeModal={() => setIsModalEditTransactionOpen(false)}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
}
