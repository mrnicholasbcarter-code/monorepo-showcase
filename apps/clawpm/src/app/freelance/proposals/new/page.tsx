"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trpc } from "@/lib/trpc";
import { motion, AnimatePresence } from "framer-motion";
import {
    Button,
    Card,
    Input,
    Label,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    Slider,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@monorepo/ui";
import {
    Zap,
    Target,
    Code,
    Briefcase,
    Sparkles,
    Shield,
    Bot,
    ArrowRight,
    CheckCircle2,
    Loader2
} from "lucide-react";

export default function NewProposalPage() {
    const router = useRouter();
    const [budget, setBudget] = useState([500]);
    const [platform, setPlatform] = useState("upwork");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [step, setStep] = useState(1);

    const createProposal = trpc.proposals.create.useMutation({
        onSuccess: () => {
            setIsGenerating(false);
            setStep(3);
            setTimeout(() => router.push("/freelance"), 2000);
        },
    });

    const handleGenerate = async () => {
        setIsGenerating(true);
        setStep(2);

        await createProposal.mutateAsync({
            title,
            platform: platform as any,
            description,
            budget: {
                min: budget[0] * 0.8,
                max: budget[0],
                currency: "USD",
            },
            tags: ["nextjs", "trpc", "ai"],
        });
    };

    return (
        <div className="flex flex-col gap-10 p-10 max-w-6xl mx-auto bg-slate-950/20 min-h-screen">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tighterAlpha flex items-center gap-3">
                        <Zap className="h-8 w-8 text-ocean-400 fill-ocean-400/20" /> Synthesis Engine
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widestAlpha mt-3 flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5" /> High-Confidence Proposal Generation Mode
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="border-white/10 uppercase font-black text-[10px] tracking-widestAlpha h-10 px-6">Save Core Logic</Button>
                    {step === 1 && (
                        <Button
                            disabled={!title || !description || isGenerating}
                            onClick={handleGenerate}
                            className="bg-ocean-600 hover:bg-ocean-500 text-white shadow-xl shadow-ocean-950/50 uppercase font-black text-[10px] tracking-widestAlpha h-10 px-8 gap-2 group"
                        >
                            {isGenerating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                            Generate & Deploy
                        </Button>
                    )}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-10"
                    >
                        <div className="lg:col-span-2 space-y-10">
                            <Card className="p-8 border-white/5 bg-white/[0.01] backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-1 h-full bg-ocean-500/50 group-focus-within:bg-ocean-400 transition-colors" />
                                <h2 className="text-lg font-black text-white uppercase tracking-widestAlpha mb-8 flex items-center gap-3">
                                    <Target className="h-4 w-4 text-ocean-400" /> Objective Definition
                                </h2>
                                <div className="space-y-8">
                                    <div className="grid gap-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widestAlpha text-slate-500">Operation Title</Label>
                                        <Input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="e.g. Next.js 14 Enterprise Infrastructure for Global Fintech"
                                            className="bg-white/5 border-white/10 text-sm font-bold placeholder:text-slate-600 focus:border-ocean-500/30 h-12 uppercase tracking-tighterAlpha"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="grid gap-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widestAlpha text-slate-500">Host Market</Label>
                                            <Select value={platform} onValueChange={setPlatform}>
                                                <SelectTrigger className="bg-white/5 border-white/10 h-12 font-bold uppercase tracking-widestAlpha text-[10px]">
                                                    <SelectValue placeholder="Select platform" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-slate-900 border-white/10">
                                                    <SelectItem value="upwork">Upwork Protocol</SelectItem>
                                                    <SelectItem value="freelancer">Freelancer Network</SelectItem>
                                                    <SelectItem value="fiverr">Fiverr Marketplace</SelectItem>
                                                    <SelectItem value="linkedin">LinkedIn Direct</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widestAlpha text-slate-500">Capital Target: ${budget[0]}</Label>
                                            <div className="pt-5 px-1">
                                                <Slider
                                                    value={budget}
                                                    onValueChange={setBudget}
                                                    max={10000}
                                                    step={100}
                                                    className="ocean-slider"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widestAlpha text-slate-500">Requirement Telemetry</Label>
                                        <textarea
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            className="flex min-h-[220px] w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-ocean-500/30 transition-all italic leading-relaxed custom-scrollbar"
                                            placeholder="Paste job description for neural analysis..."
                                        />
                                    </div>
                                </div>
                            </Card>

                            <Tabs defaultValue="approach" className="w-full">
                                <TabsList className="bg-white/5 border border-white/5 p-1 rounded-xl w-full grid grid-cols-3 h-12">
                                    <TabsTrigger value="approach" className="uppercase font-black text-[9px] tracking-widestAlpha data-[state=active]:bg-ocean-600 data-[state=active]:text-white transition-all">Strategic Angle</TabsTrigger>
                                    <TabsTrigger value="portfolio" className="uppercase font-black text-[9px] tracking-widestAlpha data-[state=active]:bg-ocean-600 data-[state=active]:text-white transition-all">Logic Matches</TabsTrigger>
                                    <TabsTrigger value="abtest" className="uppercase font-black text-[9px] tracking-widestAlpha data-[state=active]:bg-ocean-600 data-[state=active]:text-white transition-all">A/B Matrix</TabsTrigger>
                                </TabsList>

                                <TabsContent value="approach" className="mt-8">
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { id: 'speed', title: 'Sonic Deployment', desc: 'Prioritize time-to-value with optimized boilerplates.', active: true },
                                            { id: 'scale', title: 'Fractal Scalability', desc: 'Focus on hexagonal architecture & multi-tenant infra.', active: false },
                                            { id: 'ai', title: 'Neural Core', desc: 'Center the value on custom RAG & agentic workflows.', active: false },
                                            { id: 'cost', title: 'Lean Protocol', desc: 'Optimize for serverless edge & minimal cloud overhead.', active: false }
                                        ].map((item) => (
                                            <button
                                                key={item.id}
                                                className={`text-left p-6 rounded-2xl border transition-all group ${item.active ? 'bg-ocean-600/10 border-ocean-500/50' : 'bg-white/[0.01] border-white/5 hover:border-white/10'}`}
                                            >
                                                <h3 className={`text-xs font-black uppercase tracking-widestAlpha mb-2 ${item.active ? 'text-ocean-400' : 'text-slate-300'}`}>{item.title}</h3>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase leading-relaxed">{item.desc}</p>
                                            </button>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        <div className="space-y-8">
                            <Card className="p-8 bg-gradient-to-br from-ocean-500/20 to-ocean-950/40 border border-ocean-400/20 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Bot className="h-20 w-20 text-ocean-400" />
                                </div>
                                <h3 className="font-black text-white uppercase tracking-widestAlpha text-sm flex items-center gap-3 mb-6">
                                    <Bot className="h-4 w-4 text-ocean-400" /> Genesis Mind
                                </h3>
                                <p className="text-slate-400 text-xs font-bold uppercase leading-relaxed tracking-tighterAlpha mb-8">
                                    Active agent will autonomously parse repository telemetry and synthesis a winning proposal.
                                </p>
                                <div className="bg-black/40 rounded-2xl p-6 space-y-4 border border-white/5">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
                                        <span className="text-ocean-400">Winning Prob.</span>
                                        <span className="text-emerald-400">92.4%</span>
                                    </div>
                                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: "92.4%" }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="bg-gradient-to-r from-ocean-500 to-emerald-400 h-full shadow-[0_0_10px_rgba(14,165,233,0.5)]"
                                        />
                                    </div>
                                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-widestAlpha text-center">Neural Prediction Confirmed</p>
                                </div>
                            </Card>

                            <Card className="p-8 border-white/5 bg-white/[0.01] backdrop-blur-xl">
                                <h3 className="text-xs font-black text-slate-300 uppercase tracking-widestAlpha mb-8">Synthesis Tuning</h3>
                                <div className="space-y-8">
                                    <div className="grid gap-4">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widestAlpha">
                                            <Label className="text-slate-500">Assertiveness</Label>
                                            <span className="text-ocean-400">High-Impact</span>
                                        </div>
                                        <Slider defaultValue={[85]} max={100} step={1} className="ocean-slider" />
                                    </div>
                                    <div className="grid gap-4">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widestAlpha">
                                            <Label className="text-slate-500">Conciseness</Label>
                                            <span className="text-ocean-400">Dense Logic</span>
                                        </div>
                                        <Slider defaultValue={[30]} max={100} step={1} className="ocean-slider" />
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20 gap-10"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 bg-ocean-500/20 blur-[100px] animate-pulse rounded-full" />
                            <div className="w-24 h-24 border-4 border-ocean-500/20 border-t-ocean-500 rounded-full animate-spin z-10 relative shadow-[0_0_30px_rgba(14,165,233,0.4)]" />
                            <Bot className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 text-ocean-400 animate-bounce" />
                        </div>
                        <div className="text-center space-y-3">
                            <h2 className="text-2xl font-black text-white uppercase tracking-[0.3em] animate-pulse">Neural Synthesis in Progress</h2>
                            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widestAlpha">Parsing job requirements • Matching portfolio logic • Writing multi-variant copy</p>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-20 gap-8"
                    >
                        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                        </div>
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-black text-white uppercase tracking-widestAlpha">Signal Transmitted</h2>
                            <p className="text-slate-400 font-black uppercase text-xs tracking-widestAlpha">Proposal has been deployed to Upwork Protocol. Redirecting to Command Center...</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
