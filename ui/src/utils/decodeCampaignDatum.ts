import { deserializeDatum, hexToString } from "@meshsdk/core";

export type CampaignStatus = "Active" | "Successful" | "Failed" | "Withdrawn";

export type Campaign = {
    id: string;
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
}

function datumStatusToString(status: any): CampaignStatus {
  console.log("Raw status datum:", status);

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

export function decodeCampaignDatum(utxo: any): Campaign | null{
    try {
        const plutusData = 
            utxo.output?.plutusData || 
            utxo.output?.dataHash || 
            utxo.output?.inlineDatum;

        if(!utxo.output?.plutusData) return null;

        const datum: any = deserializeDatum(utxo.output?.plutusData);

        const fields = datum.fields;
        if(!fields) return null;

        console.log('Fields: ', fields);

        const goal = Number(fields[4].int) / 1_000_000;
        const raised = Number(fields[5].int) / 1_000_000;

        return {
            id: `${utxo.input.txHash}#${utxo.input.outputIndex}`,
            creator: fields[0].bytes,
            title: hexToString(fields[1].bytes),
            description: hexToString(fields[2].bytes),
            image: hexToString(fields[3].bytes),
            goal: Number(fields[4].int) / 1000000,
            raised: Number(fields[5].int) / 1000000,
            deadline: new Date(Number(fields[6].int)).toISOString().split("T")[0],
            status: datumStatusToString(fields[7]),
            txHash: utxo.input.txHash,
            outputIndex: utxo.input.outputIndex,
        };

        
    } catch (error) {
        console.error("Failed to decode campaign datum:", error);
        return null;
    }
}