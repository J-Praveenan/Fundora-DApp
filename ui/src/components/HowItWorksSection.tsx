"use client";

import {
  Rocket,
  Wallet,
  HandCoins,
  CircleDollarSign,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Rocket,
    title: "Create Campaign",
    description:
      "Campaign creators define the funding goal, deadline, and project details. The campaign datum is locked on Cardano using the Aiken smart contract.",
  },
  {
    icon: Wallet,
    title: "Connect Wallet",
    description:
      "Users connect their Cardano wallet securely using MeshJS. No private keys are stored by the application.",
  },
  {
    icon: HandCoins,
    title: "Contribute ADA",
    description:
      "Supporters contribute ADA to active campaigns. Each contribution is recorded transparently on-chain.",
  },
  {
    icon: CircleDollarSign,
    title: "Withdraw Funds",
    description:
      "If the campaign reaches its goal before the deadline, the creator can withdraw the collected ADA.",
  },
  {
    icon: RotateCcw,
    title: "Refund Contributors",
    description:
      "If the campaign fails after the deadline, contributors can safely reclaim their ADA using the refund logic.",
  },
  {
    icon: CheckCircle2,
    title: "Verify On-Chain",
    description:
      "Every campaign, contribution, withdrawal, and refund can be verified through Cardano blockchain transactions.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-slate-950 py-24"
    >
      <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-10 left-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
            How It Works
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
            Crowdfunding Made Simple,
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Secure & Transparent
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Fundora uses MeshJS and Aiken smart contracts to make campaign
            funding, withdrawal, and refund processes fully transparent on
            Cardano.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-emerald-400/30 hover:bg-white/[0.07]"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl transition group-hover:bg-cyan-400/20" />

                <div className="relative z-10">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/20">
                      <Icon size={28} />
                    </div>

                    <span className="text-5xl font-black text-white/5">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 rounded-3xl border border-emerald-400/20 bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 p-8 text-center backdrop-blur-xl">
          <h3 className="text-2xl font-bold text-white">
            Powered by Cardano Preprod Network
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-7 text-slate-400">
            This DApp is designed to interact with your Aiken crowdfunding smart
            contract using MeshJS transaction building, wallet connection,
            script UTXOs, datum, and redeemer validation.
          </p>
        </div>
      </div>
    </section>
  );
}