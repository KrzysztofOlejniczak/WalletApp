import { Formik, Form, Field } from "formik";
import Datetime from "react-datetime";
// import { ToastContainer, toast } from "react-toastify";
import "react-datetime/css/react-datetime.css";
import "react-toastify/dist/ReactToastify.css";

export const AddExpenseForm = ({ initialValues }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Formik initialValues={initialValues}>
        {/* dodac walidacje i errorHandle z toastify */}
        {(props) => {
          const { values } = props;
          return (
            <Form onSubmit={(e) => handleSubmit(e)}>
              <Field as="select">
                <option value="main-expenses">Main expenses</option>
                <option value="products">Products</option>
                <option value="car">Car</option>
                <option value="self-care">Self Care</option>
                <option value="child-care">Child Care</option>
                <option value="household-products">Household products</option>
                <option value="education">Education</option>
                <option value="leisure">Leisure</option>
                <option value="other-expenses">Other Expenses</option>
                <option value="entertainment">Entertainment</option>
              </Field>
              <Field
                type="text"
                id="amount"
                name="amount"
                placeholder="Amount"
                value={values.amount}
              />
              <Datetime
                dateFormat="DD-MM-YYYY"
                timeFormat={false}
                initialValue={values.date}
              />
              <Field
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
