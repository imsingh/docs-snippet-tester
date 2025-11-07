import fs from "fs";
import path from "path";

export interface Config {
  include: string[];
  exclude?: string[];
  runners: Record<string, string>;
  templates: Record<string, Record<string, string>>;
  sandbox?: { timeout?: number };
  reporter?: "pretty" | "json";
}

const defaultConfig: Config = {
  include: ["docs/**/*.md"],
  runners: {},
  templates: {},
  sandbox: { timeout: 5000 },
  reporter: "pretty"
};

export function loadConfig(cwd = process.cwd()): Config {
  const file = path.join(cwd, ".sniptestrc.json");
  if (!fs.existsSync(file)) return defaultConfig;
  const user = JSON.parse(fs.readFileSync(file, "utf8"));
  return { ...defaultConfig, ...user };
}
