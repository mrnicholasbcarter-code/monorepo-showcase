'use client';

import { motion } from 'framer-motion';
import { Button } from '@monorepo/ui';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    CreditCard,
    FileText,
    Calendar,
    ArrowUpRight,
    ArrowDownLeft,
    Search,
    Filter
} from 'lucide-react';

const invoices = [
    { id: 'INV-2024-001', client: 'GlobalTech Solutions', amount: '$12,500.00', status: 'Paid', date: 'Mar 01, 2024' },
    { id: 'INV-2024-002', client: 'Horizon SaaS', amount: '$8,200.00', status: 'Pending', date: 'Mar 05, 2024' },
    { id: 'INV-2024-003', client: 'Oceanic Labs', amount: '$4,150.00', status: 'Overdue', date: 'Feb 15, 2024' },
    { id: 'INV-2024-004', client: 'CryptoVault Inc', amount: '$15,000.00', status: 'Paid', date: 'Feb 28, 2024' },
];

const expenses = [
    { id: 1, label: 'GitHub Entry', amount: '-$19.00', category: 'Software', date: 'Today' },
    { id: 2, label: 'OpenAI API', amount: '-$142.50', category: 'AI Tools', date: 'Yesterday' },
    { id: 3, label: 'Vercel Pro', amount: '-$20.00', category: 'Hosting', date: 'Mar 07' },
];

export default function FinancialsPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Financial Dashboard</h1>
                    <p className="text-slate-400 text-sm mt-1">Real-time profit tracking, invoicing, and revenue forecasting.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/10 hover:bg-white/5">Export CSV</Button>
                    <Button className="bg-ocean-600 hover:bg-ocean-500 text-white">Create Invoice</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Net Profit Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-gradient-to-br from-ocean-900/50 to-emerald-900/30 border border-white/10 rounded-2xl p-8 relative overflow-hidden"
                >
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
                                <DollarSign className="h-6 w-6 text-emerald-400" />
                            </div>
                            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full text-xs font-bold border border-emerald-400/20">
                                <TrendingUp className="h-3 w-3" /> +14.2%
                            </div>
                        </div>
                        <div className="text-slate-400 text-sm font-medium mb-1 uppercase tracking-wider">Net Profit (YTD)</div>
                        <div className="text-5xl font-black text-white tracking-tighter mb-4">$142,500.00</div>
                        <div className="flex gap-6 mt-8 border-t border-white/5 pt-8">
                            <div>
                                <div className="text-xs text-slate-500 uppercase mb-1">Gross Revenue</div>
                                <div className="text-xl font-bold text-white">$168k</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 uppercase mb-1">Total Expenses</div>
                                <div className="text-xl font-bold text-red-400">$25.5k</div>
                            </div>
                            <div>
                                <div className="text-xs text-slate-500 uppercase mb-1">Tax Estimate</div>
                                <div className="text-xl font-bold text-amber-400">$32.1k</div>
                            </div>
                        </div>
                    </div>
                    {/* Ambient light effect */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />
                </motion.div>

                {/* Quick Actions / Balance */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 flex flex-col justify-between"
                >
                    <div>
                        <div className="text-sm text-slate-400 mb-1">Current Balance</div>
                        <div className="text-3xl font-bold text-white mb-6">$42,150.82</div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-500/10 rounded-lg"><ArrowUpRight className="h-4 w-4 text-blue-400" /></div>
                                    <span className="text-sm text-slate-300">Stripe Payout</span>
                                </div>
                                <span className="text-sm font-bold text-white">+$5,200</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-500/10 rounded-lg"><ArrowDownLeft className="h-4 w-4 text-slate-400" /></div>
                                    <span className="text-sm text-slate-300">Office Rent</span>
                                </div>
                                <span className="text-sm font-bold text-white">-$1,250</span>
                            </div>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full mt-6 border-white/10 text-white gap-2">
                        <CreditCard className="h-4 w-4" /> Connect Bank (Plaid)
                    </Button>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Invoices Table */}
                <div className="lg:col-span-2 bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <FileText className="h-5 w-5 text-ocean-400" /> Recent Invoices
                        </h2>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                                <input placeholder="Search..." className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-300 focus:outline-none" />
                            </div>
                            <Button variant="outline" className="h-8 w-8 p-0 border-white/10"><Filter className="h-3 w-3" /></Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-white/[0.02] border-b border-white/5">
                                    <th className="text-left text-[10px] text-slate-500 uppercase tracking-widest px-6 py-4">Client / ID</th>
                                    <th className="text-left text-[10px] text-slate-500 uppercase tracking-widest px-6 py-4">Status</th>
                                    <th className="text-left text-[10px] text-slate-500 uppercase tracking-widest px-6 py-4">Date</th>
                                    <th className="text-right text-[10px] text-slate-500 uppercase tracking-widest px-6 py-4">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((inv) => (
                                    <tr key={inv.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors cursor-pointer group">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-white group-hover:text-ocean-400 transition-colors uppercase tracking-tight">{inv.client}</div>
                                            <div className="text-[10px] text-slate-500">{inv.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                    inv.status === 'Overdue' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                }`}>
                                                {inv.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-400">{inv.date}</td>
                                        <td className="px-6 py-4 text-right font-mono font-bold text-white">{inv.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Expenses / Timeline */}
                <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-ocean-400" /> Recent Expenses
                    </h2>
                    <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                        {expenses.map((exp) => (
                            <div key={exp.id} className="flex gap-4 relative">
                                <div className="w-[23px] h-[23px] rounded-full bg-slate-900 border border-white/20 flex items-center justify-center shrink-0 z-10 shadow-lg shadow-black">
                                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                </div>
                                <div className="flex-1 min-w-0 pb-2 border-b border-white/5">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-semibold text-white truncate">{exp.label}</span>
                                        <span className="text-sm font-bold text-red-400 font-mono italic">{exp.amount}</span>
                                    </div>
                                    <div className="flex items-center justify-between uppercase tracking-tighter">
                                        <span className="text-[10px] text-slate-500">{exp.category}</span>
                                        <span className="text-[10px] text-slate-500">{exp.date}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full mt-8 border-white/10 text-xs h-9">View Full Ledger</Button>
                </div>
            </div>
        </div>
    );
}
