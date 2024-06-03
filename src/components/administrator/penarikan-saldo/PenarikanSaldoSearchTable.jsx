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
    Modal,
    Button,
} from '@mui/material';
import { useState, useEffect } from 'react';
import CustomCheckbox from "../../shared/CustomCheckbox";
import CustomSwitch from "../../shared/CustomSwitch";
import EnhancedTableHead from "../../shared/search-table/EnhancedTableHead";
import { alpha } from "@mui/material/styles";
import { IconCheck } from "@tabler/icons-react";
import CustomBoxModal from "../../shared/CustomBoxModalConfirm";
import { useConfirm } from "./usePenarikanSaldo";
import {
    getComparator,
    stableSort,
} from "@/components/shared/search-table/SearchTableFunction";

export const PenarikanSaldoSearchTable = ({ data, headCells, setLoading, loading }) => {
    const { handleConfirm } = useConfirm({ loading, setLoading });
    const [orderBy, setOrderBy] = useState("asc");
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = useState("id_histori_saldo");
    const [rows, setRows] = useState([]);

    useEffect(() => {
        setRows(data);
    }, [data]);

    function handleOpen() {
        setOpen(!open);
    }

    function handleConfirmAction(id) {
        handleConfirm(id);
        setSelected([]);
        handleOpen();
        setPage(0);
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id_histori_saldo);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
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
                        <Box sx={{ flex: "1 1 100%" }}>
                        </Box>
                    )}

                    {/* Filter icon / delete icon */}
                    {selected.length > 0 ? (
                        <Tooltip title="Konfirmasi">
                            <IconButton onClick={handleOpen}>
                                <IconCheck width="18" className="text-green-400" />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <></>
                    )}
                    <Modal open={open} onClose={handleOpen}>
                        <div>
                            <CustomBoxModal
                                title="Konfirmasi Penarikan Saldo"
                                description="Pastikan saldo sudah ditransfer sesuai dengan nominal penarikan!"
                                footer={
                                    <Button
                                        color="success"
                                        size="small"
                                        sx={{ mt: 2 }}
                                        onClick={() => handleConfirmAction(selected)}
                                    >
                                        Konfirmasi
                                    </Button>
                                }
                            />
                        </div>
                    </Modal>
                </Toolbar>

                <Paper variant="outlined" sx={{ mx: 2, mt: 1 }}>
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
                                        const isItemSelected = isSelected(row.id_histori_saldo);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.id_histori_saldo)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.id_histori_saldo}
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
                                                        {row.user.nama
                                                            .charAt(0)
                                                            .toUpperCase() + row.user.nama.slice(1)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell >
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="subtitle2"
                                                    >
                                                        {row.nominal_saldo}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell >
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="subtitle2"
                                                    >
                                                        {row.keterangan_transaksi}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell >
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="subtitle2"
                                                    >
                                                        {row.tanggal_pengajuan}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell >
                                                    <Typography
                                                        color="textSecondary"
                                                        variant="subtitle2"
                                                    >
                                                        {row.tanggal_konfirmasi}
                                                    </Typography>
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
