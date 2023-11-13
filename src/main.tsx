import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import App from '@pages/App';
import { defaultTheme } from '@theme/defaultTheme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
