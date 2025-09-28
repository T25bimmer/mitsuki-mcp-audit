import { runCommand } from '../common/util';
import { type AuditResult } from '../@types';
export async function npmAudit(workDir:string) {
    const cmd = `npm audit --json`;
    const jsonResult = await runCommand(cmd, workDir);
    const auditData = JSON.parse(jsonResult) as AuditResult;
    return auditData;
}
