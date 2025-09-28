import { __awaiter } from '../node_modules/.pnpm/@rollup_plugin-typescript@1_9e7d14bf196bd61ffb178f33770ede83/node_modules/tslib/tslib.es6.js';
import path from 'path';
import fs from 'fs';

function parseLocalProject(projectRoot) {
    return __awaiter(this, void 0, void 0, function* () {
        const packageJsonPath = path.join(projectRoot, 'package.json');
        const json = yield fs.promises.readFile(packageJsonPath, 'utf8');
        return JSON.parse(json);
    });
}

export { parseLocalProject };
