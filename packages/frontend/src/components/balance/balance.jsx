import { useSelector } from 'react-redux';
import { selectBalance, selectError } from '../../redux/finance/selectors';
import './balance.scss';

export const Balance = () => {
  const balance = useSelector(selectBalance);
  const isError = useSelector(selectError);

  return (
    <div>
      {isError ? (
        <p>Something went wrong!</p>
      ) : (
        <div className="balance_container">
          <p className="balance_title">Your Balance</p>
          <p className="balance_result">€ {balance}</p>
        </div>
      )}
    </div>
  );
};
