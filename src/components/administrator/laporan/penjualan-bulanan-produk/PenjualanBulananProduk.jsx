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
  Container,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import EnhancedTableHead from "@/components/shared/search-table/EnhancedTableHead";
import Report from "./PrintLaporan";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export const PenjualanBulananProduk = ({ data, headCells, date, setDate }) => {
  const [order, setOrder] = useState("desc");

  const [orderBy, setOrderBy] = useState("id_pembelian");
  const datePickerRef = useRef(null);
  const [buttonHeight, setButtonHeight] = useState("auto");

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

  const handleDateChange = (date) => {
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    setDate(formattedDate);
  };

  return typeof data === undefined ? (
    <></>
  ) : (
    <Box>
      <Box>
        <Container
          component="div"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: "0!important",
            alignItems: "center",
            mb: "1.25rem",
          }}
        >
          <Button
            sx={{ height: buttonHeight }}
            onClick={() => handlePrint(data)}
            variant="contained"
            size="large"
          >
            Cetak Laporan
          </Button>
          <LocalizationProvider dateAdapter={AdapterDayjs} sx={{}}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Basic date picker"
                value={dayjs(date)}
                ref={datePickerRef}
                sx={{ pt: 0 }}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Container>
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
                  const isItemSelected = isSelected(
                    row.id_produk ? row.id_produk : row.id_hampers
                  );
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return row.id_produk ? (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id_produk}
                      selected={isItemSelected}
                    >
                      <TableCell>
                        <Typography variant="h6" fontWeight="600"></Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" fontWeight="600">
                          {row.nama_produk}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.jumlah}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="subtitle2">
                          {row.harga_produk}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="subtitle2">
                          {row.harga_produk * row.jumlah}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id_hampers}
                      selected={isItemSelected}
                    >
                      <TableCell>
                        <Typography variant="h6" fontWeight="600"></Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="h6" fontWeight="600">
                          {row.nama_hampers}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.jumlah}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="subtitle2">
                          {row.harga_hampers}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" variant="subtitle2">
                          {row.harga_hampers * row.jumlah}
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
