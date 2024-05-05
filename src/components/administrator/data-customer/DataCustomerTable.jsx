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
    TableHead,
    InputAdornment,
    TableSortLabel,
    
  } from "@mui/material";
import { useState, useEffect } from "react";
import { IconSearch } from "@tabler/icons-react";
import CustomSwitch from "../../shared/CustomSwitch";

import {
    getComparator,
    stableSort,
} from "@/components/shared/search-table/SearchTableFunction";
import { useRouter } from "next/navigation";
import { searchDataCustomer } from "@/services/data-customer/dataCustomer";
import CustomCheckbox from "../../shared/CustomCheckbox";
import { visuallyHidden } from "@mui/utils";

export const DataCustomerSearchTable = ({data, headCells, handleSelectedId}) => {
    const router = useRouter();
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("id_user");
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rows, setRows] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [thisData, setThisData] = useState(data);
    const [search, setSearch] = useState('');


    useEffect(() => {
        setRows(data);
    },[data]);

    useEffect(() => {
        setRows(thisData);
    },[thisData]);

    function handleSearch(query){
        const fetchData = async () => {
            const response = await searchDataCustomer(query);
            console.log(response.data);
            setThisData(response.data);
        };
        setPage(0);
        setSelected([]);
        fetchData();
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(search);
        }
    };

    const handleClick = (event, id) => {
        if(selected.includes(id)){
            setSelected([]);
            handleSelectedId(-1);
        }else{
            let newSelected = [id];
            setSelected(newSelected);
            handleSelectedId(newSelected);
        }
    };

    const handleRequestSort = (event, property) => {
        console.log(orderBy);
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

        const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
    
    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    return (
        <Box>
            <Box sx={{ flex: "1 1 100%", ml:2}}>
                <TextField
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <IconSearch size="1.1rem" />
                        </InputAdornment>
                    ),
                    }}
                    placeholder="Search Customer"
                    size="small"
                    onChange={(event) => handleChangeSearch(event)}
                    onKeyDown={(event)=> handleKeyDown(event)}
                    value={search}
                    sx={{mr: "0.2rem"}}
                />
            </Box>
            <Paper variant="outlined" sx={{mx:2, mt:1}}>
            <TableContainer>
                <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={dense ? "small" : "medium"}
                >
                    <TableHead> 
                        <TableRow>
                            <TableCell padding="checkbox">
                            </TableCell>
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
                                const isItemSelected = isSelected(row.id_user);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id_user)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id_user}
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
                                            {row.nama
                                                .charAt(0)
                                                .toUpperCase() + row.nama.slice(1)}
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
