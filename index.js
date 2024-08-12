const core = require('@actions/core');
const github = require('@actions/github');
const { execSync } = require('child_process');

async function run() {
  try {
    const vaultName = core.getInput('vault-name', { required: true });
    const clientId = process.env.AZURE_CLIENT_ID;
    const clientSecret = process.env.CLIENTSECRET;
    const tenantId = process.env.AZURE_TENANT_ID;

    // Install curl
    execSync('sudo apt-get update && sudo apt-get install -y curl');

    // Install Azure CLI
    execSync('curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash');

    // Login to Azure
    execSync(`az login --service-principal --username ${clientId} --password ${clientSecret} --tenant ${tenantId}`);
    execSync('az account show');

    // Fetch secrets
    const secrets = execSync(`az keyvault secret list --vault-name ${vaultName} --query "[].name" -o tsv`).toString().trim().split('\n');
    secrets.forEach(secret => {
      const value = execSync(`az keyvault secret show --name ${secret} --vault-name ${vaultName} --query value -o tsv`).toString().trim();
      core.setSecret(value);
      core.exportVariable(secret, value);

    });

    // Log the environment variables (for debugging purposes)
    console.log(process.env);
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
}

run();
