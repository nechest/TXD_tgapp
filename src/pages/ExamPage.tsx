import { ClipboardText } from "@phosphor-icons/react";
import { useState } from "react";
import { Assessment } from "../components/Assessment";
import { ExamTicketCard } from "../components/ExamTicketCard";
import { PageHeader } from "../components/PageHeader";
import { examQuestions } from "../data/course";
import { examTickets } from "../data/examTickets";
import { useProgress } from "../context/ProgressContext";
import type { Difficulty } from "../types/course";

const levels: { id: Difficulty; label: string; description: string }[] = [
  { id: "easy", label: "Лёгкий", description: "Основные понятия" },
  { id: "medium", label: "Средний", description: "Связи и запросы" },
  { id: "exam", label: "Как на экзамене", description: "Смешанные задачи" },
];

export function ExamPage() {
  const [level, setLevel] = useState<Difficulty | null>(null);
  const [showTickets, setShowTickets] = useState(false);
  const { saveExamScore } = useProgress();
  if (showTickets) {
    return (
      <>
        <PageHeader
          eyebrow="Экзамен · билеты"
          title="Формат как на бумаге"
          description="Развёрнутые вопросы по реальным билетам и похожие тренировочные формулировки. Сначала ответьте вслух, потом открывайте эталон."
          action={<button className="button ghost" onClick={() => setShowTickets(false)}>Назад к тесту</button>}
        />
        <div className="ticket-list">
          {examTickets.map((ticket) => <ExamTicketCard key={ticket.id} ticket={ticket} />)}
        </div>
      </>
    );
  }
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
      <PageHeader eyebrow="Экзамен" title="Выберите сложность" description="Кликабельный тест проверяет базу, а режим билетов тренирует развёрнутые ответы как на экзамене." />
      <section className="ticket-entry">
        <div>
          <span className="eyebrow">Новый режим</span>
          <h2>Билеты преподавателя</h2>
          <p>Вопросы по формату с фото: сущности и атрибуты, ограничения, JOIN, PreparedStatement, EntityManager и JPA cache.</p>
        </div>
        <button className="button primary" onClick={() => setShowTickets(true)}>
          <ClipboardText size={18} weight="bold" /> Открыть билеты
        </button>
      </section>
      <div className="level-grid">{levels.map((item, index) => <button key={item.id} onClick={() => setLevel(item.id)}><span>0{index + 1}</span><strong>{item.label}</strong><p>{item.description}</p></button>)}</div>
    </>
  );
}
