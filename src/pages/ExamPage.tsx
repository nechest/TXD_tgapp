import { useState } from "react";
import { Assessment } from "../components/Assessment";
import { PageHeader } from "../components/PageHeader";
import { examQuestions } from "../data/course";
import { useProgress } from "../context/ProgressContext";
import type { Difficulty } from "../types/course";

const levels: { id: Difficulty; label: string; description: string }[] = [
  { id: "easy", label: "Лёгкий", description: "Основные понятия" },
  { id: "medium", label: "Средний", description: "Связи и запросы" },
  { id: "exam", label: "Как на экзамене", description: "Смешанные задачи" },
];

export function ExamPage() {
  const [level, setLevel] = useState<Difficulty | null>(null);
  const { saveExamScore } = useProgress();
  if (level) {
    const ordered = [...examQuestions.filter((item) => item.difficulty === level), ...examQuestions.filter((item) => item.difficulty !== level)];
    return (
      <>
        <PageHeader eyebrow={`Экзамен · ${levels.find((item) => item.id === level)?.label}`} title="Итоговая проверка" description="10 вопросов. Результат и темы для повторения появятся в конце." action={<button className="button ghost" onClick={() => setLevel(null)}>Сменить уровень</button>} />
        <Assessment title="Экзамен" questions={ordered} onFinish={(score) => saveExamScore(level, score)} />
      </>
    );
  }
  return (
    <>
      <PageHeader eyebrow="Экзамен" title="Выберите сложность" description="Все режимы содержат 10 вопросов, но начинают с задач выбранного уровня." />
      <div className="level-grid">{levels.map((item, index) => <button key={item.id} onClick={() => setLevel(item.id)}><span>0{index + 1}</span><strong>{item.label}</strong><p>{item.description}</p></button>)}</div>
    </>
  );
}
