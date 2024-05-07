import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

const LoadingAnimation = () => {
    const containerStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    };
  
    return (
      <div style={containerStyle}>
        <CircularProgress color='secondary' size={50} thickness={6} />
        <Typography variant='h6' mt={2} color='#2b2e3a'>
          Loading...
        </Typography>
      </div>
    );
  };
  
  export default LoadingAnimation;
