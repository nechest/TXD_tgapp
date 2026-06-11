import { Copy } from "@phosphor-icons/react";
import { useState } from "react";

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard?.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className="code-block">
      <div className="code-head"><span>SQL</span><button onClick={copy}><Copy size={16} />{copied ? "Готово" : "Копировать"}</button></div>
      <pre><code>{code}</code></pre>
    </div>
  );
}
