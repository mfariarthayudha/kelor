"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { format } from "path";
const puppeteer_1 = __importDefault(require("puppeteer"));
function htmlToPdf(html, 
// name: string,
landscape = false) {
    return __awaiter(this, void 0, void 0, function* () {
        // let options = { format: "A4" };
        // Example of options with args //
        // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };
        // let file = { content: html.replace(/(\r|\n)/g, "") };
        const browser = yield puppeteer_1.default.launch();
        const page = yield browser.newPage();
        // //   await page.setViewport({ width: 1024, height: 768 });
        yield page.setContent(html, { waitUntil: "load" });
        yield page.emulateMediaType("print");
        const pdf = yield page.pdf({
            // path: name + ".pdf",
            format: "A4",
            printBackground: true,
            landscape: landscape,
        });
        yield browser.close();
        return pdf;
        // return html_to_pdf.generatePdf(file, options);
    });
}
exports.default = htmlToPdf;
