import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import { RestrictedRoute } from './RestrictedRoute';
// import { PrivateRoute } from "./PrivateRoute";

import { Layout } from './pages/layout/layout';
import { HomeTab } from './components/homeTab/homeTab';
import { DiagramTab } from './components/diagramTab/diagramTab';

const LoginPage = lazy(() => import('./pages/login/loginPage'));
const RegistrationPage = lazy(() =>
  import('./pages/registration/registrationPage')
);
const DashboardPage = lazy(() => import('./pages/dashboardPage/dashboardPage'));

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LoginPage />} />
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
          element={<DashboardPage />}
          // element={
          //   <PrivateRoute
          //     redirectTo='/login'
          //     component={<DashboardPage />}
          //   />
          // }
        >
          <Route index element={<HomeTab />} />
        </Route>
        <Route path="/diagram" element={<DashboardPage />}>
          <Route index element={<DiagramTab />} />
        </Route>

      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default Routing;
