import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import EnhancedTableHead from "@/components/shared/search-table/EnhancedTableHead";
import Report from "./PrintLaporan";

export const StokBahanBaku = ({ data, headCells }) => {
  const [order, setOrder] = useState("desc");

  const [orderBy, setOrderBy] = useState("id_pembelian");

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [rows, setRows] = useState(data);

  useEffect(() => {
    setRows(data);
  }, [data]);

  const isSelected = (name) => selected.indexOf(name) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handlePrint = (transaction) => {
    const printContents = document.getElementById(
      `receipt-to-print-${transaction.length}`
    ).innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return typeof data === undefined ? (
    <></>
  ) : (
    <Box>
      <Box>
        <Button
          sx={{ mb: "1.25rem" }}
          onClick={() => handlePrint(data)}
          variant="contained"
        >
          Cetak Laporan
        </Button>

        <Box style={{ display: "none" }}>
          <Box
            key={data?.length}
            id={`receipt-to-print-${data?.length}`}
            style={{ display: "none" }}
          >
            <Report data={data} />
          </Box>
        </Box>
        <Paper variant="outlined">
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                headCells={headCells}
              />
              <TableBody>
                {data?.map((row, index) => {
                  const isItemSelected = isSelected(row.id_bahan_baku);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id_bahan_baku}
                      selected={isItemSelected}
                    >
                      <TableCell>
                        <Typography variant="h6" fontWeight="600"></Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="h6" fontWeight="600">
                          {row.nama_bahan_baku}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <Typography>{row.satuan}</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography color="textSecondary" variant="subtitle2">
                          {row.stok}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Box>
  );
};
