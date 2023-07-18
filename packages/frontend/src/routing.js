import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import Media from 'react-media';
import { RestrictedRoute } from './RestrictedRoute';
// import { PrivateRoute } from "./PrivateRoute";

import { Layout } from './pages/layout/layout';
import { HomeTab } from './components/homeTab/homeTab';
import { DiagramTab } from './components/diagramTab/diagramTab';
import { Currency } from './components/currency/currency.jsx';

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
          // uncomment when login will work
          
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

        <Route path="/currency" element={<DashboardPage />}>
          <Route
            index
            element={
              <Media query="(max-width: 767px)">
                {(matches) =>
                  matches ? <Currency /> : <Navigate to="/login" />
                }
              </Media>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default Routing;
