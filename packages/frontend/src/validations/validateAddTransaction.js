import * as Yup from 'yup';

const addTransactionValidationSchema = Yup.object({
  amount: Yup.number().required().integer(),
  category: Yup.string().required(),
  date: Yup.date()
    .required()
    .default(() => new Date()),
  comment: Yup.string(),
});

export default addTransactionValidationSchema;
