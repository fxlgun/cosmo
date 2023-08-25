import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import MuiLogo from './Logo';
import ColorSchemeToggle from './ColorSchemeToggle';


export default function Header() {
  return (
    <Sheet
      sx={{
        display: "flex",
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        width: '100vw',
        height: '60px',
        zIndex: 9995,
        py: 1,
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
      <MuiLogo variant="plain" sx={{ boxShadow: 'none', mr: 'auto' }} />
      <ColorSchemeToggle id={undefined} />
    </Sheet>
  );
}
