import * as React from 'react';
import { Box, AppBar, useMediaQuery, Toolbar, styled, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import Cart from './Cart';
import Search from './Search';
import Notifications from './Notification';
import Profile from './Profile';
import Logo from '../Shared/logo/Logo';

const Header = () => {
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  // drawer
  const customizer = useSelector((state) => state.customizer);
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',

    [theme.breakpoints.up('lg')]: {
      minHeight: customizer.TopbarHeight,
    },
  }));
  const ToolbarStyled = styled(Toolbar)(({theme}) => ({ margin: '0 auto', width: '100%', color: `${theme.palette.text.secondary} !important`, }));

  return (
    <AppBarStyled position="sticky" color="default" elevation={8} sx={{
      boxShadow: 'none',
    }}>
      <ToolbarStyled
        sx={{
          maxWidth: customizer.isLayout === 'boxed' ? 'lg' : '100%!important',
        }}
      >
        { lgUp ? (
          <Box sx={{ width: lgDown ? '45px' : 'auto', overflow: 'hidden' }}>
            <Logo />
          </Box>
        ) : (
          ''
        )}
        { lgUp ? (
          <Box sx={{ flexGrow: 1 }} />
        ) : (
          ''
        )}
        <Stack spacing={1} direction="row" alignItems="center">
          <Search />
          <Cart />
          <Notifications />
          { lgUp ? (
            <Profile />
          ) : (
            ''
          )}
        </Stack>
        { lgDown ? (
          <>
            <Box flexGrow={1} />
            <Profile />
          </>
        ) : (
          ''
        )}
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
