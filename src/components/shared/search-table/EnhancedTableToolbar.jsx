import {
  Box,
  Toolbar,
  IconButton,
  Tooltip,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Modal,
  Menu,
  MenuItem,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import {
  IconPlus,
  IconSearch,
  IconTrash,
  IconCheckbox,
  IconFilter,
} from "@tabler/icons-react";
import CustomBoxModal from "../CustomBoxModalConfirm";
import { useState } from "react";

export default function EnhancedTableToolbar(props) {
  const {
    numSelected,
    handleSearch,
    search,
    indexSelected,
    deleteAction,
    setSelected,
    addAction,
    open,
    handleOpen,
    useFilter,
    filter,
    setFilter,
    handleUpdate,
  } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const isFilter = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleDelete() {
    await deleteAction(indexSelected);
    setSelected([]);
    handleOpen(!open);
  }

  async function handleAktif() {
    await handleUpdate(indexSelected);
    setSelected([]);
    handleOpen(!open);
  }

  return (
    <Toolbar
      sx={{
        borderRadius: 1,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {/* Search input / selected item */}
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle2"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Box sx={{ flex: "1 1 100%" }}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size="1.1rem" />
                </InputAdornment>
              ),
            }}
            placeholder="Search Product"
            size="small"
            onChange={handleSearch}
            value={search}
          />
        </Box>
      )}

      {/* Filter icon / delete icon */}
      {numSelected > 0 ? (
        filter === 1 || filter === undefined ? (
          <Tooltip title="Hapus data">
            <IconButton disableRipple onClick={handleOpen}>
              <IconTrash width="18" className="text-red-400" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Aktifkan data">
            <IconButton disableRipple onClick={handleOpen}>
              <IconCheckbox width="18" className="text-red-400" />
            </IconButton>
          </Tooltip>
        )
      ) : (
        <>
          {useFilter && (
            <>
              <Tooltip title="Filter data" sx={{ marginRight: "1rem" }}>
                <IconButton
                  disableRipple
                  id="basic-button"
                  aria-controls={isFilter ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={isFilter ? "true" : undefined}
                  onClick={handleClick}
                >
                  <IconFilter width="18" />
                </IconButton>
              </Tooltip>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={isFilter}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setFilter(1);
                    handleClose();
                  }}
                >
                  Aktif
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setFilter(0);
                    handleClose();
                  }}
                >
                  Tidak Aktif
                </MenuItem>
              </Menu>
            </>
          )}

          <Tooltip title="Tambah data">
            <Button onClick={addAction}>
              <IconPlus width="18" /> Tambah
            </Button>
          </Tooltip>
        </>
      )}
      <Modal open={open} onClose={handleOpen}>
        <div>
          <CustomBoxModal
            title={
              filter === 1 || filter === undefined
                ? "Hapus Data"
                : "Aktifkan Data"
            }
            description={
              filter === 1 || filter === undefined
                ? "Yakin menghapus data ini?"
                : "Yakin mengaktifkan data ini?"
            }
            footer={
              <Button
                color={filter === 1 || filter === undefined ? "error" : "info"}
                size="small"
                sx={{ mt: 2 }}
                onClick={
                  filter === 1 || filter === undefined
                    ? handleDelete
                    : handleAktif
                }
              >
                {filter === 1 || filter === undefined ? "Hapus" : "Aktifkan"}
              </Button>
            }
          />
        </div>
      </Modal>
    </Toolbar>
  );
}
