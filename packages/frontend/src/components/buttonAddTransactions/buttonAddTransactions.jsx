import btnAddTransactions from "./btnOpenModal.svg";
import css from "./btnAddTransactions.module.css";

export const ButtonAddTransactions = ({ handleClick }) => {
  return (
    <>
      <button className={css.openModal} onClick={handleClick}>
        <img src={btnAddTransactions} alt="SVG button" />
      </button>
    </>
  );
};
