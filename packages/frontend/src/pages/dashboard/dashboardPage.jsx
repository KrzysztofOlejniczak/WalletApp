import React, { useEffect, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Media from 'react-media';
import { useDispatch } from 'react-redux';
import { Header } from '../../components/header/header';
import { Navigation } from '../../components/navigation/navigation';
import { Balance } from '../../components/balance/balance';
import Currency from '../../components/currency/currency';
import {
  fetchTransactions,
  fetchBalance,
} from '../../redux/finance/operations';

export default function DashboardPage() {

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
        <Suspense>
          <Outlet />
        </Suspense>
      </div>
    );
  };

  const renderMobileLayout = () => {
    return (
      <div>
        <Suspense>
          <Outlet />
        </Suspense>
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
