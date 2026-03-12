import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import dbConnect from '@/lib/mongodb';
import Lead from '@/lib/models/Lead';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, phone } = await req.json();

    // Validar campos requeridos
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Nombre y email son requeridos' },
        { status: 400 }
      );
    }

    // Conectar a MongoDB y guardar lead
    await dbConnect();
    await Lead.create({
      name,
      email,
      phone,
      source: 'ebook',
    });

    // Leer el PDF del ebook
    const ebookPath = path.join(process.cwd(), 'public/ebooks/recetario.pdf');
    let ebookBuffer: Buffer | null = null;

    try {
      ebookBuffer = fs.readFileSync(ebookPath);
    } catch (error) {
      console.warn('Ebook PDF not found, sending email without attachment');
    }

    // Enviar email con Resend
    const emailResponse = await resend.emails.send({
      from: 'El Gordito del Sabor <noreply@gorditodelsabor.com>',
      to: email,
      subject: '¡Tu recetario está listo! Las 20 Recetas Favoritas del Sabor',
      html: `
        <!DOCTYPE html>
        <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <style>
            html,body{margin:0 !important;padding:0 !important;min-height:100% !important;width:100% !important;-webkit-font-smoothing:antialiased;}
            *{-ms-text-size-adjust:100%;}
            #outlook a{padding:0;}
            .ReadMsgBody,.ExternalClass{width:100%;}
            table,td,th{mso-table-lspace:0 !important;mso-table-rspace:0 !important;border-collapse:collapse;}
            img{border:0;outline:0;line-height:100%;text-decoration:none;-ms-interpolation-mode:bicubic;}
            a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;}
            @media (max-width:620px){
              .pc-project-body{min-width:0 !important;}
              .pc-project-container,.pc-component{width:100% !important;}
              .pc-w620-padding-0-0-0-0{padding:0 !important;}
              .pc-w620-padding-20-20-20-20{padding:20px !important;}
              .pc-w620-font-size-36px{font-size:36px !important;}
              .pc-w620-line-height-40px{line-height:40px !important;}
            }
          </style>
        </head>
        <body style="width:100% !important;min-height:100% !important;margin:0 !important;padding:0 !important;background-color:#000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',sans-serif;">
          <table style="width:100%;max-width:600px;margin:0 auto;border-collapse:collapse;" border="0" cellspacing="0" cellpadding="0">
            <!-- Header with Brand -->
            <tr>
              <td style="padding:40px 30px;border-bottom:1px solid #1C1C1E;text-align:center;background-color:#000;">
                <h1 style="margin:0;font-size:24px;font-weight:700;color:#fff;letter-spacing:-0.02em;">El Gordito del Sabor</h1>
                <p style="margin:8px 0 0 0;font-size:14px;color:#A1A1A6;letter-spacing:0.05em;">Recetas boricuas con sazón de verdad</p>
              </td>
            </tr>
            
            <!-- Main Content -->
            <tr>
              <td style="padding:40px 30px;background-color:#000;color:#fff;">
                <!-- Greeting -->
                <h2 style="margin:0 0 8px 0;font-size:28px;font-weight:700;color:#fff;">¡Hola ${name}!</h2>
                <p style="margin:0 0 24px 0;font-size:16px;color:#A1A1A6;">Tu recetario está listo para descargar</p>
                
                <!-- Description -->
                <p style="margin:0 0 32px 0;font-size:15px;line-height:1.6;color:#A1A1A6;">
                  Gracias por descargar las 20 Recetas Favoritas del Sabor. Aquí encontrarás recetas auténticas boricuas con instrucciones claras, ingredientes accesibles y el sabor que caracteriza al Gordito.
                </p>
                
                <!-- What's Included -->
                <div style="margin:32px 0;padding:24px;background-color:#1C1C1E;border-left:3px solid #FF3B30;">
                  <h3 style="margin:0 0 16px 0;font-size:14px;font-weight:700;color:#FF3B30;text-transform:uppercase;letter-spacing:0.05em;">Incluye</h3>
                  <ul style="margin:0;padding:0;list-style:none;font-size:14px;color:#A1A1A6;line-height:1.8;">
                    <li style="margin-bottom:8px;">✓ 20 recetas auténticas boricuas</li>
                    <li style="margin-bottom:8px;">✓ Instrucciones paso a paso</li>
                    <li style="margin-bottom:8px;">✓ Tiempos de preparación realistas</li>
                    <li style="margin-bottom:8px;">✓ Ingredientes accesibles</li>
                    <li>✓ Formato PDF descargable</li>
                  </ul>
                </div>
                
                <!-- Recipes Grid -->
                <div style="margin:32px 0;">
                  <h3 style="margin:0 0 16px 0;font-size:14px;font-weight:700;color:#FF3B30;text-transform:uppercase;letter-spacing:0.05em;">Las 20 Recetas</h3>
                  <table style="width:100%;border-collapse:collapse;">
                    <tr>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Arroz con Gandules</td>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Pernil Asado</td>
                    </tr>
                    <tr>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Mofongo</td>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Camarones al Ajillo</td>
                    </tr>
                    <tr>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Pollo Guisado</td>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Bistec Encebollado</td>
                    </tr>
                    <tr>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Alcapurrias</td>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Pasteles</td>
                    </tr>
                    <tr>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Ropa Vieja</td>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Tostones</td>
                    </tr>
                    <tr>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Bacalao a la Vizcaína</td>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Arroz con Pollo</td>
                    </tr>
                    <tr>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Carne Guisada</td>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Empanadillas</td>
                    </tr>
                    <tr>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Sorullitos</td>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Habichuelas Guisadas</td>
                    </tr>
                    <tr>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Chuletas Fritas</td>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Yuca con Mojo</td>
                    </tr>
                    <tr>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Ensalada de Pulpo</td>
                      <td style="width:50%;padding:6px;font-size:13px;color:#A1A1A6;">🍽️ Flan Casero</td>
                    </tr>
                  </table>
                </div>
                
                <!-- CTA Button -->
                <div style="text-align:center;margin:32px 0;">
                  <a href="https://gorditodelsabor.com/ebook/descarga?email=${encodeURIComponent(email)}" style="display:inline-block;background-color:#FF3B30;color:#fff;padding:16px 48px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:0.02em;border-radius:4px;">
                    Descargar Recetario
                  </a>
                </div>
                
                <!-- Fallback Link -->
                <p style="margin:24px 0 0 0;font-size:12px;color:#6E6E73;text-align:center;">
                  Si el botón no funciona, copia este enlace:<br>
                  <a href="https://gorditodelsabor.com/ebook/descarga?email=${encodeURIComponent(email)}" style="color:#FF3B30;text-decoration:none;word-break:break-all;">
                    gorditodelsabor.com/ebook/descarga
                  </a>
                </p>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="padding:30px;border-top:1px solid #1C1C1E;text-align:center;font-size:12px;color:#6E6E73;background-color:#000;">
                <p style="margin:0 0 12px 0;">
                  <a href="https://gorditodelsabor.com" style="color:#FF3B30;text-decoration:none;">Visita nuestro sitio</a> • 
                  <a href="https://gorditodelsabor.com/recetas" style="color:#FF3B30;text-decoration:none;">Ver más recetas</a>
                </p>
                <p style="margin:0;">© 2026 El Gordito del Sabor. Todos los derechos reservados.</p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
      attachments: ebookBuffer
        ? [
            {
              filename: 'Las-20-Recetas-Favoritas-del-Sabor.pdf',
              content: ebookBuffer,
            },
          ]
        : [],
    });

    if (emailResponse.error) {
      console.error('Resend error:', emailResponse.error);
      return NextResponse.json(
        { error: 'Error al enviar el email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email enviado exitosamente',
      email,
    });
  } catch (error) {
    console.error('Error in ebook download:', error);
    return NextResponse.json(
      { error: 'Error al procesar tu solicitud' },
      { status: 500 }
    );
  }
}
