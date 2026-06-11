import { ArrowLeft, CheckCircle, Lightbulb, Warning } from "@phosphor-icons/react";
import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CodeBlock } from "../components/CodeBlock";
import { modules } from "../data/course";
import { useProgress } from "../context/ProgressContext";

export function ModulePage() {
  const id = Number(useParams().moduleId);
  const module = modules.find((item) => item.id === id);
  const { openModule, completeModule, progress } = useProgress();
  useEffect(() => { if (module) openModule(module.id); }, [module, openModule]);
  if (!module) return <Navigate to="/theory" replace />;
  const completed = progress.completedModules.includes(module.id);
  return (
    <>
      <Link className="back-link" to="/theory"><ArrowLeft size={17} /> Все модули</Link>
      <header className="module-hero"><span className="module-number">Модуль 0{module.id}</span><h1>{module.title}</h1><p>{module.description}</p><div className="lecture-refs">По материалам: {module.lectureRefs.join(" · ")}</div></header>
      <section className="lesson-section"><span className="eyebrow">Короткая теория</span>{module.theory.map((block) => <article className="theory-block" key={block.title}><h2>{block.title}</h2><p>{block.content}</p></article>)}</section>
      <section className="lesson-section"><span className="eyebrow">Ключевые термины</span><div className="term-grid">{module.terms.map((term) => <article key={term.term}><strong>{term.term}</strong><p>{term.definition}</p></article>)}</div></section>
      <section className="lesson-section"><span className="eyebrow">Синтаксис</span><div className="syntax-list">{module.syntax.map((item) => <code key={item}>{item}</code>)}</div></section>
      <section className="lesson-section"><span className="eyebrow">SQL-примеры</span>{module.examples.map((example) => <article className="example-card" key={example.title}><h2>{example.title}</h2><CodeBlock code={example.code} /><p><Lightbulb size={18} weight="fill" />{example.explanation}</p></article>)}</section>
      <section className="lesson-section"><span className="eyebrow">Типичные ошибки</span><div className="mistakes">{module.mistakes.map((mistake) => <p key={mistake}><Warning size={18} weight="fill" />{mistake}</p>)}</div></section>
      <div className="complete-panel"><div><strong>{completed ? "Модуль завершён" : "Теория изучена?"}</strong><span>{completed ? "Прогресс сохранён на устройстве." : "Отметьте модуль и переходите к практике."}</span></div><button className="button primary" onClick={() => completeModule(module.id)} disabled={completed}><CheckCircle size={19} weight="fill" />{completed ? "Готово" : "Модуль пройден"}</button></div>
    </>
  );
}
