import { useState, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { cn } from './lib/utils';
import { useUI } from './context/UIContext';
const LoginPage = lazy(() => import('./components/LoginPage'));
const IntroPage = lazy(() => import('./components/IntroPage'));
const DashboardPage = lazy(() => import('./components/DashboardPage'));
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-ms-light dark:bg-slate-950">
    <div className="relative w-16 h-16">
      <div className="absolute inset-0 rounded-full border-4 border-slate-100 dark:border-slate-800" />
      <div className="absolute inset-0 rounded-full border-4 border-ms-green border-t-transparent animate-spin" />
    </div>
  </div>
);
export default function App() {
  const navigate = useNavigate();
  const { darkMode } = useUI();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuth') === 'true';
  });
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuth', 'true');
    navigate('/dashboard');
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuth');
    navigate('/');
  };
  return (
    <div className={cn("min-h-screen transition-colors duration-300", darkMode ? "bg-slate-950" : "bg-ms-light")}>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<IntroPage onComplete={() => navigate('/login')} />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route path="/dashboard" element={
            isAuthenticated ? <DashboardPage onLogout={handleLogout} /> : <Navigate to="/" />
          } />
        </Routes>
      </Suspense>
    </div>
  );
}
