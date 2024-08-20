import React from 'react';
import './App.css';
import { Home, Links, About, Terms, Header, Footer } from './containers';


const App: React.FC = () => {

  return (
    <div className="App">
      <Header />
      <About />
      <Home />
      <Links />
      <Terms />
      <Footer />
    </div>
  );
}

export default App;
