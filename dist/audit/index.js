import { __awaiter } from '../node_modules/.pnpm/@rollup_plugin-typescript@1_9e7d14bf196bd61ffb178f33770ede83/node_modules/tslib/tslib.es6.js';
import { npmAudit } from './npmAudit.js';
import { normalizeAuditResult } from './normalizeAduitResult.js';
import { currentAudit } from './currentAudit.js';

function audit(workDir, packageJson) {
    return __awaiter(this, void 0, void 0, function* () {
        // 调用 npmAudit 获取审计结果
        const auditResult = yield npmAudit(workDir);
        // 规范化审计结果
        const normalizedResult = normalizeAuditResult(auditResult);
        // 添加当前工程的审计结果
        const current = yield currentAudit(packageJson.name, packageJson.version);
        if (current) {
            normalizedResult.vulnerabilities[current.severity].unshift(current);
        }
        // 添加汇总信息
        normalizedResult.summary = {
            total: Object.values(normalizedResult.vulnerabilities).reduce((sum, arr) => sum + arr.length, 0),
            critical: normalizedResult.vulnerabilities.critical.length,
            high: normalizedResult.vulnerabilities.high.length,
            moderate: normalizedResult.vulnerabilities.moderate.length,
            low: normalizedResult.vulnerabilities.low.length,
        };
        return normalizedResult;
    });
}

export { audit };
