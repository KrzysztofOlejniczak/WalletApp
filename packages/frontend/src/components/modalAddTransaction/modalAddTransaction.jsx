import { useEffect, useState } from 'react';
import css from './modalAddTransaction.module.css';
import { useSelector } from 'react-redux';
import { selectError } from '../../redux/finance/selectors';
import { NotifyError } from '../errNotifications/errNotify';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import 'react-toastify/dist/ReactToastify.css';
import addTransactionValidationSchema from '../../validations/validateAddTransaction';
import { useDispatch } from 'react-redux';
import { selectCategories } from '../../redux/finance/selectors';
import {
  addTransaction,
  fetchCategories,
} from '../../redux/finance/operations';

export const ModalAddTransaction = ({ closeModal }) => {
  const initialValues = {
    amount: 0.0,
    category: '',
    date: new Date(),
    comment: '',
  };

  const [isChecked, setIsChecked] = useState(false);
  const [dateValue, setDateValue] = useState(initialValues.date);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector(selectCategories);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    dispatch(
      addTransaction({
        isExpense: !isChecked,
        amount: form.elements.amount.value,
        date: dateValue,
        category: isChecked ? 'Income' : form.elements.category.value,
        comment: form.elements.comment.value,
      })
    );

    form.reset();
    // closeModal();
  };

  const error = useSelector(selectError);
  const shouldShowError = error !== null;

  return (
    <div className={css.overlay}>
      <h1>Add transaction</h1>

      <div>
        {/* Tu trzeba zrobić ładnego switcha */}
        <span>Income</span>
        <input
          type="checkbox"
          id="transaction-type"
          name="transaction-type"
          defaultChecked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
        />
        <span>Expense</span>
      </div>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={addTransactionValidationSchema}
        >
          {(props) => {
            const { values } = props;
            return (
              <Form
                onSubmit={(e) => handleSubmit(e)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  rowGap: '10px',
                }}
              >
                <Field
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder="Amount"
                  value={values.amount}
                />
                {isChecked ? null : (
                  <Field as="select" id="category" name="category">
                    {categories
                      .filter((category) => category.name !== 'Income')
                      .map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                  </Field>
                )}

                <Datetime
                  id="date"
                  name="date"
                  dateFormat="DD-MM-YYYY"
                  timeFormat={false}
                  value={dateValue}
                  onChange={(newDate) => {
                    setDateValue(newDate);
                  }}
                />
                <Field
                  id="comment"
                  name="comment"
                  value={values.comment}
                  placeholder="Comment"
                  as="textarea"
                />
                <ErrorMessage name="comment">
                  {(error) => <p>{error}</p>}
                </ErrorMessage>
                <button type="submit">Add</button>
              </Form>
            );
          }}
        </Formik>
        <button onClick={closeModal}>Cancel</button>
      </div>
      {shouldShowError ? <NotifyError error={error} /> : null}
    </div>
  );
};
