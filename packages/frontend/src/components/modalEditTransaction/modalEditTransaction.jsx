import { useState } from 'react';
import { EditTransactionForm } from '../editTransactionForm/editTransactionForm';
import css from './modalEditTransaction.module.css';

export const ModalEditTransaction = ({ closeModal, transaction }) => {
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
    </div>
  );
};
