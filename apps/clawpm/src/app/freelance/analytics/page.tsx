'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Briefcase, Star, Clock } from 'lucide-react';

const stats = [
    { label: 'Total Revenue', value: '$48,291', change: '+22.4%', up: true, icon: DollarSign },
    { label: 'Win Rate', value: '68%', change: '+5.1%', up: true, icon: Star },
    { label: 'Active Proposals', value: '12', change: '-2', up: false, icon: Briefcase },
    { label: 'Avg. Response Time', value: '1.8h', change: '-0.4h', up: true, icon: Clock },
];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const revenueData = [12000, 18500, 14200, 22000, 31000, 28500, 48291];
const maxRevenue = Math.max(...revenueData);

const platformData = [
    { name: 'Upwork', revenue: 28000, proposals: 45, winRate: 71 },
    { name: 'Freelancer', revenue: 12000, proposals: 30, winRate: 53 },
    { name: 'Fiverr', revenue: 8291, proposals: 18, winRate: 78 },
];

export default function AnalyticsPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Analytics</h1>
                <p className="text-slate-400 text-sm mt-1">Revenue insights and performance metrics across all platforms.</p>
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
                            <span className="text-xs text-slate-500 uppercase tracking-wide">{stat.label}</span>
                            <stat.icon className="h-4 w-4 text-ocean-400" />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className={`flex items-center gap-1 text-xs ${stat.up ? 'text-emerald-400' : 'text-red-400'}`}>
                            {stat.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {stat.change} vs last month
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
                <h2 className="text-base font-semibold text-white mb-6">Revenue Over Time</h2>
                <div className="flex items-end gap-3 h-48">
                    {revenueData.map((val, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 flex-1">
                            <span className="text-xs text-slate-500">${(val / 1000).toFixed(0)}k</span>
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${(val / maxRevenue) * 100}%` }}
                                transition={{ delay: 0.4 + i * 0.06, duration: 0.6, ease: 'easeOut' }}
                                className="w-full rounded-t-md bg-gradient-to-t from-ocean-600 to-ocean-400 relative group"
                                style={{ minHeight: 4 }}
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-ocean-900 border border-ocean-700 text-ocean-300 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                    ${val.toLocaleString()}
                                </div>
                            </motion.div>
                            <span className="text-xs text-slate-500">{months[i]}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Platform Breakdown */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/[0.03] border border-white/8 rounded-xl overflow-hidden"
            >
                <div className="p-5 border-b border-white/5">
                    <h2 className="text-base font-semibold text-white">Platform Breakdown</h2>
                </div>
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/5">
                            <th className="text-left text-xs text-slate-500 uppercase tracking-wide px-5 py-3">Platform</th>
                            <th className="text-right text-xs text-slate-500 uppercase tracking-wide px-5 py-3">Revenue</th>
                            <th className="text-right text-xs text-slate-500 uppercase tracking-wide px-5 py-3">Proposals</th>
                            <th className="text-right text-xs text-slate-500 uppercase tracking-wide px-5 py-3">Win Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {platformData.map((row, i) => (
                            <tr key={row.name} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td className="px-5 py-4 text-sm font-medium text-white">{row.name}</td>
                                <td className="px-5 py-4 text-sm text-right text-emerald-400 font-mono">${row.revenue.toLocaleString()}</td>
                                <td className="px-5 py-4 text-sm text-right text-slate-300">{row.proposals}</td>
                                <td className="px-5 py-4 text-sm text-right">
                                    <span className={`font-semibold ${row.winRate >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                                        {row.winRate}%
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
}
