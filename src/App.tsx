//import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post" element={<Post />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
