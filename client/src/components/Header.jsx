import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import MuiLogo from './Logo';
import ColorSchemeToggle from './ColorSchemeToggle';
import { toggleSidebar } from '../utils';
import MenuIcon from '@mui/icons-material/Menu'
import { Typography } from '@mui/joy';

export default function Header() {
  return (
    <Sheet
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: 'var(--Header-height)',
        zIndex: 9995,
        py: 4,
        px: 2,
        gap: 1,
        boxShadow: 'sm',
      }}
    >
      <GlobalStyles
        styles={(theme) => ({
          ':root': {
            '--Header-height': '52px',
            [theme.breakpoints.up('md')]: {
              '--Header-height': '0px',
            },
          },
        })}
      />
      <IconButton
        onClick={() => toggleSidebar()}
        variant="outlined"
        color="neutral"
        size="sm"
      >
        <MenuIcon />
      </IconButton>
      <Typography sx={{marginLeft:"10px", fontSize:"30px", fontFamily: 'League Spartan', paddingTop:"5px"}} fontWeight="xl">COSMO</Typography>
      
    </Sheet>
  );
}
