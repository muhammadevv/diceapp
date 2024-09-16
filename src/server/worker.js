// const { http } = require('msw');
// const { setupWorker } = require('msw/browser');
// const { checkProof } = require('./api/check-proof');
// const { createJetton } = require('./api/create-jetton');
// const { generatePayload } = require('./api/generate-payload');
// const { getAccountInfo } = require('./api/get-account-info');
// const { healthz } = require('./api/healthz');

// const baseUrl = document.baseURI.replace(/\/$/, '');

// const worker = setupWorker(
//   http.get(`${baseUrl}/api/healthz`, healthz),
//   http.post(`${baseUrl}/api/generate_payload`, generatePayload),
//   http.post(`${baseUrl}/api/check_proof`, checkProof),
//   http.get(`${baseUrl}/api/get_account_info`, getAccountInfo),
//   http.post(`${baseUrl}/api/create_jetton`, createJetton),
// );

// module.exports = { worker };
