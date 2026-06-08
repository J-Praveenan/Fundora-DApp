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

export function datumStatusToString(status: any): CampaignStatus{
    const constructor = status?.constructor ?? status?.alternative ?? 0;

    if(constructor === 0) return "Active";
    if(constructor === 1) return "Successful";
    if(constructor === 2) return "Failed";
    if(constructor === 3) return "Withdrawn";

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