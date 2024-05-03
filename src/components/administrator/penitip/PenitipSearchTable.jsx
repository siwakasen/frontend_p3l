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
    
  } from "@mui/material";
import { useState, useEffect } from "react";
import CustomCheckbox from "../../shared/CustomCheckbox";
import CustomSwitch from "../../shared/CustomSwitch";
import EnhancedTableHead from "../../shared/search-table/EnhancedTableHead";
import { alpha } from "@mui/material/styles";
import { IconEdit, IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import CustomBoxModal from "../../shared/CustomBoxModalConfirm";
import {
getComparator,
stableSort,
} from "@/components/shared/search-table/SearchTableFunction";
import { useRouter } from "next/navigation";
import { useDelete } from "./usePenitip";
import { searchPenitip } from "@/services/penitip/penitip";


export const PenitipSearchTable = ({ data, headCells, setLoading, loading }) => {
    const { handleDelete } = useDelete({setLoading, loading});
    const router = useRouter();
    const [orderBy, setOrderBy] = useState("id_penitip");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("asc");
    const [rows, setRows] = useState([]);
    const [search, setSearch] = useState("");
    const [thisData, setData] = useState(data);

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
        router.push(`/administrator/penitip/ubah/${id}`);
    }

    function handleAdd(){
        router.push('/administrator/penitip/tambah');
    }

    function handleSearch(query) {
        const fetchData = async () => {
            const response = await searchPenitip(query);
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
        if(property === 'nama_penitip'){
            property = 'id_penitip';
        }
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };  

    const handleSelectAllClick = (event) => {
    if (event.target.checked) {
        const newSelecteds = rows.map((n) => n.id_penitip);
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
                            placeholder="Search Penitip"
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
                    <Tooltip title="Hapus data">
                    <IconButton onClick={handleOpen}>
                        <IconTrash width="18" className="text-red-400" />
                    </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Tambah data">
                    <Button onClick={handleAdd}>
                        <IconPlus width="18" /> Tambah
                    </Button>
                    </Tooltip>
                )}
                <Modal open={open} onClose={handleOpen}>
                    <div>
                    <CustomBoxModal
                        title="Hapus Penitip"
                        description="Data yang dihapus tidak dapat dikembalikan!"
                        footer={
                        <Button
                            color="error"
                            size="small"
                            sx={{ mt: 2 }}
                            onClick={()=>handleDeleteAction(selected)}
                        >
                            Hapus
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
                                        const isItemSelected = isSelected(row.id_penitip);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.id_penitip)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id_penitip}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <CustomCheckbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{ "aria-labelledby": labelId }}
                                                    />
                                                </TableCell>
                                                <TableCell component="th" id={labelId} scope="row" padding="none" >
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="subtitle2"
                                                        sx={{
                                                            ml: 2,
                                                          }}
                                                    >
                                                    {row.nama_penitip
                                                     .charAt(0)
                                                     .toUpperCase() + row.nama_penitip.slice(1)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell >
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="subtitle2"
                                                    >
                                                    {row.email}
                                                    </Typography>
                                                    </TableCell>
                                                <TableCell >
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="subtitle2"
                                                    >
                                                    {row.no_hp}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell >
                                                    <Tooltip title="Edit">
                                                        <IconButton onClick={() => handleEdit(row.id_penitip)}>
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

