import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import useAuth from '../../hooks/useAuth';
import { Wallet } from '../wallet/wallet';

import css from './header.module.css';
import icons from '../../images/icons.svg';

export const Header = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  return (
    <div className={css.header}>
      <Wallet>Wallet</Wallet>
      <h1 className={css.headerHeading}>Wallet</h1>
      <div className={css.headerLogOut}>
        <p className="">{user}</p>
        <button type="button" className="" onClick={() => dispatch(logOut())}>
          <svg className={css.headerIconExit}>
            <use href={`${icons}#exit`}></use>
          </svg>
        </button>
      </div>
    </div>
  );
};
