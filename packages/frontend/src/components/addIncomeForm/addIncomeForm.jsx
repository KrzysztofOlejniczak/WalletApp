import { Formik, Form, Field } from "formik";
import Datetime from "react-datetime";
// import { ToastContainer, toast } from "react-toastify";
import "react-datetime/css/react-datetime.css";
import "react-toastify/dist/ReactToastify.css";
import incomeAddValidationSchema from "../../validations/validateAddIncome";

export const AddIncomeForm = () => {
  const initialValues = {
    amount: 0.0,
    date: new Date(),
    comment: "",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                rowGap: "10px",
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
                initialValue={values.date}
              />
              <Field
                id="comment"
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
