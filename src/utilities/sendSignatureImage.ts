import { readFileSync } from "fs";
import { resolve } from "path";
export default function bufferSignature(filename: string) {
  try {
    const buffer = readFileSync(
      resolve(__dirname, `../../public/signature/${filename}`)
    );
    const base64String = Buffer.from(buffer).toString("base64");
    return `data:image/png;base64,${base64String}`;
  } catch (error) {
    throw new Error(`file ${filename} no exist `);
  }
}
