import { transaction } from "frames.js/core";
import type { NextRequest } from "next/server";

const TREASURY_ADDRESS = "0xf5fF2Cb593bcd029fd4Aae049109a9Cc205D5baF" as const;
const MIN_FEE_WEI = "1000000000000";

export const POST = async (_req: NextRequest) => {
  return transaction({
    chainId: "eip155:8453",
    method: "eth_sendTransaction",
    params: {
      abi: [],
      to: TREASURY_ADDRESS,
      value: MIN_FEE_WEI,
    },
  });
};
