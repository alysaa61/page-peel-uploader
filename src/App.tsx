import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isBirthday } from './utils/birthday';
import AccessGate from './pages/AccessGate';
import BirthdayModal from './pages/BirthdayModal';
import Dashboard from './pages/Dashboard';
import FlashcardCore from './pages/FlashcardCore';
import CaseLab from './pages/CaseLab';
import PDFZone from './pages/PDFZone';
import NeurosyncCalendar from './pages/NeurosyncCalendar';
import StudyStats from './pages/StudyStats';
import MoodJournal from './pages/MoodJournal';
import Games from './pages/Games';
import NotFound from './pages/NotFound';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showBirthdayModal, setShowBirthdayModal] = useState(false);

  useEffect(() => {
    // Always require password on app start for privacy
    setIsAuthenticated(false);
    setIsLoading(false);
    
    // Check for birthday
    if (isBirthday()) {
      const today = new Date().toDateString();
      const lastBirthdayShown = localStorage.getItem('r-pager-birthday-shown');
      if (lastBirthdayShown !== today) {
        setTimeout(() => {
          setShowBirthdayModal(true);
          localStorage.setItem('r-pager-birthday-shown', today);
        }, 2000);
      }
    }
  }, []);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-green-400 font-terminal text-xl">
          INITIALIZING R-PAGER...
          <span className="cursor">▊</span>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <div className="min-h-screen bg-black crt-effect">
            <BirthdayModal 
              isOpen={showBirthdayModal} 
              onClose={() => setShowBirthdayModal(false)} 
            />
            <AnimatePresence mode="wait">
              {!isAuthenticated ? (
                <motion.div
                  key="access-gate"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <AccessGate onAuthenticate={handleAuthentication} />
                </motion.div>
              ) : (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/flashcards" element={<FlashcardCore />} />
                    <Route path="/cases" element={<CaseLab />} />
                    <Route path="/pdf" element={<PDFZone />} />
                    <Route path="/calendar" element={<NeurosyncCalendar />} />
                    <Route path="/stats" element={<StudyStats />} />
                    <Route path="/mood" element={<MoodJournal />} />
                    <Route path="/journal" element={<MoodJournal />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
