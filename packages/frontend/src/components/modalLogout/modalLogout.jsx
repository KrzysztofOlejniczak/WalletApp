import './modalLogout.scss';
import { useEffect } from 'react';
import MainButton from '../mainButton/mainButton';

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
      <div className="logoutModalOverlay" onClick={closeModal}></div>
      <div className="logoutModalContainer">
        <div className="logoutModalContent">
          <h2>Confirm</h2>
          <span className="logoutInfo">
            You will be returned to the login screen.
          </span>
          <div className="confirmButtons">
            <button type="button" text="LOGOUT" className="logo_btn logout_button" onClick={handleLogout}> Confirm </button>
            <button onClick={closeModal} type="button" className="main_btn">
              Cancel
            </button>
            {/*             <button className="cancelButton" type="button" onClick={closeModal}>
              Cancel
            </button>
            <button
              className="logoutButton"
              type="button"
              onClick={handleLogout}
            >
              Log out
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};
