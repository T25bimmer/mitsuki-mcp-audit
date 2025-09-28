import { __awaiter } from '../node_modules/.pnpm/@rollup_plugin-typescript@1_9e7d14bf196bd61ffb178f33770ede83/node_modules/tslib/tslib.es6.js';
import fs from 'fs';
import { createWorkDir, deleteWorkDir } from '../workDir/index.js';
import { parseProject } from '../parseProject/index.js';
import { generateLock } from '../generateLock/index.js';
import { audit } from '../audit/index.js';
import { render } from '../render/index.js';

function auditPackage(projectRoot, savePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const workDir = yield createWorkDir();
        const packageJson = yield parseProject(projectRoot);
        yield generateLock(workDir, packageJson);
        const auditResult = yield audit(workDir, packageJson);
        const renderedResult = yield render(auditResult, packageJson);
        yield deleteWorkDir(workDir);
        yield fs.promises.writeFile(savePath, renderedResult);
    });
}

export { auditPackage };
