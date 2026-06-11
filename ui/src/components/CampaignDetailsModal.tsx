"use client";

import { useState } from "react";
import {
  X,
  CalendarDays,
  Target,
  Wallet,
  UserRound,
  BadgeCheck,
  HandCoins,
  UsersRound,
} from "lucide-react";
import { motion } from "framer-motion";

import { Campaign } from "@/utils/decodeCampaignDatum";
import ContributorsModal from "./ContributorsModal";

type CampaignDetailsModalProps = {
  campaign: Campaign | null;
  onClose: () => void;
};

export default function CampaignDetailsModal({
  campaign,
  onClose,
}: CampaignDetailsModalProps) {
  const [showContributors, setShowContributors] = useState(false);

  if (!campaign) return null;

  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-5 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-xl border border-white/10 bg-slate-950/80 p-2 text-white backdrop-blur hover:bg-red-500/20"
        >
          <X size={20} />
        </button>

        <div className="grid min-h-[560px] lg:grid-cols-[42%_58%]">
          <div className="hidden lg:block">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="grid content-between gap-5 p-7">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <BadgeCheck size={17} className="text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400">
                  {campaign.status}
                </span>
              </div>

              <h2 className="max-w-3xl text-3xl font-black leading-tight text-white">
                {campaign.title}
              </h2>

              <p className="mt-3 line-clamp-3 max-w-4xl text-sm leading-6 text-slate-400">
                {campaign.description}
              </p>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <UserRound size={16} className="text-emerald-400" />
                  Creator
                </div>

                <p className="mt-2 truncate font-mono text-xs text-slate-400">
                  {campaign.creator}
                </p>

                <div className="mt-3 rounded-xl bg-slate-900/70 px-3 py-2">
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    Campaign ID
                  </p>

                  <p className="mt-1 truncate font-mono text-xs text-slate-300">
                    {campaign.campaignId}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-400">Funding Progress</span>
                  <span className="font-semibold text-white">
                    {progress.toFixed(0)}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
                    <Wallet size={15} />
                    Raised
                  </div>

                  <p className="text-lg font-bold text-white">
                    {campaign.raised.toLocaleString()} ADA
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
                    <Target size={15} />
                    Goal
                  </div>

                  <p className="text-lg font-bold text-white">
                    {campaign.goal.toLocaleString()} ADA
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
                    <CalendarDays size={15} className="text-cyan-400" />
                    Deadline
                  </div>

                  <p className="text-lg font-bold text-white">
                    {campaign.deadline}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <button
                onClick={() => setShowContributors(true)}
                className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 font-bold text-white transition hover:border-emerald-400/30 hover:bg-emerald-400/10"
              >
                <UsersRound size={20} />
                View Contributors
              </button>

              {campaign.status === "Active" && (
                <button className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-6 py-4 font-bold text-slate-950 transition hover:scale-[1.02]">
                  <HandCoins size={20} />
                  Contribute to Campaign
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <ContributorsModal
        campaign={showContributors ? campaign : null}
        onClose={() => setShowContributors(false)}
      />
    </div>
  );
}