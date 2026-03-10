'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FileText,
    Globe,
    DollarSign,
    BarChart3,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Link as LinkIcon,
    Tag
} from 'lucide-react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Tabs,
    TabsList,
    TabsTrigger,
    ScrollArea
} from '../index';
import { cn } from '../utils/cn';

const PLATFORMS = [
    { id: 'upwork', label: 'Upwork', icon: Globe },
    { id: 'freelancer', label: 'Freelancer', icon: Globe },
    { id: 'guru', label: 'Guru', icon: Globe },
    { id: 'fiverr', label: 'Fiverr', icon: Globe },
    { id: 'linkedin', label: 'LinkedIn', icon: Globe },
];

export const ProposalWizard = ({ onCreate }: { onCreate?: (proposal: any) => void }) => {
    const [open, setOpen] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [data, setData] = React.useState({
        title: '',
        platform: 'upwork',
        jobUrl: '',
        budget: { min: 1000, max: 2500, currency: 'USD' },
        description: '',
        tags: [] as string[]
    });

    const handleCreate = () => {
        onCreate?.(data);
        setOpen(false);
        setStep(1);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
                render={
                    <Button hover={false} className="bg-ocean-600 hover:bg-ocean-500 text-white gap-2 shadow-lg shadow-ocean-900/40" />
                }
            >
                <Sparkles className="h-4 w-4" /> New Proposal Lab
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] border-white/10 bg-slate-950/95 backdrop-blur-3xl text-white p-0 overflow-hidden">
                <div className="flex h-[500px]">
                    {/* Sidebar Progress */}
                    <div className="w-52 bg-white/5 border-r border-white/10 p-6 flex flex-col gap-6">
                        <div className="flex items-center gap-2 text-ocean-400 mb-4">
                            <BarChart3 className="h-5 w-5" />
                            <span className="font-bold text-xs uppercase tracking-widest">Lab Pipeline</span>
                        </div>
                        {[
                            { s: 1, l: 'Source', icon: LinkIcon },
                            { s: 2, l: 'Parameters', icon: DollarSign },
                            { s: 3, l: 'Optimization', icon: Sparkles },
                        ].map((item) => (
                            <div key={item.s} className={cn(
                                "flex items-center gap-3 transition-opacity",
                                step === item.s ? "opacity-100" : "opacity-40"
                            )}>
                                <div className={cn(
                                    "w-8 h-8 rounded-lg flex items-center justify-center border",
                                    step === item.s ? "bg-ocean-600 border-ocean-400" : "bg-white/5 border-white/10"
                                )}>
                                    <item.icon className="h-4 w-4" />
                                </div>
                                <span className="text-xs font-medium">{item.l}</span>
                            </div>
                        ))}
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col">
                        <div className="p-8 flex-1">
                            <AnimatePresence mode="wait">
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-4">
                                            <h2 className="text-2xl font-bold">Project Sourcing</h2>
                                            <p className="text-sm text-slate-400">Target the platform and job listing to begin generating your 1000x proposal.</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Origin Platform</Label>
                                                <Select onValueChange={(v: string) => setData({ ...data, platform: v as any })} defaultValue={data.platform}>
                                                    <SelectTrigger className="bg-white/5 border-white/10">
                                                        <SelectValue placeholder="Select platform" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-slate-900 border-white/10 text-white">
                                                        {PLATFORMS.map(p => <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Job URL / Scraping Hook</Label>
                                                <div className="relative">
                                                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                                                    <Input
                                                        placeholder="https://upwork.com/jobs/..."
                                                        className="bg-white/5 border-white/10 pl-10"
                                                        value={data.jobUrl}
                                                        onChange={(e) => setData({ ...data, jobUrl: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-4">
                                            <h2 className="text-2xl font-bold">Proposal Metadata</h2>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Campaign Title</Label>
                                                <Input
                                                    placeholder="e.g. Next.js SaaS Platform for Logistics"
                                                    className="bg-white/5 border-white/10"
                                                    value={data.title}
                                                    onChange={(e) => setData({ ...data, title: e.target.value })}
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Min Budget</Label>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                                                        <Input
                                                            type="number"
                                                            className="bg-white/5 border-white/10 pl-10"
                                                            value={data.budget.min}
                                                            onChange={(e) => setData({ ...data, budget: { ...data.budget, min: Number(e.target.value) } })}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Max Budget</Label>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                                                        <Input
                                                            type="number"
                                                            className="bg-white/5 border-white/10 pl-10"
                                                            value={data.budget.max}
                                                            onChange={(e) => setData({ ...data, budget: { ...data.budget, max: Number(e.target.value) } })}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center h-full text-center space-y-6"
                                    >
                                        <div className="w-20 h-20 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                                            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold">Lab Analysis Complete</h2>
                                            <p className="text-sm text-slate-400 mt-2">ML model predicts a <span className="text-emerald-400 font-bold">89% success probability</span> for this configuration.</p>
                                        </div>
                                        <div className="p-4 bg-white/5 border border-white/10 rounded-xl w-full text-left">
                                            <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2 mb-2">
                                                <Sparkles className="h-3 w-3 text-ocean-400" /> AI Suggestions Applied
                                            </div>
                                            <ul className="text-xs text-slate-300 space-y-1.5">
                                                <li className="flex items-center gap-2 italic">• Strategy: Technical deep-dive first</li>
                                                <li className="flex items-center gap-2 italic">• Tone: Expert, authoritative</li>
                                                <li className="flex items-center gap-2 italic">• Hook: Mentioned 3 relevant case studies</li>
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10 bg-white/[0.02] flex justify-between">
                            <Button
                                variant="outline"
                                className="border-white/10"
                                onClick={() => step > 1 ? setStep(step - 1) : setOpen(false)}
                            >
                                {step === 1 ? 'Cancel' : 'Prev'}
                            </Button>
                            <Button
                                className="bg-ocean-600 hover:bg-ocean-500 px-8"
                                onClick={() => step < 3 ? setStep(step + 1) : handleCreate()}
                            >
                                {step === 3 ? 'Deploy Proposal to Lab' : 'Next Step'}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
