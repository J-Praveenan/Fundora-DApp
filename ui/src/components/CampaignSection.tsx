"use client";

import { useState } from "react";
import {
  CalendarDays,
  Target,
  UserRound,
  Wallet,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import CampaignDetailsModal, { Campaign } from "./CampaignDetailsModal";
import ContributeModal from "./ContributeModal";

const campaigns: Campaign[] = [
  {
    id: 1,
    title: "Clean Water for Rural Schools",
    category: "Community",
    description:
      "Help provide clean drinking water systems for under-resourced rural schools.",
    creator: "addr_test1...9x42",
    goal: 5000,
    raised: 3250,
    deadline: "2026-08-20",
    image:
      "https://images.unsplash.com/photo-1544476915-ed1370594142?q=80&w=1200&auto=format&fit=crop",
    status: "Active",
  },
  {
    id: 2,
    title: "Blockchain Learning Hub",
    category: "Education",
    description:
      "Support a free learning platform for students to study Cardano and Web3.",
    creator: "addr_test1...7k21",
    goal: 8000,
    raised: 6100,
    deadline: "2026-09-15",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    status: "Active",
  },
  {
    id: 3,
    title: "Eco Farming Startup",
    category: "Sustainability",
    description:
      "Fund a sustainable farming project using smart irrigation and solar energy.",
    creator: "addr_test1...3p88",
    goal: 10000,
    raised: 10000,
    deadline: "2026-07-30",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
    status: "Completed",
  },
];

export default function CampaignSection() {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [contributeCampaign, setContributeCampaign] = useState<Campaign | null>(null);

  return (
    <section
      id="campaigns"
      className="relative overflow-hidden bg-slate-950 py-24"
    >
      <div className="absolute left-0 top-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
              Active Campaigns
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
              Support Powerful
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                {" "}
                Ideas
              </span>
            </h2>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-400">
              Explore active Cardano-powered crowdfunding campaigns.
            </p>
          </div>

          <button className="flex w-fit items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:scale-105">
            View All Campaigns
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign, index) => {
            const progress = Math.min(
              (campaign.raised / campaign.goal) * 100,
              100
            );

            return (
              <motion.div
                key={campaign.id}
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

                  <span className="absolute left-4 top-4 rounded-full bg-emerald-400 px-3 py-1 text-xs font-bold text-slate-950">
                    {campaign.category}
                  </span>

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
                    <span>{campaign.creator}</span>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex items-center justify-between text-xs">
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
                    <button  onClick={() => setContributeCampaign(campaign)} className="flex-1 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:scale-[1.02]">
                      Contribute
                    </button>

                    <button
                      onClick={() => setSelectedCampaign(campaign)}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:border-emerald-400/30 hover:bg-emerald-400/10"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <CampaignDetailsModal
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
      />

      <ContributeModal
        campaign={contributeCampaign}
        onClose={() => setContributeCampaign(null)}
        />
    </section>
  );
}