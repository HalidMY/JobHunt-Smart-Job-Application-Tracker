import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './style/global.css';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
