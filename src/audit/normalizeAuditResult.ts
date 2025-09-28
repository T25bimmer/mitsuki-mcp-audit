import { getDepChains } from './getDepChain';
import type { Severity,NormalizeJson,NormalizeInfo,AuditVulnerabilitie,AuditResult,NormalizeResult } from '../@types';

function _normalizeVulnerabilities(auditResult:AuditResult) {
    const result: NormalizeJson = {
        critical: [],
        high: [],
        moderate: [],
        low: [],
    };
    for (const key in auditResult.vulnerabilities) {
        const packageInfo = auditResult.vulnerabilities[key];
        const normalizedPackage = _normalizePackage(packageInfo);
        if (normalizedPackage) {
            result[normalizedPackage.severity as Exclude<Severity, "info">].push(normalizedPackage);
        }
    }
    return result;

    function _normalizePackage(packageInfo:AuditVulnerabilitie) {
        const { via = [] } = packageInfo;
        const validVia = via.filter((it) => typeof it === 'object');
        if (validVia.length === 0) {
        return null;
        }
        const info:NormalizeInfo = {
        name: packageInfo.name,
        severity: packageInfo.severity,
        problems: validVia,
        nodes: packageInfo.nodes || [],
        depChains:[]
        };
        info.depChains = getDepChains(packageInfo, auditResult.vulnerabilities);
        // info.depChains = info.depChains.filter(
        //   (chain) => !isInvalidChain(chain, packageInfo.name)
        // );
        return info;
    }
}

function isInvalidChain(chain:Array<string>, packageName:string) {
    return chain.length === 0 || (chain.length === 1 && chain[0] === packageName);
}

export function normalizeAuditResult(auditResult:AuditResult):NormalizeResult {
    return {
        vulnerabilities: _normalizeVulnerabilities(auditResult),
        summary:{
            total: 0,
            critical: 0,
            high: 0,
            moderate: 0,
            low: 0,
        }
    };
}
