import { selectError } from '../../redux/finance/selectors';
import { useSelector } from 'react-redux';

export const TableCard = ({
  data,
  handleEditTransaction,
  handleDeleteTransaction,
}) => {
  const isError = useSelector(selectError);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = String(dateObj.getFullYear()).slice(-2);

    return `${day}.${month}.${year}`;
  };

  return (
    <div>
      {isError ? (
        <p>Something went wrong!</p>
      ) : (
        <ul>
          {data.map((el) => {
            return (
              <li key={el._id}>
                <p>Date {formatDate(el.date)}</p>
                {el.isExpense === true ? <p>Type -</p> : <p>Type +</p>}
                <p>Category {el.category} </p>
                <p>Comment {el.comment}</p>
                <p> Sum {el.amount}</p>
                <button onClick={() => handleDeleteTransaction(el._id)}>
                  Delete
                </button>
                <button onClick={() => handleEditTransaction(el)}>Edit</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
