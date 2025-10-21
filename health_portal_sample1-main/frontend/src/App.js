import React, { useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, AppBar, Toolbar, Typography, Container, Switch, Box, Button } from '@mui/material';
import { Brightness4, Brightness7, Home, Analytics } from '@mui/icons-material';
import LandingPage from './components/LandingPage';
import SymptomForm from './components/SymptomForm';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#64b5f6' : '#1976d2',
        light: isDarkMode ? '#90caf9' : '#42a5f5',
        dark: isDarkMode ? '#1976d2' : '#1565c0'
      },
      secondary: {
        main: isDarkMode ? '#f48fb1' : '#dc004e',
        light: isDarkMode ? '#f8bbd9' : '#ff5983',
        dark: isDarkMode ? '#c2185b' : '#9a0036'
      },
      background: {
        default: isDarkMode ? '#0a0e1a' : '#f8fafc',
        paper: isDarkMode ? '#1a1f35' : '#ffffff'
      },
      text: {
        primary: isDarkMode ? '#e3f2fd' : '#1a202c',
        secondary: isDarkMode ? '#b0bec5' : '#4a5568'
      }
    },
    shape: { borderRadius: 16 },
    typography: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      h1: { fontWeight: 800, fontSize: '3.5rem' },
      h2: { fontWeight: 700, fontSize: '2.5rem' },
      h3: { fontWeight: 600, fontSize: '2rem' },
      h4: { fontWeight: 600, fontSize: '1.5rem' },
      h5: { fontWeight: 600, fontSize: '1.25rem' },
      h6: { fontWeight: 600, fontSize: '1.125rem' }
    },
    components: {
      MuiButton: {
        defaultProps: { size: 'large' },
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 12,
            padding: '12px 24px'
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: isDarkMode
              ? '0 8px 32px rgba(0,0,0,0.3)'
              : '0 8px 32px rgba(0,0,0,0.1)'
          }
        }
      }
    }
  }), [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <AppBar
          position="sticky"
          color="transparent"
          enableColorOnDark
          elevation={0}
          sx={{
            backdropFilter: 'blur(20px)',
            borderBottom: 1,
            borderColor: 'divider',
            background: isDarkMode
              ? 'rgba(26, 31, 53, 0.8)'
              : 'rgba(255, 255, 255, 0.8)'
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Analytics sx={{ color: 'primary.main' }} />
              Health Portal
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button href="/" startIcon={<Home />} color="inherit">
                Home
              </Button>
              <Button href="/predict" color="inherit">
                Predict
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                <Brightness4 sx={{ fontSize: 20 }} />
                <Switch
                  checked={isDarkMode}
                  onChange={(e) => setIsDarkMode(e.target.checked)}
                  inputProps={{ 'aria-label': 'toggle dark mode' }}
                />
                <Brightness7 sx={{ fontSize: 20 }} />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/predict" element={
            <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
              <SymptomForm />
            </Container>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;