import { EditTransactionForm } from '../editTransactionForm/editTransactionForm';
import css from './modalEditTransaction.module.css';
import { useSelector } from 'react-redux';
import { NotifyError } from '../errNotifications/errNotify';
import { selectError } from '../../redux/finance/selectors';

export const ModalEditTransaction = ({ closeModal, transaction }) => {
  const error = useSelector(selectError);
  const shouldShowError = error !== null;
  return (
    <div className={css.overlay}>
      <h1>Edit transaction</h1>

      <div></div>
      <div>
        <EditTransactionForm
          closeModal={closeModal}
          transaction={transaction}
        />
        <button onClick={closeModal}>Cancel</button>
      </div>
      {shouldShowError ? <NotifyError error={error} /> : null}
    </div>
  );
};
