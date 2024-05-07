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
    Toolbar,
    TextField,
    Modal,
    Button,
    InputAdornment,
    Chip,
    MenuItem,
    Menu,
  } from "@mui/material";
import { useState, useEffect } from "react";
import CustomCheckbox from "../../shared/CustomCheckbox";
import CustomSwitch from "../../shared/CustomSwitch";
import EnhancedTableHead from "../../shared/search-table/EnhancedTableHead";
import { alpha } from "@mui/material/styles";
import { IconEdit, IconPlus, IconSearch, IconTrash, IconFilter, IconCheckbox } from "@tabler/icons-react";
import CustomBoxModal from "../../shared/CustomBoxModalConfirm";
import {
getComparator,
stableSort,
} from "@/components/shared/search-table/SearchTableFunction";
import { useRouter } from "next/navigation";
import { useDelete } from "./usePengeluaranLain";
import { searchPengeluaranLain, updateStatusPengeluaranLain } from "@/services/pengeluaran-lain/pengeluaran-lain";
import Toast from "@/components/shared/Toast";

export const PengeluaranLainSearchTable = ({ 
    data, 
    headCells, 
    setLoading, 
    loading,
    setFilter,
    filter,
}) => {

    const { handleDelete } = useDelete({setLoading, loading});
    const router = useRouter();
    const [orderBy, setOrderBy] = useState("id_pengeluaran");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState("");
    const [thisData, setData] = useState(data);
    const [anchorEl, setAnchorEl] = useState(null);
    const isFilter = Boolean(anchorEl);

    const handleUpdateStatus = async (selected) => {
        const { toastSuccess, toastError } = Toast();
        try {
          Array.from(selected).map(async (id) => {
            const { data,code } = await updateStatusPengeluaranLain(id);
            switch (code) {
              case 200:
                toastSuccess(data.message);
                break;
              default:
                toastError(data.message);
                break;
            }
          });
        } catch (error) {
          toastError(data.message);
        }
        setLoading(!loading);
        setSelected([]);
        handleOpen();
        setPage(0);
      };

    useEffect(() => {
        setRows(data);
    },[data]);

    useEffect(() => {
        setRows(thisData);
    },[thisData]);

    function handleOpen(){
        setOpen(!open);
    }

    function handleDeleteAction(id){
        handleDelete(id);
        setSelected([]);
        handleOpen();
        setPage(0);
    }

    function handleEdit(id){
        router.push(`/administrator/pengeluaran-lain/ubah/${id}`);
    }

    function handleAdd(){
        router.push('/administrator/pengeluaran-lain/tambah');
    }

    function handleSearch(query) {
        const fetchData = async () => {
            const response = await searchPengeluaranLain(query);
            console.log(response.data);
            setData(response.data);
        };
        setPage(0);
        fetchData();
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(search);
        }
      };

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleRequestSort = (event, property) => {
        if(property === 'nama_pengeluaran'){
            property = 'id_pengeluaran';
        }
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };  

    const handleSelectAllClick = (event) => {
    if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.id_pengeluaran);
        setSelected(newSelecteds);
        return;
    }
    setSelected([]);
    };

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

    const handleClickAnchorEl = (event) => {
        setAnchorEl(event.currentTarget);
      };
    const handleCloseAnchorEl = () => {
        setAnchorEl(null);
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

    return(
        <Box>
            <Box>
            <Toolbar
                sx={{
                    borderRadius: 1,
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(selected.length > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                        theme.palette.primary.main,
                        theme.palette.action.activatedOpacity
                        ),
                    }),
                }}
                >
                {/* Search input / selected item */}
                {selected.length > 0 ? (
                    <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle2"
                    component="div"
                    >
                    {selected.length} selected
                    </Typography>
                ) : (
                    <Box sx={{ flex: "1 1 100%"}}>
                        <TextField
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <IconSearch size="1.1rem" />
                                </InputAdornment>
                            ),
                            }}
                            placeholder="Search Pengeluaran Lain"
                            size="small"
                            onChange={(event) => handleChangeSearch(event)}
                            onKeyDown={(event)=> handleKeyDown(event)}
                            value={search}
                            sx={{mr: "0.2rem"}}
                        />
                    </Box>
                )}
                
                {/* Filter icon / delete icon */}
                {selected.length > 0 ? (
                    filter === 1 || filter === undefined ? (
                        <Tooltip title="Hapus data">
                          <IconButton disableRipple onClick={handleOpen}>
                            <IconTrash width="18" className="text-red-400" />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Aktifkan data">
                          <IconButton disableRipple onClick={handleOpen}>
                            <IconCheckbox width="18" className="text-red-400" />
                          </IconButton>
                        </Tooltip>
                      )
                ) : (
                    <>
                        <Tooltip title="Filter data" sx={{ marginRight: "1rem" }}>
                            <IconButton
                            disableRipple
                            id="basic-button"
                            aria-controls={isFilter ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={isFilter ? "true" : undefined}
                            onClick={handleClickAnchorEl}
                            >
                            <IconFilter width="18" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={isFilter}
                            onClose={handleCloseAnchorEl}
                            MenuListProps={{
                            "aria-labelledby": "basic-button",
                            }}
                        >
                            <MenuItem
                            onClick={() => {
                                setFilter(1);
                                handleCloseAnchorEl();
                            }}
                            >
                            Aktif
                            </MenuItem>
                            <MenuItem
                            onClick={() => {
                                setFilter(0);
                                handleCloseAnchorEl();
                            }}
                            >
                            Tidak Aktif
                            </MenuItem>
                        </Menu>
                        <Tooltip title="Tambah data">
                            <Button onClick={handleAdd}>
                            <IconPlus width="18" /> Tambah
                            </Button>
                        </Tooltip>
                        </>
                )}
                <Modal open={open} onClose={handleOpen}>
                    <div>
                    <CustomBoxModal
                        title={
                            filter === 1 || filter === undefined
                              ? "Hapus Data"
                              : "Aktifkan Data"
                          }
                          description={
                            filter === 1 || filter === undefined
                              ? "Yakin menghapus data ini?"
                              : "Yakin mengaktifkan data ini?"
                          }
                        footer={
                        <Button
                            color={filter === 1 || filter === undefined ? "error" : "info"}
                            size="small"
                            sx={{ mt: 2 }}
                            onClick={()=>filter === 1 || filter === undefined
                                ? handleDeleteAction(selected)
                                : handleUpdateStatus(selected)
                            }
                        >
                           {filter === 1 || filter === undefined ? "Hapus" : "Aktifkan"}
                        </Button>
                        }
                    />
                    </div>
                </Modal>
                </Toolbar>

                <Paper variant="outlined" sx={{mx:2, mt:1}}>
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
                                        const isItemSelected = isSelected(row.id_pengeluaran);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.id_pengeluaran)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id_pengeluaran}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <CustomCheckbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{ "aria-labelledby": labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell id={labelId} scope="row" padding="none" >
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="subtitle2"
                                                        sx={{
                                                            ml: 2,
                                                          }}
                                                    >
                                                    {row.nama_pengeluaran
                                                     .charAt(0)
                                                     .toUpperCase() + row.nama_pengeluaran.slice(1)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell >
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="subtitle2"
                                                    >
                                                    {/* {row.tanggal_pengeluaran} */}
                                                    {Intl.DateTimeFormat("id-ID", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "2-digit",
                                                    }).format(new Date(row.tanggal_pengeluaran))}
                                                    </Typography>
                                                    </TableCell>
                                                <TableCell >
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="subtitle2"
                                                    >
                                                    Rp {Intl.NumberFormat("id-ID").format(row.nominal_pengeluaran)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        sx={{
                                                        bgcolor:
                                                            row.status_pengeluaran_lain == "1"
                                                            ? (theme) => theme.palette.primary.light
                                                            : (theme) => theme.palette.error.light,
                                                        color:
                                                            row.status_pengeluaran_lain == "1"
                                                            ? (theme) => theme.palette.primary.main
                                                            : (theme) => theme.palette.error.main,
                                                        borderRadius: "8px",
                                                        }}
                                                        size="small"
                                                        label={
                                                        row.status_pengeluaran_lain == "1"
                                                            ? "Aktif"
                                                            : "Tidak Aktif"
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell >
                                                    <Tooltip title="Edit">
                                                        <IconButton onClick={() => handleEdit(row.id_pengeluaran)}>
                                                            <IconEdit size={24} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
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
}

