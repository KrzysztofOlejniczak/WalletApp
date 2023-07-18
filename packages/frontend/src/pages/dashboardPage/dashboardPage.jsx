import React from 'react';
import { Outlet } from 'react-router-dom';
import Media from 'react-media';
import { Header } from '../../components/header/header';
import { Navigation } from '../../components/navigation/navigation';
import { Balance } from '../../components/balance/balance';
import { Currency } from '../../components/currency/currency';
import { useState } from 'react';
import { ButtonAddTransactions } from '../../components/buttonAddTransactions/buttonAddTransactions';
import { ModalAddTransaction } from '../../components/modalAddTransaction/modalAddTransaction';

export default function DashboardPage() {
  const [isModalAddTransactionOpen, setIsModalAddTransactionOpen] =
    useState(false);

  const renderDesktopLayout = () => {
    return (
      <div>
        <Balance />
        <Currency />
        <Outlet />
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
  };

  const renderMobileLayout = () => {
    return (
      <div>
        <Outlet />
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
  };

  return (
    <div>
      <Header />
      <Navigation />
      <Media query="(min-width: 768px)">
        {(matches) => (matches ? renderDesktopLayout() : renderMobileLayout())}
      </Media>
    </div>
  );
}
