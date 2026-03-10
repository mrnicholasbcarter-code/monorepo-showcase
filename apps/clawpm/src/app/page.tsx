'use client';

import { Button, Card } from '@monorepo/ui';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Zap,
  Shield,
  Bot,
  Target,
  Sparkles,
  ArrowRight,
  Globe,
  Cpu,
  Activity
} from 'lucide-react';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-slate-950 overflow-hidden selection:bg-ocean-500/30 selection:text-ocean-200">
      {/* Background Orbital Signals */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-ocean-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute top-1/4 left-1/4 w-[30%] h-[30%] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none z-0" />

      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32">
        {/* Navigation / Header */}
        <nav className="flex items-center justify-between mb-24 opacity-0 animate-in fade-in slide-in-from-top-4 duration-1000 fill-mode-forwards">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-500 to-ocean-800 flex items-center justify-center shadow-lg shadow-ocean-500/20">
              <Zap className="h-6 w-6 text-white fill-white" />
            </div>
            <span className="text-2xl font-black tracking-tighterAlpha text-white uppercase">ClawPM</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widestAlpha transition-colors">Documentation</a>
            <a href="#" className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widestAlpha transition-colors">Pricing</a>
            <Link href="/freelance">
              <Button variant="outline" size="sm" className="border-white/10 hover:bg-white/5 text-[10px] uppercase font-black tracking-widestAlpha">
                Access Terminal
              </Button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-500/10 border border-ocean-500/20 text-[10px] font-black text-ocean-400 uppercase tracking-widestAlpha"
            >
              <Sparkles className="h-3 w-3" />
              Next-Gen AI Orchestration Engine v0.2.0
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighterAlpha leading-[0.9]"
            >
              Freelance at<br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-ocean-400 via-blue-500 to-violet-500">
                Machine Speed
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed italic"
            >
              "ClawPM leverages neural networks to automate your entire freelance workflow—from high-fidelity proposal generation to autonomous project execution."
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link href="/freelance">
              <Button size="lg" className="bg-ocean-600 hover:bg-ocean-500 text-white shadow-2xl shadow-ocean-500/20 h-16 px-10 text-base gap-3 group">
                Initiate Command Center
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/freelance/proposals">
              <Button variant="glass" size="lg" className="h-16 px-10 text-base">
                View Lab Samples
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-48">
          {[
            {
              title: "Neural Units",
              desc: "Deploy specialized AI agents with discrete neural weights for code, design, and market analysis.",
              icon: Cpu,
              color: "text-ocean-400"
            },
            {
              title: "Strategic Uplink",
              desc: "Compute multi-variant proposal scoring to maximize conversion probabilities across global job nodes.",
              icon: Target,
              color: "text-violet-400"
            },
            {
              title: "Fleet Control",
              desc: "Unified interface for managing thousands of active signals, contracts, and repository workflows.",
              icon: Activity,
              color: "text-emerald-400"
            }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + (i * 0.1) }}
            >
              <Card className="p-10 h-full border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 transition-all group overflow-hidden relative">
                <div className={`p-3 rounded-2xl bg-white/5 border border-white/5 w-fit mb-8 group-hover:scale-110 transition-transform duration-500 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-widestAlpha mb-4">{feature.title}</h3>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-wide leading-relaxed">
                  {feature.desc}
                </p>
                <div className="absolute -bottom-6 -right-6 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                  <feature.icon className="h-24 w-24" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* System Footer */}
        <footer className="mt-48 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widestAlpha">All Systems Nominal</span>
          </div>
          <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em]">
            Synthetic OS v4.2 © 2026 Alpha Dynamic
          </p>
          <div className="flex gap-6">
            <Shield className="h-4 w-4 text-slate-700" />
            <Globe className="h-4 w-4 text-slate-700" />
            <Bot className="h-4 w-4 text-slate-700" />
          </div>
        </footer>
      </div>
    </main>
  );
}
