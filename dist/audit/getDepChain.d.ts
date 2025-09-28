type Severity = "critical" | "high" | "moderate" | "low" | "info";
interface AuditVulnerabilitie {
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
export declare function getDepChains(node: AuditVulnerabilitie, globalNodeMap: {
    [key: string]: AuditVulnerabilitie;
}): string[][];
export {};
