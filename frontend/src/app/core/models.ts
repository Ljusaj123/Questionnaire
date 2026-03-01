export interface Section {
  sectionId: string;
  label: string;
  questions: Question[];
}

export interface Question {
  questionId: string;
  isEditing?: boolean;
  label: string;
  type: QuestionType;
  conditions?: Condition[];
  answers: AnswerOption[];
}
export interface AnswerOption {
  label: string;
  isFlag?: boolean;
  points?: number;
}

export interface Condition {
  answerId: string;
  type: ConditionTargetType;
  target: string;
}

export type ConditionTargetType = 'section' | 'question' | null;

export interface CreateAction {
  type: 'section' | 'question';
  questionType: QuestionType;
}

export type QuestionType =
  | 'short-text'
  | 'long-text'
  | 'drop-down'
  | 'radio'
  | 'check-boxes'
  | 'date'
  | 'document'
  | '';
