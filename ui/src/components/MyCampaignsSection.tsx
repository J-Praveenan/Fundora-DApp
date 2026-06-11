"use client";

import { useState } from "react";
import {
  CalendarDays,
  Target,
  UserRound,
  Wallet,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { useWallet } from "@meshsdk/react";
import { deserializeAddress } from "@meshsdk/core";

import { provider } from "@/config/mesh";
import { scriptAddress } from "@/config/contract";
import {
  Campaign,
  decodeCampaignDatum,
} from "@/utils/decodeCampaignDatum";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "@/utils/toast";

import CampaignDetailsModal from "./CampaignDetailsModal";
import ContributeModal from "./ContributeModal";
import WithdrawModal from "./WithdrawModal";

export default function MyCampaignsSection() {
  const { connected, wallet } = useWallet();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const [selectedCampaign, setSelectedCampaign] =
    useState<Campaign | null>(null);
  const [contributeCampaign, setContributeCampaign] =
    useState<Campaign | null>(null);
  const [withdrawCampaign, setWithdrawCampaign] =
    useState<Campaign | null>(null);

  const fetchMyCampaigns = async () => {
    if (!connected) {
      showErrorToast("Please connect your wallet first");
      return;
    }

    try {
      setLoading(true);
      setHasLoaded(true);

      const changeAddress = await wallet.getChangeAddress();
      const creatorPubKeyHash = deserializeAddress(changeAddress).pubKeyHash;

      const utxos = await provider.fetchAddressUTxOs(scriptAddress);

      const decodedCampaigns = utxos
        .map((utxo: any) => decodeCampaignDatum(utxo))
        .filter((campaign): campaign is Campaign => campaign !== null);

      const myCampaigns = decodedCampaigns.filter(
        (campaign) => campaign.creator === creatorPubKeyHash
      );

      setCampaigns(myCampaigns);
    } catch (error) {
      console.error("Failed to fetch my campaigns:", error);
      showErrorToast("Failed to load your campaigns");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="my-campaigns"
      className="relative overflow-hidden bg-slate-950 py-24"
    >
      <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
              Creator Dashboard
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
              My
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Campaigns
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              View campaigns created by your connected wallet and manage
              successful withdrawals.
            </p>
          </div>

          <button
            onClick={fetchMyCampaigns}
            disabled={loading}
            className="flex w-fit items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCcw size={18} className={loading ? "animate-spin" : ""} />
            {loading ? "Loading..." : "Load My Campaigns"}
          </button>
        </div>

        {!hasLoaded && (
          <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-xl">
            <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-emerald-400" />
            <h3 className="text-2xl font-bold text-white">
              Your campaigns are not loaded yet
            </h3>
            <p className="mt-3 text-slate-400">
              Connect your wallet and click Load My Campaigns.
            </p>
          </div>
        )}

        {hasLoaded && !loading && campaigns.length === 0 && (
          <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center backdrop-blur-xl">
            <h3 className="text-2xl font-bold text-white">
              No campaigns found
            </h3>
            <p className="mt-3 text-slate-400">
              This wallet has not created any active on-chain campaigns.
            </p>
          </div>
        )}

        {campaigns.length > 0 && (
          <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign, index) => {
              const progress = Math.min(
                (campaign.raised / campaign.goal) * 100,
                100
              );

              return (
                <motion.div
                  key={campaign.campaignId}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition hover:-translate-y-2 hover:border-emerald-400/30 hover:bg-white/[0.07]"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                    <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                      {campaign.status}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="line-clamp-2 text-xl font-bold text-white">
                      {campaign.title}
                    </h3>

                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                      <UserRound size={14} className="text-emerald-400" />
                      <span>{campaign.creator.slice(0, 26)}...</span>
                    </div>

                    <div className="mt-5">
                      <div className="mb-2 flex justify-between text-xs">
                        <span className="text-slate-400">Progress</span>
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
                    </div>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <div className="mb-1.5 flex items-center gap-2 text-xs text-slate-400">
                          <Wallet size={14} />
                          Raised
                        </div>

                        <p className="text-sm font-bold text-white">
                          {campaign.raised.toLocaleString()} ADA
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                        <div className="mb-1.5 flex items-center gap-2 text-xs text-slate-400">
                          <Target size={14} />
                          Goal
                        </div>

                        <p className="text-sm font-bold text-white">
                          {campaign.goal.toLocaleString()} ADA
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                      <CalendarDays size={14} className="text-cyan-400" />
                      <span>Deadline: {campaign.deadline}</span>
                    </div>

                    <div className="mt-5 flex gap-3">
                      {campaign.status === "Active" && (
                        <button
                          onClick={() => setContributeCampaign(campaign)}
                          className="flex-1 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:scale-[1.02]"
                        >
                          Contribute
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedCampaign(campaign)}
                        className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:border-emerald-400/30 hover:bg-emerald-400/10"
                      >
                        Details
                      </button>
                    </div>

                    {campaign.status === "Successful" && (
                      <button
                        onClick={() => setWithdrawCampaign(campaign)}
                        className="mt-3 w-full rounded-xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-2.5 text-sm font-bold text-emerald-300 transition hover:bg-emerald-400/20"
                      >
                        Withdraw
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <CampaignDetailsModal
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
      />

      <ContributeModal
        campaign={contributeCampaign}
        onClose={() => setContributeCampaign(null)}
      />

      <WithdrawModal
        campaign={withdrawCampaign}
        onClose={() => setWithdrawCampaign(null)}
      />
    </section>
  );
}