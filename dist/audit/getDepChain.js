function getDepChains(node, globalNodeMap) {
    const chains = [];
    const currentPath = [];
    function dfs(currentNode) {
        if (!currentNode)
            return;
        if (currentPath.includes(currentNode.name)) {
            chains.push([...currentPath]);
            return;
        }
        currentPath.unshift(currentNode.name);
        if (!currentNode.effects || currentNode.effects.length === 0) {
            chains.push([...currentPath]);
        }
        else {
            for (const effect of currentNode.effects) {
                dfs(globalNodeMap[effect]);
            }
        }
        currentPath.shift();
    }
    dfs(node);
    return chains;
}

export { getDepChains };
