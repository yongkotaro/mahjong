import './App.css';
import { Home, Highlights, Header, Footer, MoreSection } from './containers';

const App = () => {

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
