import React from 'react';
import './App.css';
import ClickableTile from './components/ClickableTile';
import baiban from './img/honors/bb.png';

const App: React.FC = () => {
  const handleClick = () => {
    alert('Image clicked!');
  };

  return (
    <div className="App">
      <span className="heading">TileWaiter</span>
      <ClickableTile
        src= {baiban}
        onClick={handleClick}
        style={{ width: '100px', height: '100px' }}
      />
    </div>
  );
}

export default App;
