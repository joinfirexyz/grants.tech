import axios from "axios";
import { Interface, parseUnits } from "ethers";

// // Address of the USDC contract on goerli
const USDC_ADDRESS = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
const SOURCE_CHAIN_ID = "5";
const DEST_CHAIN_ID = "5";

const axiosClient = axios.create({
  baseURL: "https://api.peaze.com/api",
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": "<YOUR-API-KEY>", //TODO: Populate with our dev api key
  },
});

//hardcoded to USDC on Goerli for hackathon POC
export async function estimateTransaction(
  senderAddress: string,
  grantRecipient: string,
  readableSendAmount: string
) {
  const tokenInterface = new Interface([
    "function approve(address,uint256)",
    "function transfer(address,uint256)",
  ]);

  //TODO: Double check this... seems that we should be approving to the relayer?
  const approvalData = tokenInterface.encodeFunctionData("approve", [
    grantRecipient,
    parseUnits(readableSendAmount, 6),
  ]);
  const transferData = tokenInterface.encodeFunctionData("transfer", [
    grantRecipient,
    parseUnits(readableSendAmount, 6),
  ]);

  const response = await axiosClient.post("/v1/transactions/estimate", {
    transactions: [
      {
        to: USDC_ADDRESS,
        data: approvalData,
      },
      {
        to: grantRecipient,
        data: transferData,
      },
    ],
    userAddress: senderAddress,
    sourceToken: USDC_ADDRESS,
    tokenAmount: "0x" + parseUnits(readableSendAmount, 6).toString(16),
    sourceChain: SOURCE_CHAIN_ID,
    destinationToken: USDC_ADDRESS,
    destinationChain: DEST_CHAIN_ID,
  });

  return response.data;
}

//TODO: UNCOMMENT ONCE WE HAVE THE FIREBLOCKS SIGNER
// async function executeTransaction(estimatedData: any) {
//   const {
//     typedData: { td712, td2612 },
//   } = estimatedData;

// TODO: Implement Fireblocks signer here
//   const sig712 = await wallet.signTypedData(
//     td712.domain,
//     td712.types,
//     td712.message
//   );
//   const sig2612 = await wallet.signTypedData(
//     td2612.domain,
//     td2612.types,
//     td2612.message
//   );

//   const txn = {
//     sourceToken: USDC_ADDRESS,
//     sourceChain: SOURCE_CHAIN_ID,
//     destinationToken: USDC_ADDRESS,
//     destinationChain: DEST_CHAIN_ID,
//     signatures: {
//       sig712,
//       sig2612,
//     },
//     message: td712.message,
//     domain: td712.domain,
//   };

//   console.log({ txn });

//   const response = await axiosClient.post(
//     "/v1/transactions/execute",
//     txn
//   );

//   console.log({ response });

//   return response.data;
// }
