import { Card } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const BlankCard = ({ children, className }) => {
  const customizer = useSelector((state) => state.customizer);
  return (
    <Card
      sx={{ p: 0, position: 'relative' }}
      className={className}
      elevation={customizer.isCardShadow ? 9 : 0}
      variant={!customizer.isCardShadow ? 'outlined' : undefined}
    >
      {children}
    </Card>
  );
};

export default BlankCard;
