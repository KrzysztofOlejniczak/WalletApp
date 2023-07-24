import { useSelector } from 'react-redux';
import {
  selectBalance,
  selectLoading,
  selectError,
} from '../../redux/finance/selectors';
import Loader from '../loader/loader';

export const Balance = () => {
  const balance = useSelector(selectBalance);
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <p>Something went wrong!</p>
      ) : (
        <div>
          <p>Balance</p>
          <h2>&#36;{balance}</h2>
        </div>
      )}
    </div>
  );
};
