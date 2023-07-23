import css from './modalLogout.module.css';

export const ModalLogout = ({ closeModal, handleLogout }) => {
  return (
    <div className={css.modalContainer}>
      <div className={css.modalContent}>
        <h2>Are you sure you want to log out?</h2>
        <div className={css.confirmButtons}>
          <button type="button" onClick={handleLogout}>
            Yes
          </button>
          <button type="button" onClick={closeModal}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};
