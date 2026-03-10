'use client';

import { trpc } from '@/lib/trpc';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Briefcase, Star, Clock, Activity, Shield, BarChart3, Zap } from 'lucide-react';

export default function AnalyticsPage() {
    const { data: analytics, isLoading } = trpc.analytics.getOverview.useQuery();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-ocean-500/20 blur-3xl animate-pulse rounded-full" />
                    <div className="w-16 h-16 border-4 border-ocean-500/20 border-t-ocean-500 rounded-full animate-spin relative z-10" />
                </div>
                <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] animate-pulse">Syncing Telemetry Data...</p>
            </div>
        );
    }

    const stats = [
        { label: 'Total Revenue', value: `$${analytics?.revenue.total.toLocaleString()}`, change: `+${analytics?.revenue.growth}%`, up: true, icon: DollarSign, color: 'text-emerald-400' },
        { label: 'Win Rate', value: `${analytics?.proposals.conversion}%`, change: '+5.1%', up: true, icon: Star, color: 'text-amber-400' },
        { label: 'Sent Proposals', value: String(analytics?.proposals.sent), change: '-2', up: false, icon: Briefcase, color: 'text-ocean-400' },
        { label: 'Efficiency Score', value: `${analytics?.efficiency}%`, change: '+2.1%', up: true, icon: Activity, color: 'text-violet-400' },
    ];

    const revenueData = analytics?.revenue.history || [];
    const maxRevenue = Math.max(...revenueData.map(h => h.value), 1);

    return (
        <div className="flex flex-col gap-10 p-10 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-black text-white uppercase tracking-tighterAlpha flex items-center gap-4">
                        <BarChart3 className="h-10 w-10 text-ocean-400" /> Telemetry
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widestAlpha mt-3 flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5" /> Intelligence Ledger & Neural Analytics
                    </p>
                </div>
                <div className="flex items-center gap-3 px-5 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widestAlpha">Real-time Node: Synced</span>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[2rem] p-6 group hover:border-white/10 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widestAlpha font-black">{stat.label}</span>
                            <div className={`p-2 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="text-3xl font-black text-white uppercase tracking-tighterAlpha mb-2">{stat.value}</div>
                        <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widestAlpha ${stat.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {stat.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {stat.change} DELTA
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 flex flex-col group hover:border-white/10 transition-colors"
                >
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-ocean-500/10 border border-ocean-500/20 flex items-center justify-center text-ocean-400">
                                <Zap className="h-5 w-5" />
                            </div>
                            <h2 className="text-xl font-black text-white uppercase tracking-widestAlpha">Revenue Velocity</h2>
                        </div>
                        <div className="relative group/select">
                            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black text-slate-400 focus:outline-none uppercase tracking-widestAlpha cursor-pointer appearance-none pr-10 hover:border-white/20 transition-all">
                                <option className="bg-slate-900 text-white">Orbital Cycles (90D)</option>
                                <option className="bg-slate-900 text-white">Lunar Cycle (30D)</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-600 group-hover/select:text-ocean-400 transition-colors">
                                <Activity className="h-3 w-3" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end gap-6 h-64 px-4">
                        {revenueData.map((h, i) => (
                            <div key={i} className="flex flex-col items-center gap-4 flex-1 h-full justify-end group/bar">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(h.value / maxRevenue) * 100}%` }}
                                    transition={{ delay: 0.4 + i * 0.05, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                    className="w-full rounded-t-2xl bg-gradient-to-t from-ocean-600/20 to-ocean-400/60 border-t border-x border-ocean-400/20 relative transition-all group-hover/bar:to-ocean-400 group-hover/bar:shadow-[0_0_20px_rgba(14,165,233,0.3)]"
                                    style={{ minHeight: 4 }}
                                >
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 text-white text-[10px] font-black px-3 py-1.5 rounded-xl shadow-2xl opacity-0 group-hover/bar:opacity-100 transition-all scale-90 group-hover/bar:scale-100 whitespace-nowrap pointer-events-none z-20">
                                        ${h.value.toLocaleString()}
                                    </div>
                                </motion.div>
                                <span className="text-[10px] text-slate-600 font-black uppercase tracking-widestAlpha transition-colors group-hover/bar:text-slate-400 uppercase">{h.date}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Deep Insights */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col gap-8 h-full"
                >
                    <div className="flex-1 bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 flex flex-col group hover:border-white/10 transition-colors">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                            <h2 className="text-xs font-black text-white uppercase tracking-widestAlpha">Platform Matrix</h2>
                            <button className="text-[9px] font-black text-ocean-400 uppercase tracking-widestAlpha hover:text-ocean-300 transition-colors">Expand</button>
                        </div>
                        <div className="space-y-6">
                            {[
                                { name: 'Upwork-Alpha', allocation: '58%', status: 'high', color: 'bg-emerald-500' },
                                { name: 'Direct-Link-Hub', allocation: '29%', status: 'stable', color: 'bg-ocean-500' },
                                { name: 'Social-Intel-Feed', allocation: '13%', status: 'critical', color: 'bg-rose-500' },
                            ].map((p) => (
                                <div key={p.name} className="space-y-3 group/item">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-widestAlpha group-hover/item:text-slate-300 transition-colors">{p.name}</span>
                                        <span className="text-sm font-black text-white uppercase tracking-tighterAlpha">{p.allocation}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: p.allocation }}
                                            transition={{ delay: 0.5, duration: 1 }}
                                            className={`h-full rounded-full ${p.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-auto pt-8">
                            <div className="p-4 rounded-2xl bg-ocean-500/5 border border-ocean-500/10">
                                <div className="text-[9px] text-ocean-400 font-black uppercase tracking-widestAlpha mb-1">Neural Prediction</div>
                                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight leading-relaxed italic">
                                    "Projected 12% increase in Direct-Link conversion over the next lunar cycle."
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
