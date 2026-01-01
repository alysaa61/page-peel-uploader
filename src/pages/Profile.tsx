import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Calendar, Brain, Clock, Target, Award, Heart, ChevronDown, ChevronUp, AlertTriangle, RefreshCw, Edit } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ProfileData {
  name: string;
  email: string;
  dob: string;
  specialty: string;
}

const Profile: React.FC = () => {
  const [studyData, setStudyData] = useState({
    totalHours: 0,
    flashcardsCompleted: 0,
    averageAccuracy: 0,
    currentStreak: 0
  });

  const [isProfileFormOpen, setIsProfileFormOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Dr. Roshini Kesavan',
    email: '',
    dob: '18.03.2006',
    specialty: 'Medical Student'
  });

  const [showResetDialog, setShowResetDialog] = useState(false);
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');

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

    const savedProfile = localStorage.getItem('page-r-profile');
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
  }, []);

  const handleProfileSave = () => {
    localStorage.setItem('page-r-profile', JSON.stringify(profileData));
    toast.success('Profile updated successfully!');
    setIsProfileFormOpen(false);
  };

  const handleReset = () => {
    const storedPassword = localStorage.getItem('r-pager-password') || '603081';
    if (resetConfirmPassword !== storedPassword && resetConfirmPassword !== '603081' && resetConfirmPassword !== '1803') {
      toast.error('Incorrect password');
      return;
    }

    // Clear all data
    const keysToRemove = [
      'page-r-study-stats',
      'page-r-study-history',
      'page-r-flashcards',
      'page-r-profile',
      'page-r-mood-entries',
      'page-r-journal-entries',
      'page-r-calendar-events'
    ];
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    toast.success('All data has been reset');
    setShowResetDialog(false);
    setResetConfirmPassword('');
    window.location.reload();
  };

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
              <h2 className="text-2xl font-pixel text-foreground mb-2">{profileData.name.toUpperCase()}</h2>
              <p className="text-sm text-muted-foreground">{profileData.specialty} | Neural Explorer</p>
              <p className="text-xs opacity-50 mt-2">DOB: {profileData.dob} | Age: {age}</p>
            </div>

            <div className="border-t border-muted pt-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="border border-secondary p-4 hover:bg-secondary/20 transition-colors">
                  <Calendar className="w-6 h-6 mx-auto mb-2 text-secondary-foreground" />
                  <div className="text-xs opacity-75">BIRTHDAY</div>
                  <div className="font-pixel">{profileData.dob}</div>
                </div>
                <div className="border border-accent p-4 hover:bg-accent/20 transition-colors">
                  <Heart className="w-6 h-6 mx-auto mb-2 text-accent" />
                  <div className="text-xs opacity-75">STATUS</div>
                  <div className="font-pixel text-accent">ACTIVE</div>
                </div>
              </div>

              {/* Expandable Profile Form */}
              <div className="mt-6">
                <button
                  onClick={() => setIsProfileFormOpen(!isProfileFormOpen)}
                  className="w-full border border-card-teal p-4 flex items-center justify-between hover:bg-card-teal/20 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Edit className="w-5 h-5 text-card-teal" />
                    <span className="font-pixel text-sm text-card-teal">EDIT PROFILE INFORMATION</span>
                  </div>
                  {isProfileFormOpen ? (
                    <ChevronUp className="w-5 h-5 text-card-teal" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-card-teal" />
                  )}
                </button>

                <AnimatePresence>
                  {isProfileFormOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border border-t-0 border-card-teal p-4 space-y-4">
                        <div>
                          <label className="text-xs opacity-75 block mb-1">NAME</label>
                          <Input
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            className="bg-background border-muted"
                          />
                        </div>
                        <div>
                          <label className="text-xs opacity-75 block mb-1">EMAIL</label>
                          <Input
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            placeholder="Enter your email"
                            className="bg-background border-muted"
                          />
                        </div>
                        <div>
                          <label className="text-xs opacity-75 block mb-1">DATE OF BIRTH</label>
                          <Input
                            value={profileData.dob}
                            onChange={(e) => setProfileData({ ...profileData, dob: e.target.value })}
                            className="bg-background border-muted"
                          />
                        </div>
                        <div>
                          <label className="text-xs opacity-75 block mb-1">SPECIALTY / ROLE</label>
                          <Input
                            value={profileData.specialty}
                            onChange={(e) => setProfileData({ ...profileData, specialty: e.target.value })}
                            className="bg-background border-muted"
                          />
                        </div>
                        <Button
                          onClick={handleProfileSave}
                          className="w-full bg-card-teal text-background hover:bg-card-teal/80"
                        >
                          SAVE PROFILE
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
              className="border border-card-yellow p-4 text-center hover:bg-card-yellow/20 transition-colors"
            >
              <Clock className="w-8 h-8 mx-auto mb-2 text-card-yellow" />
              <div className="text-2xl font-pixel text-card-yellow">{studyData.totalHours}h</div>
              <div className="text-xs opacity-75">STUDY TIME</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="border border-card-red p-4 text-center hover:bg-card-red/20 transition-colors"
            >
              <Brain className="w-8 h-8 mx-auto mb-2 text-card-red" />
              <div className="text-2xl font-pixel text-card-red">{studyData.flashcardsCompleted}</div>
              <div className="text-xs opacity-75">FLASHCARDS</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="border border-card-teal p-4 text-center hover:bg-card-teal/20 transition-colors"
            >
              <Target className="w-8 h-8 mx-auto mb-2 text-card-teal" />
              <div className="text-2xl font-pixel text-card-teal">{studyData.averageAccuracy}%</div>
              <div className="text-xs opacity-75">ACCURACY</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="border border-card-purple p-4 text-center hover:bg-card-purple/20 transition-colors"
            >
              <Award className="w-8 h-8 mx-auto mb-2 text-card-purple" />
              <div className="text-2xl font-pixel text-card-purple">{studyData.currentStreak}</div>
              <div className="text-xs opacity-75">DAY STREAK</div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div className="border border-muted p-6">
            <h3 className="font-pixel mb-4 text-muted-foreground">QUICK ACTIONS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link to="/calendar" className="border border-accent p-4 hover:bg-accent/20 transition-colors text-left block">
                <Calendar className="w-5 h-5 mb-2 text-accent" />
                <div className="font-pixel text-sm">SCHEDULE</div>
                <div className="text-xs opacity-50">Manage calendar</div>
              </Link>
              <button 
                onClick={() => setShowResetDialog(true)}
                className="border border-destructive p-4 hover:bg-destructive/20 transition-colors text-left"
              >
                <RefreshCw className="w-5 h-5 mb-2 text-destructive" />
                <div className="font-pixel text-sm text-destructive">RESET ALL DATA</div>
                <div className="text-xs opacity-50">Clear all stored data (cannot be undone)</div>
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

      {/* Reset Confirmation Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="bg-background border-destructive">
          <DialogHeader>
            <DialogTitle className="font-pixel text-destructive flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              WARNING: DATA RESET
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              This action will permanently delete all your data including study stats, flashcards, journal entries, and calendar events. This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div className="border border-destructive/50 bg-destructive/10 p-4 text-center">
              <p className="text-sm text-destructive">All data will be permanently erased!</p>
            </div>
            <div>
              <label className="text-xs opacity-75 block mb-1">ENTER PASSWORD TO CONFIRM</label>
              <Input
                type="password"
                value={resetConfirmPassword}
                onChange={(e) => setResetConfirmPassword(e.target.value)}
                placeholder="Enter your password"
                className="bg-background border-muted"
              />
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setShowResetDialog(false)}
                variant="outline"
                className="flex-1 border-muted"
              >
                CANCEL
              </Button>
              <Button
                onClick={handleReset}
                className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/80"
              >
                RESET ALL DATA
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Profile;
