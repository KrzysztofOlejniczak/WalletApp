import { React } from 'react';
import { ErrorMessage, useField } from 'formik';
import './TextInput.scss';

const TextInputConfirm = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <>
      <ErrorMessage
        component="div"
        name={field.name}
        style={{ color: '#FF6596' }}
      />
      <label htmlFor={field.name} className="label2">
        {label}
        <input {...field} {...props} autoComplete="off" />
      </label>
    </>
  );
};
export default TextInputConfirm;
