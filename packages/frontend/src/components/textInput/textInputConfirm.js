import { React } from 'react';
import { ErrorMessage, useField } from 'formik';
import './textInput.scss';

const TextInputConfirm = ({ label, ...props }) => {
  const [field] = useField(props);
  return (
    <>
      <label htmlFor={field.name} className="label2">
        {label}
        <input {...field} {...props} autoComplete="off" />
      </label>
      <ErrorMessage
        component="div"
        name={field.name}
        style={{
          color: '#FF6596',
          fontSize: '10px',
          margin: '10px 0 10px 0',
          alignSelf: 'start',
        }}
      />
    </>
  );
};
export default TextInputConfirm;
