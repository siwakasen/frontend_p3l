import * as React from 'react';
import { format } from 'date-fns';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  IconButton,
  Tooltip,
  FormControlLabel,
  Typography,
  Avatar,
  TextField,
  InputAdornment,
  Paper,
  Button,
} from '@mui/material';

import { visuallyHidden } from '@mui/utils';

import CustomSwitch from '../forms/CustomSwitch';
import { IconSearch, IconEdit, IconTrash } from '@tabler/icons-react';
import { getAllResepData } from '@/services/resep/resep';
import Link from 'next/link';
import { useDelete } from './useResep';
import ResponsiveDialog from '../shared/ResponsiveDialog';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'number',
    numeric: false,
    disablePadding: false,
    label: 'No',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nama Resep',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Tanggal Dibuat',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Aksi',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  const { handleSearch, search } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 1 },
        pr: { xs: 1, sm: 1 },
        display: { xs: 'block', sm: 'flex' },
      }}
    >
      <Box sx={{ flex: '1 1 100%' }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch size="1.1rem" />
              </InputAdornment>
            ),
          }}
          placeholder="Cari Resep"
          size="small"
          onChange={handleSearch}
          value={search}
          sx={{ width: { xs: '100%', sm: 'auto' }}}
        />
      </Box>
      <Box sx={{ flex: '0 0 auto' }}>
        <Button variant="contained" size="medium" component={Link} href="/administrator/resep/add" sx={{
            mt: { xs: 1, sm: 0 },
            width: { xs: '100%', sm: 'auto' },
          }}>
          Tambah Resep
        </Button>
      </Box>
    </Toolbar>
  );
};

const RecipesTableList = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('nama_resep');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [getResep, setGetResep] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState('');
  const { handleDelete } = useDelete();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getAllResepData();
      setGetResep(response.data);
    };
    fetchData();
  }, []);

  const [rows, setRows] = React.useState(getResep);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    setRows(getResep);
  }, [getResep]);

  const handleSearch = (event) => {
    const filteredRows = getResep.filter((row) => {
      return row.nama_resep.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setPage(0);
    setSearch(event.target.value);
    setRows(filteredRows);
  };

  // This is for the sorting
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <Box>
        <Box>
          <EnhancedTableToolbar
            search={search}
            handleSearch={(event) => handleSearch(event)}
          />
          <Paper variant="outlined" sx={{ mx: 2, mt: 1 }}>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row.id_resep}
                        >
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Typography>{rowsPerPage * page + index + 1}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Box>
                                <Typography variant="h6" fontWeight="600">
                                  {row.nama_resep}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography>{new Date(row.created_at).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}</Typography>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Tooltip title="Ubah">
                                <IconButton size="small" component={Link} href={`/administrator/resep/edit/${row.id_resep}`}>
                                  <IconEdit size="1.25rem" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Hapus">
                                <IconButton size="small" onClick={() => {
                                  setSelectedId(row.id_resep);
                                  setOpen(true);
                                }}>
                                  <IconTrash size="1.25rem" />
                                </IconButton>
                              </Tooltip>
                            </Box>
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
              control={<CustomSwitch checked={dense} onChange={handleChangeDense} />}
              label="Dense padding"
            />
          </Box>
        </Box>
      </Box>
      <ResponsiveDialog
        open={{ open, setOpen }}
        title="Hapus Data"
        content="Apakah Anda yakin ingin menghapus data ini?"
        action={{
          text: 'Hapus',
          refreshData: () => {
            const fetchData = async () => {
              const response = await getAllResepData();
              setGetResep(response.data);
            };
            fetchData();
            if (getResep.length % rowsPerPage === 1 && page !== 0) {
              setPage(page - 1);
            }
          },
          onClick: () => handleDelete(selectedId),
          props: { color: 'primary' },
        }}
      />
    </>
  );
};

export default RecipesTableList;
