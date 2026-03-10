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
    Lock
} from 'lucide-react';

export default function RepositoriesPage() {
    const { data: repos, isLoading } = trpc.repositories.list.useQuery();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
                <div className="w-12 h-12 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widestAlpha">Scanning Global Git Registry...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Git Intelligence</h1>
                    <p className="text-slate-400 text-sm mt-1">Unified source control telemetry and autonomous CI/CD monitoring.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widestAlpha h-9">
                        <History className="h-3.5 w-3.5" /> Commit Audit
                    </Button>
                    <Button className="bg-orange-600 hover:bg-orange-500 text-white gap-2 text-[10px] font-black uppercase tracking-widestAlpha h-9">
                        <Plus className="h-3.5 w-3.5" /> Establish Link
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Repo List */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <AnimatePresence>
                        {repos?.map((repo, i) => (
                            <motion.div
                                key={repo.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="bg-white/[0.02] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.04] transition-all group flex flex-col gap-4"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-orange-500/40 transition-colors">
                                            {repo.platform === 'github' ? <Github className="h-6 w-6 text-white" /> : <GitBranch className="h-6 w-6 text-orange-400" />}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white group-hover:text-orange-400 transition-colors flex items-center gap-2">
                                                {repo.name}
                                                <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </h3>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widestAlpha">{repo.platform} • master-node-sync</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widestAlpha border ${repo.reviewStatus === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                                            {repo.reviewStatus}
                                        </div>
                                        <div className="h-6 w-px bg-white/10 mx-1" />
                                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                                            <Activity className="h-3 w-3 text-emerald-500" /> stable
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                                    <div className="flex items-center gap-2">
                                        <GitCommit className="h-3.5 w-3.5 text-slate-600" />
                                        <span className="text-[10px] font-bold text-slate-400 truncate tracking-tight">LAST: {new Date(repo.lastCommit).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2 justify-center">
                                        <GitPullRequest className="h-3.5 w-3.5 text-violet-400" />
                                        <span className="text-[10px] font-bold text-slate-400 tracking-tight">2 MERGE LOCKS</span>
                                    </div>
                                    <div className="flex items-center gap-2 justify-end">
                                        <Shield className="h-3.5 w-3.5 text-ocean-400" />
                                        <span className="text-[10px] font-bold text-slate-400 tracking-tight">SCAN PASSED</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* AI QA Agent Status */}
                <div className="flex flex-col gap-6">
                    <div className="bg-gradient-to-br from-violet-950/40 to-ocean-950/40 border border-violet-500/20 rounded-2xl p-7 relative overflow-hidden group">
                        <Cpu className="absolute -right-6 -bottom-6 h-32 w-32 text-violet-500/5 group-hover:text-violet-500/10 transition-all duration-700" />
                        <h2 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                            <Bot className="h-4 w-4 text-violet-400" /> Neural Auditor
                        </h2>
                        <div className="space-y-6 relative z-10">
                            {[
                                { type: 'Security', msg: 'Zero critical vulnerabilities in core-saas', status: 'high' },
                                { type: 'QA', msg: 'Reviewing PR #142 for logic anomalies', status: 'warn' },
                                { type: 'Performance', msg: 'Bundle optimization applied -12% size', status: 'high' }
                            ].map((scan, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className={`w-0.5 h-10 rounded-full ${scan.status === 'high' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                    <div>
                                        <div className="text-[9px] font-black uppercase tracking-widestAlpha text-slate-500 mb-0.5">{scan.type} Strategy</div>
                                        <div className="text-xs text-slate-300 font-bold leading-tight">{scan.msg}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-10 border-violet-500/20 hover:bg-violet-500/10 text-violet-300 h-10 text-[10px] font-black uppercase tracking-widestAlpha">
                            Establish Audit Loop
                        </Button>
                    </div>

                    <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-7">
                        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widestAlpha mb-6">Linked Intelligence</h2>
                        <div className="space-y-4">
                            {[
                                { name: 'GitHub Actions', status: 'synced', color: 'text-emerald-400' },
                                { name: 'Vercel Deployment', status: 'locked', color: 'text-ocean-400' },
                                { name: 'Sentry Protocol', status: 'active', color: 'text-rose-400' },
                            ].map((item) => (
                                <div key={item.name} className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all">
                                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">{item.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[9px] font-black uppercase tracking-tighterAlpha ${item.color}`}>{item.status}</span>
                                        {item.status === 'locked' ? <Lock className="h-2 w-2 text-slate-600" /> : <div className={`w-1 h-1 rounded-full ${item.color.replace('text', 'bg')} animate-pulse`} />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Bot({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <rect x="3" y="11" width="18" height="10" rx="2" />
            <circle cx="12" cy="5" r="2" />
            <path d="M12 7v4" />
            <line x1="8" y1="16" x2="8" y2="16" />
            <line x1="16" y1="16" x2="16" y2="16" />
        </svg>
    );
}
