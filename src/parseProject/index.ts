import { parseLocalProject } from "./parseLocalProject"
import { parseRemoteProject } from "./parseRemoteProject"
import type { PackageJson } from "../@types"

export function parseProject(projectRoot:string):Promise<PackageJson> {
    if (projectRoot.startsWith('http://') || projectRoot.startsWith('https://')) {
        return parseRemoteProject(projectRoot)
    }
    return parseLocalProject(projectRoot)
}