import { useSelector } from 'react-redux';
import { selectBalance, selectError } from '../../redux/finance/selectors';
export const Balance = () => {
  const balance = useSelector(selectBalance);
  const isError = useSelector(selectError);
  return (
    <div>
      {isError ? (
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
