import * as React from 'react';
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
  Button,
} from '@mui/material';

import { visuallyHidden } from '@mui/utils';

import CustomSwitch from '../forms/CustomSwitch';
import { IconSearch, IconEdit, IconTrash } from '@tabler/icons-react';
import { getAllKaryawanData } from '@/services/administrator/karyawan/karyawan';
import { useDelete, useBonus } from './useKaryawan';
import Link from 'next/link';
import ResponsiveDialog from '../shared/ResponsiveDialog';
import { checkToken } from '@/services/auth/auth';
import Cookies from 'js-cookie';
import CustomFormLabel from '../forms/CustomFormLabel';
import CustomTextField from '../forms/CustomTextField';

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
    label: 'Nama Karyawan',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'date',
    numeric: false,
    disablePadding: false,
    label: 'Tanggal Masuk',
  },
  {
    id: 'role',
    numeric: false,
    disablePadding: false,
    label: 'Jabatan',
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
  const { handleSearch, search, roleCheck } = props;

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
          placeholder="Cari Karyawan"
          size="small"
          onChange={handleSearch}
          value={search}
          sx={{ width: { xs: '100%', sm: 'auto' }}}
        />
      </Box>
      <Box sx={{ flex: '0 0 auto' }}>
        { roleCheck !== 'Owner' && (
          <Button variant="contained" fullWidth size="medium" component={Link} href="/administrator/karyawan/add" sx={{
            mt: { xs: 1, sm: 0 },
            width: { xs: '100%', sm: 'auto' },
          }}>
            Tambah Karyawan
          </Button>
        )}
      </Box>
    </Toolbar>
  );
};

const RecipesTableList = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('nama_karyawan');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [getKaryawan, setGetKaryawan] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [openUbahBonus, setOpenUbahBonus] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState('');
  const [bonus, setBonus] = React.useState({});

  const token = Cookies.get('token');
  const [roleCheck, setRoleCheck] = React.useState([]);
  
  React.useEffect(() => {
      async function checkAtuhorize() {
        if (!token) return;
        const response = await checkToken(token);
        setRoleCheck(response.data.role);
      }
      checkAtuhorize();
    }, [token]);

  const { handleDelete } = useDelete();
  const { handleUpdateBonus } = useBonus(selectedId);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getAllKaryawanData();
      setGetKaryawan(response.data.filter((item) => item.role.nama_role !== 'Owner'))
    };
    fetchData();
  }, []);

  const [rows, setRows] = React.useState(getKaryawan);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    setRows(getKaryawan);
  }, [getKaryawan]);

  const handleSearch = (event) => {
    const filteredRows = getKaryawan.filter((row) => {
      return row.nama_karyawan.toLowerCase().includes(event.target.value.toLowerCase());
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
            roleCheck={roleCheck}
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
                          key={row.id_karyawan}
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
                                  {row.nama_karyawan}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography>{row.email}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>{row.tanggal_masuk}</Typography>
                          </TableCell>
                          <TableCell>
                            <Typography>{row.role.nama_role}</Typography>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              { row.role.nama_role !== 'Owner' ? (
                                <>
                                    { roleCheck !== 'Owner' ? (
                                      <Tooltip title="Ubah">
                                        <IconButton size="small" component={Link} href={`/administrator/karyawan/edit/${row.id_karyawan}`}>
                                          <IconEdit size="1.25rem" />
                                        </IconButton>
                                      </Tooltip>
                                    ) : (
                                      <Tooltip title="Ubah Bonus">
                                        <IconButton size="small" onClick={() => {
                                          setSelectedId(row.id_karyawan);
                                          setBonus({ bonus_gaji: row.bonus_gaji });
                                          setOpenUbahBonus(true);
                                        }}>
                                          <IconEdit size="1.25rem" />
                                        </IconButton>
                                      </Tooltip>
                                    )}
                                  { roleCheck !== 'Owner' ? (
                                    <Tooltip title="Hapus">
                                      <IconButton size="small" onClick={() => {
                                        setSelectedId(row.id_karyawan);
                                        setOpen(true);
                                      }}>
                                        <IconTrash size="1.25rem" />
                                      </IconButton>
                                    </Tooltip>
                                  ) : null }
                                </>
                              )
                              :
                              <Typography>
                                Akses Ditolak
                              </Typography>
                              }
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
        open={{ open: openUbahBonus, setOpen: setOpenUbahBonus }}
        title="Ubah Bonus Karyawan"
        type="cu"
        content={
          <>
            <CustomFormLabel htmlFor="bonus_gaji" label="Bonus Karyawan" />
            <CustomTextField
              id="bonus_gaji"
              name="bonus_gaji"
              variant="outlined"
              type="number"
              fullWidth
              value={bonus.bonus_gaji}
              onChange={(e) => setBonus({ bonus_gaji: e.target.value })}
              InputProps={{
                startAdornment: <InputAdornment position="start">Rp. </InputAdornment>,
              }}
              sx={{ mb: 2, width: '100%' }}
            />
          </>
        }
        action={{
          text: 'Ubah',
          refreshData: () => {
            const fetchData = async () => {
              const response = await getAllKaryawanData();
              setGetKaryawan(response.data.filter((item) => item.role.nama_role !== 'Owner'));
            };
            fetchData();
          },
          onClick: () => handleUpdateBonus(bonus),
          props: { color: 'primary' },
        }}
      />
      
      <ResponsiveDialog
        open={{ open, setOpen }}
        title="Hapus Data"
        content="Apakah Anda yakin ingin menghapus data ini?"
        action={{
          text: 'Hapus',
          refreshData: () => {
            const fetchData = async () => {
              const response = await getAllKaryawanData();
              setGetKaryawan(response.data.filter((item) => item.role.nama_role !== 'Owner'));
            };
            fetchData();
            if (getKaryawan.length % rowsPerPage === 1 && page !== 0) {
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
