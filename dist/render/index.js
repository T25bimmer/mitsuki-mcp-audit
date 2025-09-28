import { __awaiter } from '../node_modules/.pnpm/@rollup_plugin-typescript@1_9e7d14bf196bd61ffb178f33770ede83/node_modules/tslib/tslib.es6.js';
import { renderMarkdown } from './markdown.js';

const desc = {
    severityLevels: {
        low: '低危',
        moderate: '中危',
        high: '高危',
        critical: '严重',
    },
};
function render(auditResult, packageJson) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            audit: auditResult,
            desc,
            packageJson,
        };
        return yield renderMarkdown(data);
    });
}

export { render };
