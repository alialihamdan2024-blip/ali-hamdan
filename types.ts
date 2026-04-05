
export interface Question {
  id: string;
  questionText: string;
  answerText: string;
  category: string;
  explanation?: string;
  options?: string[];
  questionImage?: string;
  answerImage?: string;
}

export interface QuizQuestion {
  id: string;
  data: Question;
  options: string[];
  correctOption: string;
  userAnswer: string | null;
  isFlagged: boolean;
}

export enum AppMode {
  FLASHCARDS = 'FLASHCARDS',
  QUIZ = 'QUIZ',
  LIST = 'LIST',
  ATLAS = 'ATLAS',
  STUDIO = 'STUDIO'
}