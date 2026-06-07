"use client";

import Link from "next/link";
import { CardanoWallet } from "@meshsdk/react";
import {
  Coins,
  Menu,
  X,
  LayoutDashboard,
  Rocket,
  Layers3,
  ShieldCheck,
  PlusCircle,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { name: "Home", href: "#home", icon: LayoutDashboard },
  { name: "Campaigns", href: "#campaigns", icon: Rocket },
  { name: "Create Campaign", href: "#create", icon: PlusCircle },
  { name: "How It Works", href: "#how-it-works", icon: Layers3 },
  { name: "Features", href: "#features", icon: ShieldCheck },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500">
            <Coins className="h-6 w-6 text-slate-950" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-white">Fundora</h1>
            <p className="text-xs text-slate-400">
              Cardano Crowdfunding DApp
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-emerald-400/10 hover:text-emerald-400"
              >
                <Icon size={16} />
                {link.name}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:flex">
          <CardanoWallet label="Connect Wallet" isDark={true} persist={true} />
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-white md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 px-5 pb-5 md:hidden">
          <nav className="mt-4 flex flex-col gap-3">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm font-medium text-slate-300 hover:text-emerald-400"
                >
                  <Icon size={18} />
                  {link.name}
                </a>
              );
            })}
          </nav>

          <div className="mt-5">
            <CardanoWallet
              label="Connect Wallet"
              isDark={true}
              persist={true}
            />
          </div>
        </div>
      )}
    </header>
  );
}