"use client";

import { useEffect, useState } from "react";
import { X, UsersRound, Wallet, RefreshCcw } from "lucide-react";
import { motion } from "framer-motion";

import { Campaign } from "@/utils/decodeCampaignDatum";
import {
  Contribution,
  decodeContributionDatum,
} from "@/utils/decodeContributionDatum";
import { provider } from "@/config/mesh";
import { scriptAddress } from "@/config/contract";

type Props = {
  campaign: Campaign | null;
  onClose: () => void;
};

export default function ContributorsModal({ campaign, onClose }: Props) {
  const [contributors, setContributors] = useState<Contribution[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchContributors = async () => {
    if (!campaign) return;

    try {
      setLoading(true);

      const utxos = await provider.fetchAddressUTxOs(scriptAddress);

      const decoded = utxos
        .map((utxo: any) => decodeContributionDatum(utxo))
        .filter((item): item is Contribution => item !== null)
        .filter((item) => item.campaignId === campaign.campaignId);

      setContributors(decoded);
    } catch (error) {
      console.error("Failed to fetch contributors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributors();
  }, [campaign]);

  if (!campaign) return null;

  const totalContributed = contributors.reduce(
    (total, item) => total + item.amount,
    0
  );

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center bg-black/70 px-4 py-5 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-slate-950 p-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-xl border border-white/10 bg-white/5 p-2 text-white hover:bg-red-500/20"
        >
          <X size={20} />
        </button>

        <div className="pr-10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            Campaign Contributors
          </p>

          <h2 className="mt-3 text-2xl font-black text-white">
            {campaign.title}
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            View contributor records stored on-chain for this campaign.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <UsersRound size={16} className="text-emerald-400" />
              Total Contributors
            </div>
            <p className="mt-2 text-2xl font-black text-white">
              {contributors.length}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Wallet size={16} className="text-cyan-400" />
              Total Recorded
            </div>
            <p className="mt-2 text-2xl font-black text-white">
              {totalContributed.toLocaleString()} ADA
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={fetchContributors}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400/10 disabled:opacity-50"
          >
            <RefreshCcw size={15} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        <div className="mt-5 max-h-[360px] overflow-y-auto pr-1">
          {loading && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center text-slate-400">
              Loading contributors...
            </div>
          )}

          {!loading && contributors.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
              <p className="font-semibold text-white">No contributors found</p>
              <p className="mt-2 text-sm text-slate-400">
                Contribution records will appear here after users contribute.
              </p>
            </div>
          )}

          {!loading && contributors.length > 0 && (
            <div className="space-y-3">
              {contributors.map((item, index) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        Contributor #{index + 1}
                      </p>

                      <p className="mt-2 break-all font-mono text-sm text-slate-300">
                        {item.contributor}
                      </p>
                    </div>

                    <div className="shrink-0 rounded-xl bg-emerald-400/10 px-4 py-2 text-right">
                      <p className="text-xs text-emerald-300">Amount</p>
                      <p className="font-bold text-white">
                        {item.amount.toLocaleString()} ADA
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}