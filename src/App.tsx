import React from 'react';
import './App.css';
import { Home, Highlights, Header, Footer, MoreSection } from './containers';
import { createTheme, StyledEngineProvider, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a202c',
    },
  },

  typography: {
    fontFamily: 'Poppins',
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
          <MoreSection />
          <Footer />
        </ThemeProvider>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
