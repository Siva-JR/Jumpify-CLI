#!/usr/bin/env node
import { readConfig, writeConfig } from "../lib/config.js";
import open from "open";

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  const config = readConfig();

  switch (command) {
    case "add": {
      const [name, url] = args.slice(1);
      if (!name || !url) {
        console.log("Usage: jump add <name> <url>");
        return;
      }
      config[name] = url;
      writeConfig(config);
      console.log(`Added shortcut: ${name} → ${url}`);
      break;
    }

    case "open": {
      const name = args[1];
      if (!name || !config[name]) {
        console.log(`Shortcut not found: ${name}`);
        return;
      }
      console.log(`Opening ${config[name]} ...`);
      await open(config[name]);
      break;
    }

    case "list": {
      const shortcuts = Object.entries(config);
      if (shortcuts.length === 0) {
        console.log("No shortcuts found. Add one with: jump add <name> <url>");
        return;
      }
      console.log("Saved shortcuts:");
      shortcuts.forEach(([k, v]) => {
        console.log(`  ${k} → ${v}`);
      });
      break;
    }

    case "kill": {
      const name = args[1];
      if (!name || !config[name]) {
        console.log(`Shortcut not found: ${name}`);
        return;
      }
      delete config[name];
      writeConfig(config);
      console.log(`Killed shortcut: ${name}`);
      break;
    }

    case "help":
    default:
      console.log(`
Jump CLI - open your favorite websites from the terminal 

Usage:
  jump add <name> <url>     Add a new shortcut
  jump open <name>          Open a shortcut in browser
  jump list                 List all shortcuts
  jump kill <name>          Remove a shortcut
  jump help                 Show this help menu
      `);
  }
}

main();
