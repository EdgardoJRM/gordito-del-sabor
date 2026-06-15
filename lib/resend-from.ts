/** Remitente de emails transaccionales — debe estar en un dominio verificado en Resend. */
export function getResendFromAddress(): string {
  return (
    process.env.RESEND_FROM?.trim() ||
    'El Gordito del Sabor <noreply@gorditodelsabor.com>'
  );
}
