import fs from "fs";
import pdf from "pdf-parse";

export async function getResumeText() {
  const dataBuffer = fs.readFileSync("./public/resume.pdf");
  const pdfData = await pdf(dataBuffer);
  return pdfData.text;
}
