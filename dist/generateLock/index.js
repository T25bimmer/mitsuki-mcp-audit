import { __awaiter } from '../node_modules/.pnpm/@rollup_plugin-typescript@1_9e7d14bf196bd61ffb178f33770ede83/node_modules/tslib/tslib.es6.js';
import fs from 'fs';
import { join, dirname } from 'path';
import { runCommand } from '../common/util.js';

// 写入 package.json
function writePackageJson(workDir, packageJson) {
    return __awaiter(this, void 0, void 0, function* () {
        const packageJsonPath = join(workDir, 'package.json');
        fs.mkdirSync(dirname(packageJsonPath), { recursive: true });
        yield fs.promises.writeFile(packageJsonPath, JSON.stringify(packageJson), 'utf8');
    });
}
// 创建 lock 文件
function createLockFile(workDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const cmd = `npm install --package-lock-only --force`;
        yield runCommand(cmd, workDir); // 在工作目录中执行命令
    });
}
function generateLock(workDir, packageJson) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1. 将 package.json 写入工作目录
        yield writePackageJson(workDir, packageJson);
        // 2. 生成 lock 文件
        yield createLockFile(workDir);
    });
}

export { generateLock };
