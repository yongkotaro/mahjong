import React from 'react';
import ClickableTile from './ClickableTile';
import './../components-styling/PlaceholderRow.css';

interface PlaceholderRowProps {
  images: string[];
}

const PlaceholderRow: React.FC<PlaceholderRowProps> = ({ images }) => {
  return (
    <div className="placeholder-row">
      {images.map((image, index) => (
        <ClickableTile
          key={index} // Adding a key prop with a unique value
          src={image}
          style={{ width: '50px', height: '50px' }}
        />
      ))}
    </div>
  );
};

export default PlaceholderRow;
