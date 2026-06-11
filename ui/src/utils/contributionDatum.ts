import { mConStr0, stringToHex } from "@meshsdk/core";

export function createContributionDatum(
  campaignId: string,
  contributorPubKeyHash: string,
  amount: number
) {
  return mConStr0([
    stringToHex(campaignId),
    contributorPubKeyHash,
    amount,
  ]);
}