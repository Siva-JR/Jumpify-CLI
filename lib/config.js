import fs from "fs";
import path from "path";
import os from "os";

const configDir = path.join(os.homedir(), ".jump");
const configFile = path.join(configDir, "config.json");

export function readConfig() {
  if (!fs.existsSync(configFile)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(configFile, "utf-8"));
}

export function writeConfig(config) {
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir);
  }
  fs.writeFileSync(configFile, JSON.stringify(config, null, 2));
}
