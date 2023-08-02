import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import useAuth from '../../hooks/useAuth';
//import { Wallet } from '../wallet/wallet';
//import css from './header.module.css';
//import icons from '../../images/icons.svg';

import { ModalLogout } from '../modalLogout/modalLogout';
import { selectError } from '../../redux/auth/selectors';
import { NotifyError } from '../errNotifications/errNotify';
import { closeModal, openModal } from '../../redux/global/operations';
import { selectIsModalLogoutOpen } from '../../redux/global/selectors';

import './header.scss';
import Logo from '../logo/logo';
import sprite from '../../images/svg/symbol-defs.svg';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';

export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const isModalLogoutOpen = useSelector(selectIsModalLogoutOpen);
  const error = useSelector(selectError);
  const shouldShowError = error !== null;

  return (
    <header className="Header">
      <Container fixed sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0,}}>
        <Link to="/home" className="Header__link">
          <Logo />
          <h1 className="Header__logo--text">Wallet</h1>
        </Link>
        <div className="Header__logout">
          <div className="user-info-container">
            <span className="Header__username">{user}</span>
          </div>
          <button
            type="button"
            className="Header__button"
            onClick={() => dispatch(openModal('isModalLogoutOpen'))}
          >
            <svg className="Header__button--icon" width="18px" height="18px">
              <use href={`${sprite}#icon-logout`}></use>
            </svg>
            <span className="Header__logout-text">Exit</span>
          </button>
        </div>
        {isModalLogoutOpen ? (
          <ModalLogout
            closeModal={() => dispatch(closeModal('isModalLogoutOpen'))}
            handleLogout={() => dispatch(logOut())}
          />
        ) : null}
        {shouldShowError ? <NotifyError error={error} /> : null}
      </Container>
    </header>
  );
};
