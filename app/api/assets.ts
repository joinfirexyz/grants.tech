import { ERC20Token, TokenPriceResponse } from "../../types/assets";

export const fetchERC20Assets = async (
  walletAddress: string,
  hexChainId: string
): Promise<ERC20Token[]> => {
  let tokens: ERC20Token[] = [];

  try {
    const res = await fetch(
      `https://api4.services.joinfire.xyz/wallet/getAddressTokens/${walletAddress}?network=${hexChainId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();

    const formattedTokens: ERC20Token[] = (
      await Promise.all(
        data.erc20s.map(async (asset: ERC20Token) => {
          if (+asset.tokenBalance === 0) return null;

          //use an additional try/catch so that one failed USD call doesn't tank the whole thing
          try {
            const tokenPriceResponse = await getTokenPrice(
              hexChainId,
              asset.contractAddress
            );
            const tokenBalance = Number(asset.tokenBalance);
            const decimalUSDValue = tokenPriceResponse?.price
              ? tokenBalance * tokenPriceResponse.price
              : undefined;

            const formattedToken: ERC20Token = {
              ...asset,
              tokenBalance: asset.tokenBalance.toString(),
              tokenBalanceUsdValue: decimalUSDValue,
              usdTokenPrice: tokenPriceResponse?.price,
            };
            return formattedToken;
          } catch (error) {
            console.error("Error occurred while fetching token price:", error);
            return null;
          }
        })
      )
    ).filter((result): result is ERC20Token => result !== null);

    tokens = formattedTokens;
  } catch (error) {
    console.error("Error fetching ERC20 assets ", error);
  }

  return tokens;
};

export const getTokenPrice = async (
  networkId: string,
  contractAddress: string
): Promise<TokenPriceResponse | undefined> => {
  try {
    const contract = contractAddress.startsWith("0x")
      ? contractAddress
      : "native";
    const res = await fetch(
      `https://api4.services.joinfire.xyz/prices/${networkId}/${contract}`
    );

    const payload: TokenPriceResponse = await res.json();

    //if the price is negative, means it failed to fetch
    if (payload.price === -1) {
      return undefined;
    }

    return payload;
  } catch (e) {
    console.error("Error Caught:", e);
    return undefined;
  }
};
