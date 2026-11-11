/**
 * Export KP as a self-contained HTML file.
 * Converts all images to inline base64 data URIs for portability.
 */

async function imageToBase64(imgEl: HTMLImageElement): Promise<string> {
  const src = imgEl.src;
  
  // Already a data URI
  if (src.startsWith('data:')) return src;
  
  try {
    const response = await fetch(src);
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = () => resolve(src);
      reader.readAsDataURL(blob);
    });
  } catch {
    return src;
  }
}

async function buildSelfContainedHTML(renderAreaId: string, fileName: string, lang: 'ru' | 'he', autoPrint: boolean): Promise<string | null> {
  const renderArea = document.getElementById(renderAreaId);
  if (!renderArea) return null;

  // Get all stylesheets content
  const styleSheets = Array.from(document.styleSheets);
  let allCSS = '';
  
  styleSheets.forEach(sheet => {
    try {
      const rules = Array.from(sheet.cssRules || []);
      rules.forEach(rule => {
        allCSS += rule.cssText + '\n';
      });
    } catch {
      if (sheet.href) {
        allCSS += `@import url("${sheet.href}");\n`;
      }
    }
  });

  // Clone the render area
  const clone = renderArea.cloneNode(true) as HTMLElement;
  
  // Convert all images to base64
  const originalImages = renderArea.querySelectorAll('img');
  const cloneImages = clone.querySelectorAll('img');
  
  for (let i = 0; i < originalImages.length; i++) {
    const base64 = await imageToBase64(originalImages[i]);
    cloneImages[i].src = base64;
  }

  const isHe = lang === 'he';
  const htmlLang = isHe ? 'he' : 'ru';
  const dir = isHe ? ' dir="rtl"' : '';
  const fontFamily = isHe ? "'Heebo', sans-serif" : "'Montserrat', sans-serif";
  const fontLink = isHe
    ? 'https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700&display=swap'
    : 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap';
  const btnText = isHe ? '🖨️ שמור כ-PDF' : '🖨️ Сохранить как PDF';
  const btnSub = isHe ? 'לחצו כדי לשמור כ-PDF' : 'Нажмите для печати или сохранения в PDF';

  const html = `<!DOCTYPE html>
<html lang="${htmlLang}"${dir}>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${isHe ? 'הצעת מחיר' : 'КП'} – BONIM – ${fileName}</title>
<link href="${fontLink}" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: ${fontFamily};
  background: #F2F6FA;
  color: #1A1A1A;
  line-height: 1.7;
  ${isHe ? 'direction: rtl;' : ''}
}
${allCSS}

/* Print overrides */
@media print {
  .no-print { display: none !important; }
  body { background: white !important; margin: 0 !important; padding: 0 !important; }
  .kp-page {
    width: 210mm !important;
    min-height: 297mm !important;
    margin: 0 !important;
    page-break-after: always !important;
    page-break-inside: avoid !important;
    box-shadow: none !important;
    overflow: visible !important;
  }
  .kp-page:last-child { page-break-after: auto !important; }
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
}
@page { size: A4 portrait; margin: 0; }
</style>
</head>
<body>
<div class="no-print" style="text-align:center;padding:20px;">
  <button onclick="window.print()" style="background:linear-gradient(135deg,#4A86C8,#A9CCEC,#4A86C8);border:none;padding:13px 36px;font-family:${fontFamily};font-size:1rem;font-weight:700;color:#082B52;border-radius:4px;cursor:pointer;letter-spacing:1px;">${btnText}</button>
  <p style="font-size:0.82rem;color:#888;margin-top:8px;">${btnSub}</p>
</div>
${clone.innerHTML}
${autoPrint ? `<script>window.addEventListener('load',function(){setTimeout(function(){window.focus();window.print();},600);});</script>` : ''}
</body>
</html>`;

  return html;
}

export async function exportAsHTML(renderAreaId: string, fileName: string, lang: 'ru' | 'he' = 'ru') {
  const html = await buildSelfContainedHTML(renderAreaId, fileName, lang, false);
  if (!html) return;
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function printPDF(renderAreaId?: string, fileName?: string, lang: 'ru' | 'he' = 'ru') {
  if (!renderAreaId) {
    window.print();
    return;
  }
  const html = await buildSelfContainedHTML(renderAreaId, fileName || 'KP', lang, true);
  if (!html) return;
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, '_blank');
  if (!win) {
    alert(lang === 'ru'
      ? 'Разрешите всплывающие окна, чтобы скачать PDF'
      : 'נא לאפשר חלונות קופצים כדי לשמור PDF');
  }
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
