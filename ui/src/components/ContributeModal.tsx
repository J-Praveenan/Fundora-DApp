"use client";

import { useState } from "react";
import { X, HandCoins, Wallet, Target, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Campaign } from "@/utils/decodeCampaignDatum";
import { useWallet } from "@meshsdk/react";
import { CampaignStatus, createCampaignDatum } from "@/utils/campaignDatum";
import { mConStr0, deserializeAddress  } from "@meshsdk/core";
import { txBuilder } from "@/config/mesh";
import { script, scriptAddress } from "@/config/contract";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "@/utils/toast";
import { createContributionDatum } from "@/utils/contributionDatum";

type ContributeModalProps = {
  campaign: Campaign | null;
  onClose: () => void;
};

export default function ContributeModal({
  campaign,
  onClose,
}: ContributeModalProps) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  const { connected, wallet } = useWallet();

  if (!campaign) return null;

  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

  const handleContribute = async () => {
    if (!campaign) return;

    if (!connected) {
      showWarningToast("Please connect your wallet first");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      showWarningToast("Please enter valid ADA amount");
      return;
    }

    try {
      setLoading(true);
      setTxHash("");

      const contributionLovelace = Number(amount) * 1_000_000;

      const utxos = await wallet.getUtxos();
      const collateral = await wallet.getCollateral();
      const changeAddress = await wallet.getChangeAddress();

      const contributorPubKeyHash = deserializeAddress(changeAddress).pubKeyHash;

      const contributionDatum = createContributionDatum(
        campaign.campaignId,
        contributorPubKeyHash,
        contributionLovelace
      );

      if (!collateral || collateral.length === 0) {
        showWarningToast("Collateral not found. Please enable collateral in your wallet.");
        return;
      }

      const oldRaisedLovelace = campaign.raised * 1_000_000;
      const targetLovelace = campaign.goal * 1_000_000;
      const newRaisedLovelace = oldRaisedLovelace + contributionLovelace;

      const newStatus =
        newRaisedLovelace >= targetLovelace
          ? CampaignStatus.Successful
          : CampaignStatus.Active;


      const newDatum = createCampaignDatum(
        campaign.campaignId,
        campaign.creator,
        campaign.title,
        campaign.description,
        campaign.image,
        targetLovelace,
        newRaisedLovelace,
        new Date(campaign.deadline).getTime(),
        newStatus
      );

      const redeemer = mConStr0([contributionLovelace]);

      const oldScriptAmount = campaign.raised * 1_000_000 + 5_000_000;
      const newScriptAmount = oldScriptAmount + contributionLovelace;

      const unsignedTx = await txBuilder
        .spendingPlutusScript("V3")
        .txIn(
          campaign.txHash,
          campaign.outputIndex,
          [
            {
              unit: "lovelace",
              quantity: oldScriptAmount.toString(),
            },
          ],
          scriptAddress
        )
        .txInInlineDatumPresent()
        .txInRedeemerValue(redeemer)
        .txInScript(script.code)

        // Updated campaign UTXO
        .txOut(scriptAddress, [
          {
            unit: "lovelace",
            quantity: newScriptAmount.toString(),
          },
        ])
        .txOutInlineDatumValue(newDatum)

        // Contributor record UTXO
        .txOut(scriptAddress, [
          {
            unit: "lovelace",
            quantity: "5000000",
          },
        ])
        .txOutInlineDatumValue(contributionDatum)

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
      showSuccessToast("Contribution successful!");
    } catch (error) {
      console.error("Contribution failed:", error);
      showErrorToast("Contribution failed. Check console.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-4 py-5 backdrop-blur-sm">
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
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Contribute ADA
          </p>

          <h2 className="mt-3 text-2xl font-black text-white">
            {campaign.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            Enter the amount of ADA you want to contribute to this campaign.
          </p>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">Funding Progress</span>
            <span className="font-semibold text-white">
              {progress.toFixed(0)}%
            </span>
          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-slate-900 p-3">
              <div className="mb-1 flex items-center gap-2 text-xs text-slate-400">
                <Wallet size={14} />
                Raised
              </div>
              <p className="text-sm font-bold text-white">
                {campaign.raised.toLocaleString()} ADA
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900 p-3">
              <div className="mb-1 flex items-center gap-2 text-xs text-slate-400">
                <Target size={14} />
                Goal
              </div>
              <p className="text-sm font-bold text-white">
                {campaign.goal.toLocaleString()} ADA
              </p>
            </div>
          </div>
        </div>

        <form className="mt-6">
          <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-300">
            <HandCoins size={16} className="text-emerald-400" />
            Contribution Amount
          </label>

          <div className="relative">
            <input
              type="number"
              min="1"
              placeholder="Enter ADA amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900 px-5 py-4 pr-16 text-white outline-none placeholder:text-slate-500 focus:border-emerald-400/40"
            />

            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-emerald-400">
              ADA
            </span>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-4 text-sm text-slate-300">
            <Info size={18} className="mt-0.5 shrink-0 text-cyan-400" />
            <p>
              This is currently a frontend-only modal. Later this button will
              call the MeshJS transaction to lock ADA at the campaign script
              address.
            </p>
          </div>

          <button
            type="button"
            onClick={handleContribute}
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-6 py-4 font-bold text-slate-950 transition hover:scale-[1.02]"
          >
            <HandCoins size={20} />
             {loading ? "Contributing..." : "Confirm Contribution"}
          </button>
          {txHash && (
            <p className="mt-3 break-all rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-xs text-emerald-300">
              Transaction Hash: {txHash}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}