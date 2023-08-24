import React from 'react';

export default function ProductImageCellView(props) {
  return (
    <img
      style={{
        width: '60px',
        height: '40px',
        objectFit: 'cover',
      }}
      src={`http://localhost:8000/media/${props.cellData.filename}`}
    />
  );
}
