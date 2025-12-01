import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mic, Trash2, X } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { JournalEntry } from '../types';
import { storage } from '../utils/storage';

const MoodJournal: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [journalText, setJournalText] = useState('');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const moods = [
    { emoji: '😭', label: 'Devastated', description: 'Like a patient coding at 3 AM' },
    { emoji: '😰', label: 'Panicked', description: 'Like forgetting everything during viva' },
    { emoji: '😣', label: 'Exhausted', description: 'Like an intern on night shift with no coffee' },
    { emoji: '😔', label: 'Down', description: 'Like a deflated lung' },
    { emoji: '😕', label: 'Unsettled', description: 'Like a murmur — something\'s off' },
    { emoji: '😐', label: 'Neutral', description: 'Like a pancreas — functioning, but nobody thanks it' },
    { emoji: '🙂', label: 'Content', description: 'Like stable vitals' },
    { emoji: '😊', label: 'Good', description: 'Like a well-oxygenated hemoglobin molecule' },
    { emoji: '☕', label: 'Energized', description: 'Caffeinated and ready to conquer pathology' },
    { emoji: '😄', label: 'Elated', description: 'Like acing a surprise quiz' },
    { emoji: '🤩', label: 'Euphoric', description: 'Like finally understanding Krebs cycle' }
  ];

  useEffect(() => {
    const savedEntries = storage.getJournalEntries();
    setEntries(savedEntries);
  }, []);

  const handleSaveEntry = () => {
    if (selectedMood !== null && journalText.trim()) {
      const newEntry: JournalEntry = {
        id: crypto.randomUUID(),
        title: moods[selectedMood].label,
        content: journalText,
        isPrivate: false,
        date: new Date(),
        mood: moods[selectedMood].label,
        timestamp: Date.now()
      };

      storage.addJournalEntry(newEntry);
      setEntries([newEntry, ...storage.getJournalEntries()]);
      setSelectedMood(null);
      setJournalText('');
      setShowNewEntry(false);
    }
  };

  const handleDeleteEntry = (id: string) => {
    storage.deleteJournalEntry(id);
    setEntries(storage.getJournalEntries());
    if (selectedEntry?.id === id) {
      setSelectedEntry(null);
    }
  };

  const handleVoiceVent = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
      }, 3000);
    }
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  };

  const formatTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-terminal">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-pixel mb-4 terminal-glow">MOOD & JOURNAL</h1>
          <p className="text-lg opacity-75">Track your mood and thoughts</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Entry List */}
          <div className="lg:col-span-1">
            <div className="border border-border bg-card p-4 mb-4">
              <button
                onClick={() => setShowNewEntry(!showNewEntry)}
                className="w-full border border-primary text-primary hover:bg-primary hover:text-primary-foreground py-3 transition-all duration-300"
              >
                {showNewEntry ? 'CANCEL' : '+ NEW ENTRY'}
              </button>
            </div>

            <div className="border border-border bg-card p-4">
              <h2 className="text-lg font-pixel mb-4">ENTRIES ({entries.length})</h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto">
                {entries.map(entry => (
                  <motion.button
                    key={entry.id}
                    onClick={() => {
                      setSelectedEntry(entry);
                      setShowNewEntry(false);
                    }}
                    className={`w-full text-left border p-3 transition-all duration-300 ${
                      selectedEntry?.id === entry.id
                        ? 'border-primary bg-primary bg-opacity-20'
                        : 'border-border hover:border-muted'
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-pixel text-sm">{entry.title}</span>
                      <span className="text-xs opacity-50">{entry.mood}</span>
                    </div>
                    <div className="text-xs opacity-75">
                      {formatDate(entry.date)} {formatTime(entry.date)}
                    </div>
                  </motion.button>
                ))}
                {entries.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No entries yet
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Entry View or New Entry Form */}
          <div className="lg:col-span-2">
            {showNewEntry ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border border-border bg-card p-6"
              >
                <h2 className="text-xl font-pixel mb-6">NEW ENTRY</h2>

                {/* Mood Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-pixel mb-3">SELECT MOOD</label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                    {moods.map((mood, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedMood(index)}
                        className={`border p-3 hover:bg-muted transition-all duration-300 ${
                          selectedMood === index
                            ? 'border-primary bg-primary bg-opacity-20'
                            : 'border-border'
                        }`}
                      >
                        <div className="text-2xl mb-1">{mood.emoji}</div>
                        <div className="text-xs">{mood.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Journal Text */}
                <div className="mb-6">
                  <label className="block text-sm font-pixel mb-3">YOUR THOUGHTS</label>
                  <textarea
                    value={journalText}
                    onChange={(e) => setJournalText(e.target.value)}
                    className="w-full h-48 bg-background border border-border text-foreground p-4 font-terminal focus:outline-none focus:border-primary resize-none"
                    placeholder="What's on your mind, doctor?"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleVoiceVent}
                    className={`flex items-center space-x-2 border px-4 py-2 transition-all duration-300 ${
                      isRecording
                        ? 'border-destructive text-destructive bg-destructive bg-opacity-20'
                        : 'border-secondary hover:bg-secondary hover:text-secondary-foreground'
                    }`}
                  >
                    <Mic className="w-4 h-4" />
                    <span className="text-sm">{isRecording ? 'RECORDING...' : 'VOICE VENT'}</span>
                  </button>
                  
                  <button
                    onClick={handleSaveEntry}
                    disabled={selectedMood === null || !journalText.trim()}
                    className="flex-1 border border-primary text-primary hover:bg-primary hover:text-primary-foreground py-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    SAVE ENTRY
                  </button>
                </div>
              </motion.div>
            ) : selectedEntry ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-pixel mb-2">{selectedEntry.title}</h2>
                    <div className="text-sm opacity-75">
                      {formatDate(selectedEntry.date)} at {formatTime(selectedEntry.date)}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeleteEntry(selectedEntry.id)}
                      className="border border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground p-2 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedEntry(null)}
                      className="border border-border hover:bg-muted p-2 transition-all duration-300"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="border border-border bg-background p-4 mb-4">
                  <div className="text-sm opacity-75 mb-2">MOOD: {selectedEntry.mood}</div>
                </div>

                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {selectedEntry.content}
                </div>
              </motion.div>
            ) : (
              <div className="border border-border bg-card p-6 flex items-center justify-center h-full">
                <div className="text-center text-muted-foreground">
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg mb-2">No Entry Selected</p>
                  <p className="text-sm">Create a new entry or select one from the list</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
          <div className="border border-secondary p-6 text-center">
            <div className="text-2xl font-pixel">{entries.length}</div>
            <div className="text-sm opacity-75">TOTAL ENTRIES</div>
          </div>
          
          <div className="border border-accent p-6 text-center">
            <div className="text-2xl font-pixel text-accent">
              {entries.length > 0 ? entries[0].mood : '--'}
            </div>
            <div className="text-sm opacity-75">RECENT MOOD</div>
          </div>
          
          <div className="border border-muted p-6 text-center">
            <div className="text-2xl font-pixel text-muted-foreground">
              {entries.filter(e => {
                const entryDate = new Date(e.date);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return entryDate > weekAgo;
              }).length}
            </div>
            <div className="text-sm opacity-75">THIS WEEK</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MoodJournal;
