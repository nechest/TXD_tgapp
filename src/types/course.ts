export type ModuleStatus = "not-started" | "in-progress" | "completed";
export type QuestionType = "choice" | "sql" | "find-error" | "match";
export type Difficulty = "easy" | "medium" | "exam";

export interface LessonBlock {
  title: string;
  content: string;
}

export interface SqlExample {
  title: string;
  code: string;
  explanation: string;
}

export interface PracticeTask {
  id: string;
  moduleId: number;
  type: QuestionType;
  prompt: string;
  options?: string[];
  answer: string;
  keywords?: string[];
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  moduleId: number;
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface ExamQuestion extends QuizQuestion {
  difficulty: Difficulty;
}

export interface Module {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  lectureRefs: string[];
  theory: LessonBlock[];
  terms: { term: string; definition: string }[];
  syntax: string[];
  examples: SqlExample[];
  mistakes: string[];
  practice: PracticeTask[];
  miniQuiz: QuizQuestion[];
}

export interface UserProgress {
  openedModules: number[];
  completedModules: number[];
  solvedPracticeIds: string[];
  quizScore: number | null;
  examScores: Partial<Record<Difficulty, number>>;
  favoriteErrors: string[];
}
