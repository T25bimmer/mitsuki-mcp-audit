import { __awaiter } from '../node_modules/.pnpm/@rollup_plugin-typescript@1_9e7d14bf196bd61ffb178f33770ede83/node_modules/tslib/tslib.es6.js';
import fs from 'fs';
import { join } from 'path';
import { getDirname, uniqueId } from '../common/util.js';

const __dirname = getDirname(import.meta.url);
const basePath = join(__dirname, '../..');
const workBasePath = join(basePath, "work");
fs.mkdirSync(workBasePath, { recursive: true });
function createWorkDir() {
    return __awaiter(this, void 0, void 0, function* () {
        const workDir = join(workBasePath, uniqueId());
        yield fs.promises.mkdir(workDir, { recursive: true });
        return workDir;
    });
}
function deleteWorkDir(workDir) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs.promises.rm(workDir, { recursive: true });
    });
}

export { createWorkDir, deleteWorkDir };
