#!/usr/bin/env node
/**
 * Prints Supabase-related env status (never prints secret values).
 * Usage: node scripts/env-status.mjs
 * Loads .env.local then .env if present (simple KEY=VAL parser).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadEnvFile(name) {
  const p = path.join(root, name);
  if (!fs.existsSync(p)) return;
  const text = fs.readFileSync(p, "utf8");
  for (const line of text.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const eq = t.indexOf("=");
    if (eq === -1) continue;
    const key = t.slice(0, eq).trim();
    let val = t.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = val;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const checks = [
  {
    key: "NEXT_PUBLIC_SUPABASE_URL",
    required: true,
    valid: (v) =>
      Boolean(v) &&
      !/YOUR_PROJECT_REF|your-project/i.test(v) &&
      /^https?:\/\//i.test(v.trim()),
  },
  {
    key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    required: true,
    valid: (v) =>
      Boolean(v) &&
      v.length > 40 &&
      !/YOUR_ANON|your-anon/i.test(v),
  },
  {
    key: "NEXT_PUBLIC_SITE_URL",
    required: false,
    valid: (v) => Boolean(v && v.startsWith("http")),
  },
  {
    key: "SUPABASE_SERVICE_ROLE_KEY",
    required: false,
    valid: (v) => Boolean(v && v.length > 40),
  },
];

console.log("Uvely Glow — environment check\n");

let missingRequired = 0;
for (const { key, required, valid } of checks) {
  const raw = process.env[key];
  const set = Boolean(raw?.trim());
  const ok = set && valid(raw.trim());
  const label = required ? "required" : "optional";
  let status;
  if (!set) status = required ? "MISSING" : "(not set)";
  else if (!ok) status = required ? "INVALID or PLACEHOLDER" : "INVALID";
  else status = "OK";

  if (status === "MISSING" || status === "INVALID or PLACEHOLDER") missingRequired += required ? 1 : 0;

  console.log(`${key} [${label}]`);
  console.log(`  status: ${status}`);
  if (set && ok) console.log(`  value:  ${key.includes("KEY") ? "(set, hidden)" : raw.trim()}`);
  console.log("");
}

if (missingRequired > 0) {
  console.log(
    "Supabase is not fully configured. Copy .env.example → .env.local and add real URL + anon key.\n",
  );
  process.exitCode = 1;
} else if (checks.every((c) => !c.required || (process.env[c.key] && c.valid(process.env[c.key])))) {
  console.log("All required Supabase variables look present.\n");
}
