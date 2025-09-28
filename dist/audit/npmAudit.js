import { __awaiter } from '../node_modules/.pnpm/@rollup_plugin-typescript@1_9e7d14bf196bd61ffb178f33770ede83/node_modules/tslib/tslib.es6.js';
import { runCommand } from '../common/util.js';

function npmAudit(workDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const cmd = `npm audit --json`;
        const jsonResult = yield runCommand(cmd, workDir);
        const auditData = JSON.parse(jsonResult);
        return auditData;
    });
}

export { npmAudit };
