import { renderMarkdown } from './markdown';
import { DataDesc,NormalizeResult,PackageJson } from '../@types';
const desc = {
  severityLevels: {
    low: '低危',
    moderate: '中危',
    high: '高危',
    critical: '严重',
  },
};

export async function render(auditResult:NormalizeResult, packageJson:PackageJson) {
  const data:DataDesc = {
    audit: auditResult,
    desc,
    packageJson,
  };
  return await renderMarkdown(data);
}
