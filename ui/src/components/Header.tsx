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
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "#home", icon: LayoutDashboard },
  { name: "Campaigns", href: "#campaigns", icon: Rocket },
  { name: "My Campaigns", href: "#my-campaigns", icon: Wallet },
  { name: "Create Campaign", href: "#create", icon: PlusCircle },
  { name: "How It Works", href: "#how-it-works", icon: Layers3 },
  { name: "Features", href: "#features", icon: ShieldCheck },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      for (const item of navLinks) {
        const section = document.querySelector(item.href);
        if (!section) continue;

        const rect = section.getBoundingClientRect();

        if (rect.top <= 160 && rect.bottom >= 160) {
          setActiveSection(item.href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <Link href="#home" className="flex shrink-0 items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500">
            <Coins className="h-6 w-6 text-slate-950" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-white">Fundora</h1>
            <p className="text-xs text-slate-400">Cardano Crowdfunding DApp</p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 xl:flex">
          <nav className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? "border-emerald-400/20 bg-gradient-to-r from-emerald-400/20 to-cyan-500/20 text-emerald-400"
                      : "border-transparent text-slate-300 hover:bg-emerald-400/10 hover:text-emerald-400"
                  }`}
                >
                  <Icon size={15} />
                  <span className="whitespace-nowrap">{link.name}</span>
                </a>
              );
            })}
          </nav>

          <div className="shrink-0">
            <CardanoWallet label="Connect Wallet" isDark={false} persist />
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-white xl:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950 px-5 pb-5 xl:hidden">
          <nav className="mt-4 flex flex-col gap-3">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.href;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => {
                    setActiveSection(link.href);
                    setOpen(false);
                  }}
                  className={`flex items-center gap-3 rounded-2xl border px-4 py-4 text-sm font-medium transition ${
                    isActive
                      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
                      : "border-white/10 bg-white/[0.04] text-slate-300 hover:text-emerald-400"
                  }`}
                >
                  <Icon size={18} />
                  {link.name}
                </a>
              );
            })}
          </nav>

          <div className="mt-5">
            <CardanoWallet label="Connect Wallet" isDark={false} persist />
          </div>
        </div>
      )}
    </header>
  );
}