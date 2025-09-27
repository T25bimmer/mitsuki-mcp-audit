import { parseLocalProject } from "./parseLocalProject"
import { parseRemoteProject } from "./parseRemoteProject"

export function parseProject(projectRoot:string) {
    if (projectRoot.startsWith('http://') || projectRoot.startsWith('https://')) {
        return parseRemoteProject(projectRoot)
    }
    return parseLocalProject(projectRoot)
}