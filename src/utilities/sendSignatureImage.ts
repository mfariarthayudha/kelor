import { readFileSync } from "fs";
import { resolve } from "path";
export default function bufferSignature(filename: string) {
  try {
    console.log(__dirname);

    const buffer = readFileSync(
      resolve(__dirname, `../../public/signature/${filename}`)
    );
    const base64String = Buffer.from(buffer).toString("base64");
    // console.log(`base64String`, base64String.slice(0, 100));
    return `data:image/png;base64,${base64String}`;
  } catch (error) {
    throw new Error(`file ${filename} no exist `);
  }
}
