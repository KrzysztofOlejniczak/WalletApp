import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Link, useMediaQuery } from '@mui/material';

export const Navigation = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Box component="nav" sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
      <Link variant="nav" to="/home" component={NavLink}>
        Home
      </Link>
      <Link variant="nav" to="/diagram" component={NavLink}>
        Statistics
      </Link>
      {isMobile && (
        <Link variant="nav" to="/currency" component={NavLink}>
          Currency
        </Link>
      )}
    </Box>
  );
};
