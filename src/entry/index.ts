import fs from "fs"
import { createWorkDir,deleteWorkDir } from "../workDir";
import { parseProject } from "../parseProject";
import { generateLock } from "../generateLock";
import { audit } from "../audit";
import { render } from "../render/index";

export async function auditPackage(projectRoot:string,savePath:string) {
    const workDir = await createWorkDir()
    const packageJson = await parseProject(projectRoot)
    await generateLock(workDir,packageJson)
    const auditResult = await audit(workDir, packageJson);
    const renderedResult = await render(auditResult, packageJson)
    await deleteWorkDir(workDir)
    await fs.promises.writeFile(savePath, renderedResult);
}