export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  isPrivate: boolean;
  date: Date;
  mood: string;
  timestamp: number;
}

export interface MoodEntry {
  id: string;
  mood: number;
  date: string;
  timestamp: string;
  notes: string;
}

export interface StudySession {
  id: string;
  subject: string;
  duration: number;
  date: Date;
  notes?: string;
}

export interface FlashcardStats {
  correct: number;
  incorrect: number;
  totalReviewed: number;
  lastSession?: Date;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'exam' | 'community-visit' | 'reference' | 'birthday';
  examType?: string;
  difficulty?: string;
  date: string;
  time: string;
  notes?: string;
  tags: string[];
  attachments: File[];
}

export interface PDFFile {
  id: string;
  name: string;
  size: string;
  pages: number;
  progress: number;
  lastRead: string;
  uploadDate: string;
}
