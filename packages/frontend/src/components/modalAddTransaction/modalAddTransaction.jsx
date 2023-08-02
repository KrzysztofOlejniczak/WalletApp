import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Datetime from 'react-datetime';
import Select from 'react-select';
import { Formik, Form } from 'formik';
import './modalAddTransaction.scss'
import 'react-datetime/css/react-datetime.css';
import 'react-toastify/dist/ReactToastify.css';
import { selectCategories } from '../../redux/finance/selectors';
import {
  addTransaction,
  fetchCategories,
} from '../../redux/finance/operations';
import MainButton from '../mainButton/mainButton';
import TextInput from '../textInput/textInput';
import { selectStyles } from '../chart/chartFiltersStyles';


export const ModalAddTransaction = ({ closeModal }) => {

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);


  const initialValues = {
    amount: "",
    category: '',
    date: new Date(),
    comment: '',
  };

  const [isChecked, setIsChecked] = useState(false);
  const [dateValue, setDateValue] = useState(initialValues.date);
  const [selectedCategory, setSelectedCategory] = useState("Main expenses");
  const [comment, setComment] = useState("-")
  const [amount, setAmount] = useState("")

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
      addTransaction({
        isExpense: !isChecked,
        amount: Number(amount),
        date: dateValue,
        category: isChecked ? 'Income' : selectedCategory,
        comment: comment,
      })
    );

    form.reset();
  };

  return (
    <div>
      <div className="backdrop" onClick={closeModal}></div>
      <div className="overlay">
        <h1>Add transaction</h1>

        <div className='switch'>

          <label
            htmlFor="check1"
            className={`toggle-label ${isChecked ? 'income' : 'expense'}`}
          >Expense</label>
          <input type="checkbox" id="check1" className="toggle"
            name="transaction-type" defaultChecked={isChecked}
            onClick={() => setIsChecked(!isChecked)} />
          <label
            htmlFor="check1"
            className={`toggle-label ${isChecked ? 'expense' : 'income'}`}
          >Income</label>
        </div>
        <div>
          <Formik
            initialValues={initialValues}
          >
            <Form
              onSubmit={(e) => handleSubmit(e)}
              className='form'
            >
              <TextInput
                type="text"
                id="amount"
                name="amount"
                placeholder="0.0"
                value={amount}
                className="input"
                onChange={(e) => {
                  const input = e.target.value;
                  const regex = /^(\d+)?(\.\d{0,2})?$/;

                  if (regex.test(input)) {
                    setAmount(input)
                  }
                }}
              />
              {isChecked ? null : (
                <div>
                  <Select
                    styles={selectStyles}
                    options={categoriesOptions}
                    placeholder="Main expenses"
                    id="category"
                    name="category"
                    onChange={(option) => {
                      setSelectedCategory(option.label)
                    }}
                    isSearchable={false}
                    defaultValue="Main expenses"
                  />
                </div>
              )}
              <Datetime
                id="date"
                name="date"
                dateFormat="DD.MM.YYYY"
                timeFormat={false}
                value={dateValue}
                className="datetime"
                onChange={(newDate) => {
                  setDateValue(newDate);
                }}
              />
              <label className="label">
                <textarea
                  placeholder="Comment"
                  className='textarea'
                  rows={3}
                  onChange={(comment) => {
                    setComment(comment.target.value);
                  }}
                />
              </label>
              <MainButton type="submit" text="ADD" className="logo_btn" />
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
