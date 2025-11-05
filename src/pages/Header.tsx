import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal, User, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('r-pager-auth');
    window.location.reload();
  };

  const navItems = [
    { path: '/', label: 'DASHBOARD' },
    { path: '/flashcards', label: 'FLASHCARDS' },
    { path: '/cases', label: 'CASES' },
    { path: '/pdf', label: 'PDF' },
    { path: '/calendar', label: 'CALENDAR' },
    { path: '/stats', label: 'STATS' },
    { path: '/mood', label: 'MOOD' },
    { path: '/journal', label: 'JOURNAL' },
    { path: '/games', label: 'GAMES' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-black border-b border-secondary font-terminal">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-foreground hover:text-accent transition-colors">
            <Terminal className="w-6 h-6" />
            <span className="font-pixel text-lg">PAGE-R</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm hover:text-accent transition-colors ${
                  location.pathname === item.path 
                    ? 'text-accent border-b border-accent' 
                    : 'text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 text-foreground hover:text-accent transition-colors"
            >
              <User className="w-5 h-5" />
              <span className="hidden md:inline">DR. ROSHINI KESAVAN</span>
            </button>

            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-black border border-secondary shadow-lg"
              >
                <div className="p-4 border-b border-secondary">
                  <p className="text-sm text-foreground">Dr. Roshini Kesavan</p>
                  <p className="text-xs opacity-75">Neural Access: GRANTED</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-2 p-3 text-destructive hover:bg-destructive hover:bg-opacity-10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>LOGOUT</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden border-t border-secondary py-2">
          <div className="flex flex-wrap gap-2">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xs px-2 py-1 border hover:text-accent transition-colors ${
                  location.pathname === item.path 
                    ? 'text-accent border-accent' 
                    : 'text-foreground border-secondary'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;