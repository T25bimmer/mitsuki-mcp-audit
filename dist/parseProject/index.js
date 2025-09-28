import { parseLocalProject } from './parseLocalProject.js';
import { parseRemoteProject } from './parseRemoteProject.js';

function parseProject(projectRoot) {
    if (projectRoot.startsWith('http://') || projectRoot.startsWith('https://')) {
        return parseRemoteProject(projectRoot);
    }
    return parseLocalProject(projectRoot);
}

export { parseProject };
