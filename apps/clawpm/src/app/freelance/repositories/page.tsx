'use client';

import { motion } from 'framer-motion';
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
    History
} from 'lucide-react';

const repositories = [
    {
        id: 'repo-1',
        name: 'nexa-dashboard-core',
        platform: 'GitHub',
        status: 'Clean',
        lastCommit: 'Add Framer Motion optimizations',
        timestamp: '14m ago',
        activePRs: 2,
        issues: 5,
        stars: 128
    },
    {
        id: 'repo-2',
        name: 'ai-orchestrator-node',
        platform: 'GitHub',
        status: 'Outdated',
        lastCommit: 'Fix agent spawning race condition',
        timestamp: '2h ago',
        activePRs: 0,
        issues: 12,
        stars: 45
    },
    {
        id: 'repo-3',
        name: 'claw-marketing-site',
        platform: 'GitLab',
        status: 'Clean',
        lastCommit: 'Update SEO metadata and assets',
        timestamp: '1d ago',
        activePRs: 1,
        issues: 0,
        stars: 12
    }
];

const scanResults = [
    { id: 1, type: 'Security', message: 'Vulnerability scan passed (0 critical)', status: 'success' },
    { id: 2, type: 'QA', message: 'AI Code Review: Suggesting refactor in auth.ts', status: 'warning' },
    { id: 3, type: 'Performance', message: 'Bundle size within limits (<200kb)', status: 'success' }
];

export default function RepositoriesPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Repository Management</h1>
                    <p className="text-slate-400 text-sm mt-1">Unified view of your project source code across all platforms.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 border-white/10 hover:bg-white/5">
                        <History className="h-4 w-4" /> History
                    </Button>
                    <Button className="bg-ocean-600 hover:bg-ocean-500 text-white gap-2">
                        <Plus className="h-4 w-4" /> Link Repo
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Repo List */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    {repositories.map((repo, i) => (
                        <motion.div
                            key={repo.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/[0.03] border border-white/8 rounded-xl p-5 hover:bg-white/[0.05] transition-all group cursor-pointer"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-ocean-500/50 transition-colors">
                                        {repo.platform === 'GitHub' ? <Github className="h-6 w-6 text-white" /> : <GitBranch className="h-6 w-6 text-orange-400" />}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white group-hover:text-ocean-400 transition-colors flex items-center gap-2">
                                            {repo.name}
                                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </h3>
                                        <p className="text-xs text-slate-500">{repo.platform} • Updated {repo.timestamp}</p>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${repo.status === 'Clean' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    }`}>
                                    {repo.status}
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                                <div className="flex items-center gap-2">
                                    <GitCommit className="h-4 w-4 text-slate-500" />
                                    <span className="text-xs text-slate-300 truncate max-w-[150px]">{repo.lastCommit}</span>
                                </div>
                                <div className="flex items-center gap-2 justify-center">
                                    <GitPullRequest className="h-4 w-4 text-violet-400" />
                                    <span className="text-xs text-slate-300">{repo.activePRs} Active PRs</span>
                                </div>
                                <div className="flex items-center gap-2 justify-end">
                                    <Shield className="h-4 w-4 text-ocean-400" />
                                    <span className="text-xs text-slate-300">{repo.issues} Issues</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* AI QA Agent Status */}
                <div className="flex flex-col gap-4">
                    <div className="bg-gradient-to-br from-violet-900/40 to-ocean-900/40 border border-violet-500/30 rounded-xl p-6 relative overflow-hidden">
                        <Cpu className="absolute -right-4 -bottom-4 h-24 w-24 text-violet-500/10" />
                        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Bot className="h-5 w-5 text-violet-400" /> QA Agent Active
                        </h2>
                        <div className="flex flex-col gap-4 relative z-10">
                            {scanResults.map((scan) => (
                                <div key={scan.id} className="flex gap-3">
                                    <div className={`w-1 h-10 rounded-full ${scan.status === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                    <div>
                                        <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-0.5">{scan.type}</div>
                                        <div className="text-sm text-slate-300">{scan.message}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-6 border-violet-500/30 hover:bg-violet-500/10 text-violet-300 h-9 text-xs">
                            Open Agent Console
                        </Button>
                    </div>

                    <div className="bg-white/[0.02] border border-white/8 rounded-xl p-6">
                        <h2 className="text-base font-semibold text-white mb-4">Integrations</h2>
                        <div className="flex flex-col gap-3">
                            {['GitHub Actions', 'Vercel Deploy', 'Sentry Logs'].map((item) => (
                                <div key={item} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                                    <span className="text-sm text-slate-300">{item}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-xs text-emerald-400">Linked</span>
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
