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
  const totalSubtotal = data?.reduce(
    (acc, item) =>
      acc + (item.harga_produk ?? item.harga_hampers) * item.jumlah,
    0
  );
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

      <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 border-r border-gray-200 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Produk
            </th>
            <th className="px-6 py-3 border-r border-gray-200 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Kuantitas
            </th>
            <th className="px-6 py-3 border-r border-gray-200 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Harga
            </th>
            <th className="px-6 py-3 border-r border-gray-200 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Jumlah Uang
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.map((e, index) => {
            return (
              <tr key={index}>
                <td className="px-2 py-1 border-r border-gray-200 text-center text-sm text-gray-900">
                  {e.nama_produk ?? e.nama_hampers}
                </td>
                <td className="px-2 py-1 border-r border-gray-200 text-center text-sm text-gray-900">
                  {e.jumlah}
                </td>
                <td className="px-2 py-1 border-r border-gray-200 text-center text-sm text-gray-900">
                  {e.harga_produk ?? e.harga_hampers}
                </td>
                <td className="px-2 py-1 border-r border-gray-200 text-center text-sm text-gray-900">
                  {(e.harga_produk ?? e.harga_hampers) * e.jumlah}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tr>
          <td
            colSpan={3}
            className="px-2 py-1 border-r border-gray-200 text-center text-sm text-gray-900"
          >
            <Typography variant="h6" component="div">
              Total
            </Typography>
          </td>
          <td className="px-2 py-1 border-r border-gray-200 text-center text-sm text-gray-900">
            <Typography variant="h6" component="div">
              {totalSubtotal}
            </Typography>
          </td>
        </tr>
      </table>
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
