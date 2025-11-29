import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/global.css';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import HomePage from './pages/HomePage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import Applications from './pages/Applications.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
