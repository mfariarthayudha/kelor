import { readFileSync } from "fs";
export default function bufferSignature(filename: string) {
  try {
    const buffer = readFileSync(filename);
    const base64String = Buffer.from(buffer).toString("base64");
    // console.log(`base64String`, base64String.slice(0, 100));
    return `data:image/png;base64,${base64String}`;
  } catch (error) {
    throw new Error(`file ${filename} no exist ❌`);
  }
}
