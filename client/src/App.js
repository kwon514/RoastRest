import { Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { Login, Signup, Landing, Dashboard, Bin, Account } from './pages';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

const theme = createTheme({
  palette: {
    primary: {
      main: '#896345',
    },
    secondary: {
      main: '#f0eee7',
    },
  },
  typography: {
    fontFamily: ['Poppins', 'serif'].join(','),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },
  components: {
    MuiFab: {
      styleOverrides: {
        root: {
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bin" element={<Bin />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
