import React from 'react';
import Media from 'react-media';

import { Table } from '../table/table';
import { TableCard } from '../tableCard/tableCard';
import { Balance } from '../balance/balance';

export const HomeTab = () => {
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
    </div>
  );
};
