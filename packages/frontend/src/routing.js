import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';
import { useMediaQuery } from '@mui/material';

import LoginPage from './pages/login/loginPage';
import RegistrationPage from './pages/registration/registrationPage';
import DashboardPage from './pages/dashboard/dashboard';

const HomeTab = lazy(() => import('./components/homeTab/homeTab'));
const DiagramTab = lazy(() => import('./components/diagramTab/diagramTab'));
const Currency = lazy(() => import('./components/currency/currency'));

const Routing = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />}>
        <Route index element={<DashboardPage />} />
      </Route>
      <Route
        path="/register"
        element={
          <RestrictedRoute
            redirectTo="/home"
            component={<RegistrationPage />}
          />
        }
      />
      <Route
        path="/login"
        element={
          <RestrictedRoute redirectTo="/home" component={<LoginPage />} />
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute redirectTo="/login" component={<DashboardPage />} />
        }
      >
        <Route index element={<HomeTab />} />
      </Route>

      <Route
        path="/diagram"
        element={
          <PrivateRoute redirectTo="/login" component={<DashboardPage />} />
        }
      >
        <Route index element={<DiagramTab />} />
      </Route>

      <Route path="/currency" element={<DashboardPage />}>
        <Route
          index
          element={
            isMobile ? (
              <PrivateRoute redirectTo="/login" component={<Currency />} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Route>

      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default Routing;
