import {
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableContainer,
  TableRow,
  IconButton,
  Tooltip,
  FormControlLabel,
  Typography,
  Paper,
  Chip,
  Modal,
  Button,
  Grid,
} from "@mui/material";
const { format } = require("date-fns");
import FormField from "@/components/auth/shared/OutlineTextFormField";
import LabelForm from "@/components/auth/shared/LabelFormField";
import CustomBoxModal from "@/components/shared/CustomBoxModalConfirm";
import { useState, useEffect, use } from "react";
import CustomCheckbox from "../../shared/CustomCheckbox";
import CustomSwitch from "../../shared/CustomSwitch";
import EnhancedTableHead from "../../shared/search-table/EnhancedTableHead";
import EnhancedTableToolbar from "../../shared/search-table/EnhancedTableToolbar";
import { IconEdit, IconCalendarPlus } from "@tabler/icons-react";
import Image from "next/image";
import {
  getComparator,
  stableSort,
} from "@/components/shared/search-table/SearchTableFunction";
import { useRouter } from "next/navigation";
import {
  useDelete,
  useAddLimit,
  useUpdateLimit,
} from "@/components/administrator/produk/useProduk";
import { API_URL_IMAGE } from "@/utils/constants";
import Toast from "@/components/shared/Toast";
import { updateProduk } from "@/services/produk/produk";
import { getLimitById } from "@/services/limit/limit";

export const ProdukSearchTable = ({
  data,
  kategori,
  headCells,
  setLoading,
  loading,
  filter,
  setFilter,
}) => {
  const { handleDelete } = useDelete({ setLoading, loading });
  const { input, handleChange, handleSubmit, setInput } = useAddLimit();
  const { handleUpdateLimit } = useUpdateLimit();

  const handleUpdateStatus = async (selectedIndex) => {
    const { toastSuccess, toastError } = Toast();
    try {
      const formData = new FormData();
      formData.append("status_produk", 1);
      formData.append("_method", "PUT");
      Array.from(selectedIndex).map(async (id) => {
        const { code } = await updateProduk(formData, id);
        switch (code) {
          case 200:
            toastSuccess("Data berhasil diaktifkan");
            break;
          default:
            toastError("Data gagal diaktifkan");
            break;
        }
      });
    } catch (error) {
      toastError("Data gagal diaktifkan");
    }
    setLoading(!loading);
  };

  function handleAddLimit(id) {
    handleOpenModalLimit();
    setInput((prev) => ({
      ...prev,
      id_produk: id,
      tanggal: format(new Date(), "yyyy-MM-dd"),
    }));
  }

  // order asc/desc
  const [order, setOrder] = useState("asc");

  const route = useRouter();

  // want order by ?
  const [orderBy, setOrderBy] = useState("id_penitip");

  // modal open delete/activete
  const [open, setOpen] = useState(false);

  const [openModalLimit, setOpenModalLimit] = useState(false);

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // useState for data
  const [rows, setRows] = useState(data);

  // useState for limit
  const [openModalLimitHarian, setOpenModalLimitHarian] = useState(false);
  const [dataLimit, setDataLimit] = useState([]);
  const [hasLimit, setHasLimit] = useState();
  const [isCheck, setIsCheck] = useState(false);

  // useState for search
  const [search, setSearch] = useState("");

  useEffect(() => {
    setRows(data);
  }, [data]);

  useEffect(() => {
    async function fetchData() {
      const response = await getLimitById(input.id_produk);
      setDataLimit(response.data);
    }
    fetchData();
  }, [input.id_produk]);

  function handleCheckLimit(date, data) {
    const dataLimit = data.filter((item) => item.tanggal == date);
    if (dataLimit.length > 0) {
      setInput((prev) => ({
        ...prev,
        id_limit_produk: dataLimit[0].id_limit_produk,
        tanggal: dataLimit[0].tanggal,
        limit: dataLimit[0].limit,
        message: "Limit produk tanggal tersebut sudah ada, silahkan update",
        isUpdate: true,
      }));
    } else {
      setInput((prev) => ({
        ...prev,
        message: "Limit produk tanggal tersebut belum ada",
        isUpdate: false,
      }));
    }
    setHasLimit(true);
    setIsCheck(true);
  }

  function handleOpen() {
    setOpen(!open);
  }

  function handleOpenModalLimit() {
    setOpenModalLimit(!openModalLimit);
    setHasLimit(false);
    setIsCheck(false);
  }

  function handleOpenModalLimitHarian() {
    setOpenModalLimitHarian(!openModalLimitHarian);
  }

  function handleEdit(id) {
    route.push("/administrator/produk/ubah/" + id);
  }

  function handleAdd() {
    route.push("/administrator/produk/tambah");
  }

  const handleSearch = (event) => {
    const filteredRows = data.filter((row) => {
      return row.nama_produk
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setSearch(event.target.value);
    setRows(filteredRows);
  };

  // This is for the sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // This is for select all the row
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id_produk);
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
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <Box>
      <Box>
        {/* Search bar */}
        <EnhancedTableToolbar
          numSelected={selected.length}
          indexSelected={selected}
          deleteAction={handleDelete}
          setSelected={setSelected}
          addAction={handleAdd}
          search={search}
          open={open}
          handleOpen={handleOpen}
          handleSearch={(event) => handleSearch(event)}
          useFilter={true}
          filter={filter}
          setFilter={setFilter}
          handleUpdate={handleUpdateStatus}
        />

        <Paper variant="outlined" sx={{ mx: 2, mt: 1 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              {/* Header table */}
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                headCells={headCells}
              />

              {/* Body table */}
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.id_produk);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    let nama_kategori;
                    kategori.map((item) => {
                      if (item.id_kategori == row.id_kategori)
                        nama_kategori = item.nama_kategori;
                    });
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id_produk)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id_produk}
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
                          <Box display="flex" alignItems="center">
                            <Box
                              component="div"
                              sx={{
                                width: 56,
                                height: 56,
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Image
                                src={`${API_URL_IMAGE}${row.foto_produk}`}
                                fill
                                sizes="100%"
                                style={{
                                  objectFit: "cover",
                                  borderRadius: 8,
                                }}
                                alt={row.nama_produk}
                              />
                            </Box>

                            <Box
                              sx={{
                                ml: 2,
                              }}
                            >
                              <Typography variant="h6" fontWeight="600">
                                {row.nama_produk}
                              </Typography>

                              <Typography
                                color="textSecondary"
                                variant="subtitle2"
                              >
                                {nama_kategori}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Typography
                            color="textSecondary"
                            variant="subtitle2"
                            sx={{
                              lineClamp: 2,
                              maxHeight: "3.6em",
                              maxWidth: "16rem",
                              overflow: "scroll",
                            }}
                          >
                            {row.stok_produk}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2">
                            Rp.{" "}
                            {Intl.NumberFormat("id-ID").format(
                              row.harga_produk
                            )}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Chip
                            sx={{
                              bgcolor:
                                row.status_produk == "1"
                                  ? (theme) => theme.palette.primary.light
                                  : (theme) => theme.palette.error.light,
                              color:
                                row.status_produk == "1"
                                  ? (theme) => theme.palette.primary.main
                                  : (theme) => theme.palette.error.main,
                              borderRadius: "8px",
                            }}
                            size="small"
                            label={
                              row.status_produk == "1" ? "Aktif" : "Tidak Aktif"
                            }
                          />
                        </TableCell>

                        <TableCell>
                          {nama_kategori != "Titipan" && (
                            <Chip
                              sx={{
                                bgcolor: (theme) => theme.palette.success.light,
                                color: (theme) => theme.palette.success.main,
                                borderRadius: "8px",
                                border: "1px solid #13DEB9",
                                "&:hover": {
                                  bgcolor: (theme) =>
                                    theme.palette.success.dark,
                                  color: (theme) => theme.palette.common.white,
                                  cursor: "pointer",
                                },
                              }}
                              size="small"
                              label="Limit Harian"
                              onClick={() => {
                                handleOpenModalLimitHarian();
                                setInput((prev) => ({
                                  ...prev,
                                  id_produk: row.id_produk,
                                }));
                              }}
                            />
                          )}
                        </TableCell>

                        <TableCell>
                          <Tooltip title="Edit data">
                            <IconButton
                              size="small"
                              onClick={() => {
                                handleEdit(row.id_produk);
                              }}
                            >
                              <IconEdit size="1.1rem" />
                            </IconButton>
                          </Tooltip>
                          {nama_kategori != "Titipan" && (
                            <Tooltip title="Tambah Limit">
                              <IconButton
                                size="small"
                                onClick={() => handleAddLimit(row.id_produk)}
                              >
                                <IconCalendarPlus size="1.1rem" />
                              </IconButton>
                            </Tooltip>
                          )}
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
        <Modal open={openModalLimitHarian} onClose={handleOpenModalLimitHarian}>
          <div>
            <CustomBoxModal
              title="Limit Produk Harian"
              footer={
                <Button
                  color="primary"
                  size="small"
                  sx={{ mt: 2 }}
                  onClick={handleOpenModalLimitHarian}
                >
                  Close
                </Button>
              }
            >
              <Box component="div" sx={{ maxHeight: "25%" }}>
                {dataLimit.length > 0 ? (
                  dataLimit.map((item, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderBottom: "1px solid #ccc",
                          padding: "8px 0",
                        }}
                      >
                        <Typography variant="subtitle2">
                          {format(new Date(item.tanggal), "eeee, dd MMM yyyy")}
                        </Typography>
                        <Typography variant="subtitle2">
                          {item.limit}
                        </Typography>
                      </Box>
                    );
                  })
                ) : (
                  <Typography variant="subtitle2" color="error">
                    Tidak ada limit produk harian
                  </Typography>
                )}
              </Box>
            </CustomBoxModal>
          </div>
        </Modal>

        <Modal open={openModalLimit} onClose={handleOpenModalLimit}>
          <div>
            <CustomBoxModal
              title="Perbarui Limit Produk"
              footer={
                <Button
                  color="primary"
                  size="small"
                  disabled={!isCheck}
                  sx={{ mt: 2 }}
                  onClick={() => {
                    if (input.isUpdate) {
                      handleUpdateLimit(input, input.id_limit_produk);
                    } else {
                      handleSubmit();
                    }
                    setInput({});
                    handleOpenModalLimit();
                  }}
                >
                  Simpan
                </Button>
              }
            >
              <Grid container columnSpacing={3} rowSpacing={1} className="mt-2">
                <Grid item lg={8} md={8} sm={8} xs={8}>
                  <LabelForm htmlFor="tanggal" sx={{ marginTop: "0px" }}>
                    Tanggal Limit
                  </LabelForm>
                  <FormField
                    type="date"
                    name="tanggal"
                    id="tanggal"
                    value={input.tanggal || ""}
                    onChange={(e) => {
                      setHasLimit(false);
                      setIsCheck(false);
                      handleChange(e);
                    }}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={4} alignSelf="end">
                  <Button
                    variant="outlined"
                    color="warning"
                    size="large"
                    onClick={() => {
                      setInput((prev) => ({
                        ...prev,
                        limit: "",
                        isUpdate: false,
                        id_limit_produk: "",
                        message: "",
                      }));
                      handleCheckLimit(input.tanggal, dataLimit);
                    }}
                  >
                    Check
                  </Button>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <LabelForm htmlFor="limit" sx={{ marginTop: "0px" }}>
                    Jumlah Limit
                  </LabelForm>
                  <FormField
                    type="number"
                    name="limit"
                    id="limit"
                    value={input.limit || ""}
                    onChange={(e) => handleChange(e)}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {hasLimit && (
                    <Typography variant="caption" color="error">
                      {input.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </CustomBoxModal>
          </div>
        </Modal>
      </Box>
    </Box>
  );
};
