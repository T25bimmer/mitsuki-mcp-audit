import { renderMarkdown } from './markdown.js';

const desc = {
    severityLevels: {
        low: '低危',
        moderate: '中危',
        high: '高危',
        critical: '严重',
    },
};
async function render(auditResult, packageJson) {
    const data = {
        audit: auditResult,
        desc,
        packageJson,
    };
    return await renderMarkdown(data);
}

export { render };
