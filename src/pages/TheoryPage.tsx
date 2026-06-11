import { ModuleCard } from "../components/ModuleCard";
import { PageHeader } from "../components/PageHeader";
import { modules } from "../data/course";
import { useProgress } from "../context/ProgressContext";

export function TheoryPage() {
  const { getModuleStatus } = useProgress();
  return (
    <>
      <PageHeader eyebrow="Теория" title="Понимать, не зубрить" description="В каждом модуле только то, что пригодится на экзамене и в практике." />
      <div className="module-list">{modules.map((module) => <ModuleCard key={module.id} module={module} status={getModuleStatus(module.id)} to={`/theory/${module.id}`} />)}</div>
    </>
  );
}
