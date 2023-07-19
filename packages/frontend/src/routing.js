import { Routes, Route, Navigate } from 'react-router-dom';
// import { lazy } from 'react';
import Media from 'react-media';
import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';

// import { Layout } from './pages/layout/layout';
import { HomeTab } from './components/homeTab/homeTab';
import { DiagramTab } from './components/diagramTab/diagramTab';
import { Currency } from './components/currency/currency.jsx';

import LoginPage from './pages/login/loginPage';

import RegistrationPage from './pages/registration/registrationPage';

import DashboardPage from './pages/dashboardPage/dashboardPage';

const Routing = () => {
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
      <Route path="/diagram" element={<DashboardPage />}>
        <Route index element={<DiagramTab />} />
      </Route>

      <Route path="/currency" element={<DashboardPage />}>
        <Route
          index
          element={
            <Media query="(max-width: 767px)">
              {(matches) => (matches ? <Currency /> : <Navigate to="/login" />)}
            </Media>
          }
        />
      </Route>

      <Route path="/*" element={<Navigate to="/home" />} />
    </Routes>
  );
};

export default Routing;
