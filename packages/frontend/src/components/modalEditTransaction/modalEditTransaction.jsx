import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { Formik, Form } from 'formik';
import {
  editTransaction,
  fetchCategories,
} from '../../redux/finance/operations';
import { selectCategories } from '../../redux/finance/selectors';
import editValidationSchema from '../../validations/validateEditTransaction';
import MainButton from '../mainButton/mainButton';
import TextInput from '../textInput/textInput';
import { selectStyles } from '../chart/chartFiltersStyles';
// import { isPreviousDay } from '../../validations/validateDate';

export const ModalEditTransaction = ({ closeModal, transaction }) => {
  const [isChecked, setIsChecked] = useState(transaction.isExpense);
  const [amount, setAmount] = useState(transaction.amount);
  const [selectedCategory, setSelectedCategory] = useState(
    transaction.category
  );
  const [comment, setComment] = useState(transaction.comment);
  const [dateValue, setDateValue] = useState(transaction.date);

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
    };
    scrollToTop();
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = String(dateObj.getFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
  };

  const initialValues = {
    _id: transaction._id,
    amount: transaction.amount,
    category: transaction.category,
    date: transaction.date,
    comment: transaction.comment,
    isExpense: transaction.isExpense,
  };

  const categories = useSelector(selectCategories);

  const categoriesOptions = Object.values(categories)
    .filter(({ name }) => name !== 'Income')
    .map(({ id, name }) => ({
      value: id,
      label: name,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      editTransaction({
        _id: transaction._id,
        isExpense: isChecked,
        amount: Number(amount),
        date: dateValue,
        category: isChecked ? selectedCategory : 'Income',
        comment: comment,
      })
    );

    form.reset();
  };
  return (
    <div>
      <div className="backdrop" onClick={closeModal}></div>
      <div className="overlay edit-modal">
        <h1>Edit transaction</h1>

        <div className="switch">
          <label
            htmlFor="check1"
            className={`toggle-label ${!isChecked ? 'income' : 'expense'}`}
          >
            Expense
          </label>
          <input
            type="checkbox"
            id="check1"
            className="toggle"
            name="transaction-type"
            defaultChecked={!isChecked}
            onClick={() => {
              setIsChecked(!isChecked);
              setSelectedCategory('Main Expense');
            }}
          />
          <label
            htmlFor="check1"
            className={`toggle-label ${!isChecked ? 'expense' : 'income'}`}
          >
            Income
          </label>
        </div>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={editValidationSchema}
          >
            <Form onSubmit={(e) => handleSubmit(e)} className="form">
              <TextInput
                type="text"
                id="amount"
                name="amount"
                value={amount}
                className="input"
                onChange={(e) => {
                  const input = e.target.value;
                  const regex = /^(\d+)?(\.\d{0,2})?$/;

                  if (regex.test(input)) {
                    setAmount(input);
                  }
                }}
              />
              {isChecked ? (
                <div>
                  <Select
                    styles={selectStyles}
                    options={categoriesOptions}
                    placeholder="Main expenses"
                    id="category"
                    name="category"
                    onChange={(option) => {
                      setSelectedCategory(option.label);
                    }}
                    isSearchable={false}
                    defaultValue={initialValues.category}
                  />
                </div>
              ) : null}
              <Datetime
                id="date"
                name="date"
                dateFormat="DD.MM.YYYY"
                timeFormat={false}
                // isValidDate={isPreviousDay()}
                value={formatDate(dateValue)}
                className="datetime"
                onChange={(newDate) => {
                  const isoDate = new Date(newDate._d).toISOString();
                  setDateValue(isoDate);
                }}
              />
              <label className="label">
                <textarea
                  placeholder="Comment"
                  className="textarea"
                  rows={3}
                  value={comment}
                  onChange={(comment) => {
                    setComment(comment.target.value);
                  }}
                />
              </label>
              <MainButton type="submit" text="CHANGE" className="logo_btn" />
            </Form>
          </Formik>
          <button onClick={closeModal} className="main_btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
