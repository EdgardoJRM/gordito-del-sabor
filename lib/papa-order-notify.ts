import { Resend } from 'resend';
import type { IPapaOrder } from '@/lib/models/PapaOrder';
import { siteConfig } from '@/lib/site-config';
import { CONTACT_EMAIL } from '@/lib/contact-email';
import {
  buildPapaCustomerEmailHtml,
  getPapaCustomerEmailSubject,
} from '@/lib/papa-customer-email';
import { getResendFromAddress } from '@/lib/resend-from';
import type { InventorySnapshot } from '@/lib/papa-inventory';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function notifyEmail(): string {
  return process.env.PAPA_ORDER_NOTIFY_EMAIL?.trim() || siteConfig.email;
}

function formatMoney(amountCents: number, currency: string): string {
  return new Intl.NumberFormat('es-PR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amountCents / 100);
}

function customFieldsHtml(customFields: Record<string, string>): string {
  const entries = Object.entries(customFields);
  if (entries.length === 0) {
    return '<p><em>Sin campos extra en Stripe.</em></p>';
  }

  return `
    <ul>
      ${entries
        .map(([label, value]) => `<li><strong>${label}:</strong> ${value}</li>`)
        .join('')}
    </ul>
  `;
}

export async function sendPapaOrderEmails(
  order: IPapaOrder,
  inventory: InventorySnapshot
): Promise<void> {
  if (!resend) {
    console.warn('RESEND_API_KEY no configurada — emails de pedido omitidos');
    return;
  }

  const from = getResendFromAddress();
  const totalLabel = formatMoney(order.amountTotal, order.currency);
  const customFields = customFieldsHtml(order.customFields as Record<string, string>);
  const customerHtml = buildPapaCustomerEmailHtml(order);

  const teamHtml = `
    <h2>Nuevo pedido — El Sabor de Papá</h2>
    <p><strong>Bundle:</strong> ${order.bundleTitle} (${order.bundleId})</p>
    <p><strong>Total:</strong> ${totalLabel}</p>
    <p><strong>Delantales:</strong> ${order.apronCount}</p>
    <p><strong>Cliente:</strong> ${order.customerName ?? '—'} &lt;${order.customerEmail}&gt;</p>
    <h3>Datos del formulario Stripe</h3>
    ${customFields}
    <hr />
    <p><strong>Inventario:</strong> ${inventory.sold} vendidos · ${inventory.remaining} restantes de ${inventory.total}</p>
    <p><strong>Stripe session:</strong> ${order.stripeSessionId}</p>
  `;

  const [teamResult, customerResult] = await Promise.all([
    resend.emails.send({
      from,
      replyTo: CONTACT_EMAIL,
      to: notifyEmail(),
      subject: `Nuevo pedido Papá — ${order.bundleTitle} (${inventory.remaining} quedan)`,
      html: teamHtml,
    }),
    resend.emails.send({
      from,
      replyTo: CONTACT_EMAIL,
      to: order.customerEmail,
      subject: getPapaCustomerEmailSubject(order),
      html: customerHtml,
    }),
  ]);

  if (teamResult.error) {
    console.error('Error enviando email al equipo:', teamResult.error);
    throw new Error(teamResult.error.message);
  }

  if (customerResult.error) {
    console.error('Error enviando email al cliente:', customerResult.error);
    throw new Error(customerResult.error.message);
  }

  console.info('Papa order emails sent', {
    sessionId: order.stripeSessionId,
    customerEmail: order.customerEmail,
    teamId: teamResult.data?.id,
    customerId: customerResult.data?.id,
  });
}
