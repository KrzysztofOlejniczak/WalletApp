import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import { RestrictedRoute } from "./RestrictedRoute";
import { PrivateRoute } from "./PrivateRoute";

import { Layout } from "./pages/layout/layout";

const LoginPage = lazy(() => import("./pages/login/loginPage"));
const RegistrationPage = lazy(() =>
  import("./pages/registration/registrationPage")
);
const TransactionsPage = lazy(() =>
  import("./pages/transactions/transactionsPage")
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
              redirectTo='/transactions'
              component={<RegistrationPage />}
            />
          }
        />
        <Route
          path='/login'
          element={
            <RestrictedRoute
              redirectTo='/transactions'
              component={<LoginPage />}
            />
          }
        />
        <Route
          path='/transactions'
          element={
            <PrivateRoute
              redirectTo='/login'
              component={<TransactionsPage />}
            />
          }
        />
      </Route>
    </Routes>
  );
};

export default Routing;
