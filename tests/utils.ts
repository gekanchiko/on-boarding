import fs from "fs";

export function readJSONFile(path: string) {
  const contents = fs.readFileSync(path, "utf8");
  return JSON.parse(contents);
}
