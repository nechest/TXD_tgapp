import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { ExamPage } from "./pages/ExamPage";
import { HomePage } from "./pages/HomePage";
import { ModulePage } from "./pages/ModulePage";
import { PracticePage } from "./pages/PracticePage";
import { ProgressPage } from "./pages/ProgressPage";
import { QuizPage } from "./pages/QuizPage";
import { TheoryPage } from "./pages/TheoryPage";

export function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/theory" element={<TheoryPage />} />
        <Route path="/theory/:moduleId" element={<ModulePage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/exam" element={<ExamPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}
