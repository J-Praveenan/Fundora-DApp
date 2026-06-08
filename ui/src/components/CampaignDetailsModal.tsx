"use client";

import {
  X,
  CalendarDays,
  Target,
  Wallet,
  UserRound,
  BadgeCheck,
  HandCoins,
} from "lucide-react";
import { motion } from "framer-motion";
import { CampaignStatus } from "@/utils/campaignDatum";
import { Campaign } from "@/utils/decodeCampaignDatum";



type CampaignDetailsModalProps = {
  campaign: Campaign | null;
  onClose: () => void;
};

export default function CampaignDetailsModal({
  campaign,
  onClose,
}: CampaignDetailsModalProps) {
  if (!campaign) return null;

  const progress = Math.min((campaign.raised / campaign.goal) * 100, 100);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-5 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-xl border border-white/10 bg-slate-950/80 p-2 text-white backdrop-blur hover:bg-red-500/20"
        >
          <X size={20} />
        </button>

        <div className="grid lg:grid-cols-2">
          <div className="relative h-72 lg:h-full">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-4 flex items-center gap-2">
              <BadgeCheck size={18} className="text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-400">
                {campaign.status}
              </span>
            </div>

            <h2 className="text-3xl font-black text-white">
              {campaign.title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              {campaign.description}
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
              <UserRound size={16} className="text-emerald-400" />
              <span>Creator:</span>
              <span className="font-medium text-white">
                {campaign.creator}
              </span>
            </div>

            <div className="mt-6">
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

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
                  <Wallet size={15} />
                  Raised
                </div>
                <p className="font-bold text-white">
                  {campaign.raised.toLocaleString()} ADA
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-xs text-slate-400">
                  <Target size={15} />
                  Goal
                </div>
                <p className="font-bold text-white">
                  {campaign.goal.toLocaleString()} ADA
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
              <CalendarDays size={16} className="text-cyan-400" />
              Deadline: {campaign.deadline}
            </div>

            <button className="mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-6 py-4 font-bold text-slate-950 transition hover:scale-[1.02]">
              <HandCoins size={20} />
              Contribute to Campaign
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}