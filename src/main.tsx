import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import App from '@pages/App';
import { defaultTheme } from '@theme/defaultTheme';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { registerSW } from 'virtual:pwa-register';

import { GithubProvider } from './store/GithubContext';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider theme={defaultTheme}>
      <GithubProvider>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </GithubProvider>
    </ThemeProvider>
  </StrictMode>,
);
