import { mConStr0, mConStr1, mConStr2, mConStr3, stringToHex } from "@meshsdk/core";


export enum CampaignStatus {
    Active = 0,
    Successful = 1,
    Failed = 2,
    Withdrawn = 3,
}

export function statusToDatum(status: CampaignStatus){
    switch(status){
        case CampaignStatus.Active: return mConStr0([]);
        case CampaignStatus.Successful: return mConStr1([]);
        case CampaignStatus.Failed: return mConStr2([]);
        case CampaignStatus.Withdrawn: return mConStr3([]);

        default: return mConStr0([]);

    }
}


export function createCampaignDatum(
    creatorPubKeyHash: string,
    title: string,
    description: string,
    imageUrl: string,
    targetAmount: number,
    raisedAmount: number,
    deadline: number,
    status: CampaignStatus,
){
    return mConStr0([
        creatorPubKeyHash,
        stringToHex(title),
        stringToHex(description),
        stringToHex(imageUrl),
        targetAmount,
        raisedAmount,
        deadline,
        statusToDatum(status)
    ]);
}

export function createUpdatedCampaignDatum(
  creatorPubKeyHash: string,
  title: string,
  description: string,
  imageUrl: string,
  targetAmount: number,
  raisedAmount: number,
  deadline: number,
  status: CampaignStatus
) {
  return createCampaignDatum(
    creatorPubKeyHash,
    title,
    description,
    imageUrl,
    targetAmount,
    raisedAmount,
    deadline,
    status
  );
}