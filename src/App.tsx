import React from 'react';
import './App.css';
import { Home, Highlights, Terms, Header, Footer } from './containers';
import { createTheme, StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Divider, Chip } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a202c',
    },
  },
});

const App: React.FC = () => {

  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Header />
          <Highlights />
          <Home />
          <Terms />
          <Footer />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
