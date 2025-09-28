import fs from 'fs';
import { join } from 'path';
import { getDirname, uniqueId } from '../common/util.js';

const __dirname = getDirname(import.meta.url);
const basePath = join(__dirname, '../..');
const workBasePath = join(basePath, "work");
fs.mkdirSync(workBasePath, { recursive: true });
async function createWorkDir() {
    const workDir = join(workBasePath, uniqueId());
    await fs.promises.mkdir(workDir, { recursive: true });
    return workDir;
}
async function deleteWorkDir(workDir) {
    await fs.promises.rm(workDir, { recursive: true });
}

export { createWorkDir, deleteWorkDir };
