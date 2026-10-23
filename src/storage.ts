import type { StackChoice } from "./buildPrompt";

export interface Draft {
  appType: string;
  language: StackChoice;
  dbEngine: StackChoice;
  uiLibrary: StackChoice;
  answers: Record<string, string>;
  readme: boolean;
  claudeMd: boolean;
}

const KEY = "generaprompt:draft";

export function loadDraft(): Partial<Draft> {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Partial<Draft>) : {};
  } catch {
    return {};
  }
}

export function saveDraft(draft: Draft): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(draft));
  } catch {
    // almacenamiento no disponible; se ignora
  }
}
