import React from 'react';
import { useTheme } from '@mui/material/styles';
import { usePathname } from 'next/navigation';
// mui imports
import { ListItemIcon, ListItem, styled, ListItemText, Box } from '@mui/material';
import { useSelector } from 'react-redux';
// custom imports
import NavItem from '../NavItem';

// plugins
import { IconChevronDown } from '@tabler/icons-react';

// FC Component For Dropdown Menu
const NavCollapse = ({ menu, level, pathWithoutLastPart, pathDirect, hideMenu }) => {
  const Icon = menu.icon;
  const theme = useTheme();
  const pathname = usePathname();
  //const location = pathname.includes(menu.href) ? pathname.substring(0, pathname.indexOf('/')) : '';
  //console.log(location);
  const [open, setOpen] = React.useState(false);
  const customizer = useSelector((state) => state.customizer);
  const menuIcon =
    level > 1 ? <Icon stroke={1.5} size="1rem" /> : <Icon stroke={1.5} size="1.1rem" />;

  const handleOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    setOpen(false);
    menu.children.forEach((item) => {
      if (item.href === pathname) {
        setOpen(true);
      }
    });
  }, [pathname, menu.children]);

  const ListItemStyled = styled(ListItem)(() => ({
    width: 'auto',
    padding: '5px 10px',
    position: 'relative',
    gap: '10px',
    borderRadius: `${customizer.borderRadius}px`,
    whiteSpace: 'nowrap',
    color:
      open || pathname.includes(menu.href) || !level > 1 ? 'white' : theme.palette.text.secondary,
    backgroundColor: open || pathname.includes(menu.href) ? theme.palette.primary.main : '',
    //color: pathname.includes(menu.href) && pathname !== menu.href ? 'white' : 'inherit',
    '&:hover': {
      backgroundColor:
        open || pathname.includes(menu.href)
          ? theme.palette.primary.main
          : theme.palette.primary.light,
    },
    '&:hover > .SubNav': { display: 'block' },
  }));

  const ListSubMenu = styled(Box)(() => ({
    display: 'none',
    position: 'absolute',
    top: level > 1 ? `0px` : '35px',
    left: level > 1 ? `${level + 228}px` : '0px',
    padding: '10px',
    width: '250px',
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[8],
    backgroundColor: theme.palette.background.paper,
  }));

  // If Menu has Children
  const submenus = menu.children?.map((item) => {
    if (item.children) {
      return (
        <NavCollapse
          key={item.id}
          menu={item}
          level={level + 1}
          pathWithoutLastPart={pathWithoutLastPart}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
        />
      );
    } else {
      return (
        <NavItem
          key={item.id}
          item={item}
          onClick={handleOpen}
          level={level + 1}
          pathDirect={pathDirect}
          hideMenu={hideMenu}
        />
      );
    }
  });

  return (
    <React.Fragment key={menu.id}>
      <ListItemStyled
        button
        component="li"
        selected={pathWithoutLastPart === menu.href}
        className={open ? 'selected' : ''}
      >
        <ListItemIcon
          sx={{
            minWidth: 'auto',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          {menuIcon}
        </ListItemIcon>
        <ListItemText color="inherit" sx={{ mr: 'auto' }}>
          {menu.title}
        </ListItemText>
        <IconChevronDown size="1rem" />
        <ListSubMenu component={'ul'} className="SubNav">
          {submenus}
        </ListSubMenu>
      </ListItemStyled>
    </React.Fragment>
  );
};

export default NavCollapse;
