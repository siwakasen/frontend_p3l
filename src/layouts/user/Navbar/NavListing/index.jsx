import React from 'react';
import Menudata from '../MenuItems';
import { Box, List, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';

const NavListing = () => {
  const pathname = window.location.pathname;
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';

  return (
    <Box>
      <List sx={{ p: 0, display: 'flex', gap: '50px', zIndex: '100' }}>
        {Menudata.map((item) => {
          if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
              />
            );

            // {/********If Sub No Menu**********/}
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} hideMenu={hideMenu} />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default NavListing;
