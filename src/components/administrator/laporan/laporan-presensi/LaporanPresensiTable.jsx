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
    FormControlLabel,
    Typography,
    Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import CustomSwitch from "../../../shared/CustomSwitch";
import {
    getComparator,
    stableSort,
} from "@/components/shared/search-table/SearchTableFunction";
import { visuallyHidden } from "@mui/utils";
import { set } from "lodash";

export const LaporanPresensiTable = ({ data, headCells }) => {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState(data);

    useEffect(() => {
        setRows(data);
    }, [data]);

    const handleRequestSort = (event, property) => {
        console.log(property);
        if (property == "honor_harian") {
            property = "role.nominal_gaji";
        } else if (property == "bonus_rajin") {
            property = "bonus_gaji"
        }

        console.log(property);
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
            <Paper variant="outlined" sx={{ mx: 2, mt: 1 }}>
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
                                            key={row.id_karyawan}
                                        >
                                            <TableCell id={labelId} scope="row" padding="none" >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                    sx={{
                                                        ml: 2,
                                                    }}
                                                >
                                                    {row.nama_karyawan}
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
                                                    {row.jumlah_hadir}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                    sx={{ width: "6rem" }}
                                                >
                                                    {row.jumlah_bolos}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                    sx={{ width: "6rem" }}
                                                >
                                                    {row.role.nominal_gaji}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                    sx={{ width: "6rem" }}
                                                >
                                                    {row.bonus_gaji}
                                                </Typography>
                                            </TableCell>
                                            <TableCell >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                    sx={{ width: "6rem" }}
                                                >
                                                    {row.role.nominal_gaji + row.bonus_gaji}
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
        </Box>
    );
}
