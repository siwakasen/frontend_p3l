import React from "react";
import { Card, CardHeader, CardContent, Divider, Box } from "@mui/material";

const FormCard = ({ title, children, footer }) => {
  return (
    <Card sx={{ padding: 0 }} variant="outlined">
      <CardHeader title={title} />
      <Divider />

      <CardContent>{children}</CardContent>
      {footer ? (
        <>
          <Divider />
          <Box p={3}>{footer}</Box>
        </>
      ) : (
        ""
      )}
    </Card>
  );
};

export default FormCard;
