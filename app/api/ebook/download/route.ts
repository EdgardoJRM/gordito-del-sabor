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
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Recetario del Gordito del Sabor</title>
        </head>
        <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff">
                  
                  <!-- HEADER -->
                  <tr>
                    <td align="center" style="background:#000000;padding:40px 20px">
                      <h1 style="color:#ffffff;margin:0;font-size:42px;font-weight:bold;">
                        🔥 El Gordito del Sabor
                      </h1>
                      <p style="color:#cccccc;font-size:20px;margin-top:10px;margin-bottom:0;">
                        Tu recetario gratis está listo
                      </p>
                    </td>
                  </tr>

                  <!-- GREETING -->
                  <tr>
                    <td style="padding:40px 30px;font-size:18px;color:#333333;line-height:1.6">
                      <p style="margin:0 0 20px 0;">
                        ¡Hola <strong>${name}</strong>!
                      </p>
                      <p style="margin:0 0 20px 0;">
                        ¡Gracias por descargar el <strong>Recetario del Gordito del Sabor</strong>!
                      </p>
                      <p style="margin:0 0 20px 0;">
                        Aquí encontrarás <strong>20 de mis recetas favoritas</strong> para cocinar con sazón boricua en tu casa.
                      </p>
                    </td>
                  </tr>

                  <!-- FEATURES -->
                  <tr>
                    <td style="padding:0 30px 30px 30px;font-size:18px;color:#333333;line-height:1.8">
                      <p style="margin:0 0 15px 0;">
                        ✔ Recetas fáciles<br>
                        ✔ Ingredientes simples<br>
                        ✔ Sabor auténtico
                      </p>
                    </td>
                  </tr>

                  <!-- RECIPES LIST -->
                  <tr>
                    <td style="padding:0 30px 30px 30px;font-size:16px;color:#333333;line-height:1.8">
                      <p style="margin:0 0 15px 0;font-weight:bold;">
                        Prepárate para cocinar platos como:
                      </p>
                      <ul style="margin:0;padding-left:20px;font-size:16px">
                        <li>Arroz con Gandules</li>
                        <li>Pernil Asado</li>
                        <li>Mofongo</li>
                        <li>Camarones al Ajillo</li>
                        <li>Pollo Guisado</li>
                        <li>Bistec Encebollado</li>
                        <li>Alcapurrias</li>
                        <li>Pasteles</li>
                        <li>Ropa Vieja</li>
                        <li>Tostones</li>
                        <li>Bacalao a la Vizcaína</li>
                        <li>Arroz con Pollo</li>
                        <li>Carne Guisada</li>
                        <li>Empanadillas</li>
                        <li>Sorullitos</li>
                        <li>Habichuelas Guisadas</li>
                        <li>Chuletas Fritas</li>
                        <li>Yuca con Mojo</li>
                        <li>Ensalada de Pulpo</li>
                        <li>Flan Casero</li>
                      </ul>
                    </td>
                  </tr>

                  <!-- CTA BUTTON -->
                  <tr>
                    <td align="center" style="padding:40px">
                      <a href="https://gorditodelsabor.com/ebook/descarga?email=${encodeURIComponent(email)}"
                        style="
                          background:#FF3B30;
                          color:#ffffff;
                          padding:18px 40px;
                          font-size:20px;
                          font-weight:bold;
                          text-decoration:none;
                          border-radius:8px;
                          display:inline-block;
                        ">
                        Descargar Recetario 🔥
                      </a>
                    </td>
                  </tr>

                  <!-- PROMO DELANTAL -->
                  <tr>
                    <td style="background:#111111;color:#ffffff;text-align:center;padding:40px">
                      <h2 style="margin-top:0;margin-bottom:10px;font-size:28px;">
                        Próximamente
                      </h2>
                      <p style="font-size:18px;margin:0 0 10px 0;">
                        El delantal oficial del Gordito del Sabor está en camino.
                      </p>
                      <p style="font-size:16px;color:#bbbbbb;margin:0;">
                        Los primeros en esta lista tendrán acceso antes que nadie.
                      </p>
                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td style="padding:30px;text-align:center;font-size:14px;color:#999999">
                      <p style="margin:0 0 10px 0;">
                        Sígueme en Instagram
                      </p>
                      <p style="margin:0 0 20px 0;">
                        <a href="https://instagram.com/gorditodelsabor" style="color:#FF3B30;text-decoration:none;font-weight:bold;">
                          @gorditodelsabor
                        </a>
                      </p>
                      <p style="margin:0;">
                        © El Gordito del Sabor
                      </p>
                    </td>
                  </tr>

                </table>
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
