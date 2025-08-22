import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Application from './pages/Application';
import Status from './pages/Status';
import Profile from './pages/Profile';
import Catalog from './pages/Catalog';
import ErrorPage from './pages/ErrorPage';
import RebellionMode from './pages/RebellionMode';
import Notification from './components/Notification';
import EasterEgg from './components/EasterEgg';
import { getRandomEvent } from './utils/randomEvents';
import { bureaucraticSounds } from './utils/soundEffects';
import './animations.css';
import { FavoritesProvider } from './context/FavoritesContext';
import { CompareProvider } from './context/CompareContext';
import CompareBar from './components/CompareBar';

type NotificationType = 'success' | 'error' | 'warning' | 'rebellion';
interface AppNotification { id: number; message: string; type: NotificationType; }

function isNotificationType(value: string): value is NotificationType {
  return value === 'success' || value === 'error' || value === 'warning' || value === 'rebellion';
}

function App() {
  const [isRebellionMode, setIsRebellionMode] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [bureaucraticEvents, setBureaucraticEvents] = useState<string[]>([]);
  const [userStats, setUserStats] = useState({
    applications: 0,
    rejections: 0,
    timeSpent: 0,
    chatMessages: 0,
    pagesVisited: new Set<string>(),
    rebellionActivated: false
  });

  // Random bureaucratic events ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvent = getRandomEvent();
      setBureaucraticEvents(prev => [...prev, randomEvent].slice(-3));
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Track time spent on site
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      setUserStats(prev => ({
        ...prev,
        timeSpent: Math.floor((Date.now() - startTime) / 1000)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Track page visits
  useEffect(() => {
    const path = window.location.pathname;
    setUserStats(prev => ({
      ...prev,
      pagesVisited: new Set<string>([...prev.pagesVisited, path])
    }));
  }, [window.location.pathname]);

  const addNotification = (message: string, type?: string) => {
    const id = Date.now();
    const safeType: NotificationType = type && isNotificationType(type) ? type : 'error';
    setNotifications(prev => [...prev, { id, message, type: safeType }]);
    
    // Play sound effect
    bureaucraticSounds.notification();
    
    // Auto-remove notification
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const toggleRebellionMode = () => {
    setIsRebellionMode(!isRebellionMode);
    setUserStats(prev => ({ ...prev, rebellionActivated: true }));
    
    if (!isRebellionMode) {
      bureaucraticSounds.rebellionMode();
      addNotification("REBELLION ACTIVATED! Down with the forms!", 'rebellion');
    } else {
      addNotification("Returning to oppressive bureaucracy...", 'warning');
    }
  };

  const handleEasterEgg = () => {
    addNotification("🎮 Secret code activated! You've unlocked... absolutely nothing useful!", 'success');
    // Could add special features here
  };

  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 text-slate-900 dark:text-white ${isRebellionMode ? 'rebellion-mode' : ''}`}>
      <Router>
        <FavoritesProvider>
          <CompareProvider>
            <div className="cosmic-background">
              <Navbar 
                isRebellionMode={isRebellionMode} 
                onToggleRebellion={toggleRebellionMode}
              />
              
              {/* Bureaucratic Event Ticker */}
              <div className="fixed top-16 left-0 right-0 bg-red-100/70 dark:bg-red-900/80 text-center py-1 z-40">
                <div className="scrolling-text text-sm">
                  {bureaucraticEvents.join(" • ")}
                </div>
              </div>

              <main className="pt-20">
                <Routes>
                  <Route path="/" element={<Home addNotification={addNotification} />} />
                  <Route path="/catalog" element={<Catalog addNotification={addNotification} />} />
                  <Route path="/application/:permitId?" element={<Application addNotification={addNotification} />} />
                  <Route path="/status" element={<Status addNotification={addNotification} />} />
                  <Route path="/profile" element={<Profile addNotification={addNotification} />} />
                  <Route path="/rebellion" element={<RebellionMode />} />
                  <Route path="/error" element={<ErrorPage />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </main>

              <Footer />

              {/* Notifications */}
              <div className="fixed top-24 right-4 z-50 space-y-2">
                {notifications.map(notification => (
                  <Notification
                    key={notification.id}
                    message={notification.message}
                    type={notification.type}
                  />
                ))}
              </div>

              {/* Easter Eggs */}
              <EasterEgg onActivate={handleEasterEgg} />

              <CompareBar />

              {/* Stats Display (Hidden, for debugging) */}
              {import.meta.env.DEV && (
                <div className="fixed bottom-4 left-4 bg-gray-900 bg-opacity-80 rounded p-2 text-xs font-space-mono text-gray-400">
                  <div>Time: {Math.floor(userStats.timeSpent / 60)}:{(userStats.timeSpent % 60).toString().padStart(2, '0')}</div>
                  <div>Pages: {userStats.pagesVisited.size}</div>
                  <div>Apps: {userStats.applications}</div>
                </div>
              )}
            </div>
          </CompareProvider>
        </FavoritesProvider>
      </Router>
    </div>
  );
}

export default App;