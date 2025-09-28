import path from 'path';
import fs from 'fs';

async function parseLocalProject(projectRoot) {
    const packageJsonPath = path.join(projectRoot, 'package.json');
    const json = await fs.promises.readFile(packageJsonPath, 'utf8');
    return JSON.parse(json);
}

export { parseLocalProject };
