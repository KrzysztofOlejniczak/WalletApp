import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import useAuth from '../../hooks/useAuth';
import { Wallet } from '../wallet/wallet';

import css from './header.module.css';
import icons from '../../images/icons.svg';
import { useState } from 'react';
import { ModalLogout } from '../modalLogout/modalLogout';

export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  return (
    <div className={css.header}>
      <Wallet>Wallet</Wallet>
      <h1 className={css.headerHeading}>Wallet</h1>
      <div className={css.headerLogOut}>
        <p className="">{user}</p>
        <button
          type="button"
          className=""
          onClick={() => setIsLogoutModalOpen(true)}
        >
          <svg className={css.headerIconExit}>
            <use href={`${icons}#exit`}></use>
          </svg>
        </button>
        {isLogoutModalOpen ? (
          <ModalLogout
            closeModal={() => setIsLogoutModalOpen(false)}
            handleLogout={() => dispatch(logOut())}
          />
        ) : null}
      </div>
    </div>
  );
};
