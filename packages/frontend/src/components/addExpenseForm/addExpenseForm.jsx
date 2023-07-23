import { Formik, Form, Field } from 'formik';
import Datetime from 'react-datetime';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../redux/finance/operations';
import { useEffect, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-datetime/css/react-datetime.css';
import 'react-toastify/dist/ReactToastify.css';
import expenseAddValidationSchema from '../../validations/validateAddExpense';
import axios from 'axios';

export const AddExpenseForm = ({ closeModal }) => {
  const initialValues = {
    amount: 0.0,
    category: '',
    date: new Date(),
    comment: '',
  };

  const [dateValue, setDateValue] = useState(initialValues.date);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const getCategories = async () => {
    const res = await axios.get(
      `https://wallet-app-backend-3z9p.onrender.com/api/finance/categories`
    );
    const categoriesArray = res.data.filter(
      (category) => category.name !== 'Income'
    );
    setCategories([...categoriesArray]);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    try {
      dispatch(
        addTransaction({
          isExpense: true,
          amount: form.elements.amount.value,
          date: dateValue,
          category: form.elements.category.value,
          comment: form.elements.comment.value,
        })
      );

      form.reset();
      closeModal();
    } catch (error) {
      // IMPLEMENT ERROR HANDLING
      // console.log(error);
      // toast.error(
      //   { error },
      //   {
      //     position: 'top-right',
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //     theme: 'light',
      //   }
      // );
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={expenseAddValidationSchema}
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
              <Field as="select" id="category" name="category">
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Field>
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
                as="textarea"
                name="comment"
                value={values.comment}
                placeholder="Comment"
              ></Field>
              <button type="submit">Add</button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
