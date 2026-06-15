import type { IPapaOrder } from '@/lib/models/PapaOrder';
import { papaEvent } from '@/lib/papa-event';
import { CONTACT_EMAIL } from '@/lib/contact-email';
import { siteConfig } from '@/lib/site-config';
import { SOCIAL_URLS } from '@/lib/social-links';
import { getSiteUrl } from '@/lib/stripe';

const RECETARIO_PDF_URL = `${getSiteUrl()}/ebooks/recetario.pdf`;

function formatMoney(amountCents: number, currency: string): string {
  return new Intl.NumberFormat('es-PR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amountCents / 100);
}

function embroideryLabel(customFields: Record<string, string>): string | null {
  for (const [key, value] of Object.entries(customFields)) {
    if (/nombre|personaliz/i.test(key) && value.trim()) {
      return value.trim();
    }
  }
  const first = Object.values(customFields).find((v) => v.trim());
  return first?.trim() ?? null;
}

function bundleExtras(bundleId: string): string {
  if (bundleId === 'vip' || bundleId === 'legado') {
    return `
      <p style="margin:0 0 12px 0;">
        En los próximos días recibirás también el <strong>video exclusivo de saludo</strong> y la invitación al <strong>grupo privado de WhatsApp</strong>.
      </p>
    `;
  }
  return '';
}

export function buildPapaCustomerEmailHtml(order: IPapaOrder): string {
  const name = order.customerName?.trim();
  const greeting = name ? `Hola, <strong>${name}</strong>` : 'Hola';
  const totalLabel = formatMoney(order.amountTotal, order.currency);
  const bordado = embroideryLabel(order.customFields as Record<string, string>);

  const bordadoBlock = bordado
    ? `<p style="margin:0 0 16px 0;">Bordado: <strong>${bordado}</strong></p>`
    : '';

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Confirmación — El Sabor de Papá</title>
</head>
<body style="margin:0;padding:0;background:#F2EDE6;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#FAF8F5;border-radius:16px;overflow:hidden;border:1px solid #E8E0D8;">
          <tr>
            <td style="background:#1A1412;padding:32px 28px;text-align:center;">
              <p style="margin:0 0 8px 0;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#E8D4BC;">
                El Sabor de Papá
              </p>
              <h1 style="margin:0;font-size:26px;line-height:1.25;color:#FAF8F5;font-weight:bold;">
                Tu delantal está confirmado
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:32px 28px;font-size:17px;line-height:1.65;color:#1A1412;">
              <p style="margin:0 0 20px 0;">${greeting},</p>
              <p style="margin:0 0 20px 0;">
                Gracias por confiar en nosotros. Recibimos tu pedido <strong>${order.bundleTitle}</strong> (${totalLabel}).
              </p>
              ${bordadoBlock}
              <p style="margin:0 0 20px 0;">
                Ya estamos preparando el bordado. Te contactamos por este correo con los detalles de recogida o envío según lo que elegiste en Stripe.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:0 28px 28px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F2EDE6;border-radius:12px;border:1px solid #E8E0D8;">
                <tr>
                  <td style="padding:22px 20px;font-size:16px;line-height:1.6;color:#1A1412;">
                    <p style="margin:0 0 12px 0;font-weight:bold;color:#C4472B;">Qué sigue</p>
                    <p style="margin:0 0 10px 0;">✔ Bordado a mano con el nombre que nos diste</p>
                    <p style="margin:0 0 10px 0;">✔ Recogida en ${papaEvent.pickupLocation}: ${papaEvent.pickupFriday} o ${papaEvent.pickupSaturday}</p>
                    <p style="margin:0;">✔ Meta: tenerlo listo antes del ${papaEvent.fathersDayLabel}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:0 28px 32px 28px;font-size:17px;line-height:1.65;color:#1A1412;">
              <p style="margin:0 0 12px 0;font-weight:bold;">Tu recetario digital</p>
              <p style="margin:0 0 16px 0;">
                Como parte de tu compra, tienes <strong>Las 20 Recetas Favoritas del Sabor</strong> — sazón boricua de verdad, listas para tu cocina.
              </p>
              <p style="margin:0 0 20px 0;color:#6B5B4E;font-size:15px;">
                Descárgalo con el botón de abajo. Guárdalo en tu teléfono para tenerlo a mano en la cocina.
              </p>
              ${bundleExtras(order.bundleId)}
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:0 28px 16px 28px;">
              <a href="${RECETARIO_PDF_URL}"
                style="background:#1A1412;color:#ffffff;padding:16px 32px;font-size:17px;font-weight:bold;text-decoration:none;border-radius:999px;display:inline-block;">
                Descargar recetario PDF
              </a>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:0 28px 32px 28px;">
              <a href="https://gorditodelsabor.com/el-sabor-de-papa"
                style="background:#C4472B;color:#ffffff;padding:16px 32px;font-size:17px;font-weight:bold;text-decoration:none;border-radius:999px;display:inline-block;">
                Ver detalles del evento
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding:24px 28px 32px 28px;text-align:center;font-size:14px;line-height:1.6;color:#6B5B4E;border-top:1px solid #E8E0D8;">
              <p style="margin:0 0 12px 0;">¿Dudas? Escríbenos en nuestro
                <a href="${siteConfig.whatsappGroup}" style="color:#C4472B;font-weight:bold;text-decoration:none;">grupo de WhatsApp</a>
                o a <a href="mailto:${CONTACT_EMAIL}" style="color:#C4472B;font-weight:bold;text-decoration:none;">${CONTACT_EMAIL}</a>
              </p>
              <p style="margin:0 0 12px 0;">
                <a href="${SOCIAL_URLS.instagram}" style="color:#C4472B;text-decoration:none;font-weight:bold;">@elgorditodelsaborpr</a>
              </p>
              <p style="margin:0;">— El Gordito del Sabor</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function getPapaCustomerEmailSubject(order: IPapaOrder): string {
  return `Confirmado: tu delantal + recetario digital (${order.bundleTitle})`;
}
