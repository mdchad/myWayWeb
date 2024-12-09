'use client'

import React, { useEffect, useRef, useState } from 'react';

const A4PageContainer = ({ children, currentPage, elementId }) => {
  const a4Width = 794;
  const a4Height = 1123;

  const containerStyle = {
    width: `${a4Width}px`,
    height: `${a4Height}px`,
    margin: '0 auto',
    padding: '20px 40px 40px',
    backgroundColor: 'white',
    fontFamily: 'Arial, sans-serif',
    fontSize: '12px',
    lineHeight: '1.5',
    position: 'relative',
    border: '1px solid black',
    boxSizing: 'border-box',
  };

  return (
    <div style={containerStyle}>
      {children}
    </div>
  );
};

export default A4PageContainer;