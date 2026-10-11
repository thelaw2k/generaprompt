import { useMemo, useState } from "react";
import { APP_TYPES, SECTIONS } from "./sections";
import { buildPrompt } from "./buildPrompt";
import "./App.css";

function App() {
  const [appType, setAppType] = useState<string>(APP_TYPES[0]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => buildPrompt(appType, answers), [appType, answers]);

  function updateAnswer(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setCopied(false);
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  function clearAll() {
    setAnswers({});
    setCopied(false);
  }

  return (
    <div className="page">
      <header className="header">
        <h1>Generador de prompts</h1>
        <p>Completá lo que sepas de tu idea. Lo que dejes vacío, se omite del prompt final.</p>
      </header>

      <main className="layout">
        <section className="form">
          <div className="field">
            <label htmlFor="app-type">Tipo de aplicación</label>
            <select
              id="app-type"
              value={appType}
              onChange={(e) => setAppType(e.target.value)}
            >
              {APP_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {SECTIONS.map((section) => (
            <div className="field" key={section.id}>
              <label htmlFor={section.id}>{section.title}</label>
              <p className="question">{section.question}</p>
              <textarea
                id={section.id}
                placeholder={section.placeholder}
                value={answers[section.id] ?? ""}
                onChange={(e) => updateAnswer(section.id, e.target.value)}
                rows={2}
              />
            </div>
          ))}

          <button className="clear-btn" type="button" onClick={clearAll}>
            Limpiar todo
          </button>
        </section>

        <aside className="preview">
          <div className="preview-header">
            <h2>Prompt generado</h2>
            <button type="button" onClick={copyPrompt}>
              {copied ? "¡Copiado!" : "Copiar"}
            </button>
          </div>
          <pre className="preview-text">{prompt}</pre>
        </aside>
      </main>
    </div>
  );
}

export default App;
