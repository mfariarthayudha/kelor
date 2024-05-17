import puppeteer from "puppeteer";

export default async function htmlToPdf(
  html: string,
  landscape: boolean = false
) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

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
}
