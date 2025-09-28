import { __awaiter } from '../node_modules/.pnpm/@rollup_plugin-typescript@1_9e7d14bf196bd61ffb178f33770ede83/node_modules/tslib/tslib.es6.js';

const URL = 'https://registry.npmjs.org/-/npm/v1/security/audits';
function remoteAudit(packageName, pacakgeVersion) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = {
            name: 'mitsuki-audit',
            version: '1.0.0',
            requires: {
                [packageName]: pacakgeVersion,
            },
            dependencies: {
                [packageName]: {
                    version: pacakgeVersion,
                },
            },
        };
        const resp = yield fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        return yield resp.json();
    });
}

export { remoteAudit };
