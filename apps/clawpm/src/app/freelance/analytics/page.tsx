'use client';

import { trpc } from '@/lib/trpc';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Briefcase, Star, Clock, Activity } from 'lucide-react';

export default function AnalyticsPage() {
    const { data: analytics, isLoading } = trpc.analytics.getOverview.useQuery();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
                <div className="w-10 h-10 border-2 border-ocean-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Accessing Intelligence Registry...</p>
            </div>
        );
    }

    const stats = [
        { label: 'Total Revenue', value: `$${analytics?.revenue.total.toLocaleString()}`, change: `+${analytics?.revenue.growth}%`, up: true, icon: DollarSign },
        { label: 'Win Rate', value: `${analytics?.proposals.conversion}%`, change: '+5.1%', up: true, icon: Star },
        { label: 'Sent Proposals', value: String(analytics?.proposals.sent), change: '-2', up: false, icon: Briefcase },
        { label: 'Efficiency Score', value: `${analytics?.efficiency}%`, change: '+2.1%', up: true, icon: Activity },
    ];

    const revenueData = analytics?.revenue.history || [];
    const maxRevenue = Math.max(...revenueData.map(h => h.value), 1);

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Intelligence Ledger</h1>
                    <p className="text-slate-400 text-sm mt-1">Unified performance metrics across your orbital workspace.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-ocean-500/10 border border-ocean-500/20 rounded-full">
                    <Activity className="h-3 w-3 text-ocean-400 animate-pulse" />
                    <span className="text-[10px] font-black text-ocean-400 uppercase tracking-widestAlpha">Real-time Node</span>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="bg-white/[0.03] border border-white/8 rounded-xl p-4"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{stat.label}</span>
                            <stat.icon className="h-4 w-4 text-ocean-400" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-tighter ${stat.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {stat.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {stat.change} delta
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Revenue Chart */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/[0.03] border border-white/8 rounded-xl p-6"
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                        <Activity className="h-4 w-4 text-ocean-400" /> Revenue Velocity
                    </h2>
                    <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-[10px] font-bold text-slate-400 focus:outline-none uppercase tracking-tighter">
                        <option>Orbital Cycles (90D)</option>
                        <option>Lunar Cycle (30D)</option>
                    </select>
                </div>
                <div className="flex items-end gap-3 h-48">
                    {revenueData.map((h, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 flex-1">
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${(h.value / maxRevenue) * 100}%` }}
                                transition={{ delay: 0.4 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="w-full rounded-t-lg bg-gradient-to-t from-ocean-600 to-ocean-400 relative group"
                                style={{ minHeight: 4 }}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 border border-white/10 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-2xl opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap pointer-events-none">
                                    ${h.value.toLocaleString()}
                                </div>
                            </motion.div>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">{h.date}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Deep Insights */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/[0.03] border border-white/8 rounded-xl overflow-hidden"
            >
                <div className="p-5 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-sm font-bold text-white uppercase tracking-widest">Platform Allocation</h2>
                    <button className="text-[10px] font-black text-ocean-400 uppercase hover:text-ocean-300 transition-colors">Expand Telemetry</button>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { name: 'Upwork-Alpha', allocation: '58%', status: 'high' },
                        { name: 'Direct-Link-Hub', allocation: '29%', status: 'stable' },
                        { name: 'Social-Intel-Feed', allocation: '13%', status: 'critical' },
                    ].map((p) => (
                        <div key={p.name} className="p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-white/10 transition-colors">
                            <div className="text-[10px] text-slate-500 font-bold uppercase mb-1">{p.name}</div>
                            <div className="flex items-center justify-between">
                                <div className="text-xl font-bold text-white font-mono">{p.allocation}</div>
                                <div className={`w-2 h-2 rounded-full ${p.status === 'high' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : p.status === 'stable' ? 'bg-ocean-500' : 'bg-rose-500'}`} />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
