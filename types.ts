
import { ReactNode } from 'react';
import { Chat } from '@google/genai';

export enum ContentType {
  TEXT = 'TEXT',
  VIDEO = 'VIDEO',
  INFOGRAPHIC = 'INFOGRAPHIC',
  QUIZ = 'QUIZ',
  DOWNLOAD = 'DOWNLOAD',
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizContent {
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface ContentBlock {
  type: ContentType;
  content: string | QuizContent;
  title?: string;
}

export interface ManualModule {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  contentBlocks: ContentBlock[];
}

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

export interface ChatbotProps {
  chatInstance: Chat | null;
}
