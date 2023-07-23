import React, { useEffect, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// import Media from 'react-media';
import { Divider, Grid, useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { Header } from '../../components/header/header';
import { Navigation } from '../../components/navigation/navigation';
import { Balance } from '../../components/balance/balance';
import Currency from '../../components/currency/currency';
import {
  fetchTransactions,
  fetchBalance,
} from '../../redux/finance/operations';
import { StyledContainer } from '../../stylesheet/stylesMUI';
import {StyledBox} from './dashboard.styles'

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
  }, [dispatch]);

  const renderDesktopLayout = () => {
    return (
      <Grid container direction={isTablet ? 'column' : 'row'}>
        <Grid item variant='desktop'>
          <Navigation />
          <Balance />
          <Currency />
        </Grid>
        {isDesktop && (
          <Divider orientation='vertical' flexItem />
        )}
        <Suspense>
          <Grid item>
            <Outlet />
          </Grid>
        </Suspense>
      </Grid>
    );
  };

  const renderMobileLayout = () => {
    return (
      <Grid container direction="column">
        <Grid item>
          <Navigation />
        </Grid>
        <Suspense>
          <Grid item>
            <Outlet />
          </Grid>
        </Suspense>
      </Grid>
    );
  };

  return (
    <>
      <Header />
      <StyledBox>
        <StyledContainer fixed>
          {isMobile ? renderMobileLayout() : renderDesktopLayout()}
        </StyledContainer>
      </StyledBox>
    </>
  );
}
