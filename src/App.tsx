import { useMemo, useState } from "react";
import { APP_TYPES, SECTIONS } from "./sections";
import { DB_ENGINES, LANGUAGES, OTHER, UI_LIBRARIES } from "./options";
import { buildPrompt, type StackChoice } from "./buildPrompt";
import "./App.css";

const EMPTY_CHOICE: StackChoice = { value: "", otherText: "" };

interface StackSelectProps {
  id: string;
  label: string;
  options: string[];
  choice: StackChoice;
  onChange: (choice: StackChoice) => void;
}

function StackSelect({ id, label, options, choice, onChange }: StackSelectProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={choice.value || options[0]}
        onChange={(e) => onChange({ ...choice, value: e.target.value })}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {choice.value === OTHER && (
        <input
          type="text"
          className="other-input"
          placeholder="Especificá cuál"
          value={choice.otherText}
          onChange={(e) => onChange({ ...choice, otherText: e.target.value })}
        />
      )}
    </div>
  );
}

function App() {
  const [appType, setAppType] = useState<string>(APP_TYPES[0]);
  const [language, setLanguage] = useState<StackChoice>(EMPTY_CHOICE);
  const [dbEngine, setDbEngine] = useState<StackChoice>(EMPTY_CHOICE);
  const [uiLibrary, setUiLibrary] = useState<StackChoice>(EMPTY_CHOICE);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(
    () => buildPrompt(appType, { language, dbEngine, uiLibrary }, answers),
    [appType, language, dbEngine, uiLibrary, answers]
  );

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
    setLanguage(EMPTY_CHOICE);
    setDbEngine(EMPTY_CHOICE);
    setUiLibrary(EMPTY_CHOICE);
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

          <StackSelect
            id="language"
            label="Lenguaje de programación"
            options={LANGUAGES}
            choice={language}
            onChange={setLanguage}
          />
          <StackSelect
            id="db-engine"
            label="Motor de base de datos"
            options={DB_ENGINES}
            choice={dbEngine}
            onChange={setDbEngine}
          />
          <StackSelect
            id="ui-library"
            label="Librería de UI/UX"
            options={UI_LIBRARIES}
            choice={uiLibrary}
            onChange={setUiLibrary}
          />

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
