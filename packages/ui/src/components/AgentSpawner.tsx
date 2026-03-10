'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Cpu,
    ShieldCheck,
    Settings,
    Zap,
    Info,
    Terminal,
    Activity,
    Layers,
    Sparkles
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
    Slider,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    ScrollArea
} from '../index';
import { cn } from '../utils/cn';

interface AgentSpawnerProps {
    onSpawn?: (agent: any) => void;
}

const ROLES = [
    { id: 'architecture', label: 'Architecture', icon: Layers, description: 'System design and API planning' },
    { id: 'graphic-design', label: 'Creative', icon: Sparkles, description: 'UI/UX and branding assets' },
    { id: 'marketing', label: 'Marketing', icon: Zap, description: 'Copywriting and outreach' },
    { id: 'qa', label: 'QA / Testing', icon: ShieldCheck, description: 'Bug hunting and code review' },
    { id: 'devops', label: 'Infrastructure', icon: Activity, description: 'CI/CD and deployment' },
];

export const AgentSpawner = ({ onSpawn }: AgentSpawnerProps) => {
    const [open, setOpen] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [config, setConfig] = React.useState({
        name: '',
        role: 'architecture',
        intelligence: 80,
        speed: 50,
        capabilities: [] as string[]
    });

    const currentRole = ROLES.find(r => r.id === config.role) || ROLES[0];

    const handleSpawn = () => {
        onSpawn?.(config);
        setOpen(false);
        setStep(1);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-ocean-600 hover:bg-ocean-500 text-white gap-2 shadow-lg shadow-ocean-900/40">
                    <Plus className="h-4 w-4" /> Provision AI Agent
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] border-white/10 bg-slate-950/90 backdrop-blur-2xl text-white">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-ocean-500/20 rounded-lg border border-ocean-500/30">
                            <Cpu className="h-5 w-5 text-ocean-400" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl font-bold tracking-tight">Agent Spawning Node</DialogTitle>
                            <DialogDescription className="text-slate-400 text-sm">Configure and deploy a specialized AI agent to your workspace.</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="mt-6">
                    <Tabs value={String(step)} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 bg-white/5 border border-white/10 p-1">
                            <TabsTrigger value="1" disabled={step !== 1} className="data-[state=active]:bg-ocean-600 text-xs">Role & Identity</TabsTrigger>
                            <TabsTrigger value="2" disabled={step !== 2} className="data-[state=active]:bg-ocean-600 text-xs">Parameters</TabsTrigger>
                            <TabsTrigger value="3" disabled={step !== 3} className="data-[state=active]:bg-ocean-600 text-xs">Finalize</TabsTrigger>
                        </TabsList>

                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6 pt-6"
                                >
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-slate-300 font-semibold uppercase tracking-widest text-[10px]">Registry Name</Label>
                                        <Input
                                            id="name"
                                            placeholder="e.g. Genesis-Prime-42"
                                            className="bg-white/5 border-white/10 focus:border-ocean-500/50"
                                            value={config.name}
                                            onChange={(e) => setConfig({ ...config, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <Label className="text-slate-300 font-semibold uppercase tracking-widest text-[10px]">Specialization</Label>
                                        <div className="grid grid-cols-1 gap-3">
                                            {ROLES.map((role) => (
                                                <button
                                                    key={role.id}
                                                    onClick={() => setConfig({ ...config, role: role.id })}
                                                    className={cn(
                                                        "flex items-start gap-4 p-4 rounded-xl border transition-all text-left",
                                                        config.role === role.id
                                                            ? "bg-ocean-500/10 border-ocean-500 ring-1 ring-ocean-500"
                                                            : "bg-white/5 border-white/10 hover:bg-white/10"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "p-2 rounded-lg shrink-0",
                                                        config.role === role.id ? "bg-ocean-500 text-white" : "bg-white/5 text-slate-400"
                                                    )}>
                                                        <role.icon className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-sm text-white">{role.label}</div>
                                                        <div className="text-xs text-slate-500 leading-relaxed mt-0.5">{role.description}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8 pt-6"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-slate-300 font-semibold uppercase tracking-widest text-[10px]">Intelligence Threshold</Label>
                                            <span className="text-ocean-400 font-mono text-xs font-bold">{config.intelligence}%</span>
                                        </div>
                                        <Slider
                                            defaultValue={[config.intelligence]}
                                            max={100}
                                            step={1}
                                            onValueChange={([val]) => setConfig({ ...config, intelligence: val })}
                                            className="[&_[role=slider]]:bg-ocean-500"
                                        />
                                        <p className="text-[10px] text-slate-500 italic flex items-center gap-1">
                                            <Info className="h-3 w-3" /> Higher values increase token consumption but improve output logic.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-slate-300 font-semibold uppercase tracking-widest text-[10px]">Processing Speed</Label>
                                            <span className="text-amber-400 font-mono text-xs font-bold">{config.speed}ms/tick</span>
                                        </div>
                                        <Slider
                                            defaultValue={[config.speed]}
                                            max={500}
                                            min={10}
                                            step={10}
                                            onValueChange={([val]) => setConfig({ ...config, speed: val })}
                                        />
                                    </div>

                                    <div className="p-4 rounded-xl bg-violet-950/20 border border-violet-500/20 flex gap-4">
                                        <div className="p-3 bg-violet-500/20 rounded-full h-fit">
                                            <Terminal className="h-4 w-4 text-violet-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-violet-200">Neural Network Optimization</h4>
                                            <p className="text-xs text-slate-500 mt-1">Cross-referencing capabilities with available edge node latency. Agent will be provisioned to US-East-1 by default.</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="pt-10 pb-6 text-center space-y-6"
                                >
                                    <div className="relative mx-auto w-32 h-32">
                                        <div className="absolute inset-0 bg-ocean-500/20 blur-3xl rounded-full animate-pulse" />
                                        <div className="relative flex items-center justify-center w-full h-full rounded-full border-2 border-ocean-500/30 bg-ocean-950">
                                            <currentRole.icon className="h-12 w-12 text-ocean-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white">{config.name || 'Anonymous Unit'}</h3>
                                        <p className="text-ocean-400 font-mono text-sm tracking-tighter uppercase mt-1">{config.role} specialist</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-left">
                                            <div className="text-[10px] text-slate-500 uppercase">IQ Threshold</div>
                                            <div className="text-lg font-bold text-white">{config.intelligence}</div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-left">
                                            <div className="text-[10px] text-slate-500 uppercase">Processing</div>
                                            <div className="text-lg font-bold text-white">{config.speed}ms</div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Tabs>
                </div>

                <div className="flex justify-between items-center mt-10 gap-3">
                    <Button
                        variant="outline"
                        onClick={() => step > 1 ? setStep(step - 1) : setOpen(false)}
                        className="border-white/10 hover:bg-white/5"
                    >
                        {step === 1 ? 'Cancel' : 'Back'}
                    </Button>

                    <div className="flex gap-3">
                        {step < 3 ? (
                            <Button
                                onClick={() => setStep(step + 1)}
                                className="bg-ocean-600 hover:bg-ocean-500 min-w-[120px]"
                                disabled={step === 1 && !config.name}
                            >
                                Continue
                            </Button>
                        ) : (
                            <Button
                                onClick={handleSpawn}
                                className="bg-emerald-600 hover:bg-emerald-500 min-w-[160px] shadow-lg shadow-emerald-900/40"
                            >
                                Initialize Deployment
                            </Button>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
