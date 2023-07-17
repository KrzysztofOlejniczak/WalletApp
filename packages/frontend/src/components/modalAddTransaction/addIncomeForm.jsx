import { Formik, Form, Field } from "formik";
import Datetime from "react-datetime";
// import { ToastContainer, toast } from "react-toastify";
import "react-datetime/css/react-datetime.css";
import "react-toastify/dist/ReactToastify.css";

export const AddIncomeForm = ({ initialValues }) => {
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
                name="comment"
                value={values.comment}
                placeholder="Comment"
                as="textarea"
              />
              <button type="submit">Add</button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

/* `${year}.${month < 10 ? `0${month}` : `${month}`}.${date}` */
