// material
import { TextField, InputAdornment } from "@mui/material";
import { IconSearch } from "@tabler/icons-react";

// ----------------------------------------------------------------------
export default function ProductSearch({ handleSearch }) {
  return (
    <>
      {/* ------------------------------------------- */}
      {/* Sort Button */}
      {/* ------------------------------------------- */}
      <TextField
        id="outlined-search"
        placeholder="Search Product"
        size="small"
        type="search"
        onChange={handleSearch}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconSearch size="14" />
            </InputAdornment>
          ),
        }}
        fullWidth
      />
    </>
  );
}
