import { selectTransactions, selectError } from '../../redux/finance/selectors';
import { deleteTransaction } from '../../redux/finance/operations';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as EditIcon } from '../../images/svg/edit_icon.svg';
import Media from 'react-media';

import './tableCard.scss';

const TransactionListHeader = () => {
  return (
    <div className="transactionListHeader">
      <div className="dateBox">
        <span className="transactionDetailName">Date</span>
      </div>
      <div className="typeBox">
        <span className="transactionDetailName">Type</span>
      </div>
      <div className="categoryBox">
        <span className="transactionDetailName">Category</span>
      </div>
      <div className="commentBox">
        <span className="transactionDetailName">Comment</span>
      </div>
      <div className="sumBox">
        <span className="transactionDetailName">Sum</span>
      </div>
      <div className="dummyBox">
        <span className="transactionDetailDummy"></span>
      </div>
    </div>
  );
};


export const TableCard = ({ handleEditTransaction }) => {
  const transactions = useSelector(selectTransactions);
  const isError = useSelector(selectError);
  const dispatch = useDispatch();

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
  const queries = {
    mobile: '(max-width: 767px)',
    tablet: '(min-width: 768px) and (max-width: 1279px)',
    screen: '(min-width: 1280px)',
  };

  return (
    <div>
      {isError ? (
        <p>Something went wrong!</p>
      ) : (
        <Media queries={queries}>
          {(matches) => (
            <>
              {!matches.mobile && (
                <>
                  <div className="transactionListContainer">
                    <TransactionListHeader />
                    {sortedTransactions.map((el) => {
                      return (
                        <div className="transactionList" key={el._id}>
                          <li className="transactionBox">
                            <p className="dateBox">{formatDate(el.date)}</p>
                            {el.isExpense === true ? (
                              <p className="typeBox">-</p>
                            ) : (
                              <p className="typeBox">+</p>
                            )}
                            <p className="categoryBox">{el.category} </p>
                            <p className="commentBox">{el.comment}</p>
                            {el.isExpense === true ? (
                              <p className="sumBox redSum">{el.amount}</p>
                            ) : (
                              <p className="sumBox greenSum">{el.amount}</p>
                            )}
                            <div className="editDeleteBox">
                              <EditIcon
                                className="editIcon"
                                onClick={() => handleEditTransaction(el)}
                              />
                              <button
                                className="deleteButton"
                                onClick={() => handleDeleteTransaction(el._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </li>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
              {matches.mobile && (
                <>
                  {sortedTransactions.map((el) => {
                    const borderColor =
                      el.isExpense === true ? 'redBorder' : 'greenBorder';
                    return (
                      <li
                        className={`mobiletransactionBox ${borderColor}`}
                        key={el._id}
                      >
                        <div>
                          <div className="transactionSubBox">
                            <span className="mobileTransactionDetailName">
                              Date
                            </span>
                            <span className="transactionDetailValue">
                              {formatDate(el.date)}
                            </span>
                          </div>
                          <div className="transactionSubBox">
                            <span className="transactionDetailName">Type</span>
                            <span className="transactionDetailValue">
                              {el.isExpense === true ? `-` : `+`}
                            </span>
                          </div>
                          <div className="transactionSubBox">
                            <span className="transactionDetailName">
                              Category
                            </span>
                            <span className="transactionDetailValue">
                              {el.category}
                            </span>
                          </div>
                          <div className="transactionSubBox">
                            <span className="transactionDetailName">
                              Comment
                            </span>
                            <span className="transactionDetailValue">
                              {el.comment}
                            </span>
                          </div>
                          <div className="transactionSubBox">
                            <span className="transactionDetailName">Sum</span>
                            {el.isExpense === true ? (
                              <span className="sumBox redSum">{el.amount}</span>
                            ) : (
                              <span className="sumBox greenSum">
                                {el.amount}
                              </span>
                            )}
                          </div>
                          <div className="transactionSubBox">
                            <button
                              onClick={() => handleDeleteTransaction(el._id)}
                              className="mobileDeleteButton"
                              type="button"
                            >
                              Delete
                            </button>
                            <div
                              onClick={() => handleEditTransaction(el)}
                              className="editBox"
                            >
                              <EditIcon
                                className="editIcon"
                                onClick={() => handleEditTransaction(el)}
                              />
                              <span className="editTransaction">Edit</span>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </>
              )}
            </>
          )}
        </Media>
      )}
    </div>
  );
};
