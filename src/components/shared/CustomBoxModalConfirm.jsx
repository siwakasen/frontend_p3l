import React from "react";
import { Typography, CardContent, Divider, Box } from "@mui/material";

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

const CustomBoxModal = ({ title, children, description, footer }) => {
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        {title}
      </Typography>
      <Divider sx={{ mt: 2 }} />
      {children ? (
        children
      ) : (
        <Typography
          id="modal-modal-description"
          variant="subtitle2"
          sx={{ my: 1 }}
        >
          {description}
        </Typography>
      )}

      {footer}
    </Box>
  );
};

export default CustomBoxModal;
