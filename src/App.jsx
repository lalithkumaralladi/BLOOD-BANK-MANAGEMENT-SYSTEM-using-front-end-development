import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { auth } from './config/firebase';
import { onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth';
import { useTheme } from './contexts/ThemeContext';
import Dashboard from './components/Dashboard';
import MapView from './components/MapView';
import Profile from './components/Profile';
import Auth from './components/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import AIHub from './components/AIHub';
import AIChatbot from './components/AIChatbot';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    // Force user to login every time they open/refresh the app
    const initAuth = async () => {
      try {
        // Sign out any existing session
        await auth.signOut();
        // Clear any stored auth data
        localStorage.clear();
        sessionStorage.clear();
      } catch (error) {
        console.log('Clearing auth:', error);
      }
      setUser(null);
      setLoading(false);
    };

    initAuth();

    // Set up auth state listener
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Routes>
        <Route
          path="/auth"
          element={
            !user ? (
              <Auth />
            ) : (
              <Navigate to="/dashboard" state={{ from: location }} replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MapView user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-hub"
          element={
            <ProtectedRoute>
              <AIHub user={user} />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/" 
          element={
            !user ? (
              <Navigate to="/auth" state={{ from: location }} replace />
            ) : (
              <Navigate to="/dashboard" state={{ from: location }} replace />
            )
          } 
        />
        <Route 
          path="*" 
          element={
            <Navigate to={user ? "/dashboard" : "/auth"} replace />
          } 
        />
      </Routes>
      
      {/* AI Chatbot - Available on all protected routes */}
      {user && <AIChatbot />}
    </div>
  );
}

export default App;
