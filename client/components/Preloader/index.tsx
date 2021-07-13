import React from 'react';
import { CircularProgress } from '@material-ui/core';

const PreLoader = () => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress />
  </div>
);

export default PreLoader;
