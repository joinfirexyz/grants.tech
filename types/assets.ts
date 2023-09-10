export type ERC20Token = {
  decimals: number;
  logo: string;
  name: string;
  symbol: string;
  verified: boolean;
  contract: string;
  contractAddress: string;
  tokenBalance: string;
  tokenBalanceUsdValue?: number | undefined;
  usdTokenPrice?: number | undefined;
  chainId: string; //hex chainId
};

export type TokenPriceResponse = {
  networkId: string;
  contractAddress?: string;
  price: number;
};
