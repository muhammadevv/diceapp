import {
  Account,
  ConnectAdditionalRequest,
  SendTransactionRequest,
  TonProofItemReplySuccess
} from "@tonconnect/ui-react";
import './patch-local-storage-for-github-pages';

class TonProofDemoApiService {
  constructor() {
    this.localStorageKey = 'demo-api-access-token';
    this.host = document.baseURI.replace(/\/$/, '');
    this.accessToken = localStorage.getItem(this.localStorageKey);
    this.refreshIntervalMs = 9 * 60 * 1000; // 9 minutes in milliseconds

    if (!this.accessToken) {
      this.generatePayload();
    }
  }

  async generatePayload() {
    try {
      const response = await fetch(`${this.host}/api/generate_payload`, {
        method: 'POST',
      });
      const data = await response.json();

      return { tonProof: data.payload };
    } catch (error) {
      console.error('Error generating payload:', error);
      return null;
    }
  }

  async checkProof(proof, account) {
    try {
      const reqBody = {
        address: account.address,
        network: account.chain,
        public_key: account.publicKey,
        proof: {
          ...proof,
          state_init: account.walletStateInit,
        },
      };

      const response = await fetch(`${this.host}/api/check_proof`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      });
      const data = await response.json();

      if (data?.token) {
        localStorage.setItem(this.localStorageKey, data.token);
        this.accessToken = data.token;
      }
    } catch (error) {
      console.error('Error checking proof:', error);
    }
  }

  async getAccountInfo(account) {
    try {
      const response = await fetch(`${this.host}/api/get_account_info`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching account info:', error);
      return {};
    }
  }

  async createJetton(jetton) {
    try {
      const response = await fetch(`${this.host}/api/create_jetton`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jetton),
      });
      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error creating jetton:', error);
      throw error;
    }
  }

  reset() {
    this.accessToken = null;
    localStorage.removeItem(this.localStorageKey);
    this.generatePayload();
  }
}

export const TonProofDemoApi = new TonProofDemoApiService();
