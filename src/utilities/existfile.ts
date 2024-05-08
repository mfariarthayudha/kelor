import fs from 'fs';
export default function checkFileExists(file: string): boolean {
  return fs.existsSync(file);
}