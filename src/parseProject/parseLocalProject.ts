import path from 'path';
import fs from 'fs';

export async function parseLocalProject(projectRoot:string) {
  const packageJsonPath = path.join(projectRoot, 'package.json');
  const json = await fs.promises.readFile(packageJsonPath, 'utf8');
  return JSON.parse(json);
}
