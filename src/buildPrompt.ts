import { SECTIONS } from "./sections";
import { NO_PREFERENCE, OTHER } from "./options";

export const QUESTIONS_ID = "preguntas_claude";

export interface StackChoice {
  value: string;
  otherText: string;
}

export interface StackChoices {
  language: StackChoice;
  dbEngine: StackChoice;
  uiLibrary: StackChoice;
}

function resolveChoice(choice: StackChoice): string | null {
  if (!choice.value || choice.value === NO_PREFERENCE) return null;
  if (choice.value === OTHER) return choice.otherText.trim() || null;
  return choice.value;
}

export interface DocOptions {
  readme: boolean;
  claudeMd: boolean;
}

export function buildPrompt(
  appType: string,
  stack: StackChoices,
  answers: Record<string, string>,
  docs: DocOptions
): string {
  const lines: string[] = [];

  lines.push(`Quiero que me ayudes a crear ${appType === "Otro" ? "una aplicación" : `una ${appType.toLowerCase()}`} desde cero.`);
  lines.push("");

  const language = resolveChoice(stack.language);
  const dbEngine = resolveChoice(stack.dbEngine);
  const uiLibrary = resolveChoice(stack.uiLibrary);

  if (language) lines.push(`**Lenguaje de programación:** ${language}`);
  if (dbEngine) lines.push(`**Motor de base de datos:** ${dbEngine}`);
  if (uiLibrary) lines.push(`**Librería de UI/UX:** ${uiLibrary}`);

  for (const section of SECTIONS) {
    const value = answers[section.id]?.trim();
    if (!value) continue;
    lines.push(`**${section.title}:** ${value}`);
  }

  if (docs.readme) {
    lines.push("**Documentación:** Creá un archivo README.md con descripción del proyecto, instrucciones de instalación y uso.");
  }
  if (docs.claudeMd) {
    lines.push("**Documentación:** Creá un archivo CLAUDE.md con las convenciones del proyecto (stack, estructura, estilo de código y restricciones) para guiar futuras sesiones.");
  }

  const questions = answers[QUESTIONS_ID]?.trim();
  if (questions) {
    lines.push("");
    lines.push("**Preguntas para vos antes de arrancar:**");
    lines.push(questions);
  }

  lines.push("");
  lines.push("Antes de escribir código, decime si falta alguna aclaración importante para arrancar.");

  return lines.join("\n");
}
