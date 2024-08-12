import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Home, Links, About } from './pages';


const App: React.FC = () => {

  return (
    <div className="App">
      <Navbar />
      <Home />
      <About />
      <Links />
    </div>

  );
}

export default App;
