import React, { forwardRef } from "react";
import {
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
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Atma Kitchen</h1>
      <p className="mb-1">Jl. Centralpark No. 10 Yogyakarta</p>
      <h2 className="text-xl font-semibold mb-2">LAPORAN Stok Bahan Baku</h2>
      <p className="mb-4">Tanggal cetak: {dateNow}</p>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-r border-gray-200 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nama Bahan
              </th>
              <th className="px-6 py-3 border-r border-gray-200 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Satuan
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stok
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index}>
                <td className="px-2 py-1 border-r border-gray-200 text-center text-sm text-gray-900">
                  {row.nama_bahan_baku}
                </td>
                <td className="px-2 py-1 border-r border-gray-200 text-center text-sm text-gray-900">
                  {row.satuan}
                </td>
                <td className="px-2 py-1 text-center text-sm text-gray-900">
                  {row.stok}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default Report;
