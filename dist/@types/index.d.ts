export type Severity = "critical" | "high" | "moderate" | "low" | "info";
export type DependenciesTypes = "proc" | "dev" | "optional" | "peer" | "peerOptional" | "total";
export type NormalizeJson = {
    [key in Exclude<Severity, "info">]: NormalizeInfo[];
};
export interface AuditResult {
    auditReportVersion: number;
    vulnerabilities: {
        [key: string]: AuditVulnerabilitie;
    };
    metadata: {
        vulnerabilities: {
            [key in Severity | "total"]: number;
        };
        dependencies: {
            [key in DependenciesTypes]: number;
        };
    };
}
export interface AuditVulnerabilitie {
    name: string;
    severity: Severity;
    isDirect: boolean;
    via: string[];
    effects: string[];
    range: string;
    nodes: string[];
    fixAvailable: {
        name: string;
        version: string;
        isSemVerMajor: boolean;
    } | boolean;
}
export interface NormalizeInfo {
    name: string;
    severity: Severity;
    problems: Problem[];
    nodes: string[];
    depChains: string[][];
}
export interface Problem {
    source: number;
    name: string;
    dependency: string;
    title: string;
    url: string;
    severity: Severity;
    cwe: string[];
    cvss: {
        score: number;
        vectorString: string;
    };
    range: string;
}
export interface CurrentInfo {
    name: string;
    range: string;
    problems: Problem[];
    depChains: string[][];
    nodes: string[];
    severity: Severity;
}
export interface RemoteInfo {
    actions: Action[];
    advisories: Advisorie;
}
export interface NormalizeResult {
    vulnerabilities: NormalizeJson;
    summary: {
        [key in Exclude<Severity, "info"> | "total"]: number;
    };
}
export interface DataDesc {
    audit: NormalizeResult;
    packageJson: PackageJson;
    desc: {
        severityLevels: {
            [key in Exclude<Severity, 'info'>]: string;
        };
    };
}
interface Action {
    isMajor: boolean;
    action: string;
    resolves: {
        id: number;
        path: string;
        dev: boolean;
        optional: boolean;
        bundled: boolean;
    }[];
    module: string;
    target: string;
}
interface Advisorie {
    [key: string]: {
        findings: {
            version: string;
            path: string[];
        }[];
        id: number;
        severity: Severity;
        title: string;
        url: string;
        vulnerable_versions: string;
        cwe: {
            score: number;
            vectorString: string;
        };
        cvss: string[];
    };
}
export interface PackageJson {
    name: string;
    version: string;
    [key: string]: any;
}
export {};
