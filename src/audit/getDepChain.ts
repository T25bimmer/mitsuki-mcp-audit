type Severity = "critical" | "high" | "moderate" | "low" | "info"
interface AuditVulnerabilitie {
    name:string
    severity:Severity
    isDirect:boolean
    via:string[]
    effects:string[]
    range:string
    nodes:string[]
    fixAvailable: {
        name:string
        version:string
        isSemVerMajor:boolean
    } | boolean
}

export function getDepChains(node:AuditVulnerabilitie, globalNodeMap:{ [key:string]:AuditVulnerabilitie }) {
    const chains:Array<Array<string>> = [];
    const currentPath:Array<string> = [];

    function dfs(currentNode:any) {
      if (!currentNode) return;
      if (currentPath.includes(currentNode.name)) {
        chains.push([...currentPath]);
        return;
      }
      currentPath.unshift(currentNode.name);
      if (!currentNode.effects || currentNode.effects.length === 0) {
        chains.push([...currentPath]);
      } else {
        for (const effect of currentNode.effects) {
          dfs(globalNodeMap[effect]);
        }
      }
      currentPath.shift();
    }
    dfs(node);
    return chains;
  }
  