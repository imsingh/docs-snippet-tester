#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { loadConfig } from "./config.js";
import { extractSnippets } from "./parser.js";
import { runSnippet } from "./runner.js";
import { reportResults } from "./reporter.js";

yargs(hideBin(process.argv))
  .usage("Usage: sniptest <dir> [options]")
  .command(
    "$0 <dir>",
    "Test code snippets in docs",
    (yargs) => {
      return yargs
        .positional("dir", {
          describe: "Directory to scan for docs",
          type: "string",
          demandOption: true,
        })
        .option("lang", {
          alias: "l",
          type: "string",
          default: "js",
          describe: "Language of snippets to test",
        })
        .option("reporter", {
          alias: "r",
          type: "string",
          choices: ["pretty", "json"] as const,
          describe: "Output format",
        });
    },
    (argv) => {
      const { dir, lang, reporter } = argv;
      const config = loadConfig();
      const snippets = extractSnippets(dir, lang);

      if (snippets.length === 0) {
        console.log(`No snippets found for language '${lang}' in ${dir}`);
        process.exit(0);
      }

      const results = snippets.map((s) => runSnippet(s, config));
      reportResults(results, reporter || config.reporter);
    }
  )
  .help()
  .parse();
