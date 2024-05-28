import React, { useState, useEffect } from "react";
import { IconShoppingCart, IconX } from "@tabler/icons-react";
import {
  Box,
  Typography,
  Badge,
  IconButton,
  Button,
  Stack,
  Menu,
  Dialog,
} from "@mui/material";
import { getSingleProduk } from "@/services/produk/produk";
import { getSingleHampers } from "@/services/hampers/hampers";
import Image from "next/image";
import { API_URL_IMAGE } from "@/utils/constants";
import Link from "next/link";

const Cart = ({ cart }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [produk, setProduk] = useState([]);
  useEffect(() => {
    function fetchData() {
      if (!cart?.length == 0) {
        let product = [];
        cart?.map(async (item) => {
          if (item.id_produk && item.id_hampers == undefined) {
            const data = await getSingleProduk(item.id_produk);
            product.push(data);
          } else if (item.id_hampers && item.id_produk == undefined) {
            const data = await getSingleHampers(item.id_hampers);
            product.push(data);
          }
        });
        setProduk(product);
      }
    }

    fetchData();
  }, [cart]);

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
            color: "primary.main",
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
            position: "fixed",
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
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "100%",
              maxWidth: "400px",
            },
          }}
        >
          <Box sx={{ p: 2 }}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="h5">Keranjang Belanja</Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            {produk ? (
              produk.map((item, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  <Box
                    sx={{
                      width: "64px",
                      height: "64px",
                      position: "relative",
                      display: "flex",
                    }}
                  >
                    <Image
                      src={
                        API_URL_IMAGE +
                        (item.data.foto_produk || item.data.foto_hampers)
                      }
                      fill
                      sizes="100%"
                      style={{
                        objectFit: "cover",
                        borderRadius: 8,
                      }}
                      alt="produk"
                      priority
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6">
                      {item.data.nama_produk || item.data.nama_hampers}
                    </Typography>
                    <Typography variant="subtitle2">
                      {item.data.id_produk
                        ? cart.find(
                            (datas) => item.data.id_produk === datas.id_produk
                          ).jumlah
                        : cart.find(
                            (datas) => item.data.id_hampers === datas.id_hampers
                          ).jumlah}{" "}
                      pcs
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography
                variant="subtitle1"
                color="textSecondary"
                textAlign={"center"}
              >
                Keranjang belanja Anda masih kosong
              </Typography>
            )}
          </Box>
          <Box sx={{ p: 2 }}>
            <Link href="/user/cart">
              <Button variant="contained" fullWidth onClick={handleClose}>
                Lihat Keranjang
              </Button>
            </Link>
          </Box>
        </Menu>
      </Dialog>
    </Box>
  );
};

export default Cart;
