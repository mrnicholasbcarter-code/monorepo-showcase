'use client';

import { trpc } from '@/lib/trpc';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@monorepo/ui';
import {
    GitBranch,
    GitCommit,
    GitPullRequest,
    Github,
    ExternalLink,
    Plus,
    Shield,
    Cpu,
    History,
    Activity,
    Lock,
    Zap,
    Globe,
    Terminal,
    Database,
    ZapOff,
    Bot
} from 'lucide-react';

export default function RepositoriesPage() {
    const { data: repos, isLoading } = trpc.repositories.list.useQuery();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
                <div className="relative">
                    <div className="w-20 h-20 border-2 border-white/5 rounded-full" />
                    <div className="absolute inset-0 w-20 h-20 border-2 border-ocean-500 border-t-transparent rounded-full animate-spin" />
                    <Zap className="absolute inset-0 m-auto h-8 w-8 text-ocean-400 animate-pulse" />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <p className="text-white font-black text-xs uppercase tracking-[0.3em] animate-pulse">Syncing Git Neural Grid</p>
                    <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widestAlpha">Accessing Master Registry... 74%</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-10 p-10 max-w-[1600px] mx-auto">
            {/* Header section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-ocean-500/5 blur-[100px] rounded-full -mr-32 -mt-32" />
                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center group transform transition-transform hover:rotate-12 duration-500">
                        <Database className="h-10 w-10 text-ocean-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black text-white uppercase tracking-tighterAlpha flex items-center gap-4">
                            Registry <span className="text-ocean-500">Node</span>
                        </h1>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-r border-white/10 pr-3">Autonomous CI/CD Matrix</span>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widestAlpha">Linked Hub</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 relative z-10 lg:self-end">
                    <Button variant="outline" className="px-8 h-12 rounded-2xl gap-3">
                        <History className="h-4 w-4" /> Commit Audit
                    </Button>
                    <Button variant="ocean" className="px-8 h-12 rounded-2xl gap-3" glow>
                        <Plus className="h-4 w-4" /> Link Repository
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Repo List */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="flex items-center justify-between px-4">
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Active Integration Streams</h2>
                        <span className="text-[10px] font-black text-ocean-400 uppercase tracking-widestAlpha">{repos?.length} Nodes Synced</span>
                    </div>

                    <AnimatePresence>
                        {repos?.map((repo, i) => (
                            <motion.div
                                key={repo.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, type: 'spring', damping: 20 }}
                                className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8 hover:bg-slate-900/60 hover:border-white/10 transition-all group relative overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row items-start justify-between gap-8 relative z-10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-ocean-500/40 transition-all duration-500 group-hover:rotate-6">
                                            {repo.platform === 'github' ? <Github className="h-8 w-8 text-white" /> : <GitBranch className="h-8 w-8 text-ocean-400" />}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-2xl font-black text-white uppercase tracking-tighterAlpha group-hover:text-ocean-400 transition-colors">
                                                    {repo.name}
                                                </h3>
                                                <ExternalLink className="h-4 w-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-all cursor-pointer hover:text-white" />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg">
                                                    <Globe className="h-3 w-3 text-slate-500" />
                                                    <span className="text-[9px] text-slate-400 font-black uppercase tracking-widestAlpha">{repo.platform}</span>
                                                </div>
                                                <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widestAlpha">• master-node-sync</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 self-end md:self-start">
                                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widestAlpha border ${repo.reviewStatus === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                                            {repo.reviewStatus === 'approved' ? 'Audit Passed' : repo.reviewStatus}
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widestAlpha">Stable</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/5 pt-8 mt-8 relative z-10">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-[9px] font-black text-slate-600 uppercase tracking-widestAlpha">
                                            <GitCommit className="h-3.5 w-3.5" />
                                            Latest Deployment
                                        </div>
                                        <div className="text-sm font-black text-slate-300 uppercase tracking-tighterAlpha">
                                            {new Date(repo.lastCommit).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-[9px] font-black text-slate-600 uppercase tracking-widestAlpha">
                                            <GitPullRequest className="h-3.5 w-3.5 text-violet-400" />
                                            Merge Locks
                                        </div>
                                        <div className="text-sm font-black text-slate-300 uppercase tracking-tighterAlpha">
                                            2 Active PR Nodes
                                        </div>
                                    </div>
                                    <div className="space-y-2 lg:text-right">
                                        <div className="flex items-center lg:justify-end gap-2 text-[9px] font-black text-slate-600 uppercase tracking-widestAlpha">
                                            <Shield className="h-3.5 w-3.5 text-ocean-400" />
                                            Integrity Status
                                        </div>
                                        <div className="text-sm font-black text-emerald-400 uppercase tracking-tighterAlpha">
                                            SECURE BY DEFAULT
                                        </div>
                                    </div>
                                </div>

                                {/* Background Glow */}
                                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-ocean-500/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Empty State / Add Node */}
                    <motion.div
                        whileHover={{ scale: 0.99 }}
                        className="p-16 rounded-[3rem] border-2 border-dashed border-white/5 bg-white/[0.01] hover:bg-white/[0.02] flex flex-col items-center justify-center text-center group cursor-pointer transition-all"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform group-hover:border-ocean-500/40 border border-transparent">
                            <Plus className="h-10 w-10 text-slate-600 group-hover:text-ocean-400" />
                        </div>
                        <h3 className="text-lg font-black text-white uppercase tracking-widestAlpha mb-2">Initialize New Grid Node</h3>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-tight max-w-xs">Scan and link an additional source control vessel to the neural network.</p>
                    </motion.div>
                </div>

                {/* AI QA Agent Status */}
                <div className="flex flex-col gap-8">
                    <div className="bg-gradient-to-br from-ocean-950/40 to-violet-950/40 border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-ocean-500/10 blur-[80px] rounded-full -mr-24 -mt-24 pointer-events-none" />

                        <div className="flex items-center justify-between mb-10 relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-ocean-500/20 flex items-center justify-center border border-ocean-400/20 shadow-glow">
                                    <Shield className="h-5 w-5 text-ocean-400" />
                                </div>
                                <h2 className="text-xs font-black text-white uppercase tracking-[0.25em]">Neural Auditor</h2>
                            </div>
                            <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                                <Activity className="h-3 w-3 text-emerald-400" />
                                <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widestAlpha">ACTIVE</span>
                            </div>
                        </div>

                        <div className="space-y-8 relative z-10">
                            {[
                                { type: 'Security', msg: 'Zero critical vulnerabilities in core-saas', status: 'high', icon: Shield },
                                { type: 'QA', msg: 'Reviewing PR #142 for logic anomalies', status: 'warn', icon: Activity },
                                { type: 'Perf', msg: 'Bundle optimization applied -12% size', status: 'high', icon: Zap }
                            ].map((scan, i) => (
                                <div key={i} className="flex gap-5 group/stat">
                                    <div className={cn(
                                        "w-1 h-12 rounded-full transition-all group-hover/stat:w-1.5",
                                        scan.status === 'high' ? 'bg-ocean-500 shadow-glow' : 'bg-amber-500'
                                    )} />
                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <scan.icon className="h-3 w-3 text-slate-500 group-hover/stat:text-ocean-400 transition-colors" />
                                            <div className="text-[9px] font-black uppercase tracking-widestAlpha text-slate-500">{scan.type} Protocol</div>
                                        </div>
                                        <div className="text-xs text-slate-300 font-bold uppercase tracking-tight leading-tight">{scan.msg}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button variant="ocean" className="w-full mt-12 h-14 rounded-2xl text-[11px]" glow>
                            Launch Full Static Scan
                        </Button>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 relative overflow-hidden">
                        <h2 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] mb-10 flex items-center justify-between">
                            Connected Uplinks
                            <Terminal className="h-3 w-3 opacity-20" />
                        </h2>
                        <div className="space-y-4">
                            {[
                                { name: 'GitHub Actions', status: 'Synced', color: 'text-emerald-400', icon: Github },
                                { name: 'Vercel Deployment', status: 'Secure', color: 'text-ocean-400', icon: Zap },
                                { name: 'Sentry Protocol', status: 'Scanning', color: 'text-rose-400', icon: Shield },
                            ].map((item) => (
                                <div key={item.name} className="group flex items-center justify-between p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all cursor-crosshair">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <item.icon className="h-4 w-4 text-slate-500" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.1em]">{item.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[8px] font-black uppercase tracking-[0.2em] opacity-60 ${item.color}`}>{item.status}</span>
                                        <div className={cn("w-1 h-1 rounded-full animate-pulse", item.color.replace('text', 'bg'))} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Telemetry Chart Mockup */}
                        <div className="mt-12 p-6 rounded-2xl bg-black/40 border border-white/5 relative group overflow-hidden">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[8px] font-black text-slate-600 uppercase tracking-widestAlpha">Throughput</span>
                                <span className="text-[8px] font-black text-ocean-400 uppercase tracking-widestAlpha">8.2 GB/H</span>
                            </div>
                            <div className="flex items-end gap-1 h-12">
                                {[30, 45, 25, 60, 40, 80, 50, 45, 90, 65, 40].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ delay: i * 0.05, duration: 1 }}
                                        className="flex-1 bg-ocean-500/20 group-hover:bg-ocean-500/40 rounded-t-sm transition-colors border-b-2 border-ocean-500/60"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
