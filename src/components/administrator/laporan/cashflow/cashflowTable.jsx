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
    Typography,
    Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
    getComparator,
    stableSort,
} from "@/components/shared/search-table/SearchTableFunction";
import { visuallyHidden } from "@mui/utils";
import _ from "lodash";

export const CashflowTable = ({ data, headCells }) => {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("");
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState(data);
    useEffect(() => {
        console.log(data.pengeluaran_lain);
        setRows(data);
    }, [data]);

    const handleRequestSort = (event, property) => {
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
                            {
                                rows.pendapatan ? (
                                    <>
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                        >
                                            <TableCell scope="row" padding="none" >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                    sx={{
                                                        ml: 2,
                                                    }}
                                                >
                                                    Penjualan
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
                                                        width: "6rem",
                                                    }}
                                                >
                                                    {rows.pendapatan.penjualan ? rows.pendapatan.penjualan : 0}
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
                                                        width: "6rem",
                                                    }}
                                                >

                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                        >
                                            <TableCell scope="row" padding="none" >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                    sx={{
                                                        ml: 2,
                                                    }}
                                                >
                                                    Tip
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
                                                        width: "6rem",
                                                    }}
                                                >
                                                    {rows.pendapatan.tip ? rows.pendapatan.tip : 0}
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
                                                        width: "6rem",
                                                    }}
                                                >

                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                        >
                                            <TableCell scope="row" padding="none" >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                    sx={{
                                                        ml: 2,
                                                    }}
                                                >
                                                    Gaji Karyawan
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
                                                        width: "6rem",
                                                    }}
                                                >

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
                                                        width: "6rem",
                                                    }}
                                                >
                                                    {rows.pengeluaran.gaji ? rows.pengeluaran.gaji : 0}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                        >
                                            <TableCell scope="row" padding="none" >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                    sx={{
                                                        ml: 2,
                                                    }}
                                                >
                                                    Bahan Baku
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
                                                        width: "6rem",
                                                    }}
                                                >

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
                                                        width: "6rem",
                                                    }}
                                                >
                                                    {rows.pengeluaran.bahan_baku ? rows.pengeluaran.bahan_baku : 0}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow
                                            hover
                                            tabIndex={-1}
                                        >
                                            <TableCell scope="row" padding="none" >
                                                <Typography
                                                    color="textSecondary"
                                                    variant="subtitle2"
                                                    sx={{
                                                        ml: 2,
                                                    }}
                                                >
                                                    Pembayaran ke penitip
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
                                                        width: "6rem",
                                                    }}
                                                >

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
                                                        width: "6rem",
                                                    }}
                                                >
                                                    {rows.pengeluaran.penitip ? rows.pengeluaran.penitip : 0}
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                        {rows.pengeluaran_lain.map((row) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    tabIndex={-1}
                                                    key={row.id_pengeluaran_lain}
                                                >
                                                    <TableCell scope="row" padding="none" >
                                                        <Typography
                                                            color="textSecondary"
                                                            variant="subtitle2"
                                                            sx={{
                                                                ml: 2,
                                                            }}
                                                        >
                                                            {row.nama_pengeluaran}
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
                                                                width: "6rem",
                                                            }}
                                                        >

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
                                                                width: "6rem",
                                                            }}
                                                        >
                                                            {row.nominal_pengeluaran}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <>
                                    </>
                                )
                            }

                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box >
    );
}
