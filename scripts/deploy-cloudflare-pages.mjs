import {spawn} from "node:child_process";

const child = spawn(process.execPath, ["node_modules/wrangler/bin/wrangler.js", "pages", "deploy", "dist", "--project-name", "drtech-services", "--branch", "main", "--commit-dirty=true"], {
  stdio: "inherit",
});
child.on("exit", (code) => process.exit(code ?? 1));
