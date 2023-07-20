import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Media from 'react-media';
import { useDispatch } from 'react-redux';
import { Header } from '../../components/header/header';
import { Navigation } from '../../components/navigation/navigation';
import { Balance } from '../../components/balance/balance';
import { Currency } from '../../components/currency/currency';
import { ButtonAddTransactions } from '../../components/buttonAddTransactions/buttonAddTransactions';
import { ModalAddTransaction } from '../../components/modalAddTransaction/modalAddTransaction';
import {
  fetchTransactions,
  fetchBalance,
} from '../../redux/finance/operations';

export default function DashboardPage() {
  const [isModalAddTransactionOpen, setIsModalAddTransactionOpen] =
    useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchBalance());
  }, [dispatch]);

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
