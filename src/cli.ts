#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { loadConfig } from "./config.js";
import { extractSnippets } from "./parser.js";
import { runSnippet } from "./runner.js";
import { reportResults } from "./reporter.js";

const argv = await yargs(hideBin(process.argv))
  .usage("Usage: sniptest <dir> [options]")
  .command("$0 <dir>", "Test code snippets in docs")
  .option("lang", {
    alias: "l",
    type: "string",
    default: "js",
    describe: "Language of snippets to test"
  })
  .option("reporter", {
    alias: "r",
    type: "string",
    choices: ["pretty", "json"],
    describe: "Output format"
  })
  .help()
  .parse();

const { dir, lang, reporter } = argv as { dir: string; lang: string; reporter?: "pretty" | "json" };

const config = loadConfig();
const snippets = extractSnippets(dir, lang);

if (snippets.length === 0) {
  console.log(`No snippets found for language '${lang}' in ${dir}`);
  process.exit(0);
}

const results = snippets.map(s => runSnippet(s, config));
reportResults(results, reporter || config.reporter);
