import Routing from './routing';
import React, { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useAuth from './hooks/useAuth';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { refreshUser } from './redux/auth/operations';
import { selectIsLoading } from './redux/global/selectors';
import Loader from './components/loader/loader';


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
      <ToastContainer />
    </>
  );
};

export default App;
