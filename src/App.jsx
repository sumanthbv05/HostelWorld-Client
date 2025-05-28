import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResultsPage from './pages/ResultsPage';
import LandingPage from './pages/LandingPage';
import HostelDetailsPage from './pages/HostelDetailsPage';
import RegisterPage from './pages/Register';
import LoginPage from './pages/login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/hostels/:id" element={<HostelDetailsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
