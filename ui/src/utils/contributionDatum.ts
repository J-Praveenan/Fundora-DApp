import { mConStr0, mConStr1, stringToHex } from "@meshsdk/core";

export function createContributionDatum(
  campaignId: string,
  contributorPubKeyHash: string,
  amount: number
) {
  const contributionDatum = mConStr0([
    stringToHex(campaignId),
    contributorPubKeyHash,
    amount,
  ]);

  return mConStr1([contributionDatum]);
}