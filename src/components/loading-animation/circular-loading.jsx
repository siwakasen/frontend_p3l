import React from 'react';
import { CircularProgress } from '@mui/material';

const LoadingAnimation = () => {
    const containerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    };
  
    return (
      <div style={containerStyle}>
        <CircularProgress color='secondary' size={100} thickness={4} />
      </div>
    );
  };
  
  export default LoadingAnimation;
