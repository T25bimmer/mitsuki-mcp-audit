import { __awaiter } from '../node_modules/.pnpm/@rollup_plugin-typescript@1_9e7d14bf196bd61ffb178f33770ede83/node_modules/tslib/tslib.es6.js';
import { remoteAudit } from './remoteAudit.js';

const severityLevelsMap = {
    info: 0,
    low: 1,
    moderate: 2,
    high: 3,
    critical: 4,
};
// 添加当前工程的审计结果
function currentAudit(name, version) {
    return __awaiter(this, void 0, void 0, function* () {
        // 调用 remoteAudit 函数获取审计结果
        const auditResult = yield remoteAudit(name, version);
        // 规格化审计结果
        if (!auditResult.advisories ||
            Object.keys(auditResult.advisories).length === 0) {
            return null;
        }
        const result = {
            name,
            range: version,
            nodes: ['.'],
            depChains: [],
            problems: [],
            severity: "info"
        };
        const advisories = Object.values(auditResult.advisories);
        let maxSeverity = 'info';
        result.problems = advisories.map((advisory) => {
            const problem = {
                source: advisory.id,
                name,
                dependency: name,
                title: advisory.title,
                url: advisory.url,
                severity: advisory.severity,
                cwe: advisory.cwe,
                cvss: advisory.cvss,
                range: advisory.vulnerable_versions,
            };
            // 更新最大严重性
            if (severityLevelsMap[problem.severity] > severityLevelsMap[maxSeverity]) {
                maxSeverity = problem.severity;
            }
            return problem;
        });
        result.severity = maxSeverity;
        return result;
    });
}

export { currentAudit };
