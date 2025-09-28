import { __awaiter } from '../node_modules/.pnpm/@rollup_plugin-typescript@1_9e7d14bf196bd61ffb178f33770ede83/node_modules/tslib/tslib.es6.js';

function parseGithubUrl(url) {
    try {
        const parsedUrl = new URL(url);
        // 确保是 github.com
        if (parsedUrl.hostname !== 'github.com') {
            throw new Error('Only github.com URLs are supported');
        }
        // 获取路径并去除空字符串（如开头的 /）
        const parts = parsedUrl.pathname.split('/').filter(Boolean);
        // 至少需要 owner 和 repo 两段
        if (parts.length < 2) {
            throw new Error('Invalid GitHub repository URL: insufficient path segments');
        }
        const owner = parts[0];
        const repo = parts[1];
        const restPath = parts.slice(2); // 剩余路径，如 ['tree', 'v5.2.2']
        // 构造 path：如果有后续路径，则以 '/' 开头拼接；否则为空字符串
        const path = restPath.length > 0 ? '/' + restPath.join('/') : '';
        return { owner, repo, path };
    }
    catch (error) {
        if (error instanceof TypeError) {
            throw new Error('Invalid URL: malformed or missing');
        }
        throw error;
    }
}
function getPackageJsonUrl(gitInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        let { owner, repo, path } = gitInfo;
        if (path.startsWith('/tree/')) {
            const pathParts = path.split('/').filter(Boolean);
            path = `tags/${pathParts[1]}`;
        }
        else {
            const url = `https://api.github.com/repos/${owner}/${repo}`;
            const info = yield fetch(url).then((resp) => resp.json());
            path = `heads/${info.default_branch}`;
        }
        return `https://raw.githubusercontent.com/${owner}/${repo}/${path}/package.json`;
    });
}
function parseRemoteProject(githubUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const gitInfo = parseGithubUrl(githubUrl);
        const packgeJsonUrl = yield getPackageJsonUrl(gitInfo);
        return yield fetch(packgeJsonUrl).then((resp) => resp.json());
    });
}

export { parseRemoteProject };
