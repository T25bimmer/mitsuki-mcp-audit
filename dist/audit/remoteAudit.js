const URL = 'https://registry.npmjs.org/-/npm/v1/security/audits';
async function remoteAudit(packageName, pacakgeVersion) {
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
    const resp = await fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    return await resp.json();
}

export { remoteAudit };
