import { SECTIONS } from "./sections";

export function buildPrompt(appType: string, answers: Record<string, string>): string {
  const lines: string[] = [];

  lines.push(`Quiero que me ayudes a crear ${appType === "Otro" ? "una aplicación" : `una ${appType.toLowerCase()}`} desde cero.`);
  lines.push("");

  for (const section of SECTIONS) {
    const value = answers[section.id]?.trim();
    if (!value) continue;
    lines.push(`**${section.title}:** ${value}`);
  }

  lines.push("");
  lines.push("Antes de escribir código, decime si falta alguna aclaración importante para arrancar.");

  return lines.join("\n");
}
