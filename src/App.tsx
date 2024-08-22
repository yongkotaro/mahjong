import React from 'react';
import './App.css';
import { Home, Highlights, Terms, Header, Footer } from './containers';


const App: React.FC = () => {

  return (
    <div className="App">
      <Header />
      <Highlights />
      <Home />
      <Terms />
      <Footer />
    </div>
  );
}

export default App;
