import React from 'react';
import './App.css';
import Keyboard from './components/Keyboard';

const App: React.FC = () => {
  return (
    <div className="App">
      <span className="heading">TileWaiter</span>
      <Keyboard />
    </div>
  );
}

export default App;
