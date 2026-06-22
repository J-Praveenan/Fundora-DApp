import { deserializeDatum, hexToString } from "@meshsdk/core";

export type Contribution = {
  id: string;
  campaignId: string;
  contributor: string;
  amount: number;
  txHash: string;
  outputIndex: number;
};

export function decodeContributionDatum(utxo: any): Contribution | null {
  try {
    if (!utxo.output?.plutusData) return null;

    const wrapper: any = deserializeDatum(utxo.output.plutusData);

    const wrapperConstructor = Number(
      wrapper?.constructor ??
        wrapper?.alternative ??
        wrapper?.index ??
        wrapper?.constructorIndex ??
        wrapper?.constr ??
        0
    );

    if (wrapperConstructor !== 1) return null;

    const contributionDatum = wrapper.fields?.[0];
    const fields = contributionDatum?.fields;

    if (!fields || fields.length !== 3) return null;

    return {
      id: `${utxo.input.txHash}#${utxo.input.outputIndex}`,
      campaignId: hexToString(fields[0].bytes),
      contributor: fields[1].bytes,
      amount: Number(fields[2].int) / 1_000_000,
      txHash: utxo.input.txHash,
      outputIndex: utxo.input.outputIndex,
    };
  } catch {
    return null;
  }
}