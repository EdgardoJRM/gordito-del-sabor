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

/** Ancho de la columna de imagen en portada (resto = tipografía) */
const COVER_COL_W = 268;
/** Columna lateral de foto en páginas de receta (misma idea que portada) */
const RECIPE_IMG_COL_W = 228;
/** Espacio vertical extra entre párrafos en bienvenida e historias (doble salto en el texto fuente) */
const STORY_PARAGRAPH_GAP = 16;

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
/** Tope Y del área de texto (encima de la franja del pie). */
const CONTENT_TEXT_BOTTOM = PAGE.h - FOOTER_BAND_H - 14;
/** Margen inferior del documento para que `page.maxY()` coincida con CONTENT_TEXT_BOTTOM (evita paginación interna de PDFKit más abajo que el pie). */
const PDF_MARGIN_BOTTOM = PAGE.h - CONTENT_TEXT_BOTTOM;
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

/** Página de bienvenida (después de portada, antes del índice): fondo crema + marca de agua */
function drawWelcomePage(doc, block) {
  if (!block || !block.titulo || !block.texto) return;
  drawIndexPageBackground(doc);
  const onPage = () => {
    drawIndexPageBackground(doc);
  };
  let y = M.top + 8;
  doc.rect(M.left, y, 48, 2).fill(COLORS.terracotta);
  y += 20;
  y = drawWrappedBlock(
    doc,
    block.titulo,
    M.left,
    y,
    CONTENT_W,
    { font: 'ClashBold', fontSize: 24, fillColor: COLORS.dark, lineGap: 4 },
    ensureSpace,
    onPage
  );
  y += 24;
  y = drawWrappedParagraphs(
    doc,
    block.texto,
    M.left,
    y,
    CONTENT_W,
    { font: 'GenReg', fontSize: 11, fillColor: COLORS.earth, lineGap: 5 },
    ensureSpace,
    onPage,
    STORY_PARAGRAPH_GAP
  );
  drawFooterBand(doc);
}

/** Historia editorial: fondo oscuro, sin marca de agua */
function drawStoryPage(doc, titulo, texto) {
  if (!titulo || !texto) return;
  const onPage = () => {
    doc.rect(0, 0, PAGE.w, PAGE.h).fill(COLORS.dark);
  };
  onPage();
  let y = M.top + 20;
  doc.rect(M.left, y, 48, 2).fill(COLORS.terracotta);
  y += 18;
  y = drawWrappedBlock(
    doc,
    titulo,
    M.left,
    y,
    CONTENT_W,
    { font: 'ClashBold', fontSize: 22, fillColor: COLORS.cream, lineGap: 4 },
    ensureSpace,
    onPage
  );
  y += 22;
  y = drawWrappedParagraphs(
    doc,
    texto,
    M.left,
    y,
    CONTENT_W,
    { font: 'GenReg', fontSize: 11, fillColor: COLORS.gold, lineGap: 5 },
    ensureSpace,
    onPage,
    STORY_PARAGRAPH_GAP
  );
  drawFooterBand(doc);
}

function drawIndex(doc, data) {
  drawIndexPageBackground(doc);
  let y = M.top;

  doc.font('ClashBold').fontSize(28).fillColor(COLORS.dark).text('Índice', M.left, y);
  y += 48;

  const onIndexPage = () => {
    drawIndexPageBackground(doc);
  };
  data.recetas.forEach((r, i) => {
    const line = `${String(i + 1).padStart(2, '0')}.  ${r.nombre}`;
    doc.font('GenReg').fontSize(11).fillColor(COLORS.earth);
    const lines = wrapTextToLines(doc, line, CONTENT_W, {});
    const lh = textLineHeight(doc, 0);
    for (const ln of lines) {
      y = ensureSpace(doc, y, lh + 6, onIndexPage);
      doc.text(ln, M.left, y, { lineBreak: false });
      y += lh;
    }
    y += 6;
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

function textLineHeight(doc, lineGap = 0) {
  return doc.currentLineHeight(true) + lineGap;
}

/**
 * Parte texto en líneas que caben en maxW. Requiere tener ya aplicados font/fontSize en `doc`
 * (y las mismas opciones en measureOpts que uses al dibujar).
 */
function wrapTextToLines(doc, text, maxW, measureOpts = {}) {
  const out = [];
  const raw = String(text ?? '');
  for (const para of raw.split('\n')) {
    const p = para.replace(/\s+/g, ' ').trim();
    if (!p) continue;
    const words = p.split(/\s+/);
    let line = '';
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (doc.widthOfString(test, measureOpts) <= maxW) {
        line = test;
      } else {
        if (line) out.push(line);
        if (doc.widthOfString(word, measureOpts) <= maxW) {
          line = word;
        } else {
          let chunk = '';
          for (const ch of word) {
            const t2 = chunk + ch;
            if (doc.widthOfString(t2, measureOpts) <= maxW) chunk = t2;
            else {
              if (chunk) out.push(chunk);
              chunk = ch;
            }
          }
          line = chunk;
        }
      }
    }
    if (line) out.push(line);
  }
  return out;
}

/**
 * Texto envuelto sin `width` en PDFKit (así no dispara LineWrapper → continueOnNewPage / huecos).
 * @returns {number} y debajo del último renglón (para el siguiente bloque)
 */
function drawWrappedBlock(doc, text, x, y, maxW, style, ensureSpaceFn, onNewPage) {
  const { font, fontSize, fillColor, lineGap = 0 } = style;
  doc.font(font).fontSize(fontSize).fillColor(fillColor);
  const measureOpts = {};
  const lines = wrapTextToLines(doc, text, maxW, measureOpts);
  const lh = textLineHeight(doc, lineGap);
  let cy = y;
  for (const line of lines) {
    cy = ensureSpaceFn(doc, cy, lh, onNewPage);
    doc.text(line, x, cy, { lineBreak: false });
    cy += lh;
  }
  return cy;
}

/**
 * Varios párrafos separados por `\n\n` en el texto. `wrapTextToLines` ignora líneas vacías;
 * aquí dibujamos cada bloque y añadimos separación explícita entre párrafos.
 */
function drawWrappedParagraphs(doc, text, x, y, maxW, style, ensureSpaceFn, onNewPage, gapBetweenParagraphs) {
  const gap = gapBetweenParagraphs ?? STORY_PARAGRAPH_GAP;
  const parts = String(text ?? '')
    .split(/\n\n+/)
    .map((p) => p.replace(/\s+/g, ' ').trim())
    .filter(Boolean);
  let cy = y;
  parts.forEach((para, i) => {
    if (i > 0) cy += gap;
    cy = drawWrappedBlock(doc, para, x, cy, maxW, style, ensureSpaceFn, onNewPage);
  });
  return cy;
}

function drawRecipe(doc, data, recipe, index) {
  const imgRel = recipe.imagen && String(recipe.imagen).trim();
  const imgAbs = imgRel ? path.join(ROOT, imgRel) : '';
  const hasImg = Boolean(imgRel && imageFileOk(imgAbs));

  const textLeft = hasImg ? RECIPE_IMG_COL_W + 24 : M.left;
  const recipeTextW = hasImg ? PAGE.w - textLeft - M.right : CONTENT_W;

  const onRecipePage = () => {
    doc.rect(0, 0, PAGE.w, PAGE.h).fill('#FAF8F5');
    drawDiagonalWatermark(doc);
    if (hasImg) {
      drawImageCover(doc, imgAbs, 0, 0, RECIPE_IMG_COL_W, PAGE.h);
      doc.rect(RECIPE_IMG_COL_W - 1, 0, 2, PAGE.h).fill(COLORS.terracotta);
    }
  };

  onRecipePage();
  let y = M.top;

  doc.font('GenBold').fontSize(9).fillColor(COLORS.terracotta).text(`RECETA ${index + 1} / ${data.recetas.length}`, textLeft, y);
  y = doc.y + 20;

  doc.font('ClashBold').fontSize(26);
  const titleLines = wrapTextToLines(doc, recipe.nombre, recipeTextW, {});
  const titleLh = textLineHeight(doc, 2);
  y = ensureSpace(doc, y, titleLines.length * titleLh + 16, onRecipePage);
  y = drawWrappedBlock(
    doc,
    recipe.nombre,
    textLeft,
    y,
    recipeTextW,
    { font: 'ClashBold', fontSize: 26, fillColor: COLORS.dark, lineGap: 2 },
    ensureSpace,
    onRecipePage
  );
  y += 16;

  const meta = `Tiempo: ${recipe.tiempo}   ·   Porciones: ${recipe.porciones}   ·   Dificultad: ${recipe.dificultad}`;
  doc.font('GenReg').fontSize(10);
  const metaLines = wrapTextToLines(doc, meta, recipeTextW, {});
  const metaLh = textLineHeight(doc, 1);
  y = ensureSpace(doc, y, metaLines.length * metaLh + 28, onRecipePage);
  y = drawWrappedBlock(
    doc,
    meta,
    textLeft,
    y,
    recipeTextW,
    { font: 'GenReg', fontSize: 10, fillColor: COLORS.earth, lineGap: 1 },
    ensureSpace,
    onRecipePage
  );
  y += 28;

  if (recipe.intro && String(recipe.intro).trim()) {
    doc.font('GenItalic').fontSize(10);
    const introLines = wrapTextToLines(doc, recipe.intro, recipeTextW, {});
    const introLh = textLineHeight(doc, 2);
    y = ensureSpace(doc, y, introLines.length * introLh + 20, onRecipePage);
    y = drawWrappedBlock(
      doc,
      recipe.intro,
      textLeft,
      y,
      recipeTextW,
      { font: 'GenItalic', fontSize: 10, fillColor: COLORS.earth, lineGap: 2 },
      ensureSpace,
      onRecipePage
    );
    y += 20;
  }

  const ingHeaderH = doc.font('GenBold').fontSize(12).currentLineHeight(true);
  y = ensureSpace(doc, y, ingHeaderH + 22, onRecipePage);
  doc.fillColor(COLORS.dark).text('Ingredientes', textLeft, y, { lineBreak: false });
  y += ingHeaderH + 22;

  doc.font('GenReg').fontSize(11).fillColor(COLORS.dark);
  const ingMaxW = recipeTextW - 12;
  const ingLh = textLineHeight(doc, 1);
  recipe.ingredientes.forEach((ing) => {
    const block = `•  ${ing}`;
    const lines = wrapTextToLines(doc, block, ingMaxW, {});
    y = ensureSpace(doc, y, lines.length * ingLh + 10, onRecipePage);
    y = drawWrappedBlock(
      doc,
      block,
      textLeft + 8,
      y,
      ingMaxW,
      { font: 'GenReg', fontSize: 11, fillColor: COLORS.dark, lineGap: 1 },
      ensureSpace,
      onRecipePage
    );
    y += 10;
  });

  y += 12;
  const prepHeaderH = doc.font('GenBold').fontSize(12).currentLineHeight(true);
  y = ensureSpace(doc, y, prepHeaderH + 22, onRecipePage);
  doc.fillColor(COLORS.dark).text('Preparación', textLeft, y, { lineBreak: false });
  y += prepHeaderH + 22;

  doc.font('GenReg').fontSize(11).fillColor(COLORS.dark);
  const stepLh = textLineHeight(doc, 2);
  recipe.instrucciones.forEach((step, si) => {
    const body = `${si + 1}. ${step}`;
    const lines = wrapTextToLines(doc, body, recipeTextW, {});
    y = ensureSpace(doc, y, lines.length * stepLh + 12, onRecipePage);
    y = drawWrappedBlock(
      doc,
      body,
      textLeft,
      y,
      recipeTextW,
      { font: 'GenReg', fontSize: 11, fillColor: COLORS.dark, lineGap: 2 },
      ensureSpace,
      onRecipePage
    );
    y += 12;
  });

  if (recipe.notas && String(recipe.notas).trim()) {
    y += NOTA_CHEF_TOP_GAP;
    doc.font('GenReg').fontSize(10);
    const notaLines = wrapTextToLines(doc, recipe.notas, recipeTextW, {});
    const notaLh = textLineHeight(doc, 2);
    const nh = notaLines.length * notaLh;
    doc.font('GenBold').fontSize(10);
    const chefLabelH = doc.currentLineHeight(true);
    const notaBlockH = 1 + 16 + chefLabelH + 18 + nh + NOTA_CHEF_BOTTOM_PAD;
    y = ensureSpace(doc, y, notaBlockH, onRecipePage);
    doc.rect(textLeft, y, recipeTextW, 1).fill(COLORS.terracotta);
    y += 16;
    doc.font('GenBold').fontSize(10).fillColor(COLORS.terracotta).text('Nota del chef', textLeft, y, { lineBreak: false });
    y += chefLabelH + 18;
    y = drawWrappedBlock(
      doc,
      recipe.notas,
      textLeft,
      y,
      recipeTextW,
      { font: 'GenReg', fontSize: 10, fillColor: COLORS.earth, lineGap: 2 },
      ensureSpace,
      onRecipePage
    );
    y += NOTA_CHEF_BOTTOM_PAD;
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

  /** Margen inferior = pie útil: `page.maxY()` coincide con CONTENT_TEXT_BOTTOM y refuerza el límite si algo usa `width`. */
  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: M.top, bottom: PDF_MARGIN_BOTTOM, left: M.left, right: M.right },
    bufferPages: false,
  });

  registerFonts(doc);

  const stream = fs.createWriteStream(OUTPUT);
  doc.pipe(stream);

  drawCover(doc, data);

  if (data.bienvenida && data.bienvenida.titulo && data.bienvenida.texto) {
    drawWelcomePage(doc, data.bienvenida);
  }

  doc.addPage();
  drawIndex(doc, data);

  const historias = Array.isArray(data.historias) ? data.historias : [];
  if (historias[0]) {
    doc.addPage();
    drawStoryPage(doc, historias[0].titulo, historias[0].texto);
  }

  data.recetas.forEach((r, i) => {
    doc.addPage();
    drawRecipe(doc, data, r, i);
    if (i === 2 && historias[1]) {
      doc.addPage();
      drawStoryPage(doc, historias[1].titulo, historias[1].texto);
    }
    if (i === 5 && historias[2]) {
      doc.addPage();
      drawStoryPage(doc, historias[2].titulo, historias[2].texto);
    }
    if (i === 9 && historias[3]) {
      doc.addPage();
      drawStoryPage(doc, historias[3].titulo, historias[3].texto);
    }
    if (i === 14 && historias[4]) {
      doc.addPage();
      drawStoryPage(doc, historias[4].titulo, historias[4].texto);
    }
  });

  if (data.cierre && data.cierre.titulo && data.cierre.texto) {
    doc.addPage();
    drawStoryPage(doc, data.cierre.titulo, data.cierre.texto);
  }

  doc.addPage();
  drawBackCover(doc, data);

  doc.end();

  stream.on('finish', () => {
    console.log(`OK: ${OUTPUT}`);
  });
}

main();
