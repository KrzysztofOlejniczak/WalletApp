import React, {useState} from 'react';
import Media from 'react-media';

import { Table } from '../table/table';
import { TableCard } from '../tableCard/tableCard';
import { Balance } from '../balance/balance';
import { ButtonAddTransactions } from '../../components/buttonAddTransactions/buttonAddTransactions';
import { ModalAddTransaction } from '../../components/modalAddTransaction/modalAddTransaction';

export default function HomeTab() {
  const [isModalAddTransactionOpen, setIsModalAddTransactionOpen] =
    useState(false);


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
        <TableCard />
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
    </div>
  );
}
