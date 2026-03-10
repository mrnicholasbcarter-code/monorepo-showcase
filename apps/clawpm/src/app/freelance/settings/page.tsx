'use client';

import { motion } from 'framer-motion';
import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from '@monorepo/ui';
import {
    Shield,
    Key,
    Lock,
    Bell,
    User,
    Zap,
    Globe,
    Terminal,
    Database,
    Fingerprint,
    Cpu,
    Eye,
    RefreshCcw,
    ChevronRight,
    ArrowRight
} from 'lucide-react';
import { cn } from '@monorepo/ui';

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-10 p-10 max-w-[1400px] mx-auto pb-32">
            {/* Header section */}
            <div className="flex flex-col gap-2 bg-white/[0.01] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-ocean-500/10 blur-[120px] rounded-full -mr-48 -mt-48 pointer-events-none" />
                <div className="relative z-10 flex items-center gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center transform transition-transform hover:rotate-6">
                        <Shield className="h-10 w-10 text-ocean-400" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black text-white uppercase tracking-tighterAlpha">
                            Kernel <span className="text-ocean-500">Access</span>
                        </h1>
                        <p className="text-slate-500 font-bold text-xs uppercase tracking-widestAlpha mt-1">Configure global protocols and encryption standards</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Sidebar Nav (Mobile/Desktop) */}
                <div className="lg:col-span-3 flex flex-col gap-2">
                    {[
                        { label: 'Security Protocols', icon: Fingerprint, active: true },
                        { label: 'Network Uplinks', icon: Globe },
                        { label: 'Neural Core', icon: Cpu },
                        { label: 'Telemetry API', icon: Terminal },
                        { label: 'Persistence', icon: Database },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className={cn(
                                "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all cursor-pointer group",
                                item.active
                                    ? "bg-ocean-500/10 border border-ocean-500/20 text-white shadow-glow"
                                    : "bg-white/[0.02] border border-white/5 text-slate-500 hover:border-white/10 hover:bg-white/[0.04]"
                            )}
                        >
                            <item.icon className={cn("h-4 w-4", item.active ? "text-ocean-400" : "group-hover:text-slate-300")} />
                            <span className="text-[10px] font-black uppercase tracking-widestAlpha">{item.label}</span>
                            {item.active && <div className="ml-auto w-1 h-1 rounded-full bg-ocean-400 animate-pulse" />}
                        </div>
                    ))}
                </div>

                {/* Main Config Area */}
                <div className="lg:col-span-9 flex flex-col gap-8 text-white">
                    {/* Access Tokens */}
                    <Card className="border-white/5 bg-slate-900/40 backdrop-blur-3xl overflow-hidden group">
                        <CardHeader className="p-10 border-b border-white/5 bg-white/[0.01]">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="text-xl font-black uppercase tracking-tighterAlpha">Master Access Tokens</div>
                                    <div className="text-sm text-slate-500 font-bold uppercase tracking-widestAlpha">Cryptographic keys for external service integration</div>
                                </div>
                                <Button variant="ocean" size="sm" className="h-10 px-6 rounded-xl" glow>
                                    <RefreshCcw className="h-3.5 w-3.5 mr-2" /> Rotate Keys
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-white/5">
                                {[
                                    { name: 'Upwork-Alpha-Bridge', key: 'sk_live_••••••••••••••••••••••••39A2', status: 'Active', color: 'text-emerald-400' },
                                    { name: 'Neural-Inference-Node', key: 'sk_live_••••••••••••••••••••••••F92B', status: 'Encrypted', color: 'text-ocean-400' },
                                    { name: 'Financial-Audit-Sync', key: 'sk_live_••••••••••••••••••••••••X88C', status: 'Rotating', color: 'text-amber-400' },
                                ].map((token) => (
                                    <div key={token.name} className="flex items-center justify-between p-8 hover:bg-white/[0.02] transition-colors group/token">
                                        <div className="flex items-center gap-6">
                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover/token:border-white/20">
                                                <Key className="h-5 w-5 text-slate-500" />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-sm font-black text-white uppercase tracking-widestAlpha">{token.name}</div>
                                                <div className="text-[10px] font-mono text-slate-600 tracking-wider uppercase">{token.key}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <div className="flex flex-col items-end">
                                                <span className={cn("text-[9px] font-black uppercase tracking-widestAlpha", token.color)}>{token.status}</span>
                                                <span className="text-[8px] text-slate-600 font-bold uppercase">Last Used: 4m ago</span>
                                            </div>
                                            <Button variant="outline" size="sm" className="h-9 w-9 p-0 rounded-lg group-hover/token:bg-white/5">
                                                <Eye className="h-4 w-4 text-slate-500" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security Switches */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="border-white/5 bg-slate-900/40 backdrop-blur-3xl p-10 group relative">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                                    <Lock className="h-5 w-5 text-violet-400 shadow-glow" />
                                </div>
                                <div className="w-12 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 p-1 relative cursor-pointer">
                                    <div className="w-4 h-4 rounded-full bg-emerald-400 absolute right-1" />
                                </div>
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-widestAlpha mb-2">Zero-Trust Protocol</h3>
                            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-tight leading-relaxed">
                                Require multi-node confirmation for all outgoing financial dispatches and agent spawns.
                            </p>
                        </Card>

                        <Card className="border-white/5 bg-slate-900/40 backdrop-blur-3xl p-10 group">
                            <div className="flex items-center justify-between mb-6">
                                <div className="w-10 h-10 rounded-xl bg-ocean-500/10 flex items-center justify-center border border-ocean-500/20">
                                    <Zap className="h-5 w-5 text-ocean-400 shadow-glow" />
                                </div>
                                <div className="w-12 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 p-1 relative cursor-pointer">
                                    <div className="w-4 h-4 rounded-full bg-emerald-400 absolute right-1" />
                                </div>
                            </div>
                            <h3 className="text-sm font-black text-white uppercase tracking-widestAlpha mb-2">Neural Optimization</h3>
                            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-tight leading-relaxed">
                                Automatically prune inactive agent nodes and context windows to minimize calorie burn.
                            </p>
                        </Card>
                    </div>

                    {/* Critical Payload Destruction */}
                    <Card className="border-rose-500/10 bg-rose-500/[0.02] border-dashed p-10 mt-4 overflow-hidden relative group font-sans">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 blur-[40px] rounded-full -mr-16 -mt-16 pointer-events-none" />
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                            <div className="space-y-2">
                                <h3 className="text-sm font-black text-rose-400 uppercase tracking-widestAlpha">Emergency Purge (Nuclear)</h3>
                                <p className="text-[11px] text-slate-500 font-bold uppercase tracking-tight max-w-lg leading-relaxed">
                                    Immediately sever all linked intelligence uplink and wipe local cache. This action is irreversible and will shut down all active agents.
                                </p>
                            </div>
                            <Button variant="outline" className="border-rose-500/20 hover:bg-rose-500/10 text-rose-500 px-8 h-12 rounded-xl text-[10px] font-black uppercase tracking-widestAlpha shrink-0">
                                Initiate Purge Sequence
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
