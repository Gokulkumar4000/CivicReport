import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/tokens.css';
import './styles.css';
import './components.css';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Feed from './pages/Feed';
import ReportIncident from './pages/ReportIncident';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import AllReports from './pages/AllReports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/report" element={<ReportIncident />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/all-reports" element={<AllReports />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
