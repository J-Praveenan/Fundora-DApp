import { deserializeDatum, hexToString } from "@meshsdk/core";

export type CampaignStatus = "Active" | "Successful" | "Failed" | "Withdrawn";

export type Campaign = {
  id: string;
  campaignId: string;
  creator: string;
  title: string;
  description: string;
  image: string;
  goal: number;
  raised: number;
  deadline: string;
  status: CampaignStatus;
  txHash: string;
  outputIndex: number;
};

function datumStatusToString(status: any): CampaignStatus {
  const rawConstructor =
    status?.constructor ??
    status?.alternative ??
    status?.index ??
    status?.constructorIndex ??
    status?.constr ??
    0;

  const constructorIndex = Number(rawConstructor);

  if (constructorIndex === 0) return "Active";
  if (constructorIndex === 1) return "Successful";
  if (constructorIndex === 2) return "Failed";
  if (constructorIndex === 3) return "Withdrawn";

  return "Active";
}

export function decodeCampaignDatum(utxo: any): Campaign | null {
  try {
    if (!utxo.output?.plutusData) return null;

    const datum: any = deserializeDatum(utxo.output.plutusData);
    const fields = datum.fields;

    // CampaignDatum has 9 fields.
    // ContributionDatum has only 3 fields, so ignore it here.
    if (!fields || fields.length !== 9) return null;

    const goal = Number(fields[5].int) / 1_000_000;
    const raised = Number(fields[6].int) / 1_000_000;

    return {
      id: `${utxo.input.txHash}#${utxo.input.outputIndex}`,
      campaignId: hexToString(fields[0].bytes),
      creator: fields[1].bytes,
      title: hexToString(fields[2].bytes),
      description: hexToString(fields[3].bytes),
      image: hexToString(fields[4].bytes),
      goal,
      raised,
      deadline: new Date(Number(fields[7].int)).toISOString().split("T")[0],
      status: datumStatusToString(fields[8]),
      txHash: utxo.input.txHash,
      outputIndex: utxo.input.outputIndex,
    };
  } catch (error) {
    console.error("Failed to decode campaign datum:", error);
    return null;
  }
}