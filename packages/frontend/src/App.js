import Routing from './routing';
import React, { useEffect } from 'react';

import useAuth from './hooks/useAuth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { refreshUser } from './redux/auth/operations';
import { selectIsLoading } from './redux/global/selectors';
import Loader from './components/Loader/loader';

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  const isLoading = useSelector(selectIsLoading);

  return (
    <>
      {isLoading && <Loader />}
      {isRefreshing ? <b>Refreshing user...</b> : <Routing />}
    </>
  );
};

export default App;
