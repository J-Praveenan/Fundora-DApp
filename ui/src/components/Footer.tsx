"use client";

import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";

const footerLinks = {
  platform: [
    { name: "Home", href: "#home" },
    { name: "Campaigns", href: "#campaigns" },
    { name: "Create Campaign", href: "#create" },
    { name: "How It Works", href: "#how-it-works" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "Smart Contract", href: "#" },
    { name: "Whitepaper", href: "#" },
    { name: "Support", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950">
      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/20">
                <span className="text-lg font-bold text-slate-950">F</span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">
                  Fundora
                </h2>
                <p className="text-sm text-slate-400">
                  Cardano Crowdfunding DApp
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              Empowering creators, startups, and communities through
              decentralized crowdfunding powered by Cardano blockchain
              technology.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Platform
            </h3>

            <ul className="mt-5 space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-slate-400 transition hover:text-emerald-400"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={15}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Resources
            </h3>

            <ul className="mt-5 space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-slate-400 transition hover:text-cyan-400"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={15}
                      className="opacity-0 transition group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white">
              Stay Updated
            </h3>

            <p className="mt-5 text-sm leading-7 text-slate-400">
              Get updates about new campaigns, blockchain innovations,
              and platform announcements.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                />

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400/40"
                />
              </div>

              <button className="rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02]">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Fundora. All rights
            reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-emerald-400">
              Privacy Policy
            </Link>

            <Link href="#" className="hover:text-emerald-400">
              Terms of Service
            </Link>

            <Link href="#" className="hover:text-emerald-400">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}