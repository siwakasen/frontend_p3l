import React from 'react';
// mui imports
import { ListItemIcon, ListItem, List, styled, ListItemText, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const NavItem = ({ item, level, pathDirect, onClick }) => {
  const customizer = useSelector((state) => state.customizer);
  const Icon = item.icon;
  const theme = useTheme();
  const itemIcon =
    level > 1 ? <Icon stroke={1.5} size="1rem" /> : <Icon stroke={1.5} size="1.1rem" />;

  const ListItemStyled2 = styled(ListItem)(() => ({
    padding: '5px 10px',
    gap: '10px',
    borderRadius: `${customizer.borderRadius}px`,
    marginBottom: level > 1 ? '3px' : '0px',
    color:
      level > 1 && pathDirect === item.href ? `${theme.palette.primary.main}!important` :  theme.palette.text.secondary,
    //backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    '&.Mui-selected': {
      '&:hover': {
        backgroundColor: level > 1 ? '' : theme.palette.primary.main,
        color: 'white',
      },
    },
  }));

  return (
    <List disablePadding key={item.id}>
      <ListItemStyled2
        button
        component={Link}
        to={item.href}
        href={item.href}
        onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: 'auto',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          {itemIcon}
        </ListItemIcon>
        <ListItemText>{item.title}</ListItemText>
      </ListItemStyled2>
    </List>
  );
};

export default NavItem;
