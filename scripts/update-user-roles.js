/**
 * One-off: add `role` to all users in MongoDB.
 * - Users without role → role: "user"
 * - admin@gordito.com → role: "admin"
 *
 * Run from project root: node scripts/update-user-roles.js
 * Requires .env.local with MONGODB_URI
 */

const path = require('path');
const fs = require('fs');

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const m = line.match(/^\s*([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found. Add it to .env.local');
  process.exit(1);
}

const mongoose = require('mongoose');

async function main() {
  console.log('🔄 Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected');

  const db = mongoose.connection.db;
  const users = db.collection('users');

  const r1 = await users.updateMany(
    { role: { $exists: false } },
    { $set: { role: 'user' } }
  );
  console.log('✅ Users without role → role "user":', r1.modifiedCount, 'modified');

  const r2 = await users.updateOne(
    { email: 'admin@gordito.com' },
    { $set: { role: 'admin' } }
  );
  console.log('✅ admin@gordito.com → role "admin":', r2.modifiedCount ? '1 modified' : '0 (already admin or not found)');

  await mongoose.disconnect();
  console.log('✅ Done. Disconnected.');
}

main().catch((err) => {
  console.error('❌', err);
  process.exit(1);
});
