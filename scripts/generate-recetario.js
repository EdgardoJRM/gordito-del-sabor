/**
 * Genera public/ebooks/recetario.pdf desde scripts/recetas-data.js
 * Uso: node scripts/generate-recetario.js
 */

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const ROOT = path.join(__dirname, '..');
const FONTS_DIR = path.join(ROOT, 'public/images/fonts');
const OUTPUT = path.join(ROOT, 'public/ebooks/recetario.pdf');

/**
 * Imágenes JPEG/PNG (PDFKit no soporta WebP).
 * Portada / índice / contraportada: Unsplash (Puerto Rico).
 *   Bandera en playa — Ana Toledo
 *   https://unsplash.com/photos/red-and-white-flag-on-beach-shore-during-daytime-R7VNq6RMNM4
 * (Licencia Unsplash: uso comercial permitido.)
 */
const HERO_PR = path.join(ROOT, 'public/ebooks/recetario-portada-pr.jpg');
const COVER_IMAGE = HERO_PR;
const INDEX_BANNER = HERO_PR;
const BACK_PORTRAIT = HERO_PR;
/** Rotación de fotos de comida por receta (variación visual) */
const RECIPE_BANNER_POOL = [
  'public/images/recipes/pernil.jpg',
  'public/images/recipes/arroz-gandules.jpg',
  'public/images/recipes/mofongo.jpg',
  'public/images/recipes/tostones.jpg',
  'public/images/recipes/alcapurrias.jpg',
  'public/images/recipes/ceviche.jpg',
];

const COVER_HERO_H = 280;
const INDEX_BANNER_H = 72;
const RECIPE_BANNER_H = 88;

const COLORS = {
  dark: '#1A1412',
  cream: '#FAF8F5',
  gold: '#E8D4BC',
  terracotta: '#C4472B',
  earth: '#6B5B4E',
};

const PAGE = { w: 612, h: 792 };
const M = { top: 56, bottom: 56, left: 54, right: 54 };
const CONTENT_W = PAGE.w - M.left - M.right;

function loadData() {
  delete require.cache[require.resolve('./recetas-data')];
  return require('./recetas-data');
}

function imageFileOk(p) {
  try {
    return fs.existsSync(p);
  } catch {
    return false;
  }
}

/** Inserta imagen; si falla el archivo, no hace nada */
function drawImageCover(doc, imgPath, x, y, w, h) {
  if (!imageFileOk(imgPath)) return;
  try {
    doc.image(imgPath, x, y, {
      cover: [w, h],
      align: 'center',
      valign: 'center',
    });
  } catch {
    /* formato no soportado o archivo dañado */
  }
}

function registerFonts(doc) {
  doc.registerFont('ClashBold', path.join(FONTS_DIR, 'ClashDisplay-Bold.otf'));
  doc.registerFont('ClashLight', path.join(FONTS_DIR, 'ClashDisplay-Light.otf'));
  doc.registerFont('GenReg', path.join(FONTS_DIR, 'GeneralSans-Regular.otf'));
  doc.registerFont('GenBold', path.join(FONTS_DIR, 'GeneralSans-Bold.otf'));
  doc.registerFont('GenItalic', path.join(FONTS_DIR, 'GeneralSans-Italic.otf'));
}

function drawCover(doc, data) {
  doc.rect(0, 0, PAGE.w, PAGE.h).fill(COLORS.dark);

  drawImageCover(doc, COVER_IMAGE, 0, 0, PAGE.w, COVER_HERO_H);
  doc.rect(0, COVER_HERO_H - 1, PAGE.w, 3).fill(COLORS.terracotta);
  doc.rect(0, COVER_HERO_H, PAGE.w, PAGE.h - COVER_HERO_H).fill(COLORS.dark);

  let y = COVER_HERO_H + 44;
  doc.font('GenBold').fontSize(10).fillColor(COLORS.gold).text('RECETARIO DIGITAL', M.left, y, {
    width: CONTENT_W,
    align: 'center',
  });
  y += 36;

  doc.font('ClashBold').fontSize(40).fillColor(COLORS.cream).text('LAS 20 RECETAS', M.left, y, {
    width: CONTENT_W,
    align: 'center',
  });
  y += 48;

  doc.font('ClashLight').fontSize(36).fillColor(COLORS.gold).text('FAVORITAS DEL SABOR', M.left, y, {
    width: CONTENT_W,
    align: 'center',
  });
  y += 36;

  doc.font('GenItalic').fontSize(14).fillColor('#D4C9BC').text(data.subtitulo, M.left, y, {
    width: CONTENT_W,
    align: 'center',
  });
  y += 72;

  doc.font('GenReg').fontSize(12).fillColor('#9C8B80').text(data.autor, M.left, y, {
    width: CONTENT_W,
    align: 'center',
  });

  doc.addPage();
}

function drawIndex(doc, data) {
  doc.rect(0, 0, PAGE.w, PAGE.h).fill('#F5F0E8');
  let y = M.top;

  drawImageCover(doc, INDEX_BANNER, M.left, y, CONTENT_W, INDEX_BANNER_H);
  doc.rect(M.left, y + INDEX_BANNER_H, CONTENT_W, 2).fill(COLORS.terracotta);
  y += INDEX_BANNER_H + 20;

  doc.font('ClashBold').fontSize(28).fillColor(COLORS.dark).text('Índice', M.left, y);
  y += 48;

  doc.font('GenReg').fontSize(11).fillColor(COLORS.earth);
  data.recetas.forEach((r, i) => {
    if (y > PAGE.h - M.bottom - 24) {
      doc.addPage();
      doc.rect(0, 0, PAGE.w, PAGE.h).fill('#F5F0E8');
      y = M.top;
    }
    const line = `${String(i + 1).padStart(2, '0')}.  ${r.nombre}`;
    doc.text(line, M.left, y, { width: CONTENT_W });
    y += 22;
  });

  doc.addPage();
}

function ensureSpace(doc, y, needed, onNewPage) {
  if (y + needed > PAGE.h - M.bottom) {
    doc.addPage();
    if (onNewPage) onNewPage();
    return M.top;
  }
  return y;
}

function drawRecipe(doc, data, recipe, index) {
  const onRecipePage = () => {
    doc.rect(0, 0, PAGE.w, PAGE.h).fill('#FAF8F5');
  };

  onRecipePage();
  let y = M.top;

  doc.font('GenBold').fontSize(9).fillColor(COLORS.terracotta).text(`RECETA ${index + 1} / ${data.recetas.length}`, M.left, y);
  y += 20;

  const accentPath = path.join(ROOT, RECIPE_BANNER_POOL[index % RECIPE_BANNER_POOL.length]);
  y = ensureSpace(doc, y, RECIPE_BANNER_H + 24, onRecipePage);
  drawImageCover(doc, accentPath, M.left, y, CONTENT_W, RECIPE_BANNER_H);
  doc.rect(M.left, y + RECIPE_BANNER_H, CONTENT_W, 2).fill(COLORS.terracotta);
  y += RECIPE_BANNER_H + 16;

  doc.font('ClashBold').fontSize(26).fillColor(COLORS.dark);
  const titleH = doc.heightOfString(recipe.nombre, { width: CONTENT_W });
  doc.text(recipe.nombre, M.left, y, { width: CONTENT_W });
  y += titleH + 16;

  const meta = `Tiempo: ${recipe.tiempo}   ·   Porciones: ${recipe.porciones}   ·   Dificultad: ${recipe.dificultad}`;
  doc.font('GenReg').fontSize(10).fillColor(COLORS.earth).text(meta, M.left, y, { width: CONTENT_W });
  y += 28;

  if (recipe.intro && String(recipe.intro).trim()) {
    doc.font('GenItalic').fontSize(10).fillColor(COLORS.earth);
    const introH = doc.heightOfString(recipe.intro, { width: CONTENT_W });
    y = ensureSpace(doc, y, introH + 16, onRecipePage);
    doc.text(recipe.intro, M.left, y, { width: CONTENT_W });
    y += introH + 20;
  }

  doc.font('GenBold').fontSize(12).fillColor(COLORS.dark).text('Ingredientes', M.left, y);
  y += 22;

  doc.font('GenReg').fontSize(11).fillColor(COLORS.dark);
  doc.font('GenReg').fontSize(11);
  recipe.ingredientes.forEach((ing) => {
    const block = `•  ${ing}`;
    const h = doc.heightOfString(block, { width: CONTENT_W - 12 });
    y = ensureSpace(doc, y, h + 8, onRecipePage);
    doc.fillColor(COLORS.dark).text(block, M.left + 8, y, { width: CONTENT_W - 12 });
    y += h + 10;
  });

  y += 12;
  y = ensureSpace(doc, y, 40, onRecipePage);
  doc.font('GenBold').fontSize(12).fillColor(COLORS.dark).text('Preparación', M.left, y);
  y += 22;

  doc.font('GenReg').fontSize(11).fillColor(COLORS.dark);
  recipe.instrucciones.forEach((step, si) => {
    const body = `${si + 1}. ${step}`;
    const h = doc.heightOfString(body, { width: CONTENT_W });
    y = ensureSpace(doc, y, h + 10, onRecipePage);
    doc.text(body, M.left, y, { width: CONTENT_W, align: 'left' });
    y += h + 12;
  });

  if (recipe.notas && String(recipe.notas).trim()) {
    y += 8;
    y = ensureSpace(doc, y, 60, onRecipePage);
    doc.rect(M.left, y, CONTENT_W, 1).fill(COLORS.terracotta);
    y += 16;
    doc.font('GenBold').fontSize(10).fillColor(COLORS.terracotta).text('Nota del chef', M.left, y);
    y += 18;
    doc.font('GenReg').fontSize(10);
    const nh = doc.heightOfString(recipe.notas, { width: CONTENT_W });
    y = ensureSpace(doc, y, nh + 8, onRecipePage);
    doc.fillColor(COLORS.earth).text(recipe.notas, M.left, y, { width: CONTENT_W });
    y += nh + 8;
  }
}

function drawBackCover(doc, data) {
  doc.rect(0, 0, PAGE.w, PAGE.h).fill(COLORS.dark);

  const portraitW = 168;
  const portraitX = (PAGE.w - portraitW) / 2;
  let y = 200;
  if (imageFileOk(BACK_PORTRAIT)) {
    try {
      doc.save();
      doc.roundedRect(portraitX, 72, portraitW, portraitW, 8).clip();
      doc.image(BACK_PORTRAIT, portraitX, 72, {
        width: portraitW,
        height: portraitW,
        cover: [portraitW, portraitW],
        align: 'center',
        valign: 'center',
      });
      doc.restore();
      doc
        .lineWidth(1.5)
        .strokeColor(COLORS.terracotta)
        .roundedRect(portraitX, 72, portraitW, portraitW, 8)
        .stroke();
      y = 72 + portraitW + 36;
    } catch {
      /* sin retrato si falla */
    }
  }

  doc.font('ClashLight').fontSize(32).fillColor(COLORS.gold).text('Gracias por cocinar', M.left, y, {
    width: CONTENT_W,
    align: 'center',
  });
  y += 48;

  doc.font('ClashBold').fontSize(36).fillColor(COLORS.cream).text('con sazón de verdad', M.left, y, {
    width: CONTENT_W,
    align: 'center',
  });
  y += 100;

  doc.font('GenReg').fontSize(12).fillColor('#D4C9BC').text('Más recetas y contenido en:', M.left, y, {
    width: CONTENT_W,
    align: 'center',
  });
  y += 28;

  doc.font('GenBold').fontSize(14).fillColor(COLORS.terracotta).text(data.sitio.replace('https://', ''), M.left, y, {
    width: CONTENT_W,
    align: 'center',
    link: data.sitio,
  });
  y += 48;

  doc.font('GenReg').fontSize(11).fillColor('#9C8B80').text('Instagram', M.left, y, { width: CONTENT_W, align: 'center' });
  y += 18;

  doc.font('GenBold').fontSize(12).fillColor(COLORS.cream).text(data.instagram, M.left, y, {
    width: CONTENT_W,
    align: 'center',
    link: data.instagramUrl,
  });
}

function main() {
  const data = loadData();
  if (!data.recetas || data.recetas.length !== 20) {
    console.error('recetas-data.js debe tener exactamente 20 recetas.');
    process.exit(1);
  }

  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: M.top, bottom: M.bottom, left: M.left, right: M.right },
  });

  registerFonts(doc);

  const stream = fs.createWriteStream(OUTPUT);
  doc.pipe(stream);

  drawCover(doc, data);

  drawIndex(doc, data);

  data.recetas.forEach((r, i) => {
    drawRecipe(doc, data, r, i);
    if (i < data.recetas.length - 1) {
      doc.addPage();
    }
  });

  doc.addPage();
  drawBackCover(doc, data);

  doc.end();

  stream.on('finish', () => {
    console.log(`OK: ${OUTPUT}`);
  });
}

main();
