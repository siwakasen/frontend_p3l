import React, { useState } from 'react';
import { IconShoppingCart, IconX } from '@tabler/icons-react';
import { Box, Typography, Badge, IconButton, Button, Stack, Menu, Dialog } from '@mui/material';


const Cart = () => {
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
        aria-controls="cart-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          ...(anchorEl && {
            color: 'primary.main',
          }),
        }}
      >
        <Badge color="error">
          <IconShoppingCart size="21" stroke="1.5" />
        </Badge>
      </IconButton>
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
          id="cart-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          sx={{
            '& .MuiMenu-paper': {
              width: '100%',
              maxWidth: '400px',
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h5">Keranjang Belanja</Typography>
            </Stack>
          </Box>
          <Box sx={{ p: 2 }}>
            <Typography variant="subtitle1" color="textSecondary" textAlign={"center"}>
              Keranjang belanja Anda masih kosong
            </Typography>
          </Box>
          <Box sx={{ p: 2 }}>
            <Button variant="contained" fullWidth>
              Lihat Keranjang
            </Button>
          </Box>
        </Menu>
      </Dialog>
    </Box>
  );
};

export default Cart;
