import { BookOpen, ChartDonut, Exam, House, Wrench } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Главная", icon: House },
  { to: "/theory", label: "Теория", icon: BookOpen },
  { to: "/practice", label: "Практика", icon: Wrench },
  { to: "/exam", label: "Экзамен", icon: Exam },
  { to: "/progress", label: "Прогресс", icon: ChartDonut },
];

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand">
          <span className="brand-mark">PG</span>
          <span>Exam Prep</span>
        </NavLink>
        <span className="topbar-label">MVP · 8 модулей</span>
      </header>
      <main className="page">{children}</main>
      <nav className="bottom-nav" aria-label="Основная навигация">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === "/"}>
            <Icon size={22} weight="duotone" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
