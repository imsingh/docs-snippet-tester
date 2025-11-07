import fs from "fs";
import path from "path";
import { globSync } from "glob";

export interface Snippet {
  file: string;
  code: string;
  lang: string;
  index: number;
  template?: string;
}

export function extractSnippets(dir: string, lang: string): Snippet[] {
  const files = globSync(`${dir}/**/*.md`);
  const pattern = new RegExp(
    "```" + lang + "(?:\\s+template=(\\w+))?\\n([\\s\\S]*?)```",
    "g"
  );

  const snippets: Snippet[] = [];
  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    let match;
    let index = 1;
    while ((match = pattern.exec(content))) {
      snippets.push({
        file,
        lang,
        index,
        template: match[1] || "default",
        code: match[2].trim()
      });
      index++;
    }
  }
  return snippets;
}
