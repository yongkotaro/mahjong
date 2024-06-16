import React from 'react';
import './App.css';
import ClickableTile from './components/ClickableTile';
import baiban from './img/honors/bei.png';

const App: React.FC = () => {

  return (
    <div className="App">
      <span className="heading">TileWaiter</span>
      <ClickableTile
        src= {baiban}
        style= {{width: '50px', height: '50px' }}
      />
    </div>
  );
}

export default App;
