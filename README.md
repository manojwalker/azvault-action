# Fetch Secrets GitHub Action

## Description

The **Fetch Secrets** GitHub Action fetches secrets from Azure Key Vault and sets them as variables in your GitHub Actions workflow. This action helps you securely manage and use secrets stored in Azure Key Vault within your CI/CD pipelines.

## Inputs

### Required Inputs

- `vault-name`: The name of the Azure Key Vault from which to fetch secrets. This input is required and must be a string.

## Outputs

This action does not produce any outputs.

## Secrets

This action does not use any secrets directly. However, it is expected that the Azure Key Vault and its secrets are managed securely.

## Environment Variables

This action uses the following environment variables:

- `AZURE_CLIENT_ID`: The client ID of the Azure service principal.
- `AZURE_CLIENT_SECRET`: The client secret of the Azure service principal.
- `AZURE_TENANT_ID`: The tenant ID of the Azure service principal.

## Example Usage

Here is an example of how to use the **Fetch Secrets** action in a GitHub Actions workflow:

```yaml
name: Example Workflow

on: [push]

jobs:
  fetch-secrets:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Fetch secrets from Azure Key Vault
        uses: your-username/azvault-action@v1
        with:
          vault-name: 'your-key-vault-name'
        env:
          AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}
          AZURE_CLIENT_SECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
          AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}

      # Add steps to use the fetched secrets
      - name: Use secret
        run: echo "Secret value is ${{ secrets.YOUR_SECRET_NAME }}"