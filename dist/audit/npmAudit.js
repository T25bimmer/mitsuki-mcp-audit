import { runCommand } from '../common/util.js';

async function npmAudit(workDir) {
    const cmd = `npm audit --json`;
    const jsonResult = await runCommand(cmd, workDir);
    const auditData = JSON.parse(jsonResult);
    return auditData;
}

export { npmAudit };
