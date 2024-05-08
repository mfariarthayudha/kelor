// import { format } from "path";
import puppeteer from "puppeteer";

export default async function htmlToPdf(
  html: string,
  // name: string,
  landscape: boolean = false
) {
  // let options = { format: "A4" };
  // Example of options with args //
  // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

  // let file = { content: html.replace(/(\r|\n)/g, "") };
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // //   await page.setViewport({ width: 1024, height: 768 });

  await page.setContent(html, { waitUntil: "load" });
  await page.emulateMediaType("print");
  const pdf = await page.pdf({
    // path: name + ".pdf",
    format: "A4",
    printBackground: true,
    landscape: landscape,
  });
  await browser.close();
  return pdf;
  // return html_to_pdf.generatePdf(file, options);
}
