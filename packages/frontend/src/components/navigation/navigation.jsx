import React from 'react';
import { NavLink } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';

import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as DiagramIcon } from '../../assets/icons/diagram.svg';
import { ReactComponent as CurrencyIcon } from '../../assets/icons/currency.svg';
import './navigation.scss';

export const Navigation = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <nav className="nav_container">
      <ul className="nav_list">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              'nav_link' + (isActive ? ' nav_link_active' : '')
            }
          >
            <HomeIcon className="nav_icon" />

            {!isMobile && <span className="nav_text">Home</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/diagram"
            className={({ isActive }) =>
              'nav_link' + (isActive ? ' nav_link_active' : '')
            }
          >
            <DiagramIcon className="nav_icon" />

            {!isMobile && <span className="nav_text">Statistics</span>}
          </NavLink>
        </li>

        <li className="nav_link_currency">
          {isMobile && (
            <NavLink
              to="/currency"
              className={({ isActive }) =>
                'nav_link' + (isActive ? ' nav_link_active' : '')
              }
            >
              <CurrencyIcon className="nav_icon" />

              {!isMobile && <span className="nav_text">Currency</span>}
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};
