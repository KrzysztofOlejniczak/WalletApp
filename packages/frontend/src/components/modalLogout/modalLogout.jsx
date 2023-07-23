import css from './modalLogout.module.css';
import { useEffect } from 'react';

export const ModalLogout = ({ closeModal, handleLogout }) => {
  useEffect(() => {
    const close = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [closeModal]);

  return (
    <>
      <div className={css.modalOverlay} onClick={closeModal}></div>
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
    </>
  );
};
