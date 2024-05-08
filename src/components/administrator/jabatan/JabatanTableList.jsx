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
import { useInsert, useUpdate, useDelete, useUpdateSalary } from './useJabatan';
import { getAllRoleData } from '@/services/administrator/role/role';
import ResponsiveDialog from '../shared/ResponsiveDialog';
import CustomFormLabel from '../forms/CustomFormLabel';
import CustomTextField from '../forms/CustomTextField';
import Toast from '@/components/shared/Toast';
import Cookies from 'js-cookie';
import { checkToken } from '@/services/auth/auth';

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
    label: 'Nama Jabatan',
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
  const { handleSearch, search, setCreateModal, setTempData, roleCheck } = props;

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
          placeholder="Cari Jabatan"
          size="small"
          onChange={handleSearch}
          value={search}
          sx={{width: { xs: '100%', sm: 'auto'}}}
        />
      </Box>
      { roleCheck !== 'Owner' && (
        <Box sx={{ flex: '0 0 auto' }}>
          <Button variant="contained" size="medium" sx={{
              mt: { xs: 1, sm: 0 },
              width: { xs: '100%', sm: 'auto' },
            }}
            onClick={() => {
              setCreateModal(true);
              setTempData({});
            }}
          >
            Tambah Jabatan
          </Button>
        </Box>
      )}
    </Toolbar>
  );
};

const RolesTableList = () => {
  const { toastSuccess, toastError } = Toast();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('nama_role');
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [getJabatan, setGetJabatan] = React.useState([]);

  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState('');
  const [createModal, setCreateModal] = React.useState(false);
  const [updateModal, setUpdateModal] = React.useState(false);
  const [tempData, setTempData] = React.useState({});
  const [updateSalaryModal, setUpdateSalaryModal] = React.useState(false);
  const [tempSalaryData, setTempSalaryData] = React.useState({});

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

  const { handleInsert } = useInsert();
  const { handleUpdate } = useUpdate();
  const { handleDelete } = useDelete();
  const { handleUpdateSalary } = useUpdateSalary();

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await getAllRoleData();
      setGetJabatan(response.data.filter((item) => item.nama_role !== 'Owner'))
    };
    fetchData();
  }, []);

  const [rows, setRows] = React.useState(getJabatan);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    setRows(getJabatan);
  }, [getJabatan]);

  const handleSearch = (event) => {
    const filteredRows = getJabatan.filter((row) => {
      return row.nama_role.toLowerCase().includes(event.target.value.toLowerCase());
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
            setCreateModal={setCreateModal}
            setTempData={setTempData}
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
                          key={row.id_role}
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
                                  {row.nama_role}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              { roleCheck !== 'Owner' ? (
                              <Tooltip title="Ubah">
                                <IconButton size="small" onClick={() => {
                                  setSelectedId(row.id_role);
                                  setTempData(row);
                                  setUpdateModal(true);
                                }}>
                                  <IconEdit size="1.25rem" />
                                </IconButton>
                              </Tooltip>
                              ) : (
                                <Tooltip title="Ubah Gaji">
                                  <IconButton size="small" onClick={() => {
                                    setSelectedId(row.id_role);
                                    setTempSalaryData({ nominal_gaji: row.nominal_gaji });
                                    setUpdateSalaryModal(true);
                                  }}>
                                    <IconEdit size="1.25rem" />
                                  </IconButton>
                                </Tooltip>
                              )}
                              { roleCheck !== 'Owner' && (
                                <Tooltip title="Hapus">
                                  <IconButton size="small" onClick={() => {
                                    setSelectedId(row.id_role);
                                    setOpen(true);
                                  }}>
                                    <IconTrash size="1.25rem" />
                                  </IconButton>
                                </Tooltip>
                              )}
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
      
      {/* create Modal */}
      <ResponsiveDialog
        open={{ open: createModal, setOpen: setCreateModal }}
        type="cu"
        title="Tambah Data"
        content={
          <>
              <CustomFormLabel htmlFor="nama_role">
                Nama Jabatan
              </CustomFormLabel>
              <CustomTextField
                id="nama_role"
                name="nama_role"
                type="text"
                placeholder="Masukkan Nama Jabatan"
                value={tempData.nama_role || ''}
                onChange={(event) => {
                  setTempData({ ...tempData, nama_role: event.target.value });
                }}
                sx={{ mb: 2, width: '100%' }}
                required
              />
          </>
        }
        action={{
          text: "Tambah Data",
          refreshData: () => {
            const fetchData = async () => {
              const response = await getAllRoleData();
              setGetJabatan(response.data.filter((item) => item.nama_role !== 'Owner'));
            };
            fetchData();
          },
          onClick: () => {
            if (tempData.nama_role) {
              handleInsert(tempData);
              setTempData({});
            } else {
              toastError('Nama Jabatan harus diisi');
            }
          },
          props: { color: 'primary', disabled: !tempData.nama_role },
        }}
      />

      {/* update Modal */}
      <ResponsiveDialog
        open={{ open: updateModal, setOpen: setUpdateModal }}
        type="cu"
        title="Ubah Data"
        content={
          <>
              <CustomFormLabel htmlFor="nama_role">
                Nama Jabatan
              </CustomFormLabel>
              <CustomTextField
                id="nama_role"
                name="nama_role"
                type="text"
                placeholder="Masukkan Nama Jabatan"
                value={tempData.nama_role || ''}
                onChange={(event) => {
                  setTempData({ ...tempData, nama_role: event.target.value });
                }}
                sx={{ mb: 2, width: '100%' }}
                required
              />
          </>
        }
        action={{
          text: "Ubah Data",
          refreshData: () => {
            const fetchData = async () => {
              const response = await getAllRoleData();
              setGetJabatan(response.data);
            };
            fetchData();
          },
          onClick: () => {
            handleUpdate(selectedId, tempData);
            setTempData({});
          },
          props: { color: 'primary', disabled: !tempData.nama_role },
        }}
      />

      {/* update salary Modal */}
      <ResponsiveDialog
        open={{ open: updateSalaryModal, setOpen: setUpdateSalaryModal }}
        type="cu"
        title="Ubah Gaji"
        content={
          <>
              <CustomFormLabel htmlFor="nominal_gaji">
                Nominal Gaji
              </CustomFormLabel>
              <CustomTextField
                id="nominal_gaji"
                name="nominal_gaji"
                type="number"
                placeholder="Masukkan Nominal Gaji"
                value={tempSalaryData.nominal_gaji || ''}
                onChange={(event) => {
                  setTempSalaryData({ ...tempSalaryData, nominal_gaji: event.target.value });
                }}
                sx={{ mb: 2, width: '100%' }}
                required
              />
          </>
        }
        action={{
          text: "Ubah Gaji",
          refreshData: () => {
            const fetchData = async () => {
              const response = await getAllRoleData();
              setGetJabatan(response.data.filter((item) => item.nama_role !== 'Owner'));
            };
            fetchData();
          },
          onClick: () => {
            handleUpdateSalary(selectedId, tempSalaryData.nominal_gaji);
            setTempSalaryData({});
          },
          props: { color: 'primary' },
        }}
      />

      {/* delete Modal */}
      <ResponsiveDialog
        open={{ open, setOpen }}
        title="Hapus Data"
        content="Apakah Anda yakin ingin menghapus data ini?"
        action={{
          text: 'Hapus',
          refreshData: () => {
            const fetchData = async () => {
              const response = await getAllRoleData();
              setGetJabatan(response.data.filter((item) => item.nama_role !== 'Owner'));
            };
            fetchData();
            if (getJabatan.length % rowsPerPage === 1 && page !== 0) {
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

export default RolesTableList;
