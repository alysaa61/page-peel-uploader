import { JournalEntry, MoodEntry, StudySession } from '../types';

const STORAGE_KEYS = {
  JOURNAL: 'page-r-journal-entries',
  MOODS: 'page-r-mood-entries',
  STUDY_SESSIONS: 'page-r-study-sessions',
  FLASHCARDS: 'page-r-flashcards',
  STATS: 'page-r-stats'
};

export const storage = {
  // Journal entries
  getJournalEntries: (): JournalEntry[] => {
    const entries = localStorage.getItem(STORAGE_KEYS.JOURNAL);
    return entries ? JSON.parse(entries) : [];
  },

  addJournalEntry: (entry: JournalEntry): void => {
    const entries = storage.getJournalEntries();
    entries.unshift(entry);
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
  },

  updateJournalEntry: (id: string, updates: Partial<JournalEntry>): void => {
    const entries = storage.getJournalEntries();
    const index = entries.findIndex(e => e.id === id);
    if (index !== -1) {
      entries[index] = { ...entries[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(entries));
    }
  },

  deleteJournalEntry: (id: string): void => {
    const entries = storage.getJournalEntries();
    const filtered = entries.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(filtered));
  },

  // Mood entries
  getMoods: (): MoodEntry[] => {
    const moods = localStorage.getItem(STORAGE_KEYS.MOODS);
    return moods ? JSON.parse(moods) : [];
  },

  addMood: (mood: MoodEntry): void => {
    const moods = storage.getMoods();
    moods.unshift(mood);
    localStorage.setItem(STORAGE_KEYS.MOODS, JSON.stringify(moods));
  },

  // Study sessions
  getStudySessions: (): StudySession[] => {
    const sessions = localStorage.getItem(STORAGE_KEYS.STUDY_SESSIONS);
    return sessions ? JSON.parse(sessions) : [];
  },

  addStudySession: (session: StudySession): void => {
    const sessions = storage.getStudySessions();
    sessions.unshift(session);
    localStorage.setItem(STORAGE_KEYS.STUDY_SESSIONS, JSON.stringify(sessions));
  },

  // Generic storage helpers
  get: <T>(key: string): T | null => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  },

  set: <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
  },

  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  }
};
