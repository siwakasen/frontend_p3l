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
} from "@mui/material";
import { useState, useEffect } from "react";
import CustomCheckbox from "../../shared/CustomCheckbox";
import CustomSwitch from "../../shared/CustomSwitch";
import EnhancedTableHead from "../../shared/search-table/EnhancedTableHead";
import EnhancedTableToolbar from "../../shared/search-table/EnhancedTableToolbar";
import { IconEdit } from "@tabler/icons-react";
import Image from "next/image";
import {
  getComparator,
  stableSort,
} from "@/components/shared/search-table/SearchTableFunction";
import { useRouter } from "next/navigation";
import { useDelete } from "./useHampers";
import { API_URL_IMAGE } from "@/utils/constants";
import { updateHampers } from "@/services/hampers/hampers";
import Toast from "@/components/shared/Toast";

export const HampersSearchTable = ({
  data,
  headCells,
  setLoading,
  loading,
  setFilter,
  filter,
}) => {
  const { handleDelete } = useDelete({ setLoading, loading });

  const handleUpdateStatus = async (selectedIndex) => {
    const { toastSuccess, toastError } = Toast();
    try {
      const formData = new FormData();
      formData.append("status_hampers", 1);
      formData.append("_method", "PUT");
      Array.from(selectedIndex).map(async (id) => {
        const { code } = await updateHampers(formData, id);
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

  // order asc/desc
  const [order, setOrder] = useState("asc");

  const route = useRouter();

  // want order by ?
  const [orderBy, setOrderBy] = useState("id_hampers");

  // modal open
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // useState for data
  const [rows, setRows] = useState(data);

  // useState for search
  const [search, setSearch] = useState("");

  useEffect(() => {
    setRows(data);
  }, [data]);

  function handleOpen() {
    setOpen(!open);
  }

  function handleEdit(id) {
    route.push("/administrator/hampers/ubah/" + id);
  }

  function handleAdd() {
    route.push("/administrator/hampers/tambah");
  }

  const handleSearch = (event) => {
    const filteredRows = data.filter((row) => {
      return row.nama_hampers
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
      const newSelecteds = rows.map((n) => n.id_hampers);
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
                    const isItemSelected = isSelected(row.id_hampers);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const isiProduct = row.detail.produk.map(
                      (item) => item.nama_produk
                    );
                    const isiBahanBaku = row.detail.bahan_baku.map(
                      (item) => item.nama_bahan_baku
                    );
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.id_hampers)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id_hampers}
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
                                src={`${API_URL_IMAGE}${row.foto_hampers}`}
                                fill
                                sizes="100%"
                                style={{
                                  objectFit: "cover",
                                  borderRadius: 8,
                                }}
                                alt={row.nama_hampers}
                              />
                            </Box>

                            <Box
                              sx={{
                                ml: 2,
                              }}
                            >
                              <Typography variant="h6" fontWeight="600">
                                {row.nama_hampers}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        {/* 
                        <TableCell>
                          <Typography
                            color="textSecondary"
                            variant="subtitle2"
                            sx={{
                              lineClamp: 2,
                              maxHeight: "3.6em",
                              maxWidth: "25rem",tab
                              overflow: "scroll",
                            }}
                          >
                            {row.deskripsi_hampers}
                          </Typography>
                        </TableCell> */}

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
                            {`${isiProduct.join(", ")}, ${isiBahanBaku.join(
                              ", "
                            )}`}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2">
                            Rp.{" "}
                            {Intl.NumberFormat("id-ID").format(
                              row.harga_hampers
                            )}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Chip
                            sx={{
                              bgcolor:
                                row.status_hampers == "1"
                                  ? (theme) => theme.palette.primary.light
                                  : (theme) => theme.palette.error.light,
                              color:
                                row.status_hampers == "1"
                                  ? (theme) => theme.palette.primary.main
                                  : (theme) => theme.palette.error.main,
                              borderRadius: "8px",
                            }}
                            size="small"
                            label={
                              row.status_hampers == "1"
                                ? "Aktif"
                                : "Tidak Aktif"
                            }
                          />
                        </TableCell>

                        <TableCell>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => {
                                handleEdit(row.id_hampers);
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
      </Box>
    </Box>
  );
};
