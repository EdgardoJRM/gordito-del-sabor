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
      from: 'onboarding@resend.dev', // Email de prueba de Resend
      to: email,
      subject: '¡Tu recetario está listo! Las 20 Recetas Favoritas del Sabor',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f5f5f5; padding: 20px;">
          <div style="background-color: #000; color: #fff; padding: 30px; text-align: center; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 28px;">¡Hola ${name}!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; color: #A1A1A6;">Tu recetario está listo</p>
          </div>

          <div style="background-color: #fff; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #000; margin-top: 0;">Las 20 Recetas Favoritas del Sabor</h2>
            <p style="color: #333; line-height: 1.6;">
              Gracias por descargar nuestro recetario digital. Aquí encontrarás las 20 recetas más populares del Gordito, 
              con instrucciones claras, ingredientes accesibles y el auténtico sabor boricua que caracteriza nuestras preparaciones.
            </p>

            <div style="background-color: #f9f9f9; padding: 20px; border-left: 4px solid #FF3B30; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #FF3B30;">Incluye:</h3>
              <ul style="color: #333; margin: 10px 0;">
                <li>20 recetas auténticas boricuas</li>
                <li>Instrucciones paso a paso</li>
                <li>Tiempos de preparación realistas</li>
                <li>Ingredientes accesibles</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="https://gorditodelsabor.com/ebook/descarga?email=${encodeURIComponent(email)}" 
                 style="display: inline-block; background-color: #FF3B30; color: #fff; padding: 15px 40px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px;">
                Descargar Recetario
              </a>
            </div>

            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
              <a href="https://gorditodelsabor.com/ebook/descarga?email=${encodeURIComponent(email)}" style="color: #FF3B30; text-decoration: none;">
                https://gorditodelsabor.com/ebook/descarga
              </a>
            </p>
          </div>

          <div style="background-color: #fff; padding: 20px; border-radius: 10px; text-align: center; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 12px; margin: 0;">
              © 2026 El Gordito del Sabor. Todos los derechos reservados.<br>
              <a href="https://gorditodelsabor.com" style="color: #FF3B30; text-decoration: none;">Visita nuestro sitio</a> | 
              <a href="https://gorditodelsabor.com/recetas" style="color: #FF3B30; text-decoration: none;">Ver más recetas</a>
            </p>
          </div>
        </div>
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
