import React from 'react';
import { NavLink } from 'react-router-dom';
import Media from 'react-media';
//import { Box, Link } from '@mui/material';

import { ReactComponent as HomeIcon } from '../../images/svg/home.svg';
import { ReactComponent as DiagramIcon } from '../../images/svg/diagram.svg';
import { ReactComponent as CurrencyIcon } from '../../images/svg/currency.svg';
import './navigation.scss';

export const Navigation = () => {
  
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
            <Media
              query="(min-width: 768px)"
              render={() => <span className="nav_text">Home</span>}
            />
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

            <Media
              query="(min-width: 768px)"
              render={() => <span className="nav_text">Statistics</span>}
            />
          </NavLink>
        </li>

        <li className="nav_link_currency">
          <Media
            query="(max-width: 767px)"
            render={() => (
              <NavLink
                to="/currency"
                className={({ isActive }) =>
                  'nav_link' + (isActive ? ' nav_link_active' : '')
                }
              >
                <CurrencyIcon className="nav_icon" />

                <Media
                  query="(min-width: 768px)"
                  render={() => <span className="nav_text">Currency</span>}
                />
              </NavLink>
            )}
          />
        </li>
      </ul>
    </nav>
  );
};
