import chalk from "chalk";
import { SnippetResult } from "./runner.js";

export function reportResults(results: SnippetResult[], mode: "pretty" | "json" = "pretty") {
  if (mode === "json") {
    console.log(JSON.stringify(results, null, 2));
    return;
  }

  let passed = 0;
  let failed = 0;
  for (const r of results) {
    if (r.success) {
      console.log(chalk.green(`✔ ${r.snippet.file} [#${r.snippet.index}] OK`));
      passed++;
    } else {
      console.log(
        chalk.red(`✖ ${r.snippet.file} [#${r.snippet.index}] Failed:`),
        chalk.gray(r.error)
      );
      failed++;
    }
  }
  console.log(chalk.bold(`\nSummary: ${passed} passed, ${failed} failed`));
}
