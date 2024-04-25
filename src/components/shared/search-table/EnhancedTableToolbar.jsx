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
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { IconPlus, IconSearch, IconTrash } from "@tabler/icons-react";
import CustomBoxModal from "../CustomBoxModalConfirm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
};

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
  } = props;

  async function handleDelete() {
    await deleteAction(indexSelected);
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
        <Tooltip title="Hapus data">
          <IconButton onClick={handleOpen}>
            <IconTrash width="18" className="text-red-400" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Tambah data">
          <Button onClick={addAction}>
            <IconPlus width="18" /> Tambah
          </Button>
        </Tooltip>
      )}
      <Modal open={open} onClose={handleOpen}>
        <CustomBoxModal
          title="Hapus Pembelian Bahan Baku"
          description="Data yang dihapus tidak dapat dikembalikan!"
          footer={
            <Button
              color="error"
              size="small"
              sx={{ mt: 2 }}
              onClick={handleDelete}
            >
              Hapus
            </Button>
          }
        />
      </Modal>
    </Toolbar>
  );
}
