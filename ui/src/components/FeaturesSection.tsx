"use client";

import {
  ShieldCheck,
  Wallet,
  RefreshCcw,
  BadgeCheck,
  Blocks,
  LockKeyhole,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ShieldCheck,
    title: "Transparent Transactions",
    description:
      "Every contribution, withdrawal, and refund is permanently recorded on the Cardano blockchain for full transparency.",
  },
  {
    icon: Wallet,
    title: "Secure Wallet Integration",
    description:
      "Connect Cardano wallets securely using MeshJS without exposing private keys or sensitive information.",
  },
  {
    icon: RefreshCcw,
    title: "Refund Protection",
    description:
      "Contributors can reclaim ADA automatically if the campaign funding goal is not reached before the deadline.",
  },
  {
    icon: BadgeCheck,
    title: "Smart Contract Validation",
    description:
      "Aiken smart contracts validate contributions, withdrawals, deadlines, and refund conditions securely.",
  },
  {
    icon: Blocks,
    title: "Fully Decentralized",
    description:
      "No centralized authority controls the funds. Campaign logic is executed entirely on-chain.",
  },
  {
    icon: LockKeyhole,
    title: "Trustless Crowdfunding",
    description:
      "Campaign creators and contributors interact directly through blockchain-based escrow mechanisms.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-slate-950 py-24"
    >

      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />


      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
            Features
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-white md:text-5xl">
            Why Choose
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}
              Fundora
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Experience secure, decentralized, and transparent crowdfunding
            powered by Cardano blockchain technology and Aiken smart contracts.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-emerald-400/30 hover:bg-white/[0.07]"
              >

                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/10 blur-2xl transition group-hover:bg-cyan-400/20" />

                <div className="relative z-10">
  
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-slate-950 shadow-lg shadow-emerald-500/20">
                    <Icon size={30} />
                  </div>

                  <h3 className="text-2xl font-bold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-400">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}