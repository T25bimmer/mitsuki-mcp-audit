import fs from "fs"

import { join } from "path"
import { uniqueId,getDirname } from "../common/util"

const __dirname = getDirname(import.meta.url)

const basePath = join(__dirname,'../..')
const workBasePath = join(basePath,"work")
fs.mkdirSync(workBasePath, { recursive: true })

export async function createWorkDir() {
    const workDir = join(workBasePath,uniqueId())
    await fs.promises.mkdir(workDir, { recursive:true })
    return workDir
}
export async function deleteWorkDir(workDir:string) {
    await fs.promises.rm(workDir, { recursive: true })
}