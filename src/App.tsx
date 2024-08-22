import React from 'react';
import './App.css';
import { Home, Features, Terms, Header, Footer } from './containers';


const App: React.FC = () => {

  return (
    <div className="App">
      <Header />
      <Home />
      <Terms />
      <Footer />
    </div>
  );
}

export default App;
