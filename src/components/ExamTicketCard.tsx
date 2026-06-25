import { CaretDown, CaretUp, CheckCircle, ClipboardText } from "@phosphor-icons/react";
import { useState } from "react";
import type { ExamTicket } from "../types/course";

export function ExamTicketCard({ ticket }: { ticket: ExamTicket }) {
  const [openAnswers, setOpenAnswers] = useState<Record<string, boolean>>({});

  const toggleAnswer = (id: string) => {
    setOpenAnswers((current) => ({ ...current, [id]: !current[id] }));
  };

  return (
    <article className="ticket-card">
      <div className="ticket-head">
        <div>
          <span className="eyebrow">{ticket.source}</span>
          <h2>{ticket.title}</h2>
        </div>
        <div className="ticket-topics">
          {ticket.topics.map((topic) => <span key={topic}>{topic}</span>)}
        </div>
      </div>

      <div className="ticket-tasks">
        {ticket.tasks.map((task, index) => {
          const opened = Boolean(openAnswers[task.id]);
          return (
            <section className="ticket-task" key={task.id}>
              <div className="ticket-task-meta">
                <span>{task.part === "part1" ? "Часть 1" : "Часть 2"}</span>
                <strong>{task.points} {task.points === 1 ? "балл" : "балла"}</strong>
              </div>
              <h3>{index + 1}. {task.prompt}</h3>
              <button className="button ghost wide" onClick={() => toggleAnswer(task.id)}>
                <ClipboardText size={17} />
                {opened ? "Скрыть ответ" : "Показать эталонный ответ"}
                {opened ? <CaretUp size={16} /> : <CaretDown size={16} />}
              </button>
              {opened && (
                <div className="ticket-answer">
                  <p>{task.answer}</p>
                  <div>
                    <strong><CheckCircle size={17} weight="fill" />Ключевые идеи</strong>
                    <ul>
                      {task.keyIdeas.map((idea) => <li key={idea}>{idea}</li>)}
                    </ul>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </article>
  );
}
