'use client';

import { trpc } from '@/lib/trpc';
import { motion } from 'framer-motion';
import { Button } from '@monorepo/ui';
import {
    TrendingUp,
    DollarSign,
    CreditCard,
    FileText,
    Calendar,
    ArrowUpRight,
    ArrowDownLeft,
    Search,
    Filter,
    Activity
} from 'lucide-react';

export default function FinancialsPage() {
    const { data: stats, isLoading: statsLoading } = trpc.financials.getStats.useQuery();
    const { data: transactions, isLoading: txLoading } = trpc.financials.listTransactions.useQuery();

    if (statsLoading || txLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
                <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widestAlpha">Decrypting Financial Ledgers...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Financial Nucleus</h1>
                    <p className="text-slate-400 text-sm mt-1">Real-time revenue architecture and autonomous payout tracking.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5 text-[10px] uppercase font-bold tracking-widestAlpha h-9">Export Intelligence</Button>
                    <Button className="bg-ocean-600 hover:bg-ocean-500 text-white text-[10px] uppercase font-bold tracking-widestAlpha h-9 shadow-lg shadow-ocean-900/40">New Dispatch Order</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Net Profit Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-2 bg-gradient-to-br from-ocean-950 to-emerald-950/40 border border-white/10 rounded-2xl p-8 relative overflow-hidden group"
                >
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className="bg-white/5 p-3 rounded-xl border border-white/10 group-hover:border-emerald-500/30 transition-colors">
                                <Activity className="h-6 w-6 text-emerald-400" />
                            </div>
                            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full text-[10px] font-black border border-emerald-400/20 uppercase tracking-tighterAlpha">
                                <TrendingUp className="h-3 w-3" /> +14.2% velocity
                            </div>
                        </div>
                        <div className="text-slate-500 text-[10px] font-black mb-1 uppercase tracking-[0.2em]">Net Profit Strategy (YTD)</div>
                        <div className="text-6xl font-black text-white tracking-tighter mb-4">${stats?.netProfitYTD.toLocaleString()}</div>
                        <div className="flex flex-wrap gap-8 mt-10 border-t border-white/5 pt-8">
                            <div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Gross Inbound</div>
                                <div className="text-xl font-bold text-white">${(stats?.grossRevenue || 0 / 1000).toFixed(1)}k</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Resource Burn</div>
                                <div className="text-xl font-bold text-rose-400">${(stats?.totalExpenses || 0 / 1000).toFixed(1)}k</div>
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Tax Liability</div>
                                <div className="text-xl font-bold text-amber-500">${(stats?.taxEstimate || 0 / 1000).toFixed(1)}k</div>
                            </div>
                        </div>
                    </div>
                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                    <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 blur-[120px] rounded-full -mr-20 -mt-20 group-hover:bg-emerald-500/20 transition-all duration-700" />
                </motion.div>

                {/* Account Liquidity */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/[0.02] border border-white/10 rounded-2xl p-7 flex flex-col justify-between backdrop-blur-3xl"
                >
                    <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">Node Liquidity</div>
                        <div className="text-4xl font-black text-white tracking-tighter mb-8">${stats?.currentBalance.toLocaleString()}</div>
                        <div className="space-y-4">
                            {transactions?.slice(0, 2).map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 group hover:border-white/10 transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${tx.type === 'income' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                                            {tx.type === 'income' ? <ArrowUpRight className={`h-4 w-4 ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`} /> : <ArrowDownLeft className="h-4 w-4 text-rose-400" />}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold text-slate-200">{tx.label}</span>
                                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Live Sync</span>
                                        </div>
                                    </div>
                                    <span className={`text-sm font-black ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                        {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button variant="outline" className="w-full mt-8 border-white/10 text-white gap-2 text-[10px] font-bold uppercase tracking-widestAlpha h-10 group-hover:bg-white/5 transition-all">
                        <CreditCard className="h-4 w-4 text-ocean-400" /> Establish Banking Link
                    </Button>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Master Ledger */}
                <div className="lg:col-span-2 bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden backdrop-blur-md">
                    <div className="p-6 border-b border-white/5 flex flex-wrap gap-4 items-center justify-between">
                        <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                            <FileText className="h-4 w-4 text-ocean-400" /> Operational Ledger
                        </h2>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-600" />
                                <input placeholder="Filter Transactions..." className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-[10px] font-bold text-slate-300 focus:outline-none focus:border-ocean-500/30 w-44" />
                            </div>
                            <Button variant="outline" className="h-8 w-8 p-0 border-white/10 rounded-lg"><Filter className="h-3 w-3" /></Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5">
                                    <th className="text-left text-[10px] text-slate-500 uppercase tracking-[0.25em] font-black px-6 py-4">Entity / Protocol</th>
                                    <th className="text-left text-[10px] text-slate-500 uppercase tracking-[0.25em] font-black px-6 py-4">State</th>
                                    <th className="text-left text-[10px] text-slate-500 uppercase tracking-[0.25em] font-black px-6 py-4">Epoch</th>
                                    <th className="text-right text-[10px] text-slate-500 uppercase tracking-[0.25em] font-black px-6 py-4">Inflow/Outflow</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions?.map((tx) => (
                                    <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-all cursor-pointer group">
                                        <td className="px-6 py-5">
                                            <div className="font-bold text-white group-hover:text-ocean-400 transition-colors uppercase tracking-tight text-sm">{tx.label}</div>
                                            <div className="text-[9px] text-slate-500 font-mono">TX-ID: {tx.id.toUpperCase()}-ALPHA</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widestAlpha border ${tx.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-tighterAlpha">{new Date(tx.date).toLocaleDateString()}</td>
                                        <td className={`px-6 py-5 text-right font-mono font-bold text-sm ${tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Intelligence Feed / P&L Insights */}
                <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-7 flex flex-col backdrop-blur-xl">
                    <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
                        <Activity className="h-4 w-4 text-ocean-400" /> Intelligence Feed
                    </h2>
                    <div className="space-y-8 flex-1">
                        {[
                            { title: 'Predictive Payout', desc: 'Upwork-Alpha scheduled for next orbital cycle +$8,200', time: '2h', color: 'text-ocean-400' },
                            { title: 'Cost Anomaly', desc: 'Resource burn in OpenAI node increased by 12% today', time: '5h', color: 'text-amber-500' },
                            { title: 'Tax Optimization', desc: 'Deduction logic applied to recent hardware acquisition', time: '1d', color: 'text-emerald-500' },
                        ].map((item, i) => (
                            <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-1 before:w-1 before:h-[80%] before:bg-white/5 group">
                                <div className={`absolute left-[-2px] top-1 w-2 h-2 rounded-full border border-slate-900 ${item.color.replace('text', 'bg')} group-hover:scale-125 transition-transform`} />
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] font-black text-white uppercase tracking-widestAlpha">{item.title}</span>
                                    <span className="text-[9px] text-slate-600 font-bold uppercase">{item.time} ago</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed italic">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full mt-10 border-white/10 text-[10px] font-black uppercase tracking-widestAlpha h-10 hover:bg-white/5 transition-all">
                        Full Architectural Audit
                    </Button>
                </div>
            </div>
        </div>
    );
}
