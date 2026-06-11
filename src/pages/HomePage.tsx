import { BookOpen, ChartDonut, Exam, Lightning, Wrench } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import { ModuleCard } from "../components/ModuleCard";
import { ProgressBar } from "../components/ProgressBar";
import { modules } from "../data/course";
import { useProgress } from "../context/ProgressContext";

const actions = [
  { to: "/theory", label: "Теория", icon: BookOpen },
  { to: "/practice", label: "Практика", icon: Wrench },
  { to: "/quiz", label: "Тест", icon: Lightning },
  { to: "/exam", label: "Экзамен", icon: Exam },
  { to: "/progress", label: "Прогресс", icon: ChartDonut },
];

export function HomePage() {
  const { readiness, getModuleStatus } = useProgress();
  return (
    <>
      <section className="hero">
        <div className="hero-orbit">POSTGRES<br />READY</div>
        <span className="eyebrow">Подготовка без перегруза</span>
        <h1>PostgreSQL<br /><em>Exam Prep</em></h1>
        <p>Короткая теория, понятный SQL и практика по темам экзамена.</p>
        <ProgressBar value={readiness} label="Общая готовность" />
      </section>
      <section className="quick-actions">
        {actions.map(({ to, label, icon: Icon }) => <Link key={to} to={to}><Icon size={22} weight="duotone" /><span>{label}</span></Link>)}
      </section>
      <section className="section">
        <div className="section-heading"><div><span className="eyebrow">Ваш маршрут</span><h2>8 учебных модулей</h2></div><Link to="/theory">Все модули</Link></div>
        <div className="module-list">{modules.map((module) => <ModuleCard key={module.id} module={module} status={getModuleStatus(module.id)} to={`/theory/${module.id}`} />)}</div>
      </section>
    </>
  );
}
