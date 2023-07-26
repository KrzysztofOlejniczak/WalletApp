import { Formik, Form, Field } from 'formik';
import Datetime from 'react-datetime';
import { useDispatch, useSelector } from 'react-redux';
import {
  editTransaction,
  fetchCategories,
} from '../../redux/finance/operations';
import { useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-datetime/css/react-datetime.css';
import 'react-toastify/dist/ReactToastify.css';
import editValidationSchema from '../../validations/validateEditTransaction';
import { selectCategories } from '../../redux/finance/selectors';

export const EditTransactionForm = ({ closeModal, transaction }) => {
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = String(dateObj.getFullYear()).slice(-2);

    return `${day}-${month}-${year}`;
  };

  const formattedDate = formatDate(transaction.date);

  const initialValues = {
    _id: transaction._id,
    amount: transaction.amount,
    category: transaction.category,
    date: transaction.date,
    comment: transaction.comment,
    isExpense: transaction.isExpense,
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categories = useSelector(selectCategories);

  const handleSubmit = (e, values) => {
    e.preventDefault();
    const form = e.currentTarget;
    const isoDate = new Date(values.date).toISOString();
    dispatch(
      editTransaction({
        _id: transaction._id,
        isExpense: values.isExpense,
        amount: values.amount,
        date: isoDate,
        category: values.isExpense ? values.category : 'Income',
        comment: values.comment,
      })
    );

    form.reset();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={editValidationSchema}
      >
        {(props) => {
          const { values } = props;
          return (
            <Form
              onSubmit={(e) => handleSubmit(e, props.values)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                rowGap: '10px',
              }}
            >
              <span>Income</span>
              <input
                type="checkbox"
                id="transaction-type"
                name="transaction-type"
                checked={values.isExpense}
                onChange={() =>
                  props.setFieldValue('isExpense', !values.isExpense)
                }
              />
              <span>Expense</span>
              <Field
                type="text"
                id="amount"
                name="amount"
                placeholder="Amount"
                value={values.amount}
              />
              {values.isExpense ? (
                <Field as="select" id="category" name="category">
                  {categories
                    .filter((category) => category.name !== 'Income')
                    .map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                </Field>
              ) : null}
              <Datetime
                id="date"
                name="date"
                dateFormat="DD-MM-YYYY"
                timeFormat={false}
                value={formattedDate}
                onChange={(newDate) => {
                  props.setFieldValue('date', newDate);
                }}
              />
              <Field
                id="comment"
                as="textarea"
                name="comment"
                value={values.comment}
                placeholder="Comment"
              ></Field>
              <button type="submit">Change</button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
