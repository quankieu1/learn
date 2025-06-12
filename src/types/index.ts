export type Language = 'en' | 'ko' | 'zh';

export type StudyDuration = {
  minutes: number;
  label: string;
};

export interface TimerState {
  isRunning: boolean;
  timeRemaining: number;
  selectedDuration: number;
}

export interface StudySession {
  language: Language;
  duration: number;
  youtubeUrl?: string;
}