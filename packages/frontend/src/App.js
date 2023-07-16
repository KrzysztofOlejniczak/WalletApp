import Routing from "./routing";
import React, { useEffect } from "react";

import useAuth from "./hooks/useAuth";
import { useDispatch } from "react-redux";
import { refreshUser } from "./redux/auth/operations";

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return <>{isRefreshing ? <b>Refreshing user...</b> : <Routing />}</>;
};

export default App;
