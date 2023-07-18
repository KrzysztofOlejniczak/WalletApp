import React from 'react';
import { Outlet } from 'react-router-dom';
import Media from 'react-media';
import { Header } from '../../components/header/header';
import { Navigation } from '../../components/navigation/navigation';
import { Balance } from '../../components/balance/balance';
import { Currency } from '../../components/currency/currency';

export default function DashboardPage() {
  const renderDesktopLayout = () => {
    return (
      <div>
        <Balance />
        <Currency />
        <Outlet />
      </div>
    );
  };

  const renderMobileLayout = () => {
    return (
      <div>
        <Outlet />
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
