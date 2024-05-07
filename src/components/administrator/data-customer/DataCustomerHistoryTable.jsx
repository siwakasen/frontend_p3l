import {
    Box,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableContainer,
    TableRow,
    TableHead,
    TableSortLabel,
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
  import CustomSwitch from "../../shared/CustomSwitch";
  import {
    getComparator,
    stableSort,
    } from "@/components/shared/search-table/SearchTableFunction";
    import { useRouter } from "next/navigation";
import { visuallyHidden } from "@mui/utils";


export const DataCustomerHistoryTable = ({ data, headCells }) => {
    const router = useRouter();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState(data);

    useEffect(() => {
        setRows(data);
    },[data]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
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
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
        const createSortHandler = (property) => (event) => {
            handleRequestSort(event, property);
        };

    return (
        <Box>
            <Paper variant="outlined" sx={{mx:2, mt:1}}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                    >
                        <TableHead> 
                            <TableRow>
                                    {headCells.map((headCell) => (
                                        <TableCell
                                            key={headCell.id}
                                            align={headCell.numeric ? "right" : "left"}
                                            padding={headCell.disablePadding ? "none" : "normal"}
                                            sortDirection={orderBy === headCell.id ? order : false}
                                        >
                                            <TableSortLabel
                                                active={orderBy === headCell.id}
                                                direction={orderBy === headCell.id ? order : "asc"}
                                                onClick={createSortHandler(headCell.id)}
                                            >
                                            {headCell.label}
                                            {orderBy === headCell.id ? (
                                                <Box component="span" sx={visuallyHidden}>
                                                {order === "desc" ? "sorted descending" : "sorted ascending"}
                                                </Box>
                                            ) : null}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                            key={row.id_pesanan}
                                        >
                                            <TableCell  id={labelId} scope="row" padding="none" >
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
