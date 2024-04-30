import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  IconButton,
  Tooltip,
  FormControlLabel,
  Typography,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import CustomCheckbox from "../../shared/CustomCheckbox";
import CustomSwitch from "../../shared/CustomSwitch";
import EnhancedTableHead from "../../shared/search-table/EnhancedTableHead";
import EnhancedTableToolbar from "../../shared/search-table/EnhancedTableToolbar";
import { IconEdit } from "@tabler/icons-react";
import { format } from "date-fns";
import {
  getComparator,
  stableSort,
} from "@/components/shared/search-table/SearchTableFunction";
import { useDelete } from "./usePembelianBahanBaku";
import { useRouter } from "next/navigation";

export const PembelianTableSearch = ({
  data,
  headCells,
  setLoading,
  loading,
}) => {
  const { handleDelete } = useDelete({ setLoading, loading });
  // order asc/desc
  const [order, setOrder] = useState("desc");

  const route = useRouter();

  // want order by ?
  const [orderBy, setOrderBy] = useState("id_pembelian");

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
    route.push("/administrator/pembelian-bahan-baku/ubah/" + id);
  }

  function handleAdd() {
    route.push("/administrator/pembelian-bahan-baku/tambah");
  }

  const handleSearch = (event) => {
    const filteredRows = data.filter((row) => {
      return row.bahan_baku.nama_bahan_baku
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
      const newSelecteds = rows.map((n) => n.id_pembelian);
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
                    const isItemSelected = isSelected(row.id_pembelian);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) =>
                          handleClick(event, row.id_pembelian)
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id_pembelian}
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
                            {row.bahan_baku.nama_bahan_baku}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography>
                            {format(
                              new Date(row.tanggal_pembelian),
                              "E, MMM d yyyy"
                            )}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2">
                            {`${row.jumlah} ${row.bahan_baku.satuan}`}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Typography color="textSecondary" variant="subtitle2">
                            Rp. {Intl.NumberFormat("id-ID").format(row.harga)}
                          </Typography>
                        </TableCell>

                        <TableCell>
                          <Tooltip title="Edit">
                            <IconButton
                              size="small"
                              onClick={() => {
                                handleEdit(row.id_pembelian);
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
