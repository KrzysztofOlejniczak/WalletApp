import { useState } from 'react';
import { selectError } from '../../redux/finance/selectors';
import { useSelector } from 'react-redux';

import { ReactComponent as EditIcon } from '../../images/svg/edit_icon.svg';
import useMediaQuery from '@mui/material/useMediaQuery';

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

export const TableCard = ({
  data,
  handleEditTransaction,
  handleDeleteTransaction,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10; // You can adjust the number of transactions per page here
  const isError = useSelector(selectError);
  
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = String(dateObj.getFullYear()).slice(-2);

    return `${day}.${month}.${year}`;
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = data.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(data.length / transactionsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {isError ? (
        <p>Something went wrong!</p>
      ) : (
        <>
          {!isMobile && (
            <>
              <div className="transactionListContainer">
                <TransactionListHeader />
                {currentTransactions.map((el) => {
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
          {isMobile && (
            <>
              <div className="transactionListContainer">
                {currentTransactions.map((el) => {
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
                          <span className="transactionDetailName">Comment</span>
                          <span className="transactionDetailValue">
                            {el.comment}
                          </span>
                        </div>
                        <div className="transactionSubBox">
                          <span className="transactionDetailName">Sum</span>
                          {el.isExpense === true ? (
                            <span className="sumBox redSum">{el.amount}</span>
                          ) : (
                            <span className="sumBox greenSum">{el.amount}</span>
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
              </div>
            </>
          )}
        </>
      )}
       <div className="pagination">
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};
