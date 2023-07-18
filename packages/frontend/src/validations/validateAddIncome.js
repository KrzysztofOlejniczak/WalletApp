import * as Yup from "yup";

const incomeAddValidationSchema = Yup.object({
  amount: Yup.number().required().integer(),
  date: Yup.date()
    .required()
    .default(() => new Date()),
  comment: Yup.string(),
});

export default incomeAddValidationSchema;
