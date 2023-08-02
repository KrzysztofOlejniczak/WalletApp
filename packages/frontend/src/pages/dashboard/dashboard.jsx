import React, { useEffect, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Grid, Stack, useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Header } from '../../components/header/header';
import { Navigation } from '../../components/navigation/navigation';
import { Balance } from '../../components/balance/balance';
import Currency from '../../components/currency/currency';
import {
  fetchTransactions,
  fetchBalance,
  fetchMonthlyStats,
} from '../../redux/finance/operations';
import {
  Vector,
  BackgroundContainer,
  AdaptiveContainer,
  DashboardWrapper,
  NavGrid,
  DataGrid,
} from './dashboard.styles';
import { getCurrentYearAndMonth } from '../../utils/getCurrentYearAndMonth.js';

export default function DashboardPage() {
  const dispatch = useDispatch();

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const isTablet = useMediaQuery((theme) =>
    theme.breakpoints.between('md', 'lg')
  );
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchBalance());
    const { year, month } = getCurrentYearAndMonth();
    dispatch(fetchMonthlyStats({ year, month }));
  }, [dispatch]);

  const renderDeskTabLayout = () => {
    return (
      <Grid
        container
        sx={{ height: '100%', flexWrap: 'nowrap', flexGrow: 1 }}
        direction={isTablet ? 'column' : 'row'}
      >
        <NavGrid item>
          {isDesktop ? (
            <>
              <Navigation />
              <Balance />
              <Currency />
            </>
          ) : (
            <Stack direction="row" spacing={4}>
              <Stack sx={{ flexWrap: 'wrap', alignItems: 'stretch' }}>
                <Navigation />
                <Balance />
              </Stack>
              <Box sx={{ display: 'flex' }}>
                <Currency />
              </Box>
            </Stack>
          )}
        </NavGrid>
        {isDesktop && <Vector />}
        <Suspense>
          <DataGrid item>
            <Outlet />
          </DataGrid>
        </Suspense>
      </Grid>
    );
  };

  const renderMobileLayout = () => {
    return (
      <Grid container direction="column">
        <NavGrid item>
          <Navigation />
        </NavGrid>
        <Suspense>
          <DataGrid item>
            <Outlet />
          </DataGrid>
        </Suspense>
      </Grid>
    );
  };

  return (
    <DashboardWrapper>
      <Header />
      <BackgroundContainer>
        <AdaptiveContainer fixed>
          {isMobile ? renderMobileLayout() : renderDeskTabLayout()}
        </AdaptiveContainer>
      </BackgroundContainer>
    </DashboardWrapper>
  );
}
