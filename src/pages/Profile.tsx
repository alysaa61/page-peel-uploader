import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Brain, Clock, Target, Award, Settings, Heart } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

const Profile: React.FC = () => {
  const [studyData, setStudyData] = useState({
    totalHours: 0,
    flashcardsCompleted: 0,
    averageAccuracy: 0,
    currentStreak: 0
  });

  useEffect(() => {
    const saved = localStorage.getItem('page-r-study-stats');
    if (saved) {
      const data = JSON.parse(saved);
      setStudyData({
        totalHours: data.totalHours || 0,
        flashcardsCompleted: data.flashcardsCompleted || 0,
        averageAccuracy: data.averageAccuracy || 0,
        currentStreak: data.currentStreak || 0
      });
    }
  }, []);

  const birthDate = new Date(2006, 2, 18); // March 18, 2006
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();

  return (
    <div className="min-h-screen bg-background text-foreground font-terminal">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-pixel mb-4 terminal-glow">USER PROFILE</h1>
          <p className="text-lg opacity-75">Neural identity matrix</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="border border-primary p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 border-2 border-accent rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-accent" />
              </div>
            </div>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-pixel text-foreground mb-2">DR. ROSHINI KESAVAN</h2>
              <p className="text-sm text-muted-foreground">Medical Student | Neural Explorer</p>
              <p className="text-xs opacity-50 mt-2">DOB: 18.03.2006 | Age: {age}</p>
            </div>

            <div className="border-t border-muted pt-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="border border-secondary p-4">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-secondary-foreground" />
                  <div className="text-xs opacity-75">MEMBER SINCE</div>
                  <div className="font-pixel">18.03.2006</div>
                </div>
                <div className="border border-accent p-4">
                  <Heart className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="text-xs opacity-75">STATUS</div>
                  <div className="font-pixel text-accent">ACTIVE</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-pixel mb-6 text-center">NEURAL STATISTICS</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="border border-card-lime p-4 text-center"
            >
              <Clock className="w-8 h-8 mx-auto mb-2 text-card-lime" />
              <div className="text-2xl font-pixel text-card-lime">{studyData.totalHours}h</div>
              <div className="text-xs opacity-75">STUDY TIME</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border border-card-coral p-4 text-center"
            >
              <Brain className="w-8 h-8 mx-auto mb-2 text-card-coral" />
              <div className="text-2xl font-pixel text-card-coral">{studyData.flashcardsCompleted}</div>
              <div className="text-xs opacity-75">FLASHCARDS</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border border-card-blue p-4 text-center"
            >
              <Target className="w-8 h-8 mx-auto mb-2 text-secondary-foreground" />
              <div className="text-2xl font-pixel text-secondary-foreground">{studyData.averageAccuracy}%</div>
              <div className="text-xs opacity-75">ACCURACY</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="border border-card-purple p-4 text-center"
            >
              <Award className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <div className="text-2xl font-pixel text-muted-foreground">{studyData.currentStreak}</div>
              <div className="text-xs opacity-75">DAY STREAK</div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="border border-muted p-6">
            <h3 className="font-pixel mb-4 text-muted-foreground">QUICK ACTIONS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="border border-secondary p-4 hover:bg-secondary/20 transition-colors text-left">
                <Settings className="w-5 h-5 mb-2" />
                <div className="font-pixel text-sm">SETTINGS</div>
                <div className="text-xs opacity-50">Configure your experience</div>
              </button>
              <button className="border border-accent p-4 hover:bg-accent/20 transition-colors text-left">
                <Brain className="w-5 h-5 mb-2 text-accent" />
                <div className="font-pixel text-sm">VIEW STATS</div>
                <div className="text-xs opacity-50">Detailed analytics</div>
              </button>
              <button className="border border-primary p-4 hover:bg-primary/20 transition-colors text-left">
                <Calendar className="w-5 h-5 mb-2 text-primary" />
                <div className="font-pixel text-sm">SCHEDULE</div>
                <div className="text-xs opacity-50">Manage calendar</div>
              </button>
            </div>
          </div>

          {/* KAI's Comment */}
          <div className="mt-8 border border-accent p-4 text-center">
            <p className="text-sm opacity-75">
              <span className="text-accent">KAI:</span> "Your neural pathways are evolving nicely. Keep feeding the machine."
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
