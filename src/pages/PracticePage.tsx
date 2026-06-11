import { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { QuestionCard } from "../components/QuestionCard";
import { modules } from "../data/course";
import { useProgress } from "../context/ProgressContext";

export function PracticePage() {
  const [moduleId, setModuleId] = useState(1);
  const { progress, solvePractice, toggleFavoriteError } = useProgress();
  const module = modules.find((item) => item.id === moduleId)!;
  return (
    <>
      <PageHeader eyebrow="Практика" title="SQL через действие" description="Выберите тему, решите три задания и сразу разберите объяснение." />
      <div className="topic-tabs">{modules.map((item) => <button key={item.id} className={item.id === moduleId ? "active" : ""} onClick={() => setModuleId(item.id)}>0{item.id} · {item.shortTitle}</button>)}</div>
      <div className="practice-heading"><div><span className="eyebrow">Модуль 0{module.id}</span><h2>{module.shortTitle}</h2></div><strong>{module.practice.filter((task) => progress.solvedPracticeIds.includes(task.id)).length}/3 решено</strong></div>
      <div className="question-list">{module.practice.map((task) => <QuestionCard key={task.id} task={task} solved={progress.solvedPracticeIds.includes(task.id)} favorite={progress.favoriteErrors.includes(task.id)} onSolved={() => solvePractice(task.id)} onFavorite={() => toggleFavoriteError(task.id)} />)}</div>
    </>
  );
}
