import './App.css';
import { Home, Highlights, Header, Footer, MoreSection } from './containers';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';

const MainApp = () => (
  <div className="App">
    <Header />
    <Highlights />
    <Home />
    <MoreSection />
    <Footer />
  </div>
);

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/guest" element={<MainApp />} />
      <Route
        path="/"
        element={user ? <MainApp /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}


export default App;
