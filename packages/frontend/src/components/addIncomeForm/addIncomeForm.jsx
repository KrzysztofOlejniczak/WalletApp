import { Formik, Form, Field, ErrorMessage } from 'formik';
import Datetime from 'react-datetime';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-datetime/css/react-datetime.css';
import 'react-toastify/dist/ReactToastify.css';
import incomeAddValidationSchema from '../../validations/validateAddIncome';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../redux/finance/operations';
import { useState } from 'react';

export const AddIncomeForm = ({ closeModal }) => {
  const initialValues = {
    amount: 0.0,
    date: new Date(),
    comment: '',
  };

  const [dateValue, setDateValue] = useState(initialValues.date);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    try {
      dispatch(
        addTransaction({
          isExpense: false,
          amount: form.elements.amount.value,
          date: dateValue,
          comment: form.elements.comment.value,
        })
      );

      form.reset();
      closeModal();
    } catch (error) {
      // IMPLEMENT ERROR HANDLING
      // <ToastContainer />;
      // toast.error(`${error}`, {
      //   position: 'top-right',
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: 'light',
      // });
    }

    // closeModal();
    form.reset();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={incomeAddValidationSchema}
      >
        {/* dodac errorHandle z toastify */}
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
    </>
  );
};

/* `${year}.${month < 10 ? `0${month}` : `${month}`}.${date}` */
