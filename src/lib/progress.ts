import type { UserProgress } from "../types/course";

export const initialProgress: UserProgress = {
  openedModules: [],
  completedModules: [],
  solvedPracticeIds: [],
  quizScore: null,
  examScores: {},
  favoriteErrors: [],
};

export function calculateReadiness(
  progress: UserProgress,
  totalModules: number,
  totalPractice: number,
) {
  const modules = (progress.completedModules.length / totalModules) * 40;
  const practice = (progress.solvedPracticeIds.length / totalPractice) * 20;
  const quiz = ((progress.quizScore ?? 0) / 100) * 20;
  const bestExam = Math.max(0, ...Object.values(progress.examScores));
  const exam = (bestExam / 100) * 20;

  return Math.min(100, Math.round(modules + practice + quiz + exam));
}

export function isSqlAnswerCorrect(answer: string, keywords: string[]) {
  const normalized = answer.toLowerCase().replace(/\s+/g, " ").replaceAll(";", "").trim();
  return keywords.every((keyword) => normalized.includes(keyword.toLowerCase()));
}
