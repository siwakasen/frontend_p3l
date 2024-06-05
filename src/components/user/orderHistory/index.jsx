import React from "react";
import {
  Box,
  Typography,
  Grid,
  List,
  ListItem,
  Divider,
  Avatar,
} from "@mui/material";
import { useSelector } from "react-redux";
import Balance from "../../../assets/icons/balance.png";
import Poin from "../../../assets/icons/poin.svg";
import Image from "next/image";
import Link from "next/link";
import ContainerOrderHistory from "./ContainerOrderHistory";

const OrderHistory = () => {
  const data = useSelector((state) => state.user);
  return (
    <Box mt={2}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={3} lg={3}>
          <Box
            item="true"
            borderRadius={2}
            boxShadow={1}
            bgcolor="#fff"
            border={"1px solid #f0f0f0"}
          >
            <List>
              <ListItem>
                <Avatar />
                <Typography
                  sx={{ marginLeft: 1 }}
                  fontWeight={600}
                  variant="subtitle1"
                >
                  {data.user.nama}
                </Typography>
              </ListItem>
            </List>
            <List>
              <ListItem
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image src={Balance} width={25} height={25} alt="balance" />
                  <Typography
                    sx={{ marginLeft: 1 }}
                    fontWeight={600}
                    variant="subtitle1"
                  >
                    Saldo
                  </Typography>
                </Box>
                <Typography
                  sx={{ marginLeft: 1 }}
                  fontWeight={600}
                  variant="subtitle1"
                >
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  }).format(data.user.saldo)}
                </Typography>
              </ListItem>
            </List>
            <List>
              <ListItem
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Image src={Poin} width={25} height={25} alt="poin" />
                  <Typography
                    sx={{ marginLeft: 1 }}
                    fontWeight={600}
                    variant="subtitle1"
                  >
                    Poin
                  </Typography>
                </Box>
                <Typography
                  sx={{ marginLeft: 1 }}
                  fontWeight={600}
                  variant="subtitle1"
                >
                  {data.user.poin}
                </Typography>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem>
                <Typography fontWeight={600} variant="subtitle1">
                  Pemesanan
                </Typography>
              </ListItem>
              <ListItem>
                <Link href="/user/cart">
                  <Typography fontWeight={400} variant="subtitle2">
                    Keranjang
                  </Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/user/menunggu-pembayaran">
                  <Typography fontWeight={400} variant="subtitle2">
                    Menunggu Pembayaran
                  </Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/user/pembayaran-valid">
                  <Typography fontWeight={400} variant="subtitle2">
                    Pembayaran Valid
                  </Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/user/pesanan-berjalan">
                  <Typography fontWeight={400} variant="subtitle2">
                    Pesanan Berjalan
                  </Typography>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/user/histori-pesanan">
                  <Typography fontWeight={400} variant="subtitle2">
                    Histori Pesanan
                  </Typography>
                </Link>
              </ListItem>
            </List>
          </Box>
        </Grid>
        <ContainerOrderHistory />
      </Grid>
    </Box>
  );
};

export default OrderHistory;
