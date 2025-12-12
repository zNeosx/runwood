import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function addWatermarkToPDF(
  originalPdfBytes: Uint8Array,
  text: string
) {
  const pdfDoc = await PDFDocument.load(originalPdfBytes);
  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  for (const page of pages) {
    const { width, height } = page.getSize();

    page.drawText(text, {
      x: width / 2 - text.length * 2,
      y: height - 40,
      size: 12,
      font,
      color: rgb(0.4, 0.4, 0.4),
      opacity: 0.6,
    });
  }

  return await pdfDoc.save();
}
