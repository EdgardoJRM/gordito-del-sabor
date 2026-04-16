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
 * Portada / contraportada: garita y mar en El Morro (Viejo San Juan), Puerto Rico.
 *   Carlos Ojeda — https://unsplash.com/photos/a-stone-tower-on-a-cliff-ni8hsOkcFj8
 * (Licencia Unsplash.)
 */
const HERO_PR = path.join(ROOT, 'public/ebooks/recetario-portada-pr.jpg');
const COVER_IMAGE = HERO_PR;
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

/** Ancho de la columna de imagen en portada (resto = tipografía) */
const COVER_COL_W = 268;
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

const WATERMARK_TEXT = 'EL GORDITO DEL SABOR';
const FOOTER_HANDLE = '[@EL GORDITO DEL SABOR]';
const FOOTER_DOMAIN_LABEL = 'GORDITODELSABOR.COM';
const FOOTER_DOMAIN_URL = 'https://gorditodelsabor.com';

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

/**
 * Marca de agua + firma en pie (dibujar al final con bufferPages + switchToPage).
 * @param {number} pageIndex 0 = portada (pie distinto; sin marca de agua para no ensuciar el diseño)
 */
function drawPageWatermarkAndFooter(doc, pageIndex) {
  const isCover = pageIndex === 0;

  if (!isCover) {
    doc.save();
    doc.opacity(0.09);
    doc.font('ClashLight').fontSize(44).fillColor(COLORS.terracotta);
    doc.rotate(-28, { origin: [PAGE.w / 2, PAGE.h / 2] });
    doc.text(WATERMARK_TEXT, 0, PAGE.h / 2 - 22, {
      width: PAGE.w,
      align: 'center',
    });
    doc.restore();
  }

  doc.save();
  doc.opacity(1);
  const bandH = 48;
  const bandY = PAGE.h - bandH;
  doc.rect(0, bandY, PAGE.w, bandH).fill('#1A1412');
  doc.fillColor('#FAF8F5');
  doc.font('GenBold').fontSize(9.5);
  doc.text(FOOTER_HANDLE, 0, bandY + 10, {
    width: PAGE.w,
    align: 'center',
  });
  doc.fillColor(COLORS.gold);
  doc.font('GenBold').fontSize(8.5);
  doc.text(FOOTER_DOMAIN_LABEL, M.left, bandY + 28, {
    width: PAGE.w - M.left - M.right,
    align: 'left',
    link: FOOTER_DOMAIN_URL,
    underline: false,
  });
  doc.restore();
}

function drawCover(doc, data) {
  doc.rect(0, 0, PAGE.w, PAGE.h).fill(COLORS.dark);

  drawImageCover(doc, COVER_IMAGE, 0, 0, COVER_COL_W, PAGE.h);
  doc.rect(COVER_COL_W - 1, 0, 2, PAGE.h).fill(COLORS.terracotta);
  doc.rect(COVER_COL_W, 0, PAGE.w - COVER_COL_W, PAGE.h).fill(COLORS.dark);

  const textX = COVER_COL_W + 32;
  const textW = PAGE.w - COVER_COL_W - 64;

  const blocks = [
    { font: 'GenBold', size: 9, color: COLORS.gold, text: 'RECETARIO DIGITAL', gap: 26 },
    { font: 'ClashBold', size: 27, color: COLORS.cream, text: 'LAS 20 RECETAS', gap: 16 },
    { font: 'ClashLight', size: 24, color: COLORS.gold, text: 'FAVORITAS DEL SABOR', gap: 22 },
    {
      font: 'GenItalic',
      size: 12,
      color: '#D4C9BC',
      text: data.subtitulo,
      lineGap: 4,
      gap: 36,
    },
    { font: 'GenReg', size: 11, color: '#9C8B80', text: data.autor, gap: 0 },
  ];

  let totalH = 0;
  const heights = [];
  blocks.forEach((b, i) => {
    doc.font(b.font).fontSize(b.size);
    const opts = { width: textW, align: 'center' };
    if (b.lineGap != null) opts.lineGap = b.lineGap;
    const h = doc.heightOfString(b.text, opts);
    heights.push(h);
    totalH += h;
    if (i < blocks.length - 1) totalH += blocks[i].gap;
  });

  let y = Math.max(48, (PAGE.h - totalH) / 2);

  blocks.forEach((b, i) => {
    doc.font(b.font).fontSize(b.size).fillColor(b.color);
    const opts = { width: textW, align: 'center' };
    if (b.lineGap != null) opts.lineGap = b.lineGap;
    doc.text(b.text, textX, y, opts);
    y += heights[i];
    if (i < blocks.length - 1) y += b.gap;
  });

  doc.addPage();
}

function drawIndex(doc, data) {
  doc.rect(0, 0, PAGE.w, PAGE.h).fill('#F5F0E8');
  let y = M.top;

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
    bufferPages: true,
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

  const range = doc.bufferedPageRange();
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(range.start + i);
    drawPageWatermarkAndFooter(doc, i);
  }

  doc.end();

  stream.on('finish', () => {
    console.log(`OK: ${OUTPUT}`);
  });
}

main();
