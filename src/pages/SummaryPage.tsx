import { ArrowSquareOut, CheckCircle, GraduationCap, ListChecks, Question } from "@phosphor-icons/react";
import { CodeBlock } from "../components/CodeBlock";
import { PageHeader } from "../components/PageHeader";
import { summaryTopics } from "../data/summary";

export function SummaryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Конспект ТХД"
        title="Вся теория коротко"
        description="Сжатый справочник по методичкам курса: только ключевые идеи, типовые вопросы и то, что полезно повторить перед экзаменом."
      />

      <section className="summary-hero">
        <div>
          <span className="eyebrow">Источник</span>
          <h2>Методические пособия РУТ МИИТ</h2>
          <p>
            Конспект собран по разделам курса «Технологии хранения и обработки данных».
            Полные материалы доступны по ссылкам в каждой карточке.
          </p>
        </div>
        <a className="button primary" href="https://ctutp.ru/courses/thd/docs/" target="_blank" rel="noreferrer">
          Открыть курс <ArrowSquareOut size={17} weight="bold" />
        </a>
      </section>

      <nav className="summary-jump" aria-label="Темы конспекта">
        {summaryTopics.map((topic, index) => (
          <a key={topic.id} href={`#${topic.id}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {topic.shortTitle}
          </a>
        ))}
      </nav>

      <section className="summary-list">
        {summaryTopics.map((topic, index) => (
          <article className="summary-card" id={topic.id} key={topic.id}>
            <div className="summary-card-head">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <strong>{topic.sourceLabel}</strong>
                <h2>{topic.title}</h2>
                <p>{topic.description}</p>
              </div>
            </div>

            <div className="summary-grid">
              <section>
                <h3><GraduationCap size={18} weight="duotone" /> Главное</h3>
                <ul>
                  {topic.keyPoints.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </section>
              <section>
                <h3><ListChecks size={18} weight="duotone" /> К экзамену</h3>
                <ul>
                  {topic.examFocus.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </section>
              <section>
                <h3><Question size={18} weight="duotone" /> Частые вопросы</h3>
                <ul>
                  {topic.commonQuestions.map((question) => <li key={question}>{question}</li>)}
                </ul>
              </section>
            </div>

            {topic.codeExamples?.map((example) => (
              <div className="summary-code" key={example.title}>
                <h3>{example.title}</h3>
                <CodeBlock code={example.code} />
                <p><CheckCircle size={17} weight="fill" />{example.explanation}</p>
              </div>
            ))}

            <a className="summary-source" href={topic.sourceUrl} target="_blank" rel="noreferrer">
              Полная методичка <ArrowSquareOut size={16} weight="bold" />
            </a>
          </article>
        ))}
      </section>
    </>
  );
}
