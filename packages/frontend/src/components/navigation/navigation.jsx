import React from 'react';
import { NavLink } from 'react-router-dom';
import Media from 'react-media';
import { Box, Link } from '@mui/material';

export const Navigation = () => {
  return (
    <Box component="nav" sx={{display: 'flex', gap: 2, flexWrap: 'wrap'}}>
      <Link variant="nav" to="/home" component={NavLink}>
        Home
      </Link>
      <Link variant="nav" to="/diagram" component={NavLink}>
        Statistics
      </Link>
      <Media query="(max-width: 767px)">
        {(matches) =>
          matches && (
            <Link variant="nav" to="/currency" component={NavLink}>
              Currency
            </Link>
          )
        }
      </Media>
    </Box>
  );
};
