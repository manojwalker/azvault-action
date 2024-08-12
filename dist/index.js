/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 485:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 219:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 81:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(485);
const github = __nccwpck_require__(219);
const { execSync } = __nccwpck_require__(81);

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

})();

module.exports = __webpack_exports__;
/******/ })()
;