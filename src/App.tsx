import { useEffect, useMemo, useState } from "react";
import { APP_TYPES, SECTIONS } from "./sections";
import { DB_ENGINES, LANGUAGES, OTHER, UI_LIBRARIES } from "./options";
import { buildPrompt, QUESTIONS_ID, type StackChoice } from "./buildPrompt";
import { loadDraft, saveDraft } from "./storage";
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
  const [draft] = useState(loadDraft);
  const [appType, setAppType] = useState<string>(draft.appType ?? APP_TYPES[0]);
  const [language, setLanguage] = useState<StackChoice>(draft.language ?? EMPTY_CHOICE);
  const [dbEngine, setDbEngine] = useState<StackChoice>(draft.dbEngine ?? EMPTY_CHOICE);
  const [uiLibrary, setUiLibrary] = useState<StackChoice>(draft.uiLibrary ?? EMPTY_CHOICE);
  const [answers, setAnswers] = useState<Record<string, string>>(draft.answers ?? {});
  const [readme, setReadme] = useState(draft.readme ?? false);
  const [claudeMd, setClaudeMd] = useState(draft.claudeMd ?? false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    saveDraft({ appType, language, dbEngine, uiLibrary, answers, readme, claudeMd });
  }, [appType, language, dbEngine, uiLibrary, answers, readme, claudeMd]);

  const prompt = useMemo(
    () =>
      buildPrompt(appType, { language, dbEngine, uiLibrary }, answers, {
        readme,
        claudeMd,
      }),
    [appType, language, dbEngine, uiLibrary, answers, readme, claudeMd]
  );

  const tokenEstimate = Math.ceil(prompt.length / 4);

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
    setReadme(false);
    setClaudeMd(false);
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

          <div className="field">
            <label htmlFor={QUESTIONS_ID}>Preguntas para Claude</label>
            <p className="question">
              ¿Qué dudas querés que Claude te responda antes de arrancar? Una por línea.
            </p>
            <textarea
              id={QUESTIONS_ID}
              placeholder="Ej: ¿Conviene usar SQLite o PostgreSQL para este caso? ¿Qué estructura de carpetas recomendás?"
              value={answers[QUESTIONS_ID] ?? ""}
              onChange={(e) => updateAnswer(QUESTIONS_ID, e.target.value)}
              rows={3}
            />
          </div>

          <div className="field checkboxes">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={readme}
                onChange={(e) => setReadme(e.target.checked)}
              />
              Pedir que se cree un README.md
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                checked={claudeMd}
                onChange={(e) => setClaudeMd(e.target.checked)}
              />
              Pedir que se cree un CLAUDE.md
            </label>
          </div>

          <button className="clear-btn" type="button" onClick={clearAll}>
            Limpiar todo
          </button>
        </section>

        <aside className="preview">
          <div className="preview-header">
            <h2>
              Prompt generado <span className="tokens">~{tokenEstimate} tokens</span>
            </h2>
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
