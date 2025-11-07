import fs from "fs";
import path from "path";
import { Config } from "./config.js";

/**
 * Applies the user-defined template to the snippet.
 * Replaces {{SNIPPET}} placeholder with actual code.
 */
export function applyTemplate(
  snippetCode: string,
  lang: string,
  templateName: string,
  config: Config
): string {
  const templatePath = config.templates?.[lang]?.[templateName];
  if (!templatePath) {
    throw new Error(`No template defined for language '${lang}', template '${templateName}'.`);
  }

  const full = path.resolve(templatePath);
  if (!fs.existsSync(full)) {
    throw new Error(`Template file not found: ${full}`);
  }

  const template = fs.readFileSync(full, "utf8");
  return template.replace("{{SNIPPET}}", snippetCode);
}
