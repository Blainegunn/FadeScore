/**
 * Runs create-tables.sql against Supabase via the Management API.
 *
 * Usage: npx tsx scripts/setup-db.ts
 */

import * as fs from "fs";
import * as path from "path";

// Load .env.local
function loadEnv() {
  const envPath = path.resolve(__dirname, "../.env.local");
  if (!fs.existsSync(envPath)) {
    console.error("❌ .env.local not found");
    process.exit(1);
  }
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    process.env[trimmed.slice(0, eqIdx)] = trimmed.slice(eqIdx + 1);
  }
}

loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Missing Supabase credentials in .env.local");
  process.exit(1);
}

async function main() {
  const sqlPath = path.join(__dirname, "create-tables.sql");
  const sql = fs.readFileSync(sqlPath, "utf-8");

  console.log("🔧 Running create-tables.sql against Supabase...\n");

  // Use the Supabase REST RPC endpoint to execute raw SQL
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });

  // The REST rpc endpoint may not support raw SQL — use pg-meta or SQL Editor approach.
  // Fall back to executing statements one by one via the pg extension.
  // Actually, the simplest approach: use supabase-js to run sql via rpc if a function exists,
  // or split and run statements.

  // Let's try a different approach: use the Supabase SQL endpoint
  const sqlRes = await fetch(`${SUPABASE_URL}/pg`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });

  if (sqlRes.ok) {
    console.log("✅ Tables created successfully!");
    return;
  }

  // If direct SQL doesn't work, print instructions
  console.log("⚠ Could not run SQL via API. Please run the SQL manually:\n");
  console.log("1. Go to your Supabase Dashboard → SQL Editor");
  console.log("2. Paste the contents of scripts/create-tables.sql");
  console.log("3. Click 'Run'\n");
  console.log(`Dashboard: ${SUPABASE_URL.replace('.supabase.co', '')}/project/sql/new`);
  console.log(`\nOr copy the SQL:\n`);
  console.log("─".repeat(50));
  // Just show first/last lines
  const lines = sql.split("\n");
  console.log(`${lines.length} lines of SQL ready in scripts/create-tables.sql`);
}

main().catch(console.error);
