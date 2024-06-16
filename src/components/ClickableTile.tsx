import React from 'react';

interface ClickablePngProps {
  src: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

const ClickablePng: React.FC<ClickablePngProps> = ({ src, onClick, style }) => {
  return (
    <img
      src={src}
      onClick={onClick}
      style={{ cursor: 'pointer', ...style }}
    />
  );
};

export default ClickablePng;
