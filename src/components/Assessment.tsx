import { ArrowRight, CheckCircle, Repeat, XCircle } from "@phosphor-icons/react";
import { useState } from "react";
import { modules } from "../data/course";
import type { QuizQuestion } from "../types/course";

export function Assessment({ questions, onFinish, title }: { questions: QuizQuestion[]; onFinish: (score: number) => void; title: string }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [finished, setFinished] = useState(false);
  const question = questions[index];
  const correctCount = questions.filter((item) => answers[item.id] === item.answer).length;
  const score = Math.round((correctCount / questions.length) * 100);
  const weakModules = [...new Set(questions.filter((item) => answers[item.id] !== item.answer).map((item) => item.moduleId))]
    .map((id) => modules.find((module) => module.id === id)?.shortTitle)
    .filter(Boolean);

  if (finished) {
    return (
      <section className="result-card">
        <span className="result-kicker">{title} завершён</span>
        <div className="result-score">{score}<small>%</small></div>
        <h2>{score >= 80 ? "Отличная готовность" : score >= 60 ? "Хорошая база" : "Нужно ещё немного практики"}</h2>
        <p>Правильных ответов: {correctCount} из {questions.length}.</p>
        {weakModules.length > 0 && <div className="review-box"><strong>Повторить:</strong><span>{weakModules.join(" · ")}</span></div>}
        <button className="button primary" onClick={() => { setAnswers({}); setIndex(0); setFinished(false); }}><Repeat size={18} /> Пройти ещё раз</button>
      </section>
    );
  }

  const selected = answers[question.id];
  const answered = Boolean(selected);
  const next = () => {
    if (index === questions.length - 1) {
      setFinished(true);
      onFinish(score);
    } else setIndex((current) => current + 1);
  };

  return (
    <section className="assessment">
      <div className="assessment-meta"><span>Вопрос {index + 1} / {questions.length}</span><strong>{modules.find((module) => module.id === question.moduleId)?.shortTitle}</strong></div>
      <div className="step-track"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
      <article className="assessment-card">
        <h2>{question.prompt}</h2>
        <div className="options">
          {question.options.map((option) => {
            const state = answered ? option === question.answer ? "correct-option" : option === selected ? "wrong-option" : "" : selected === option ? "selected" : "";
            return <button key={option} className={state} disabled={answered} onClick={() => setAnswers((current) => ({ ...current, [question.id]: option }))}>{option}</button>;
          })}
        </div>
        {answered && <div className={`feedback ${selected === question.answer ? "correct" : "wrong"}`}>{selected === question.answer ? <CheckCircle size={21} weight="fill" /> : <XCircle size={21} weight="fill" />}<p>{question.explanation}</p></div>}
        <button className="button primary wide" disabled={!answered} onClick={next}>{index === questions.length - 1 ? "Завершить" : "Следующий"} <ArrowRight size={18} /></button>
      </article>
    </section>
  );
}
