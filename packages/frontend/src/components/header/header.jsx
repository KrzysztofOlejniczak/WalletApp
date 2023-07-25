import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import useAuth from '../../hooks/useAuth';
import { Wallet } from '../wallet/wallet';

import css from './header.module.css';
import icons from '../../images/icons.svg';
import { ModalLogout } from '../modalLogout/modalLogout';
import { selectError } from '../../redux/auth/selectors';
import { NotifyError } from '../errNotifications/errNotify';
import { closeModal, openModal } from '../../redux/global/operations';
import { selectIsModalLogoutOpen } from '../../redux/global/selectors';

export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const isModalLogoutOpen = useSelector(selectIsModalLogoutOpen);
  const error = useSelector(selectError);
  const shouldShowError = error !== null;

  return (
    <div className={css.header}>
      <Wallet>Wallet</Wallet>
      <h1 className={css.headerHeading}>Wallet</h1>
      <div className={css.headerLogOut}>
        <p className="">{user}</p>
        <button
          type="button"
          className=""
          onClick={() => dispatch(openModal('isModalLogoutOpen'))}
        >
          <svg className={css.headerIconExit}>
            <use href={`${icons}#exit`}></use>
          </svg>
        </button>
        {isModalLogoutOpen ? (
          <ModalLogout
            closeModal={() => dispatch(closeModal('isModalLogoutOpen'))}
            handleLogout={() => dispatch(logOut())}
          />
        ) : null}
      </div>
      {shouldShowError ? <NotifyError error={error} /> : null}
    </div>
  );
};
