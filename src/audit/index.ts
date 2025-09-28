import { npmAudit } from './npmAudit';
import { normalizeAuditResult } from './normalizeAuditResult';
import { currentAudit } from './currentAudit';
import type { PackageJson,Severity } from '../@types';
export async function audit(workDir:string, packageJson:PackageJson) {
    // 调用 npmAudit 获取审计结果
    const auditResult = await npmAudit(workDir);
    // 规范化审计结果
    const normalizedResult = normalizeAuditResult(auditResult);

    // 添加当前工程的审计结果
    const current = await currentAudit(packageJson.name, packageJson.version);
    if (current) {
      normalizedResult.vulnerabilities[current.severity as Exclude<Severity, "info">].unshift(current);
    }
    // 添加汇总信息
    normalizedResult.summary = {
      total: Object.values(normalizedResult.vulnerabilities).reduce(
        (sum, arr) => sum + arr.length,
        0
      ),
      critical: normalizedResult.vulnerabilities.critical.length,
      high: normalizedResult.vulnerabilities.high.length,
      moderate: normalizedResult.vulnerabilities.moderate.length,
      low: normalizedResult.vulnerabilities.low.length,
    };
    return normalizedResult;
}
