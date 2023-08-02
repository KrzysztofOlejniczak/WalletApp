import { React } from 'react';
import { useField } from 'formik';
import './textInput.scss';

const TextInput = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <>
      <label htmlFor={field.name} className="label">
        {label}
        <input {...field} {...props} autoComplete="off" />
      </label>
    </>
  );
};
export default TextInput;
