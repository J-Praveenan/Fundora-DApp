"use client";

import { useState } from "react";
import { X, Wallet, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useWallet } from "@meshsdk/react";
import { mConStr1, MeshTxBuilder } from "@meshsdk/core";

import { Campaign } from "@/utils/decodeCampaignDatum";
import { script, scriptAddress } from "@/config/contract";
import { provider } from "@/config/mesh";

type Props = {
  campaign: Campaign | null;
  onClose: () => void;
};

export default function WithdrawModal({ campaign, onClose }: Props) {
  const { connected, wallet } = useWallet();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState("");

  if (!campaign) return null;

  const handleWithdraw = async () => {
    if (!connected) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      setLoading(true);
      setTxHash("");

      const utxos = await wallet.getUtxos();
      const collateral = await wallet.getCollateral();
      const changeAddress = await wallet.getChangeAddress();

      if (!collateral || collateral.length === 0) {
        alert("Collateral not found. Please enable collateral in your wallet.");
        return;
      }

      const totalScriptAmount = Math.round(
        (campaign.raised + 5) * 1_000_000
      );

      const withdrawAmount = Math.round(campaign.raised * 1_000_000);

      const redeemer = mConStr1([]);

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
              quantity: totalScriptAmount.toString(),
            },
          ],
          scriptAddress
        )
        .txInInlineDatumPresent()
        .txInRedeemerValue(redeemer)
        .txInScript(script.code)
        .txOut(changeAddress, [
          {
            unit: "lovelace",
            quantity: withdrawAmount.toString(),
          },
        ])
        .txInCollateral(
          collateral[0].input.txHash,
          collateral[0].input.outputIndex,
          collateral[0].output.amount,
          collateral[0].output.address
        )
        .requiredSignerHash(campaign.creator)
        // .invalidBefore(Number(new Date(campaign.deadline).getTime()))
        .changeAddress(changeAddress)
        .selectUtxosFrom(utxos)
        .complete();

      const signedTx = await wallet.signTx(unsignedTx, true);
      const submittedTxHash = await wallet.submitTx(signedTx);

      setTxHash(submittedTxHash);
      alert("Withdraw successful!");
    } catch (error) {
      console.error("Withdraw failed:", error);
      alert("Withdraw failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
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

        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
          Withdraw Funds
        </p>

        <h2 className="mt-3 pr-10 text-2xl font-black text-white">
          {campaign.title}
        </h2>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Wallet size={18} className="text-emerald-400" />
            <span className="text-sm">Available to withdraw</span>
          </div>

          <p className="mt-2 text-3xl font-black text-white">
            {campaign.raised.toLocaleString()} ADA
          </p>
        </div>

        <div className="mt-4 flex gap-2 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4 text-sm text-yellow-200">
          <AlertCircle size={18} className="shrink-0" />
          <p>
            Your smart contract allows withdraw only if the campaign is
            successful and the deadline has passed.
          </p>
        </div>

        <button
          type="button"
          onClick={handleWithdraw}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-6 py-4 font-bold text-slate-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Wallet size={20} />
          {loading ? "Withdrawing..." : "Confirm Withdraw"}
        </button>

        {txHash && (
          <p className="mt-3 break-all rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-xs text-emerald-300">
            Transaction Hash: {txHash}
          </p>
        )}
      </motion.div>
    </div>
  );
}