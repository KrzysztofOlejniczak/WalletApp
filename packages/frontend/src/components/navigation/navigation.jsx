import React from 'react';
import { NavLink } from 'react-router-dom';
import Media from 'react-media';

export const Navigation = () => {
  return (
    <nav>
      <NavLink to="/home" >
        Home
      </NavLink>
      <NavLink to="/diagram" >
        Statistics
      </NavLink>
      <Media query="(max-width: 767px)">
        {(matches) =>
          matches && (
            <NavLink to="/currency">
              Currency
            </NavLink>
          )
        }
      </Media>
    </nav>
  );
};
