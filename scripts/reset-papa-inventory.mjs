/**
 * Resetea el contador de delantales del evento Papá.
 * Uso: node scripts/reset-papa-inventory.mjs [disponibles]
 * Default: 99 disponibles de 100 totales (soldUnits = 1).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PAPA_EVENT_ID = 'el-sabor-de-papa-2026';
const TOTAL_APRONS = 100;

function loadEnv() {
  const envPath = path.join(ROOT, '.env.local');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const remaining = Number(process.argv[2] ?? 99);
if (!Number.isFinite(remaining) || remaining < 0 || remaining > TOTAL_APRONS) {
  console.error(`Disponibles debe ser entre 0 y ${TOTAL_APRONS}`);
  process.exit(1);
}

const soldUnits = TOTAL_APRONS - remaining;

async function main() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI no configurada');

  await mongoose.connect(process.env.MONGODB_URI);
  const result = await mongoose.connection.db.collection('eventinventories').findOneAndUpdate(
    { eventId: PAPA_EVENT_ID },
    {
      $set: { totalUnits: TOTAL_APRONS, soldUnits, updatedAt: new Date() },
      $setOnInsert: { eventId: PAPA_EVENT_ID, createdAt: new Date() },
    },
    { upsert: true, returnDocument: 'after' }
  );

  const doc = result;
  const left = Math.max(0, (doc?.totalUnits ?? TOTAL_APRONS) - (doc?.soldUnits ?? soldUnits));
  console.log(`OK — ${left} disponibles de ${doc?.totalUnits ?? TOTAL_APRONS} (${doc?.soldUnits ?? soldUnits} vendidos)`);
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('FALLÓ:', err.message || err);
  process.exit(1);
});
