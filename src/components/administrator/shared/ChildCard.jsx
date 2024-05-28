import React from 'react';
import { Card, CardHeader, CardContent, Divider } from '@mui/material';

const ChildCard = ({ title, children }) => (
  <Card sx={{ padding: 0 }} variant="outlined">
    {title ? (
      <>
        <CardHeader title={title} />
        <Divider />{' '}
      </>
    ) : (
      ''
    )}

    <CardContent>{children}</CardContent>
  </Card>
);

export default ChildCard;
