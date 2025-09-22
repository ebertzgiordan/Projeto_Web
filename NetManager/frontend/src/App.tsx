import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
// import SiteDetailPage from './pages/SiteDetailPage'; // COMENTADO POR ENQUANTO
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          {/* <Route path="/site/:id" element={<SiteDetailPage />} /> COMENTADO POR ENQUANTO */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;