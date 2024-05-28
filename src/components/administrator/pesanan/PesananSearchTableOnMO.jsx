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
} from "@mui/material";
import { useState, useEffect } from "react";
import CustomSwitch from "../../shared/CustomSwitch";
import {
    getComparator,
    stableSort,
} from "@/components/shared/search-table/SearchTableFunction";
import { IconCheck, IconChecks, IconX } from "@tabler/icons-react";

import CustomCheckbox from "../../shared/CustomCheckbox";
import EnhancedTableHead from "../../shared/search-table/EnhancedTableHead";
import CustomBoxModal from "../../shared/CustomBoxModalConfirm";
import { alpha } from "@mui/material/styles";
import { useConfirm } from "./usePesanan";

export const PesananSearchTableOnMO = ({ data, headCells, setLoading, loading }) => {
    const { handleConfirm } = useConfirm({ loading, setLoading });
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [openTerima, setOpenTerima] = useState(false);
    const [openTolak, setOpenTolak] = useState(false);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState(data);

    useEffect(() => {
        setRows(data);
    }, [data]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    function handleOpenTerima() {
        setOpenTerima(!openTerima);
    }
    function handleOpenTolak() {
        setOpenTolak(!openTolak);
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleConfirmAction = (status_transaksi) => {
        handleConfirm(selected, status_transaksi);
        setSelected([]);
        setPage(0);
        if (status_transaksi === 'diterima') {
            handleOpenTerima();
        } else {
            handleOpenTolak();
        }
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id_pesanan);
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

    return (
        <Box>
            <Box sx={{ flex: "1 1 100%", ml: 2, mr: 2 }}>
                <Toolbar
                    sx={{
                        borderRadius: 1,
                        ...(selected.length > 0 && {
                            bgcolor: (theme) =>
                                alpha(
                                    theme.palette.primary.main,
                                    theme.palette.action.activatedOpacity
                                ),
                        }),
                    }}
                >
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

                    {selected.length == 1 ? (
                        <>
                            <Tooltip title="Tolak">
                                <IconButton onClick={handleOpenTolak}>
                                    <IconX width="18" className="text-red-500" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Terima">
                                <IconButton onClick={handleOpenTerima}>
                                    <IconCheck width="18" className="text-green-500" />
                                </IconButton>
                            </Tooltip>
                        </>

                    ) : (
                        selected.length > 1 && (
                            <>
                                <Tooltip title="Tolak">
                                    <IconButton onClick={handleOpenTolak}>
                                        <IconX width="22" className="text-red-500" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Terima">
                                    <IconButton onClick={handleOpenTerima}>
                                        <IconChecks width="22" className="text-green-500" />
                                    </IconButton>
                                </Tooltip>
                            </>
                        )
                    )}
                    <Modal open={openTerima} onClose={handleOpenTerima}>
                        <div>
                            <CustomBoxModal
                                title="Terima Pesanan"
                                description="Terima pesanan yang dipilih?"
                                footer={
                                    <>
                                        <Button
                                            color="success"
                                            size="small"
                                            sx={{ mt: 2, mr: 2 }}
                                            onClick={() => handleConfirmAction('diterima')}
                                        >
                                            Terima
                                        </Button>
                                        <Button
                                            color="error"
                                            size="small"
                                            sx={{ mt: 2 }}
                                            onClick={() => handleOpenTerima()}
                                        >
                                            Batal
                                        </Button>
                                    </>

                                }
                            />
                        </div>
                    </Modal>
                    <Modal open={openTolak} onClose={handleOpenTolak}>
                        <div>
                            <CustomBoxModal
                                title="Tolak pesanan"
                                description="Tolak pesanan yang dipilih?"
                                footer={
                                    <>
                                        <Button
                                            color="error"
                                            size="small"
                                            sx={{ mt: 2, mr: 2 }}
                                            onClick={() => handleConfirmAction('ditolak')}
                                        >
                                            Tolak
                                        </Button>
                                        <Button
                                            color="primary"
                                            size="small"
                                            sx={{ mt: 2 }}
                                            onClick={() => handleOpenTolak()}
                                        >
                                            Batal
                                        </Button>
                                    </>
                                }
                            />
                        </div>
                    </Modal>
                </Toolbar>
            </Box>
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
                                    const isItemSelected = isSelected(row.id_pesanan);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            onClick={(event) => handleClick(event, row.id_pesanan)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            key={row.id_pesanan}
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
                                                    {row.id_pesanan}
                                                </Typography>
                                            </TableCell>
                                            <TableCell
                                                sx={{
                                                    overflow: "scroll",
                                                }}
                                            >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                    sx={{
                                                        lineClamp: 2,
                                                        maxHeight: "3.6em",
                                                        maxWidth: "16rem",
                                                        overflow: "scroll",
                                                        width: "16rem",
                                                    }}
                                                >
                                                    {
                                                        row.detail_pesanan.map((item, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    {
                                                                        item.id_produk !== null ? `${item.jumlah} x ${item.produk.nama_produk} = Rp ${Intl.NumberFormat("id-ID").format(item.subtotal)}` : `${item.jumlah} x ${item.hampers.nama_hampers} = Rp ${Intl.NumberFormat("id-ID").format(item.subtotal)}`
                                                                    }
                                                                </div>
                                                            );
                                                        })
                                                    }
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                    sx={{ width: "6rem" }}
                                                >
                                                    Rp {Intl.NumberFormat("id-ID").format(row.total_harga)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                    sx={{ width: "6rem" }}
                                                >
                                                    Rp {row.ongkir === null ? 0 : Intl.NumberFormat("id-ID").format(row.ongkir)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                    sx={{ width: "6rem" }}
                                                >
                                                    Rp {Intl.NumberFormat("id-ID").format(row.total_bayar)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                    sx={{ width: "6rem" }}
                                                >
                                                    Rp {row.tip === null ? 0 : Intl.NumberFormat("id-ID").format(row.tip)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                >
                                                    {row.poin_dipakai === null ? 0 : row.poin_dipakai}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                >
                                                    {row.poin_didapat === null ? 0 : row.poin_didapat}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                >
                                                    {row.tanggal_pesanan}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                >
                                                    {row.tanggal_diambil}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                >
                                                    {row.tanggal_pembayaran}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                >
                                                    {row.alamat_pengiriman}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                >
                                                    {row.status_transaksi}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                >
                                                    {row.metode_pemesanan}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                >
                                                    {row.metode_pengiriman}
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
    );
}
