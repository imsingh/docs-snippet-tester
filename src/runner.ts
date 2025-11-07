import { spawnSync } from "child_process";
import { Snippet } from "./parser.js";
import { Config } from "./config.js";
import { applyTemplate } from "./template.js";

export interface SnippetResult {
  snippet: Snippet;
  success: boolean;
  output: string;
  error?: string;
}

export function runSnippet(snippet: Snippet, config: Config): SnippetResult {
  const code = applyTemplate(snippet.code, snippet.lang, snippet.template || "default", config);
  const runnerCmd = config.runners[snippet.lang];

  if (!runnerCmd) {
    throw new Error(`No runner defined for language '${snippet.lang}'`);
  }

  const [cmd, ...args] = runnerCmd.split(" ");
  const execArgs = [...args];
  if (snippet.lang === "js") {
    execArgs.push("-e", code);
  } else if (snippet.lang === "python") {
    execArgs.push("-c", code);
  } else {
    execArgs.push(code);
  }
  const result = spawnSync(cmd, execArgs, {
    encoding: "utf8",
    timeout: config.sandbox?.timeout || 5000
  });

  return {
    snippet,
    success: result.status === 0,
    output: result.stdout.trim(),
    error: result.stderr.trim()
  };
}
