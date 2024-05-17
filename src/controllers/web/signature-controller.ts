import { Request, Response } from "express";
import { readFileSync } from "fs";

export const index = (request: Request, response: Response) => {
  const buffer = readFileSync("../../signature/signature.png");
  const base64String = Buffer.from(buffer).toString("base64");
};
