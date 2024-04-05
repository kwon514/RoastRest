import { Route, Routes } from 'react-router-dom';
import { Login, Signup, Landing, Dashboard } from './pages';
import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
