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
  TextField,
  InputAdornment,
  Paper,
} from '@mui/material';

import { visuallyHidden } from '@mui/utils';
import CustomSwitch from '../forms/CustomSwitch';
import { IconSearch, IconEye, IconX } from '@tabler/icons-react';
import { getPesananData } from '@/services/pembatalan-pesanan/pembatalan-pesanan';
import { useUpdateStatusPesanan } from './useCancelOrder';
import ResponsiveDialog from '../shared/ResponsiveDialog';
import Link from 'next/link';

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
    label: 'Nama Pemesan',
  },
  {
    id: 'method_order',
    numeric: false,
    disablePadding: false,
    label: 'Metode Pemesanan',
  },
  {
    id: 'method_shipping',
    numeric: false,
    disablePadding: false,
    label: 'Metode Pengiriman',
  },
  {
    id: 'status_order',
    numeric: false,
    disablePadding: false,
    label: 'Status Pesanan',
  },
  {
    id: 'date_order',
    numeric: false,
    disablePadding: false,
    label: 'Tanggal Diambil',
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
          placeholder="Cari Pesanan"
          size="small"
          onChange={handleSearch}
          value={search}
          sx={{ width: { xs: '100%', sm: 'auto' }}}
        />
      </Box>
    </Toolbar>
  );
};

const UpdateOrderStatusTableList = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('nama');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [getPesanan, setGetPesanan] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [idPesanan, setIdPesanan] = React.useState('');

  const { handleUpdateStatusPesanan } = useUpdateStatusPesanan();

  const fetchData = async () => {
    const response = await getPesananData();
    setGetPesanan(response.data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const [rows, setRows] = React.useState(getPesanan);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    setRows(getPesanan);
  }, [getPesanan]);

  const handleSearch = (event) => {
    const filteredRows = getPesanan.filter((row) => {
      return (
        row.user.nama.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.metode_pemesanan.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.metode_pengiriman.toLowerCase().includes(event.target.value.toLowerCase()) ||
        row.status_transaksi.toLowerCase().includes(event.target.value.toLowerCase()) ||
        format(new Date(row.tanggal_pesanan), 'dd-MM-yyyy').includes(event.target.value)
      );
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
                          key={row.id_pesanan}
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
                                  {row.user.nama}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Box>
                                <Typography variant="h6" fontWeight="600">
                                  {row.metode_pemesanan}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Box>
                                <Typography variant="h6" fontWeight="600">
                                  {row.metode_pengiriman}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Box>
                                <Typography variant="h6" fontWeight="600">
                                    {row.status_transaksi}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography>{new Date(row.tanggal_diambil).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}</Typography>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Tooltip title="Detail Pesanan">
                                <IconButton size="small" component={Link} href={`/administrator/pesanan-masuk/detail/${row.id_pesanan}`}>
                                  <IconEye size="1.25rem" />
                                </IconButton>
                                <IconButton size="small" onClick={() => {
                                    setOpen(true);
                                    setIdPesanan(row.id_pesanan);
                                    }}>
                                    <IconX size="1.25rem" />
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
        title="Pembatalan Pesanan"
        content="Apakah Anda yakin ingin membatalkan pesanan ini?"
        action={{
          text: 'Konfirmasi',
          refreshData: () => {
            const fetchData = async () => {
              const response = await getPesananData();
              setGetPesanan(response.data);
            };
            fetchData();
          },
          onClick: () => handleUpdateStatusPesanan(idPesanan),
          props: { color: 'primary' },
        }}
      />
    </>
  );
};

export default UpdateOrderStatusTableList;
