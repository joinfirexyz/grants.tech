import {
  FireblocksNCW,
  IKeyDescriptor,
  TKeyStatus,
  TMPCAlgorithm,
} from "@fireblocks/ncw-js-sdk";
import { ethers } from "ethers";
import {
  ICreateWeb3ConnectionResponse,
  ITransactionData,
  IWeb3Session,
} from "./ApiService";
import { TAsyncActionStatus, TFireblocksNCWStatus } from "./AppStore";

export interface IAppState {
  keyGenerationStatus: TKeyStatus | null;
  updateKeyGenerationStatus: (status: TKeyStatus) => void;
  userId: string | null;
  deviceId: string;
  walletId: string | null;
  txs: ITransactionData[];
  web3Connections: IWeb3Session[];
  pendingWeb3Connection: ICreateWeb3ConnectionResponse | null;
  web3Uri: string | null;
  appStoreInitialized: boolean;
  loginToDemoAppServerStatus: TAsyncActionStatus;
  assignDeviceStatus: TAsyncActionStatus;
  fireblocksNCW: FireblocksNCW | null;
  fireblocksNCWStatus: TFireblocksNCWStatus;
  keysStatus: Record<TMPCAlgorithm, IKeyDescriptor> | null;
  passphrase: string | null;
  initAppStore: (token: string) => void;
  disposeAppStore: () => void;
  loginToDemoAppServer: () => void;
  assignCurrentDevice: () => Promise<void>;
  generateNewDeviceId: () => Promise<void>;
  createTransaction: (data: {
    typedData?: Record<string, string>;
    transactionRequest?: ethers.providers.TransactionRequest;
  }) => Promise<void>;
  takeover: () => Promise<void>;
  setPassphrase: (passphrase: string) => void;
  regeneratePassphrase: () => void;
  initFireblocksNCW: () => Promise<void>;
  disposeFireblocksNCW: () => void;
  getWeb3Connections: () => Promise<void>;
  createWeb3Connection: (uri: string) => Promise<void>;
  approveWeb3Connection: () => Promise<void>;
  denyWeb3Connection: () => Promise<void>;
  removeWeb3Connection: (sessionId: string) => Promise<void>;

  setWeb3uri: (uri: string | null) => void;
}
