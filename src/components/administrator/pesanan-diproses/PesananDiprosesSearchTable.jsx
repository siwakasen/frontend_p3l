import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  FormControlLabel,
  Typography,
  Paper,
  Button,
  Modal,
  Container,
} from "@mui/material";
import CustomBoxModal from "@/components/shared/CustomBoxModalConfirm";
import { useState, useEffect } from "react";
import CustomCheckbox from "@/components/shared/CustomCheckbox";
import CustomSwitch from "@/components/shared/CustomSwitch";
import EnhancedTableHead from "@/components/shared/search-table/EnhancedTableHead";
import { IconEdit } from "@tabler/icons-react";
import {
  getComparator,
  stableSort,
} from "@/components/shared/search-table/SearchTableFunction";
import {
  getPemakaianBahanBaku,
  prosesPesanan,
} from "@/services/pesanan/pesanan";
import Toast from "@/components/shared/Toast";
import { useRouter } from "next/navigation";

export const PesananDiproses = ({ data, headCells, setLoading, loading }) => {
  // order asc/desc
  const [order, setOrder] = useState("desc");

  const router = useRouter();

  const { toastError, toastSuccess } = Toast();

  // want order by ?
  const [orderBy, setOrderBy] = useState("id_pesanan");

  // modal open
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [bahanBaku, setBahanBaku] = useState([]);

  // useState for data
  const [rows, setRows] = useState(data);

  useEffect(() => {
    setRows(data);
  }, [data]);

  function handleOpen() {
    setOpen(!open);
  }

  useEffect(() => {
    async function fetchBahanBaku() {
      const response = await getPemakaianBahanBaku(selected);
      setBahanBaku(response.data);
    }
    fetchBahanBaku();
  }, [selected]);

  function handlePemakaian() {
    handleOpen();
  }

  async function handleProsesPesanan() {
    if (selected.length > 0) {
      const response = await prosesPesanan(selected);
      if (response.code == 200) {
        toastSuccess("Success memproses pesanan");
        setLoading((prev) => !prev);
        setSelected([]);
        setOpen(false);
        router.refresh();
      } else {
        toastError(response.message);
      }
    }
  }

  // This is for the sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // This is for select all the row
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id_pesanan);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // This is for the single row sleect
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box>
      <Box>
        <Button
          sx={{ mb: "1.25rem" }}
          onClick={handlePemakaian}
          variant="contained"
          disabled={selected.length != data?.length}
        >
          Proses Semua Pesanan
        </Button>
        <Paper variant="outlined">
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id_pesanan);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id_pesanan)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id_pesanan}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <CustomCheckbox
                            color="primary"
                            checked={isItemSelected}
                            inputprops={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>

                        <TableCell>
                          <Typography variant="h6" fontWeight="600">
                            {row.no_nota}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography>{row.tanggal_pesanan}</Typography>
                        </TableCell>

                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2">
                            {row.tanggal_pembayaran}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2">
                            {row.tanggal_diambil}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => {
                                handlePemakaian();
                              }}
                            >
                              <IconEdit size="1.1rem" />
                            </IconButton>
                          </Tooltip>
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Box ml={2}>
          <FormControlLabel
            control={
              <CustomSwitch checked={dense} onChange={handleChangeDense} />
            }
            label="Remove padding"
          />
        </Box>
        <Modal open={open} onClose={handleOpen}>
          <div>
            <CustomBoxModal
              title="Pemakaian Bahan Baku"
              footer={
                <Container
                  component="div"
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    columnGap: 2,
                    padding: "0!important",
                  }}
                >
                  <Button
                    color="primary"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={handleOpen}
                  >
                    Close
                  </Button>
                  <Button
                    color="success"
                    variant="contained"
                    size="small"
                    disabled={bahanBaku?.data?.some(
                      (item) => item.status == "Kurang"
                    )}
                    sx={{ mt: 2 }}
                    onClick={handleProsesPesanan}
                  >
                    Proses
                  </Button>
                </Container>
              }
            >
              <Box component="div" sx={{ maxHeight: "50%" }}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Bahan Baku</TableCell>
                        <TableCell>Jumlah</TableCell>
                        <TableCell>Stok</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bahanBaku?.data?.map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{item.nama_bahan_baku}</TableCell>
                            <TableCell>{item.jumlah}</TableCell>
                            <TableCell>{item.stok}</TableCell>
                            <TableCell>{item.status}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </CustomBoxModal>
          </div>
        </Modal>
      </Box>
    </Box>
  );
};
