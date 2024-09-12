const { sha256 } = require('@ton/crypto');
const { Address, Cell, contractAddress, loadStateInit } = require('@ton/ton');
const { Buffer } = require('buffer');
const { randomBytes, sign } = require('tweetnacl');
const { CheckProofRequestDto } = require('../dto/check-proof-request-dto');
const { tryParsePublicKey } = require('../wrappers/wallets-data.js');

const tonProofPrefix = 'ton-proof-item-v2/';
const tonConnectPrefix = 'ton-connect';
const allowedDomains = [
  'ton-connect.github.io',
  'localhost:5173'
];
const validAuthTime = 15 * 60; // 15 minutes

class TonProofService {

  /**
   * Generate a random payload.
   */
  generatePayload() {
    return Buffer.from(randomBytes(32)).toString('hex');
  }

  /**
   * Check the proof method.
   * @param {CheckProofRequestDto} payload
   * @param {Function} getWalletPublicKey
   * @returns {Promise<boolean>}
   */
  async checkProof(payload, getWalletPublicKey) {
    try {
      const stateInit = loadStateInit(Cell.fromBase64(payload.proof.state_init).beginParse());

      // 1. Try to obtain public key via get_public_key method on smart contract
      let publicKey = tryParsePublicKey(stateInit) || await getWalletPublicKey(payload.address);
      if (!publicKey) {
        return false;
      }

      // 2. Check that TonAddressItemReply.publicKey matches the obtained public key
      const wantedPublicKey = Buffer.from(payload.public_key, 'hex');
      if (!publicKey.equals(wantedPublicKey)) {
        return false;
      }

      // 3. Check that TonAddressItemReply.walletStateInit.hash() matches TonAddressItemReply.address
      const wantedAddress = Address.parse(payload.address);
      const address = contractAddress(wantedAddress.workChain, stateInit);
      if (!address.equals(wantedAddress)) {
        return false;
      }

      if (!allowedDomains.includes(payload.proof.domain.value)) {
        return false;
      }

      const now = Math.floor(Date.now() / 1000);
      if (now - validAuthTime > payload.proof.timestamp) {
        return false;
      }

      const message = {
        workchain: address.workChain,
        address: address.hash,
        domain: {
          lengthBytes: payload.proof.domain.lengthBytes,
          value: payload.proof.domain.value,
        },
        signature: Buffer.from(payload.proof.signature, 'base64'),
        payload: payload.proof.payload,
        stateInit: payload.proof.state_init,
        timestamp: payload.proof.timestamp
      };

      const wc = Buffer.alloc(4);
      wc.writeUInt32BE(message.workchain, 0);

      const ts = Buffer.alloc(8);
      ts.writeBigUInt64LE(BigInt(message.timestamp), 0);

      const dl = Buffer.alloc(4);
      dl.writeUInt32LE(message.domain.lengthBytes, 0);

      // Construct the message
      const msg = Buffer.concat([
        Buffer.from(tonProofPrefix),
        wc,
        message.address,
        dl,
        Buffer.from(message.domain.value),
        ts,
        Buffer.from(message.payload),
      ]);

      const msgHash = Buffer.from(await sha256(msg));

      // Create the full message
      const fullMsg = Buffer.concat([
        Buffer.from([0xff, 0xff]),
        Buffer.from(tonConnectPrefix),
        msgHash,
      ]);

      const result = Buffer.from(await sha256(fullMsg));

      return sign.detached.verify(result, message.signature, publicKey);
    } catch (e) {
      return false;
    }
  }
}

module.exports = TonProofService;
