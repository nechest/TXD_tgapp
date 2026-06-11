import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { modules } from "../data/course";
import { calculateReadiness, initialProgress } from "../lib/progress";
import type { Difficulty, ModuleStatus, UserProgress } from "../types/course";

interface ProgressContextValue {
  progress: UserProgress;
  readiness: number;
  openModule: (id: number) => void;
  completeModule: (id: number) => void;
  solvePractice: (id: string) => void;
  saveQuizScore: (score: number) => void;
  saveExamScore: (difficulty: Difficulty, score: number) => void;
  toggleFavoriteError: (id: string) => void;
  getModuleStatus: (id: number) => ModuleStatus;
  resetProgress: () => void;
}

const STORAGE_KEY = "postgres-exam-prep-progress";
const ProgressContext = createContext<ProgressContextValue | null>(null);
const totalPractice = modules.reduce((sum, module) => sum + module.practice.length, 0);

function addUnique<T>(items: T[], item: T) {
  return items.includes(item) ? items : [...items, item];
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? { ...initialProgress, ...JSON.parse(stored) } : initialProgress;
    } catch {
      return initialProgress;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const value = useMemo<ProgressContextValue>(() => ({
    progress,
    readiness: calculateReadiness(progress, modules.length, totalPractice),
    openModule: (id) => setProgress((current) => current.openedModules.includes(id)
      ? current
      : { ...current, openedModules: [...current.openedModules, id] }),
    completeModule: (id) => setProgress((current) => ({
      ...current,
      openedModules: addUnique(current.openedModules, id),
      completedModules: addUnique(current.completedModules, id),
    })),
    solvePractice: (id) => setProgress((current) => ({ ...current, solvedPracticeIds: addUnique(current.solvedPracticeIds, id) })),
    saveQuizScore: (score) => setProgress((current) => ({ ...current, quizScore: Math.max(current.quizScore ?? 0, score) })),
    saveExamScore: (difficulty, score) => setProgress((current) => ({
      ...current,
      examScores: { ...current.examScores, [difficulty]: Math.max(current.examScores[difficulty] ?? 0, score) },
    })),
    toggleFavoriteError: (id) => setProgress((current) => ({
      ...current,
      favoriteErrors: current.favoriteErrors.includes(id)
        ? current.favoriteErrors.filter((item) => item !== id)
        : [...current.favoriteErrors, id],
    })),
    getModuleStatus: (id) => progress.completedModules.includes(id)
      ? "completed"
      : progress.openedModules.includes(id) ? "in-progress" : "not-started",
    resetProgress: () => setProgress(initialProgress),
  }), [progress]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

// Context providers conventionally expose their matching hook from the same module.
// eslint-disable-next-line react-refresh/only-export-components
export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used inside ProgressProvider");
  return context;
}
