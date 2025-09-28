import fs from 'fs';
import { createWorkDir, deleteWorkDir } from '../workDir/index.js';
import { parseProject } from '../parseProject/index.js';
import { generateLock } from '../generateLock/index.js';
import { audit } from '../audit/index.js';
import { render } from '../render/index.js';

async function auditPackage(projectRoot, savePath) {
    const workDir = await createWorkDir();
    const packageJson = await parseProject(projectRoot);
    await generateLock(workDir, packageJson);
    const auditResult = await audit(workDir, packageJson);
    const renderedResult = await render(auditResult, packageJson);
    await deleteWorkDir(workDir);
    await fs.promises.writeFile(savePath, renderedResult);
}

export { auditPackage };
