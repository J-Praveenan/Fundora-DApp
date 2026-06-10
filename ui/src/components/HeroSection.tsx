"use client";

import { ArrowRight, Sparkles, ShieldCheck, Wallet } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-slate-950 pb-24 pt-32"
    >
      
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 text-center lg:px-8">
    
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-5 py-2 text-sm font-medium text-emerald-300"
        >
          <Sparkles size={16} />
          Powered by Cardano Blockchain
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl text-5xl font-black leading-tight tracking-tight text-white md:text-7xl"
        >
          Decentralized
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {" "}
            Crowdfunding{" "}
          </span>
          Platform for Modern Creators
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="mt-8 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl"
        >
          Launch fundraising campaigns, receive secure blockchain-backed
          contributions, and empower communities through transparent and
          trustless crowdfunding on the Cardano ecosystem.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <button onClick={() => {
              document
                .getElementById("create")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-8 py-4 text-lg font-semibold text-slate-950 transition hover:scale-105">
            Start Campaign
            <ArrowRight
              size={20}
              className="transition group-hover:translate-x-1"
            />
          </button>

          <button 
            onClick={() => {
              document
                .getElementById("campaigns")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-lg font-semibold text-white transition hover:border-emerald-400/30 hover:bg-emerald-400/10">
            Explore Campaigns
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3 }}
          className="mt-20 grid w-full max-w-5xl gap-6 md:grid-cols-3"
        >
  
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-5 inline-flex rounded-2xl bg-emerald-400/10 p-4 text-emerald-400">
              <Wallet size={28} />
            </div>

            <h3 className="text-4xl font-black text-white">$2M+</h3>

            <p className="mt-3 text-slate-400">
              Total Funds Raised Across Campaigns
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-5 inline-flex rounded-2xl bg-cyan-400/10 p-4 text-cyan-400">
              <ShieldCheck size={28} />
            </div>

            <h3 className="text-4xl font-black text-white">100%</h3>

            <p className="mt-3 text-slate-400">
              Transparent Smart Contract Transactions
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
            <div className="mb-5 inline-flex rounded-2xl bg-purple-400/10 p-4 text-purple-400">
              <Sparkles size={28} />
            </div>

            <h3 className="text-4xl font-black text-white">500+</h3>

            <p className="mt-3 text-slate-400">
              Successful Community Campaigns
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}