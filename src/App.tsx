import './App.css';
import { Home, Highlights, Header, Footer, MoreSection } from './containers';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState } from 'react';

function App() {
  const { user } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return (
      <div className="App">
        {showRegister ? (
          <Register setShowRegister={setShowRegister} />
        ) : (
          <Login setShowRegister={setShowRegister} />
        )}
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <Highlights />
      <Home />
      <MoreSection />
      <Footer />
    </div>
  );
}


export default App;
