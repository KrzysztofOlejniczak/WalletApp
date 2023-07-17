import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";

import { Layout } from "./pages/layout/layout";

const LoginPage = lazy(() => import("./pages/login/loginPage"));
const RegistrationPage = lazy(() =>
  import("./pages/registration/registrationPage")
);
const DashboardPage = lazy(() =>
  import("./pages/dashboardPage/dashboardPage")
);

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<LoginPage />} />
        <Route
          path='/register'
          element={
            <RestrictedRoute
              redirectTo='/home'
              component={<RegistrationPage />}
            />
          }
        />
        <Route
          path='/login'
          element={
            <RestrictedRoute
              redirectTo='/home'
              component={<LoginPage />}
            />
          }
        />
        <Route
          path='/home'
          element={
            <PrivateRoute
              redirectTo='/login'
              component={<DashboardPage />}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default Routing;
