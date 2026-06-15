/**
 * Reenvía emails de confirmación para un pedido Papá ya guardado.
 * Uso: node scripts/resend-papa-order-email.mjs [stripe_session_id]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { Resend } from 'resend';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

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

const SESSION_ID =
  process.argv[2] ||
  'cs_live_b1BNu5W8iQfIsswTczBiuIj0658q7PcjtIHNdDhQ9iO36oPhsUPIDt0tEN';

const CONTACT_EMAIL = 'elgorditodelsaborshop@gmail.com';
const NOTIFY_EMAIL = process.env.PAPA_ORDER_NOTIFY_EMAIL?.trim() || CONTACT_EMAIL;

function formatMoney(amountCents, currency) {
  return new Intl.NumberFormat('es-PR', {
    style: 'currency',
    currency: (currency || 'usd').toUpperCase(),
  }).format(amountCents / 100);
}

function loadPdf() {
  const pdfPath = path.join(ROOT, 'public/ebooks/recetario.pdf');
  if (!fs.existsSync(pdfPath)) {
    console.warn('PDF no encontrado:', pdfPath);
    return [];
  }
  const stat = fs.statSync(pdfPath);
  console.log(`Adjuntando PDF (${(stat.size / 1024 / 1024).toFixed(1)} MB)`);
  return [
    {
      filename: 'Las-20-Recetas-Favoritas-Del-Sabor.pdf',
      content: fs.readFileSync(pdfPath),
    },
  ];
}

async function main() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI no configurada');
  if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY no configurada');

  await mongoose.connect(process.env.MONGODB_URI);
  const order = await mongoose.connection.db
    .collection('papaorders')
    .findOne({ stripeSessionId: SESSION_ID });

  if (!order) {
    throw new Error(`No se encontró pedido con session ${SESSION_ID}`);
  }

  console.log('Pedido:', order.bundleTitle, '→', order.customerEmail);

  const resend = new Resend(process.env.RESEND_API_KEY);
  const attachments = loadPdf();
  const totalLabel = formatMoney(order.amountTotal, order.currency);

  const customerHtml = `
    <h2>¡Gracias! Tu delantal está confirmado</h2>
    <p>Hola${order.customerName ? ` ${order.customerName}` : ''},</p>
    <p>Recibimos tu pedido de <strong>${order.bundleTitle}</strong> (${totalLabel}).</p>
    <p>Tu recetario digital va adjunto en este correo.</p>
    <p>— El Gordito del Sabor</p>
  `;

  const [teamResult, customerResult] = await Promise.all([
    resend.emails.send({
      from: 'El Gordito del Sabor <noreply@gorditodelsabor.com>',
      replyTo: CONTACT_EMAIL,
      to: NOTIFY_EMAIL,
      subject: `Nuevo pedido Papá — ${order.bundleTitle}`,
      html: `<p>Reenvío manual — ${order.customerEmail}</p>`,
    }),
    resend.emails.send({
      from: 'El Gordito del Sabor <noreply@gorditodelsabor.com>',
      replyTo: CONTACT_EMAIL,
      to: order.customerEmail,
      subject: `Confirmado: tu delantal + recetario digital (${order.bundleTitle})`,
      html: customerHtml,
      attachments,
    }),
  ]);

  if (teamResult.error) throw new Error(`Equipo: ${teamResult.error.message}`);
  if (customerResult.error) throw new Error(`Cliente: ${customerResult.error.message}`);

  console.log('OK — emails enviados. ID cliente:', customerResult.data?.id);

  await mongoose.connection.db
    .collection('papaorders')
    .updateOne({ stripeSessionId: SESSION_ID }, { $set: { emailsSentAt: new Date() } });

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('FALLÓ:', err.message || err);
  process.exit(1);
});
