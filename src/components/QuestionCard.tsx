import { BookmarkSimple, CheckCircle, XCircle } from "@phosphor-icons/react";
import { useState } from "react";
import { isSqlAnswerCorrect } from "../lib/progress";
import type { PracticeTask } from "../types/course";

export function QuestionCard({ task, solved, favorite, onSolved, onFavorite }: {
  task: PracticeTask;
  solved: boolean;
  favorite: boolean;
  onSolved: () => void;
  onFavorite: () => void;
}) {
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const correct = task.type === "sql"
    ? isSqlAnswerCorrect(answer, task.keywords ?? [])
    : answer === task.answer;
  const check = () => {
    setChecked(true);
    if (correct) onSolved();
  };
  return (
    <article className="question-card">
      <div className="question-top">
        <span className="question-type">{task.type === "sql" ? "SQL-ввод" : task.type === "find-error" ? "Найти ошибку" : task.type === "match" ? "Сопоставление" : "Один ответ"}</span>
        <button className={`icon-button ${favorite ? "active" : ""}`} onClick={onFavorite} aria-label="Добавить ошибку в избранное"><BookmarkSimple size={18} weight={favorite ? "fill" : "regular"} /></button>
      </div>
      <h3>{task.prompt}</h3>
      {task.type === "sql" ? (
        <textarea value={answer} onChange={(event) => { setAnswer(event.target.value); setChecked(false); }} placeholder="Напишите SQL-запрос…" />
      ) : (
        <div className="options">
          {task.options?.map((option) => <button key={option} className={answer === option ? "selected" : ""} onClick={() => { setAnswer(option); setChecked(false); }}>{option}</button>)}
        </div>
      )}
      <div className="question-actions">
        <button className="button primary" disabled={!answer} onClick={check}>Проверить</button>
        <button className="button ghost" onClick={() => { setAnswer(task.answer); setChecked(true); }}>Показать ответ</button>
      </div>
      {checked && (
        <div className={`feedback ${correct ? "correct" : "wrong"}`}>
          {correct ? <CheckCircle size={21} weight="fill" /> : <XCircle size={21} weight="fill" />}
          <div><strong>{correct ? "Правильно" : "Пока нет. Ответ: " + task.answer}</strong><p>{task.explanation}</p></div>
        </div>
      )}
      {solved && <span className="solved-label"><CheckCircle size={16} weight="fill" /> Решено</span>}
    </article>
  );
}
