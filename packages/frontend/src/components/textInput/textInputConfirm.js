import { React } from 'react';
import { useField } from 'formik';
import './textInput.scss';

const TextInputConfirm = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <>
      <label htmlFor={field.name} className="label2">
        {label}
        <input {...field} {...props} autoComplete="off" />
      </label>
    </>
  );
};
export default TextInputConfirm;
