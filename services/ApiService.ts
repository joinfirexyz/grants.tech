import { ethers } from "ethers";

export type TTransactionStatus =
  | "PENDING_SIGNATURE"
  | "SUBMITTED"
  | "FAILED"
  | "COMPLETED"
  | "CANCELLED"
  | "CONFIRMING"
  | "QUEUED";

export interface ITransferPeer {
  id: string;
  type: string;
  name?: string;
  walletId?: string;
}

export interface IAmountInfo {
  amount?: string;
  requestedAmount?: string;
  netAmount?: string;
  amountUSD?: string;
}

export interface IFeeInfo {
  networkFee?: string;
  serviceFee?: string;
  gasPrice?: string;
}

export interface ITransactionDetails {
  id: string; //	ID of the transaction.
  assetId: string; //	Transaction asset.
  source: ITransferPeer; //	Source of the transaction.
  destination: ITransferPeer; //	Fireblocks supports multiple destinations for UTXO-based blockchains. For other blockchains, this array will always be composed of one element.
  requestedAmount: number; //	The amount requested by the user.
  amountInfo: IAmountInfo; //	Details of the transaction's amount in string format.
  feeInfo: IFeeInfo; //	Details of the transaction's fee in string format.
  amount: number; //	If the transfer is a withdrawal from an exchange, the actual amount that was requested to be transferred. Otherwise, the requested amount.
  netAmount: number; //	The net amount of the transaction, after fee deduction.
  amountUSD: number; //	The USD value of the requested amount.
  serviceFee: number; //	The total fee deducted by the exchange from the actual requested amount (serviceFee = amount - netAmount).
  treatAsGrossAmount: boolean; //	For outgoing transactions, if true, the network fee is deducted from the requested amount.
  networkFee: number; //	The fee paid to the network.
  createdAt: number; //	Unix timestamp.
  lastUpdated: number; //	Unix timestamp.
  status: string; //		The current status of the transaction.
  txHash: string; //	Blockchain hash of the transaction.
  index: number; //[optional] For UTXO based assets this is the vOut, for Ethereum based, this is the index of the event of the contract call.
  subStatus: string; //		More detailed status of the transaction.
  sourceAddress: string; //For account based assets only, the source address of the transaction. (Note: This parameter will be empty for transactions that are not: CONFIRMING, COMPLETED, or REJECTED/FAILED after passing CONFIRMING status.)
  destinationAddress: string; //Address where the asset were transferred.
  destinationAddressDescription: string; //Description of the address.
  destinationTag: string; //Destination tag for XRP, used as memo for EOS/XLM, or Bank Transfer Description for the fiat providers: Signet (by Signature), SEN (by Silvergate), or BLINC (by BCB Group).
  signedBy: string[]; // Signers of the transaction.
  createdBy: string; //Initiator of the transaction.
  rejectedBy: string; //User ID of the user that rejected the transaction (in case it was rejected).
  addressType: string; //[ ONE_TIME, WHITELISTED ].
  note: string; //Custom note of the transaction.
  exchangeTxId: string; //If the transaction originated from an exchange, this is the exchange tx ID.
  feeCurrency: string; //The asset which was taken to pay the fee (ETH for ERC-20 tokens, BTC for Tether Omni).
  operation: string; //	Default operation is "TRANSFER".
  numOfConfirmations: number; //The number of confirmations of the transaction. The number will increase until the transaction will be considered completed according to the confirmation policy.
  extraParameters: any; // JSON object	Protocol / operation specific parameters.
}

export interface ITransactionData {
  id: string;
  status: TTransactionStatus;
  createdAt?: number;
  lastUpdated?: number;
  details?: ITransactionDetails;
}

export interface ICreateWeb3ConnectionResponse {
  id: string;
  sessionMetadata: ISessionMetadata;
}
export interface ISessionMetadata {
  appUrl: string;
  appIcon?: string;
  appId?: string;
  appName?: string;
  appDescription?: string;
}

export interface IWeb3Session {
  id: string;
  vaultAccountId?: number;
  ncwId?: string;
  ncwAccountId?: number;
  chainIds?: string[];
  feeLevel: "HIGH" | "MEDIUM";
  creationDate: string;
  sessionMetadata?: ISessionMetadata;
}

export type TMessageHandler = (message: any) => Promise<void>;
export type TTxHandler = (tx: ITransactionData) => void;

export class ApiService {
  private readonly _baseUrl: string;
  private readonly _token: string;
  private _deviceMessagesSubscriptions: Map<string, TMessageHandler[]> =
    new Map();
  private _deviceTxsSubscriptions: Map<string, TTxHandler[]> = new Map();
  private _disposed: boolean = false;
  private _pollingMessagesActive: Map<string, boolean> = new Map();
  private _pollingTxsActive: Map<string, boolean> = new Map();

  constructor(baseUrl: string, token: string) {
    this._baseUrl = baseUrl;
    this._token = token;
    if (this._baseUrl.endsWith("/")) {
      this._baseUrl = this._baseUrl.slice(0, -1);
    }
  }

  public async login(): Promise<string> {
    const response = await this._postCall(`api/login`);
    const userId = response.id;
    return userId;
  }

  public async assignDevice(deviceId: string): Promise<string> {
    const response = await this._postCall(`api/devices/${deviceId}/assign`);
    return response.walletId;
  }

  public sendMessage(deviceId: string, message: string): Promise<any> {
    return this._postCall(`api/devices/${deviceId}/rpc`, { message });
  }

  public listenToMessages(
    deviceId: string,
    physicalDeviceId: string,
    cb: TMessageHandler
  ): () => void {
    let subscriptions = this._deviceMessagesSubscriptions.get(deviceId);
    if (!subscriptions) {
      subscriptions = [];
      this._deviceMessagesSubscriptions.set(deviceId, subscriptions);
    }

    subscriptions.push(cb);
    this._startPollingMessages(deviceId, physicalDeviceId);
    return () => {
      this._stopPollingMessages(deviceId);

      if (subscriptions) {
        const index = subscriptions.indexOf(cb);
        if (index !== -1) {
          subscriptions.splice(index, 1);
          if (subscriptions.length === 0) {
            this._deviceMessagesSubscriptions.delete(deviceId);
          }
        }
      }
    };
  }

  public async getWeb3Connections(deviceId: string): Promise<IWeb3Session[]> {
    const response = await this._getCall(
      `api/devices/${deviceId}/web3/connections`
    );
    return await response.json();
  }

  public async createWeb3Connection(
    deviceId: string,
    uri: string
  ): Promise<ICreateWeb3ConnectionResponse> {
    const response = await this._postCall(
      `api/devices/${deviceId}/web3/connections`,
      { uri }
    );
    return response;
  }

  public async approveWeb3Connection(
    deviceId: string,
    sessionId: string
  ): Promise<void> {
    const response = await this._postCall(
      `api/devices/${deviceId}/web3/connections/${sessionId}/approve`
    );
    return response;
  }

  public async denyWeb3Connection(
    deviceId: string,
    sessionId: string
  ): Promise<void> {
    const response = await this._postCall(
      `api/devices/${deviceId}/web3/connections/${sessionId}/deny`
    );
    return response;
  }

  public async removeWeb3Connection(deviceId: string, sessionId: string) {
    const response = await this._deleteCall(
      `api/devices/${deviceId}/web3/connections/${sessionId}`
    );
    return response;
  }

  public async createTransaction(
    deviceId: string,
    data: {
      typedData?: Record<string, string>;
      transactionRequest?: ethers.providers.TransactionRequest;
    }
  ): Promise<ITransactionData> {
    const createTxResponse = await this._postCall(
      `api/devices/${deviceId}/transactions`,
      data
    );
    return createTxResponse;
  }

  public listenToTxs(deviceId: string, cb: TTxHandler): () => void {
    let subscriptions = this._deviceTxsSubscriptions.get(deviceId);
    if (!subscriptions) {
      subscriptions = [];
      this._deviceTxsSubscriptions.set(deviceId, subscriptions);
    }

    subscriptions.push(cb);
    this._startPollingTxs(deviceId);
    return () => {
      this._stopPollingTxs(deviceId);

      if (subscriptions) {
        const index = subscriptions.indexOf(cb);
        if (index !== -1) {
          subscriptions.splice(index, 1);
          if (subscriptions.length === 0) {
            this._deviceTxsSubscriptions.delete(deviceId);
          }
        }
      }
    };
  }

  public dispose(): void {
    this._deviceMessagesSubscriptions.clear;
    this._pollingMessagesActive.clear();
    this._deviceTxsSubscriptions.clear;
    this._pollingTxsActive.clear();
    this._disposed = true;
  }

  ///// PRIVATE /////

  private async _stopPollingTxs(deviceId: string): Promise<void> {
    this._pollingTxsActive.delete(deviceId);
  }

  private async _startPollingTxs(deviceId: string): Promise<void> {
    if (this._pollingTxsActive.get(deviceId)) {
      return;
    }
    this._pollingTxsActive.set(deviceId, true);
    let startDate = 0;
    while (!this._disposed) {
      const response = await this._getCall(
        `api/devices/${deviceId}/transactions?poll=true&startDate=${startDate}&details=true`
      );
      const txes = await response.json();
      if (txes && Array.isArray(txes)) {
        for (const txData of txes) {
          const txId = txData.id;
          const lastUpdated = txData.lastUpdated;
          if (txId !== undefined && lastUpdated !== undefined) {
            // remember the last tx date
            startDate = Math.max(startDate, lastUpdated);
            // notify all subscribers
            const subscribers = this._deviceTxsSubscriptions.get(deviceId);
            if (subscribers) {
              for (const cb of subscribers) {
                if (this._disposed || !this._pollingTxsActive.get(deviceId)) {
                  break;
                }
                cb(txData);
              }
            }
          }
        }
      }
    }
  }

  private async _stopPollingMessages(deviceId: string): Promise<void> {
    this._pollingMessagesActive.delete(deviceId);
  }

  private async _startPollingMessages(
    deviceId: string,
    physicalDeviceId: string
  ): Promise<void> {
    if (this._pollingMessagesActive.get(deviceId)) {
      return;
    }
    this._pollingMessagesActive.set(deviceId, true);
    while (!this._disposed) {
      const response = await this._getCall(
        `api/devices/${deviceId}/messages?physicalDeviceId=${physicalDeviceId}`
      );
      const messages = await response.json();
      if (messages && Array.isArray(messages)) {
        for (const messageData of messages) {
          // notify all subscribers
          const messageId = messageData.id;
          const message = messageData.message;
          if (messageId !== undefined && message !== undefined) {
            const subscribers = this._deviceMessagesSubscriptions.get(deviceId);
            if (subscribers) {
              for (const cb of subscribers) {
                if (
                  this._disposed ||
                  !this._pollingMessagesActive.get(deviceId)
                ) {
                  break;
                }

                try {
                  await cb(message);
                } catch (error) {
                  // we don't want to stop the loop
                }
              }
            }
            // ack the message (No need to await, it will happen in the background  )
            this._deleteCall(`api/devices/${deviceId}/messages/${messageId}`);
          }
        }
      }
    }
  }

  private async _postCall(path: string, body?: Object): Promise<any> {
    if (path.startsWith("/")) {
      path = path.slice(1);
    }

    const response = await fetch(`${this._baseUrl}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${this._token}`,
      },
      body: JSON.stringify(body ?? {}),
    });

    if (!response.ok) {
      throw new Error(
        `A call to "${path}" failed with status ${response.status}`
      );
    }
    const responseJson = await response.json();
    return responseJson;
  }

  private async _deleteCall(path: string): Promise<void> {
    await fetch(`${this._baseUrl}/${path}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    });
  }

  private async _getCall(path: string): Promise<Response> {
    const response = await fetch(`${this._baseUrl}/${path}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    });
    return response;
  }
}
