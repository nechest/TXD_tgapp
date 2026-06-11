import { BookmarkSimple, CheckCircle, Exam, Lightning, Wrench } from "@phosphor-icons/react";
import { PageHeader } from "../components/PageHeader";
import { ProgressBar } from "../components/ProgressBar";
import { modules } from "../data/course";
import { useProgress } from "../context/ProgressContext";

export function ProgressPage() {
  const { progress, readiness, resetProgress } = useProgress();
  const totalPractice = modules.reduce((sum, module) => sum + module.practice.length, 0);
  return (
    <>
      <PageHeader eyebrow="Прогресс" title={`${readiness}% готовности`} description="Результат складывается из завершённых модулей, практики, теста и экзамена." />
      <section className="progress-overview"><ProgressBar value={readiness} label="Общий результат" /><div className="stat-grid"><article><CheckCircle size={22} weight="duotone" /><strong>{progress.completedModules.length}/8</strong><span>модулей</span></article><article><Wrench size={22} weight="duotone" /><strong>{progress.solvedPracticeIds.length}/{totalPractice}</strong><span>задач</span></article><article><Lightning size={22} weight="duotone" /><strong>{progress.quizScore ?? 0}%</strong><span>тест</span></article><article><Exam size={22} weight="duotone" /><strong>{Math.max(0, ...Object.values(progress.examScores))}%</strong><span>экзамен</span></article></div></section>
      <section className="section"><div className="section-heading"><div><span className="eyebrow">По модулям</span><h2>Карта курса</h2></div></div><div className="progress-modules">{modules.map((module) => { const done = progress.completedModules.includes(module.id); const opened = progress.openedModules.includes(module.id); return <div key={module.id}><span>0{module.id}</span><strong>{module.shortTitle}</strong><em className={done ? "done" : opened ? "started" : ""}>{done ? "Завершено" : opened ? "Начато" : "Не начато"}</em></div>; })}</div></section>
      <section className="favorites-panel"><BookmarkSimple size={24} weight="duotone" /><div><strong>Избранные ошибки</strong><span>{progress.favoriteErrors.length ? `Сохранено заданий: ${progress.favoriteErrors.length}` : "Добавляйте сложные задания в практике."}</span></div></section>
      <button className="button danger" onClick={() => window.confirm("Сбросить весь прогресс?") && resetProgress()}>Сбросить прогресс</button>
    </>
  );
}
