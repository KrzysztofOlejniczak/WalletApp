import {
    selectTransactions,
    selectLoading,
    selectError,
  } from '../../redux/finance/selectors';
  import { deleteTransaction } from '../../redux/finance/operations';
  import { useSelector, useDispatch } from 'react-redux';
  import Loader from '../loader/loader';
  
  export const TableCard = () => {
    const transactions = useSelector(selectTransactions);
    const isLoading = useSelector(selectLoading);
    const isError = useSelector(selectError);
    const dispatch = useDispatch()
  
    const formatDate = (dateString) => {
      const dateObj = new Date(dateString);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const year = String(dateObj.getFullYear()).slice(-2);
  
      return `${day}.${month}.${year}`;
    };

    const sortedTransactions = [...transactions];
    sortedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    const handleDeleteTransaction = (transactionId) => {
        dispatch(deleteTransaction(transactionId));
      };

      console.log(transactions)
  
    return (
      <div>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <p>Something went wrong!</p>
        ) : (
          <ul>
            {sortedTransactions.map((el) => {
              return (
                <li key={el._id}>
                  <p>Date {formatDate(el.date)}</p>
                  {el.type ? <p>Type {el.type}</p> : <p>Type -</p>}
                  <p>Category {el.category} </p>
                  <p>Comment {el.comment}</p>
                  <p> Sum {el.amount}</p>
                  <button onClick={() => handleDeleteTransaction(el._id)}>Delete</button>
                  <button>Edit</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };