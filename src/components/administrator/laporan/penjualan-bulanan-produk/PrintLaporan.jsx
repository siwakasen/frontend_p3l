import React, { forwardRef } from "react";
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import dayjs from "dayjs";

// eslint-disable-next-line react/display-name
const Report = forwardRef(({ data }, ref) => {
  const dateNow = dayjs().format("D MMMM YYYY");
  const totalSubtotal = data?.reduce((acc, item) => acc + item.subtotal, 0);
  return (
    <Container>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Atma Kitchen
        </Typography>
        <Typography variant="h6" component="h2">
          Jl. Centralpark No. 10 Yogyakarta
        </Typography>
        <Typography variant="h5" component="h3" gutterBottom>
          LAPORAN PENJUALAN BULANAN PER PRODUK
        </Typography>
      </Box>
      <Box mb={4}>
        <Typography>Bulan: {dateNow.split(" ")[1]}</Typography>
        <Typography>Tahun: {dateNow.split(" ")[2]}</Typography>
        <Typography>Tanggal cetak: {dateNow}</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Produk</TableCell>
              <TableCell align="center">Kuantitas</TableCell>
              <TableCell align="center">Harga</TableCell>
              <TableCell align="center">Jumlah Uang</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((e, index) => {
              return (
                <TableRow key={index}>
                  <TableCell align="center">
                    {e.nama_produk ?? e.nama_hampers}
                  </TableCell>
                  <TableCell align="center">{e.jumlah}</TableCell>
                  <TableCell align="center">{e.subtotal}</TableCell>
                  <TableCell align="center">
                    {e.harga_produk ?? e.harga_hampers}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableRow>
            <TableCell colSpan={3} align="right">
              <Typography variant="h6" component="div">
                Total
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" component="div">
                {totalSubtotal}
              </Typography>
            </TableCell>
          </TableRow>
        </Table>
      </TableContainer>
      <Box textAlign="center" mt={4}>
        <Button
          sx={{ display: "none" }}
          variant="contained"
          color="primary"
          onClick={() => window.print()}
        >
          Print Report
        </Button>
      </Box>
    </Container>
  );
});

export default Report;
