import { describe, expect, it } from "vitest";
import { calculateReadiness, isSqlAnswerCorrect } from "./progress";
import type { UserProgress } from "../types/course";

describe("calculateReadiness", () => {
  it("combines modules, practice, quiz and best exam into readiness", () => {
    const progress: UserProgress = {
      openedModules: [1, 2, 3, 4],
      completedModules: [1, 2, 3, 4],
      solvedPracticeIds: Array.from({ length: 12 }, (_, index) => `task-${index}`),
      quizScore: 80,
      examScores: { easy: 70, medium: 60 },
      favoriteErrors: [],
    };

    expect(calculateReadiness(progress, 8, 24)).toBe(60);
  });
});

describe("isSqlAnswerCorrect", () => {
  it("ignores casing, whitespace and semicolons for keyword checks", () => {
    expect(
      isSqlAnswerCorrect("SELECT name FROM users WHERE active = true;", [
        "select",
        "from users",
        "where",
      ]),
    ).toBe(true);
  });

  it("returns false when a required keyword is missing", () => {
    expect(isSqlAnswerCorrect("SELECT name FROM users", ["select", "where"])).toBe(false);
  });
});
