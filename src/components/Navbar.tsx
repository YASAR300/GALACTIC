import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, AlertTriangle, Moon, Sun } from 'lucide-react';
import { useTheme } from '../theme/ThemeProvider';

interface NavbarProps {
  isRebellionMode: boolean;
  onToggleRebellion: () => void;
}

function Navbar({ isRebellionMode, onToggleRebellion }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏛️' },
    { path: '/catalog', label: 'Permit Catalog', icon: '📋' },
    { path: '/application', label: 'Apply', icon: '📝' },
    { path: '/status', label: 'Status', icon: '⏳' },
    { path: '/profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/70 dark:bg-gray-900/90 backdrop-blur border-b border-white/10 z-50">
      <div className="container-page">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-xl font-orbitron font-bold hover-glow"
          >
            <span className="text-3xl">🌌</span>
            <span className="text-brand-500 dark:text-cyan-400">Galactic</span>
            <span className="text-purple-500 dark:text-purple-400">Bureau</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-300 hover-lift ${
                  location.pathname === item.path
                    ? 'bg-brand-500/10 text-brand-700 dark:text-cyan-300 border border-brand-500/20'
                    : 'text-gray-700 dark:text-gray-300 hover:text-brand-700 dark:hover:text-cyan-400 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-space-mono">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Rebellion Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleRebellion}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full border transition-all duration-300 hover-lift ${
                isRebellionMode
                  ? 'border-red-500 bg-red-50 text-red-600 dark:bg-red-900/40 dark:text-red-200'
                  : 'border-brand-500 bg-white/60 text-brand-700 dark:bg-gray-800/60 dark:text-cyan-400'
              }`}
            >
              {isRebellionMode ? (
                <>
                  <AlertTriangle size={18} />
                  <span className="hidden sm:inline">Rebellion</span>
                </>
              ) : (
                <>
                  <Zap size={18} />
                  <span className="hidden sm:inline">Rebel</span>
                </>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg border border-white/10 bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5 transition"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-brand-700 dark:text-cyan-400 hover:text-brand-600 dark:hover:text-cyan-300 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-brand-500/10 text-brand-700 dark:text-cyan-300 border border-brand-500/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-brand-700 dark:hover:text-cyan-400 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span className="font-space-mono">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;