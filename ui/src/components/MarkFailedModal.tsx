"use client";

import { useState } from "react";
import { X, AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useWallet } from "@meshsdk/react";
import { mConStr2, MeshTxBuilder } from "@meshsdk/core";

import { Campaign } from "@/utils/decodeCampaignDatum";
import { CampaignStatus, createCampaignDatum } from "@/utils/campaignDatum";
import { script, scriptAddress } from "@/config/contract";
import { provider } from "@/config/mesh";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "@/utils/toast";

type Props = {
  campaign: Campaign | null;
  onClose: () => void;
};

export default function MarkFailedModal({ campaign, onClose }: Props) {
  const { connected, wallet } = useWallet();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  if (!campaign) return null;

  const handleMarkFailed = async () => {
    if (!connected) {
      showWarningToast("Please connect your wallet first.");
      return;
    }

    if (campaign.status !== "Active") {
      showWarningToast("Only active campaigns can be marked as failed.");
      return;
    }

    if (campaign.raised >= campaign.goal) {
      showWarningToast("This campaign reached its goal and cannot be failed.");
      return;
    }

    const deadlineTime = new Date(campaign.deadline).getTime();

    if (Date.now() < deadlineTime) {
      showWarningToast("Campaign can be marked failed only after deadline.");
      return;
    }

    try {
      setLoading(true);
      setTxHash("");

      const utxos = await wallet.getUtxos();
      const collateral = await wallet.getCollateral();
      const changeAddress = await wallet.getChangeAddress();

      if (!collateral || collateral.length === 0) {
        showWarningToast("Collateral not found. Please enable collateral.");
        return;
      }

      const targetLovelace = Math.round(campaign.goal * 1_000_000);
      const raisedLovelace = Math.round(campaign.raised * 1_000_000);
      const scriptAmount = raisedLovelace + 5_000_000;

      const failedDatum = createCampaignDatum(
        campaign.campaignId,
        campaign.creator,
        campaign.title,
        campaign.description,
        campaign.image,
        targetLovelace,
        raisedLovelace,
        new Date(campaign.deadline).getTime(),
        CampaignStatus.Failed
      );

      const redeemer = mConStr2([]);

      const txBuilder = new MeshTxBuilder({
        fetcher: provider,
        submitter: provider,
        verbose: true,
      });

      const unsignedTx = await txBuilder
        .spendingPlutusScript("V3")
        .txIn(
          campaign.txHash,
          campaign.outputIndex,
          [
            {
              unit: "lovelace",
              quantity: scriptAmount.toString(),
            },
          ],
          scriptAddress
        )
        .txInInlineDatumPresent()
        .txInRedeemerValue(redeemer)
        .txInScript(script.code)
        .txOut(scriptAddress, [
          {
            unit: "lovelace",
            quantity: scriptAmount.toString(),
          },
        ])
        .txOutInlineDatumValue(failedDatum)
        .txInCollateral(
          collateral[0].input.txHash,
          collateral[0].input.outputIndex,
          collateral[0].output.amount,
          collateral[0].output.address
        )
        .changeAddress(changeAddress)
        .selectUtxosFrom(utxos)
        .complete();

      const signedTx = await wallet.signTx(unsignedTx, true);
      const submittedTxHash = await wallet.submitTx(signedTx);

      setTxHash(submittedTxHash);
      showSuccessToast("Campaign marked as failed!");
      onClose();
    } catch (error) {
      console.error("Mark failed failed:", error);
      showErrorToast("Failed to mark campaign as failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[145] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl border border-white/10 bg-white/5 p-2 text-white hover:bg-red-500/20"
        >
          <X size={20} />
        </button>

        <div className="pr-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-300">
            Mark Campaign Failed
          </p>

          <h2 className="mt-3 text-2xl font-black text-white">
            {campaign.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            This will update the campaign status to Failed and allow
            contributors to request refunds.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-red-400/20 bg-red-400/10 p-4">
          <div className="flex items-start gap-3 text-sm text-red-200">
            <AlertTriangle size={20} className="mt-0.5 shrink-0" />
            <p>
              Only mark this campaign as failed if the deadline has passed and
              the target amount was not reached.
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Raised</p>
            <p className="mt-1 font-bold text-white">
              {campaign.raised.toLocaleString()} ADA
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs text-slate-400">Goal</p>
            <p className="mt-1 font-bold text-white">
              {campaign.goal.toLocaleString()} ADA
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleMarkFailed}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-400 to-orange-400 px-6 py-4 font-bold text-slate-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <CheckCircle2 size={20} />
          {loading ? "Updating Status..." : "Confirm Mark Failed"}
        </button>

        {txHash && (
          <p className="mt-3 break-all rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-xs text-red-200">
            Transaction Hash: {txHash}
          </p>
        )}
      </motion.div>
    </div>
  );
}