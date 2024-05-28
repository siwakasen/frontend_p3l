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
} from '@mui/material';
import Scrollbar from '@/components/custom-scroll/Scrollbar';

import { IconBellRinging } from '@tabler/icons-react';
import { getNotifikasiData } from '@/services/notifikasi/notifikasi';
import { Stack } from '@mui/system';
import { IconBell } from '@tabler/icons-react';
import Link from 'next/link';

const Notifications = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [notifications, setNotifications] = useState([]);
  

  const handleGetNotifications = () => {
    getNotifikasiData().then((response) => {
      setNotifications(response.data);
    });
  }

  React.useEffect(() => {
    handleGetNotifications();
  }, []);
  

  const handleClick2 = (event) => {
    handleGetNotifications();
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label={notifications.length > 0 ? `show ${notifications.length} notifikasi baru` : 'no notifikasi baru'}
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          color: anchorEl2 ? 'primary.main' : 'text.secondary',
        }}
        onClick={handleClick2}
      >
          <Badge variant={notifications.length > 0 ? 'dot' : 'standard'} color="primary">
            <IconBellRinging size="21" stroke="1.5" />
          </Badge>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
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
          { notifications.length > 0 && (
            <Chip label={`${notifications.length} Notifikasi Baru`} color="primary" size="small" />
          )}
        </Stack>
        { notifications.length === 0 && (
          <MenuItem sx={{ py: 2, justifyContent: 'center' }}>
            <Typography variant="subtitle2" color="textPrimary" fontWeight={600} noWrap>
              Tidak ada notifikasi
            </Typography>
          </MenuItem>
        )}
        <Scrollbar>
          {notifications.map((notification, index) => (
            <Box key={index} component={Link} href={notification.link}>
              <MenuItem sx={{ py: 2, px: 4 }}>
                <Stack direction="row" spacing={2}
                  alignItems="center"
                >
                  <IconBell size="24" stroke="1.5" />
                  <Box>
                    <Typography
                      variant="subtitle2"
                      color="textPrimary"
                      fontWeight={600}
                      noWrap
                      sx={{
                        width: '240px',
                      }}
                    >
                      {notification.title}, {notification.user && notification.user.nama}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle2"
                      sx={{
                        width: '240px',
                      }}
                      noWrap
                    >
                      {notification.message}
                    </Typography>
                  </Box>
                </Stack>
              </MenuItem>
            </Box>
          ))}
        </Scrollbar>
      </Menu>
    </Box>
  );
};

export default Notifications;
