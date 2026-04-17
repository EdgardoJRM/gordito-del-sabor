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
/** Pie manual (franja blanca). El texto del cuerpo no debe pasar de aquí o PDFKit pagina solo y deja huecos. */
const FOOTER_BAND_H = 46;
/** Tope Y del área de texto (encima de la franja del pie). Con margin:0 controlamos nosotros el flujo. */
const CONTENT_TEXT_BOTTOM = PAGE.h - FOOTER_BAND_H - 14;
/** Aire entre el final de Preparación y el bloque Nota del chef */
const NOTA_CHEF_TOP_GAP = 20;
/** Aire entre el último renglón de la nota y la franja del pie */
const NOTA_CHEF_BOTTOM_PAD = 12;

const WATERMARK_TEXT = 'EL GORDITO DEL SABOR';
const FOOTER_SIGNATURE = '@EL GORDITO DEL SABOR';
const FOOTER_LINK_LABEL = 'gorditodelsabor.com';
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

/** Marca de agua diagonal (tras el fondo de la página) */
function drawDiagonalWatermark(doc) {
  doc.save();
  doc.opacity(0.09);
  doc.font('ClashLight').fontSize(44).fillColor(COLORS.terracotta);
  doc.rotate(-28, { origin: [PAGE.w / 2, PAGE.h / 2] });
  const wmW = doc.widthOfString(WATERMARK_TEXT);
  doc.text(WATERMARK_TEXT, (PAGE.w - wmW) / 2, PAGE.h / 2 - 22, { lineBreak: false });
  doc.restore();
}

/**
 * Firma al pie: llamar al terminar CADA página, antes de doc.addPage().
 * Sin `width` en text() aquí: y está bajo maxY y LineWrapper dispara páginas en blanco.
 */
function drawFooterBand(doc) {
  const bandH = FOOTER_BAND_H;
  const bandY = PAGE.h - bandH;
  const textY = bandY + 16;

  doc.fillColor('#FFFFFF');
  doc.rect(0, bandY, PAGE.w, bandH).fill();
  doc.strokeColor(COLORS.terracotta);
  doc.lineWidth(1);
  doc.moveTo(0, bandY).lineTo(PAGE.w, bandY).stroke();

  doc.fillColor(COLORS.dark);
  doc.font('GenBold').fontSize(9);
  doc.text(FOOTER_SIGNATURE, M.left, textY, { lineBreak: false });

  doc.font('GenBold').fontSize(9).fillColor(COLORS.terracotta);
  const linkW = doc.widthOfString(FOOTER_LINK_LABEL);
  doc.text(FOOTER_LINK_LABEL, PAGE.w - M.right - linkW, textY, {
    lineBreak: false,
    link: FOOTER_DOMAIN_URL,
    textWidth: linkW,
    wordCount: 1,
  });
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

  drawFooterBand(doc);
  doc.addPage();
}

function drawIndexPageBackground(doc) {
  doc.rect(0, 0, PAGE.w, PAGE.h).fill('#F5F0E8');
  drawDiagonalWatermark(doc);
}

function drawIndex(doc, data) {
  drawIndexPageBackground(doc);
  let y = M.top;

  doc.font('ClashBold').fontSize(28).fillColor(COLORS.dark).text('Índice', M.left, y);
  y += 48;

  doc.font('GenReg').fontSize(11).fillColor(COLORS.earth);
  data.recetas.forEach((r, i) => {
    if (y > CONTENT_TEXT_BOTTOM - 28) {
      drawFooterBand(doc);
      doc.addPage();
      drawIndexPageBackground(doc);
      y = M.top;
    }
    const line = `${String(i + 1).padStart(2, '0')}.  ${r.nombre}`;
    doc.text(line, M.left, y, { width: CONTENT_W });
    y = doc.y + 6;
  });

  drawFooterBand(doc);
}

function ensureSpace(doc, y, needed, onNewPage) {
  if (y + needed > CONTENT_TEXT_BOTTOM) {
    drawFooterBand(doc);
    doc.addPage();
    if (onNewPage) onNewPage();
    return M.top;
  }
  return y;
}

function drawRecipe(doc, data, recipe, index) {
  const onRecipePage = () => {
    doc.rect(0, 0, PAGE.w, PAGE.h).fill('#FAF8F5');
    drawDiagonalWatermark(doc);
  };

  onRecipePage();
  let y = M.top;

  doc.font('GenBold').fontSize(9).fillColor(COLORS.terracotta).text(`RECETA ${index + 1} / ${data.recetas.length}`, M.left, y);
  y = doc.y + 20;

  const accentPath = path.join(ROOT, RECIPE_BANNER_POOL[index % RECIPE_BANNER_POOL.length]);
  y = ensureSpace(doc, y, RECIPE_BANNER_H + 24, onRecipePage);
  drawImageCover(doc, accentPath, M.left, y, CONTENT_W, RECIPE_BANNER_H);
  doc.rect(M.left, y + RECIPE_BANNER_H, CONTENT_W, 2).fill(COLORS.terracotta);
  y += RECIPE_BANNER_H + 16;

  doc.font('ClashBold').fontSize(26).fillColor(COLORS.dark);
  const titleOpts = { width: CONTENT_W, lineGap: 2 };
  const titleH = doc.heightOfString(recipe.nombre, titleOpts);
  y = ensureSpace(doc, y, titleH + 16, onRecipePage);
  doc.text(recipe.nombre, M.left, y, titleOpts);
  y = doc.y + 16;

  const meta = `Tiempo: ${recipe.tiempo}   ·   Porciones: ${recipe.porciones}   ·   Dificultad: ${recipe.dificultad}`;
  doc.font('GenReg').fontSize(10).fillColor(COLORS.earth);
  const metaOpts = { width: CONTENT_W, lineGap: 1 };
  const metaH = doc.heightOfString(meta, metaOpts);
  y = ensureSpace(doc, y, metaH + 28, onRecipePage);
  doc.text(meta, M.left, y, metaOpts);
  y = doc.y + 28;

  if (recipe.intro && String(recipe.intro).trim()) {
    doc.font('GenItalic').fontSize(10).fillColor(COLORS.earth);
    const introOpts = { width: CONTENT_W, lineGap: 2 };
    const introH = doc.heightOfString(recipe.intro, introOpts);
    y = ensureSpace(doc, y, introH + 16, onRecipePage);
    doc.text(recipe.intro, M.left, y, introOpts);
    y = doc.y + 20;
  }

  doc.font('GenBold').fontSize(12).fillColor(COLORS.dark).text('Ingredientes', M.left, y);
  y = doc.y + 22;

  doc.font('GenReg').fontSize(11).fillColor(COLORS.dark);
  recipe.ingredientes.forEach((ing) => {
    const block = `•  ${ing}`;
    const ingOpts = { width: CONTENT_W - 12, lineGap: 1 };
    const h = doc.heightOfString(block, ingOpts);
    y = ensureSpace(doc, y, h + 8, onRecipePage);
    doc.fillColor(COLORS.dark).text(block, M.left + 8, y, ingOpts);
    y = doc.y + 10;
  });

  y += 12;
  y = ensureSpace(doc, y, 40, onRecipePage);
  doc.font('GenBold').fontSize(12).fillColor(COLORS.dark).text('Preparación', M.left, y);
  y = doc.y + 22;

  doc.font('GenReg').fontSize(11).fillColor(COLORS.dark);
  recipe.instrucciones.forEach((step, si) => {
    const body = `${si + 1}. ${step}`;
    const stepOpts = { width: CONTENT_W, align: 'left', lineGap: 2 };
    const h = doc.heightOfString(body, stepOpts);
    y = ensureSpace(doc, y, h + 10, onRecipePage);
    doc.text(body, M.left, y, stepOpts);
    y = doc.y + 12;
  });

  if (recipe.notas && String(recipe.notas).trim()) {
    y += NOTA_CHEF_TOP_GAP;
    doc.font('GenReg').fontSize(10);
    const notaOpts = { width: CONTENT_W, lineGap: 2 };
    const nh = doc.heightOfString(recipe.notas, notaOpts);
    const notaBlockH = 1 + 16 + 22 + nh + NOTA_CHEF_BOTTOM_PAD;
    y = ensureSpace(doc, y, notaBlockH, onRecipePage);
    doc.rect(M.left, y, CONTENT_W, 1).fill(COLORS.terracotta);
    y += 16;
    doc.font('GenBold').fontSize(10).fillColor(COLORS.terracotta).text('Nota del chef', M.left, y);
    y = doc.y + 18;
    doc.font('GenReg').fontSize(10);
    doc.fillColor(COLORS.earth).text(recipe.notas, M.left, y, notaOpts);
    y = doc.y + NOTA_CHEF_BOTTOM_PAD;
  }

  drawFooterBand(doc);
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
  y = doc.y + 20;

  doc.font('ClashBold').fontSize(36).fillColor(COLORS.cream).text('con sazón de verdad', M.left, y, {
    width: CONTENT_W,
    align: 'center',
  });
  y = doc.y + 28;

  doc.font('GenReg').fontSize(12).fillColor('#D4C9BC').text('Más recetas y contenido en:', M.left, y, {
    width: CONTENT_W,
    align: 'center',
  });
  y = doc.y + 16;

  doc.font('GenBold').fontSize(14).fillColor(COLORS.terracotta).text(data.sitio.replace('https://', ''), M.left, y, {
    width: CONTENT_W,
    align: 'center',
    link: data.sitio,
  });
  y = doc.y + 24;

  doc.font('GenReg').fontSize(11).fillColor('#9C8B80').text('Instagram', M.left, y, { width: CONTENT_W, align: 'center' });
  y = doc.y + 12;

  doc.font('GenBold').fontSize(12).fillColor(COLORS.cream).text(data.instagram, M.left, y, {
    width: CONTENT_W,
    align: 'center',
    link: data.instagramUrl,
  });

  drawFooterBand(doc);
}

function main() {
  const data = loadData();
  if (!data.recetas || data.recetas.length !== 20) {
    console.error('recetas-data.js debe tener exactamente 20 recetas.');
    process.exit(1);
  }

  /** margin 0: si no, el límite interno de PDFKit (~736) choca con el pie dibujado a 746 y doc.text() pagina mal. */
  const doc = new PDFDocument({
    size: 'LETTER',
    margins: 0,
    bufferPages: false,
  });

  registerFonts(doc);

  const stream = fs.createWriteStream(OUTPUT);
  doc.pipe(stream);

  drawCover(doc, data);

  drawIndex(doc, data);

  data.recetas.forEach((r, i) => {
    doc.addPage();
    drawRecipe(doc, data, r, i);
  });

  doc.addPage();
  drawBackCover(doc, data);

  doc.end();

  stream.on('finish', () => {
    console.log(`OK: ${OUTPUT}`);
  });
}

main();
