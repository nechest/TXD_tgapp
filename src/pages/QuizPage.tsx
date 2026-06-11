import { Assessment } from "../components/Assessment";
import { PageHeader } from "../components/PageHeader";
import { quizQuestions } from "../data/course";
import { useProgress } from "../context/ProgressContext";

export function QuizPage() {
  const { saveQuizScore } = useProgress();
  return (
    <>
      <PageHeader eyebrow="Общий тест" title="10 быстрых вопросов" description="Проверьте теорию по всем модулям. Ответ сразу сопровождается объяснением." />
      <Assessment title="Тест" questions={quizQuestions} onFinish={saveQuizScore} />
    </>
  );
}
