import { ArrowRight, CheckCircle, Circle, CircleHalf } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import type { Module, ModuleStatus } from "../types/course";

const statusLabels: Record<ModuleStatus, string> = {
  "not-started": "Не начато",
  "in-progress": "В процессе",
  completed: "Завершено",
};

export function ModuleCard({ module, status, to }: { module: Module; status: ModuleStatus; to: string }) {
  const StatusIcon = status === "completed" ? CheckCircle : status === "in-progress" ? CircleHalf : Circle;
  return (
    <Link to={to} className="module-card">
      <div className="module-index">0{module.id}</div>
      <div className="module-copy">
        <h3>{module.shortTitle}</h3>
        <p>{module.description}</p>
        <span className={`status ${status}`}><StatusIcon size={15} weight="fill" />{statusLabels[status]}</span>
      </div>
      <ArrowRight className="module-arrow" size={20} />
    </Link>
  );
}
