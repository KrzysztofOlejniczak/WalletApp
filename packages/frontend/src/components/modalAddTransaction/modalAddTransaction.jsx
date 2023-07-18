import { useState } from "react";
import { AddExpenseForm } from "./addExpenseForm";
import { AddIncomeForm } from "./addIncomeForm";
import css from "./modalAddTransaction.module.css";

export const ModalAddTransaction = ({ closeModal }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className={css.overlay}>
      <h1>Add transaction</h1>

      <div>
        {/* Tu trzeba zrobić ładnego switcha */}
        <span>Income</span>
        <input
          type="checkbox"
          defaultChecked={isChecked}
          onClick={() => setIsChecked(!isChecked)}
        />
        <span>Expense</span>
      </div>
      {isChecked ? <AddIncomeForm /> : <AddExpenseForm />}
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
};
