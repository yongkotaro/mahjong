import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import GuestPage from './pages/GuestPage';
import TermsPage from './pages/Terms';
import { Home, Highlights, Header, Footer } from './containers';

const MainApp = () => (
  <div className="App">
    <Header />
    <Highlights />
    <Home />
    <Footer />
  </div>
);

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/guest" element={<GuestPage />} />
      <Route
        path="/"
        element={user ? <MainApp /> : <Navigate to="/guest" />}
      />
    </Routes>
  );
}

export default App;
