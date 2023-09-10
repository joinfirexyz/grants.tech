import { ethers } from "ethers";

const provider = new ethers.providers.InfuraProvider(
    "goerli",
    "bec77b2c1b174308bcaa3e622828448f"
  );
  const wallet = new ethers.Wallet(
    "5614556b0e9e476e3c2fb598f0bd034761e73182c073dbf8d88c917ce42ce4bc"
  );
  const signer = wallet.connect(provider);
  const contractAddress = "0xc09fc02765c5a107fef80501843481fe47013b27";
  const contractABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "trader",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "subject",
          type: "address",
        },
        { indexed: false, internalType: "bool", name: "isBuy", type: "bool" },
        {
          indexed: false,
          internalType: "uint256",
          name: "shareAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "ethAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "protocolEthAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "subjectEthAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "supply",
          type: "uint256",
        },
      ],
      name: "Trade",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address", name: "sharesSubject", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "buyShares",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sharesSubject", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "getBuyPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sharesSubject", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "getBuyPriceAfterFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "supply", type: "uint256" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "getPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sharesSubject", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "getSellPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sharesSubject", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "getSellPriceAfterFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "protocolFeeDestination",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "protocolFeePercent",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "sharesSubject", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "sellShares",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_feeDestination", type: "address" },
      ],
      name: "setFeeDestination",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_feePercent", type: "uint256" },
      ],
      name: "setProtocolFeePercent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_feePercent", type: "uint256" },
      ],
      name: "setSubjectFeePercent",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
      ],
      name: "sharesBalance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "sharesSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "subjectFeePercent",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  export const grantTechContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
