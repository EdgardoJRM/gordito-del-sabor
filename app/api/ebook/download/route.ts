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
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 0;">
          <!-- Header -->
          <div style="padding: 40px 30px; border-bottom: 1px solid #1C1C1E; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.02em;">El Gordito del Sabor</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px; color: #A1A1A6; letter-spacing: 0.05em;">Recetas boricuas con sazón de verdad</p>
          </div>

          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <!-- Greeting -->
            <div style="margin-bottom: 32px;">
              <h2 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; color: #fff;">¡Hola ${name}!</h2>
              <p style="margin: 0; font-size: 16px; color: #A1A1A6;">Tu recetario está listo para descargar</p>
            </div>

            <!-- Description -->
            <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #A1A1A6;">
              Gracias por descargar las 20 Recetas Favoritas del Sabor. Aquí encontrarás recetas auténticas boricuas con instrucciones claras, ingredientes accesibles y el sabor que caracteriza al Gordito.
            </p>

            <!-- What's Included -->
            <div style="margin: 32px 0; padding: 24px; background-color: #1C1C1E; border-left: 3px solid #FF3B30;">
              <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 700; color: #FF3B30; text-transform: uppercase; letter-spacing: 0.05em;">Incluye</h3>
              <ul style="margin: 0; padding: 0; list-style: none; font-size: 14px; color: #A1A1A6; line-height: 1.8;">
                <li style="margin-bottom: 8px;">✓ 20 recetas auténticas boricuas</li>
                <li style="margin-bottom: 8px;">✓ Instrucciones paso a paso</li>
                <li style="margin-bottom: 8px;">✓ Tiempos de preparación realistas</li>
                <li style="margin-bottom: 8px;">✓ Ingredientes accesibles</li>
                <li>✓ Formato PDF descargable</li>
              </ul>
            </div>

            <!-- Recipes Grid -->
            <div style="margin: 32px 0;">
              <h3 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 700; color: #FF3B30; text-transform: uppercase; letter-spacing: 0.05em;">Las 20 Recetas</h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 13px; color: #A1A1A6;">
                <div>🍽️ Arroz con Gandules</div>
                <div>🍽️ Pernil Asado</div>
                <div>🍽️ Mofongo</div>
                <div>🍽️ Camarones al Ajillo</div>
                <div>🍽️ Pollo Guisado</div>
                <div>🍽️ Bistec Encebollado</div>
                <div>🍽️ Alcapurrias</div>
                <div>🍽️ Pasteles</div>
                <div>🍽️ Ropa Vieja</div>
                <div>🍽️ Tostones</div>
                <div>🍽️ Bacalao a la Vizcaína</div>
                <div>🍽️ Arroz con Pollo</div>
                <div>🍽️ Carne Guisada</div>
                <div>🍽️ Empanadillas</div>
                <div>🍽️ Sorullitos</div>
                <div>🍽️ Habichuelas Guisadas</div>
                <div>🍽️ Chuletas Fritas</div>
                <div>🍽️ Yuca con Mojo</div>
                <div>🍽️ Ensalada de Pulpo</div>
                <div>🍽️ Flan Casero</div>
              </div>
            </div>

            <!-- CTA Button -->
            <div style="text-align: center; margin: 32px 0;">
              <a href="https://gorditodelsabor.com/ebook/descarga?email=${encodeURIComponent(email)}" 
                 style="display: inline-block; background-color: #FF3B30; color: #fff; padding: 16px 48px; text-decoration: none; font-weight: 700; font-size: 15px; letter-spacing: 0.02em; transition: all 0.2s ease;">
                Descargar Recetario
              </a>
            </div>

            <!-- Fallback Link -->
            <p style="margin: 24px 0 0 0; font-size: 12px; color: #6E6E73; text-align: center;">
              Si el botón no funciona, copia este enlace:<br>
              <a href="https://gorditodelsabor.com/ebook/descarga?email=${encodeURIComponent(email)}" style="color: #FF3B30; text-decoration: none; word-break: break-all;">
                gorditodelsabor.com/ebook/descarga
              </a>
            </p>
          </div>

          <!-- Footer -->
          <div style="padding: 30px; border-top: 1px solid #1C1C1E; text-align: center; font-size: 12px; color: #6E6E73;">
            <p style="margin: 0 0 12px 0;">
              <a href="https://gorditodelsabor.com" style="color: #FF3B30; text-decoration: none;">Visita nuestro sitio</a> • 
              <a href="https://gorditodelsabor.com/recetas" style="color: #FF3B30; text-decoration: none;">Ver más recetas</a>
            </p>
            <p style="margin: 0;">© 2026 El Gordito del Sabor. Todos los derechos reservados.</p>
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
