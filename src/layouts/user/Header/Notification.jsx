import React, { useState } from 'react';
import {
  IconButton,
  Box,
  Badge,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Button,
  Chip,
  Dialog,
} from '@mui/material';
import * as dropdownData from './data';
import Scrollbar from '@/components/custom-scroll/Scrollbar';

import { IconBellRinging } from '@tabler/icons-react';
import { Stack } from '@mui/system';
import Link from 'next/link';

const Notifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };  

  return (
    <Box>
      <IconButton
        size="large"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          color: anchorEl ? 'primary.main' : 'text.secondary',
        }}
        onClick={handleClick}
      >
        <Badge variant={dropdownData.notifications.length > 0 ? 'dot' : 'standard'} color="primary">
          <IconBellRinging size="21" stroke="1.5" />
        </Badge>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Dialog
        open={Boolean(anchorEl)}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            position: 'fixed',
            top: 30,
            m: 0,
          },
        }}
      >
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          sx={{
            '& .MuiMenu-paper': {
              width: '360px',
            },
          }}
        >
          <Stack direction="row" py={2} px={4} justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Notifikasi</Typography>
          </Stack>
          <Scrollbar>
            {dropdownData.notifications.map((item, index) => (
              <MenuItem key={index} onClick={handleClose}>
                <Box display="flex" alignItems="center">
                  <Avatar
                    src={item.avatar}
                    alt={item.name}
                    sx={{ width: 45, height: 45, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.message}
                    </Typography>
                  </Box>
                </Box>
              </MenuItem>
            ))}
            {dropdownData.notifications.length === 0 && (
              <Typography variant="subtitle1" color="textSecondary" textAlign={'center'}>
                Tidak ada notifikasi baru
              </Typography>
            )}
          </Scrollbar>
          <Box p={3} pb={1}>
            <Button href="/apps/email" variant="outlined" component={Link} color="primary" fullWidth>
              Lihat Semua Notifikasi
            </Button>
          </Box>
        </Menu>
      </Dialog>
    </Box>
  );
};

export default Notifications;
