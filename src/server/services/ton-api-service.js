import { Address, TonClient4 } from "@ton/ton";
import { CHAIN } from "@tonconnect/ui-react";
import { Buffer } from "buffer";

class TonApiService {
  static create(client) {
    // Set the client to the appropriate network
    if (client === CHAIN.MAINNET) {
      client = new TonClient4({
        endpoint: 'https://mainnet-v4.tonhubapi.com',
      });
    }

    if (client === CHAIN.TESTNET) {
      client = new TonClient4({
        endpoint: 'https://testnet-v4.tonhubapi.com',
      });
    }

    return new TonApiService(client);
  }

  constructor(client) {
    this.client = client;
  }

  /**
   * Get wallet public key by address.
   */
  async getWalletPublicKey(address) {
    const masterAt = await this.client.getLastBlock();
    const result = await this.client.runMethod(
      masterAt.last.seqno,
      Address.parse(address),
      'dRFix2GovUNSXUuv1Yx5EbnVpX2F1F0Y9WaZ7Xi2GuU=',
      []
    );
    return Buffer.from(result.reader.readBigNumber().toString(16).padStart(64, '0'), 'hex');
  }

  /**
   * Get account info by address.
   */
  async getAccountInfo(address) {
    const masterAt = await this.client.getLastBlock();
    return await this.client.getAccount(masterAt.last.seqno, Address.parse(address));
  }
}

export default TonApiService;