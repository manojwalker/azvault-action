# Fetch Secrets

This GitHub Action fetches secrets from an Azure Key Vault and sets them as environment variables and outputs.

## Inputs

### `vault-name`

**Required** The name of the Azure Key Vault.

## Outputs

Set the outputs with key and environment variable
Example:-
keyname: ${{ env.keyname }}
## Environment Variables

The following environment variables must be set for the action to authenticate with Azure:

- `AZURE_CLIENT_ID`: The client ID of the Azure service principal.
- `CLIENTSECRET`: The client secret of the Azure service principal.
- `AZURE_TENANT_ID`: The tenant ID of the Azure service principal.

## Example Usage

```yaml
name: Fetch Secrets Example
on: [push]

jobs:
  fetch-secrets:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Fetch secrets from Azure Key Vault
        id: fetch-secrets
        uses: manojwalker/azvault-action@v1.0.16
        with:
          vault-name: 'your-key-vault-name'
        env:
          AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}
          CLIENTSECRET: ${{ secrets.CLIENTSECRET }}
          AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}

      - name: Use fetched secrets
        run: |
          echo "Secret 1: ${{ steps.fetch-secrets.outputs.secret1 }}"
          echo "Secret 2: ${{ steps.fetch-secrets.outputs.secret2 }}"
          # Add more secrets as needed
