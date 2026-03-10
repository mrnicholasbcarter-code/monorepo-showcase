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
    Activity,
    Zap,
    Shield,
    Terminal,
    ArrowRight
} from 'lucide-react';
import { cn } from '@monorepo/ui';

export default function FinancialsPage() {
    const { data: stats, isLoading: statsLoading } = trpc.financials.getStats.useQuery();
    const { data: transactions, isLoading: txLoading } = trpc.financials.listTransactions.useQuery();

    if (statsLoading || txLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
                <div className="relative">
                    <div className="w-20 h-20 border-2 border-white/5 rounded-full" />
                    <div className="absolute inset-0 w-20 h-20 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                    <DollarSign className="absolute inset-0 m-auto h-8 w-8 text-emerald-400 animate-pulse" />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-white font-black text-xs uppercase tracking-[0.3em] animate-pulse">Decrypting Financial Ledgers</p>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widestAlpha">Verifying Cryptographic Payout Chains... 92%</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-10 p-10 max-w-[1600px] mx-auto">
            {/* Header section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full -mr-32 -mt-32" />
                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group transform transition-transform hover:-rotate-12 duration-500">
                        <DollarSign className="h-10 w-10 text-emerald-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black text-white uppercase tracking-tighterAlpha flex items-center gap-4">
                            Financial <span className="text-emerald-500">Nucleus</span>
                        </h1>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-r border-white/10 pr-3">Real-time Revenue Architecture</span>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widestAlpha">Live Payout Sync</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 relative z-10 lg:self-end">
                    <Button variant="outline" className="px-8 h-12 rounded-2xl gap-3">
                        <Terminal className="h-4 w-4" /> Export Intelligence
                    </Button>
                    <Button variant="ocean" className="px-8 h-12 rounded-2xl gap-3" glow>
                        <Zap className="h-4 w-4" /> Initialize Dispatch
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Net Profit Core Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-black border border-white/5 rounded-[3rem] p-12 relative overflow-hidden group shadow-2xl"
                >
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <Activity className="h-6 w-6 text-emerald-400 shadow-glow" />
                                </div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Net Profit Strategy (YTD)</span>
                            </div>
                            <div className="px-5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                                <span className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-tighterAlpha">
                                    <TrendingUp className="h-4 w-4" /> Velocity +14.2%
                                </span>
                            </div>
                        </div>

                        <div className="flex items-baseline gap-4 mb-2">
                            <span className="text-4xl font-black text-emerald-500/40">$</span>
                            <div className="text-8xl font-black text-white tracking-tighterAlpha group-hover:text-emerald-400 transition-colors duration-700">
                                {stats?.netProfitYTD.toLocaleString()}
                            </div>
                        </div>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs mb-12 italic">Total liquidity generated across all neural nodes</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/5 pt-12">
                            <div className="space-y-2">
                                <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Gross Inbound</div>
                                <div className="text-2xl font-black text-white uppercase tracking-tighterAlpha">${(stats?.grossRevenue || 0 / 1000).toFixed(1)}k</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Resource Burn</div>
                                <div className="text-2xl font-black text-rose-500 uppercase tracking-tighterAlpha">${(stats?.totalExpenses || 0 / 1000).toFixed(1)}k</div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Tax Liability</div>
                                <div className="text-2xl font-black text-amber-500 uppercase tracking-tighterAlpha">${(stats?.taxEstimate || 0 / 1000).toFixed(1)}k</div>
                            </div>
                        </div>
                    </div>

                    {/* Visual Decorations */}
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700" />
                    <div className="absolute top-1/2 left-0 w-1/2 h-px bg-gradient-to-r from-emerald-500/20 to-transparent" />
                </motion.div>

                {/* Account Liquidity / Quick Sync */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[3rem] p-10 flex flex-col justify-between group"
                >
                    <div>
                        <div className="flex items-center justify-between mb-8 px-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Node Liquidity</span>
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-glow animate-pulse" />
                        </div>
                        <div className="text-5xl font-black text-white tracking-tighterAlpha mb-12 group-hover:text-ocean-400 transition-colors">
                            ${stats?.currentBalance.toLocaleString()}
                        </div>

                        <div className="space-y-3">
                            {transactions?.slice(0, 3).map((tx) => (
                                <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-crosshair">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("p-2 rounded-xl", tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400')}>
                                            {tx.type === 'income' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-slate-200 uppercase tracking-tight truncate w-24">{tx.label}</span>
                                            <span className="text-[8px] text-slate-500 font-black uppercase tracking-widestAlpha">ID: {tx.id.slice(0, 4)}</span>
                                        </div>
                                    </div>
                                    <span className={cn("text-sm font-black uppercase tracking-tighterAlpha", tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400')}>
                                        {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button variant="ocean" className="w-full mt-10 h-14 rounded-2xl text-[11px] gap-3" glow>
                        <CreditCard className="h-4 w-4" /> Sync Banking Grid
                    </Button>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Operational Ledger Table */}
                <div className="lg:col-span-2 bg-slate-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-md">
                    <div className="p-10 border-b border-white/5 flex flex-wrap gap-6 items-center justify-between bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-ocean-500/10 flex items-center justify-center border border-ocean-500/20">
                                <FileText className="h-5 w-5 text-ocean-400" />
                            </div>
                            <h2 className="text-xl font-black text-white uppercase tracking-tighterAlpha">Operational Ledger</h2>
                        </div>
                        <div className="flex gap-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                <input placeholder="SCAN PROTOCOLS..." className="bg-black/40 border border-white/10 rounded-2xl pl-12 pr-6 py-2.5 text-[10px] font-black text-white uppercase tracking-widestAlpha focus:outline-none focus:border-ocean-500/40 w-56 transition-colors" />
                            </div>
                            <Button variant="outline" className="h-10 w-10 p-0 rounded-xl border-white/10 group">
                                <Filter className="h-4 w-4 group-hover:text-ocean-400 transition-colors" />
                            </Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-white/[0.03] border-b border-white/5">
                                    <th className="px-10 py-6 text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">Entity Protocol</th>
                                    <th className="px-6 py-6 text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">Audit State</th>
                                    <th className="px-6 py-6 text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">Epoch Cycle</th>
                                    <th className="px-10 py-6 text-right text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">Signal Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions?.map((tx) => (
                                    <tr key={tx.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-all group cursor-pointer">
                                        <td className="px-10 py-6">
                                            <div className="font-black text-white uppercase tracking-widestAlpha text-xs group-hover:text-ocean-400 transition-colors">{tx.label}</div>
                                            <div className="text-[9px] text-slate-600 font-mono mt-1 flex items-center gap-2">
                                                <Terminal className="h-3 w-3" /> TX_NODE_{tx.id.toUpperCase().slice(0, 8)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-6">
                                            <span className={cn(
                                                "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widestAlpha border",
                                                tx.status === 'paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                            )}>
                                                {tx.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-6 font-black text-slate-400 text-[10px] uppercase tracking-tighterAlpha">
                                            {new Date(tx.date).toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' })}
                                        </td>
                                        <td className={cn(
                                            "px-10 py-6 text-right font-black uppercase tracking-tighterAlpha text-sm",
                                            tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                                        )}>
                                            {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Intelligence Feed / Alerts */}
                <div className="flex flex-col gap-8">
                    <div className="bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 group overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-ocean-500/20" />
                        <h2 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-10 flex items-center gap-3">
                            <Activity className="h-4 w-4 text-ocean-400" /> Intelligence Feed
                        </h2>

                        <div className="space-y-10 relative">
                            {[
                                { title: 'Predictive Payout', desc: 'Upwork-Alpha scheduled for next orbital cycle +$8,200', time: '2H', color: 'bg-ocean-500' },
                                { title: 'Cost Anomaly', desc: 'Resource burn in OpenAI node increased by 12% today', time: '5H', color: 'bg-amber-500' },
                                { title: 'Tax Optimization', desc: 'Deduction logic applied to recent hardware acquisition', time: '1D', color: 'bg-emerald-500' },
                                { title: 'Protocol Alert', desc: 'New billing API detected on freelancer.com node', time: '3D', color: 'bg-violet-500' },
                            ].map((item, i) => (
                                <div key={i} className="relative pl-8 group/feed">
                                    <div className="absolute left-0 top-0 bottom-0 w-px bg-white/5 group-hover/feed:bg-white/20 transition-colors" />
                                    <div className={cn("absolute left-[-4px] top-1.5 w-2 h-2 rounded-full border-2 border-slate-950 transition-transform group-hover/feed:scale-150 duration-300", item.color)} />

                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-black text-white uppercase tracking-widestAlpha group-hover/feed:text-ocean-400 transition-colors">{item.title}</span>
                                        <span className="text-[8px] text-slate-600 font-black uppercase">{item.time} AGO</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight leading-relaxed italic">"{item.desc}"</p>
                                </div>
                            ))}
                        </div>

                        <Button variant="outline" className="w-full mt-12 h-12 rounded-xl text-[10px] group">
                            Full Architectural Audit <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    {/* Compact Security Widget */}
                    <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/[0.02] to-transparent pointer-events-none" />
                        <div className="flex items-center gap-4 mb-8">
                            <Shield className="h-5 w-5 text-ocean-400" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Ledger Integrity</span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-3xl font-black text-white uppercase tracking-tighterAlpha">Verified</span>
                            <Zap className="h-6 w-6 text-emerald-400 animate-pulse" />
                        </div>
                        <p className="text-[9px] text-slate-600 font-black uppercase tracking-widestAlpha">SHA-256 Multi-Node Confirmation Active</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
