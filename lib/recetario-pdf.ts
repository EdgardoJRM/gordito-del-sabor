import fs from 'fs';
import path from 'path';

const PDF_FILENAME = 'Las-20-Recetas-Favoritas-Del-Sabor.pdf';

export function getRecetarioPdfPath(): string {
  return path.join(process.cwd(), 'public/ebooks/recetario.pdf');
}

export function loadRecetarioPdfBuffer(): Buffer | null {
  try {
    return fs.readFileSync(getRecetarioPdfPath());
  } catch {
    console.warn('Recetario PDF no encontrado en public/ebooks/recetario.pdf');
    return null;
  }
}

export function getRecetarioPdfAttachment() {
  const content = loadRecetarioPdfBuffer();
  if (!content) return [];
  return [{ filename: PDF_FILENAME, content }];
}
