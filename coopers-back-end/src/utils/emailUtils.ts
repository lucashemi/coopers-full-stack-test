import path from "path";
import fs from "fs";

export function loadAndFillTemplate(templateName: string, data: any) {
  const templatePath = path.join(
    __dirname,
    "..",
    "emailTemplates",
    templateName
  );
  let html = fs.readFileSync(templatePath, "utf8") as any;

  for (const key in data) {
    const placeholder = `{{${key}}}`;
    html = html.replaceAll(placeholder, data[key]);
  }

  return html;
}
