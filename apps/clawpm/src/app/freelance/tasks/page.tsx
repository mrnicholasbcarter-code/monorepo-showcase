'use client';

import { trpc } from '@/lib/trpc';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@monorepo/ui';
import { Plus, MoreHorizontal, Clock, User, Zap, Bot, Shield, AlertCircle, CheckSquare } from 'lucide-react';

const priorityColors: Record<string, string> = {
    urgent: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
    high: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    medium: 'bg-ocean-500/20 text-ocean-400 border border-ocean-500/30',
    low: 'bg-slate-500/20 text-slate-400 border border-slate-500/30',
};

const columnHeaders: Record<string, string> = {
    'todo': 'Task Queue',
    'in-progress': 'Active Ops',
    'review': 'QA / Staging',
    'done': 'Secured',
};

export default function TasksPage() {
    const utils = trpc.useContext();
    const { data: tasks, isLoading } = trpc.tasks.list.useQuery({ status: 'all' });

    const createTask = trpc.tasks.create.useMutation({
        onSuccess: () => {
            utils.tasks.list.invalidate();
        }
    });

    const updateTask = trpc.tasks.update.useMutation({
        onSuccess: () => {
            utils.tasks.list.invalidate();
        }
    });

    const advanceTask = (task: any) => {
        const statuses = ['todo', 'in-progress', 'review', 'done'];
        const currentIndex = statuses.indexOf(task.status);
        const nextStatus = statuses[Math.min(currentIndex + 1, statuses.length - 1)];

        if (nextStatus !== task.status) {
            updateTask.mutate({ id: task.id, status: nextStatus as any });
        }
    };

    const handleDeployTask = () => {
        createTask.mutate({
            title: `New Analysis Operation ${Math.floor(Math.random() * 1000)}`,
            description: 'Autonomously generated task from command center telemetry.',
            priority: 'medium',
            status: 'todo',
            tags: ['auto-gen', 'scout'],
        });
    };

    const getColumnTasks = (status: string) => tasks?.filter((t: any) => t.status === status) || [];

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-ocean-500/20 blur-3xl animate-pulse rounded-full" />
                    <div className="w-16 h-16 border-4 border-ocean-500/20 border-t-ocean-500 rounded-full animate-spin relative z-10" />
                </div>
                <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] animate-pulse">Syncing Neural Registry...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full gap-10 p-10 bg-transparent">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-black text-white uppercase tracking-tighterAlpha flex items-center gap-4">
                        <CheckSquare className="h-10 w-10 text-ocean-400" /> Task Queue
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widestAlpha mt-3 flex items-center gap-2">
                        <Shield className="h-3.5 w-3.5" /> Autonomous Handoff Protocol Active
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="border-white/10 text-slate-400 hover:bg-white/5 uppercase font-black text-[10px] tracking-widestAlpha h-12 px-6">Archive All</Button>
                    <Button
                        className="bg-ocean-600 hover:bg-ocean-500 text-white gap-2 h-12 px-8 shadow-xl shadow-ocean-950/50 uppercase font-black text-[10px] tracking-widestAlpha group disabled:opacity-50"
                        onClick={handleDeployTask}
                        disabled={createTask.isLoading}
                    >
                        <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform" />
                        Deploy Task
                    </Button>
                </div>
            </div>

            <div className="flex gap-8 overflow-x-auto pb-10 flex-1 custom-scrollbar -mx-2 px-2">
                {['todo', 'in-progress', 'review', 'done'].map((status) => (
                    <div key={status} className="min-w-[340px] w-[340px] rounded-[2rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl flex flex-col group/column transition-all hover:bg-white/[0.02] hover:border-white/10">
                        <div className="p-6 border-b border-white/[0.03] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_currentColor] ${status === 'in-progress' ? 'bg-ocean-400 animate-pulse' : status === 'done' ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                                <span className="font-black text-slate-200 uppercase tracking-widestAlpha text-xs">{columnHeaders[status]}</span>
                            </div>
                            <span className="text-[10px] font-black bg-white/5 text-slate-500 rounded-lg px-3 py-1.5 border border-white/5 group-hover/column:text-ocean-400 group-hover/column:border-ocean-500/20 transition-all">{getColumnTasks(status).length}</span>
                        </div>
                        <div className="p-5 flex flex-col gap-4 flex-1 overflow-y-auto custom-scrollbar">
                            <AnimatePresence>
                                {getColumnTasks(status).map((task: any, i: number) => (
                                    <motion.div
                                        key={task.id}
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: i * 0.03 }}
                                        className="bg-slate-900/40 hover:bg-slate-900/60 border border-white/5 rounded-2xl p-6 cursor-pointer group relative transition-all shadow-xl hover:shadow-ocean-950/20 active:scale-[0.98] hover:border-white/10"
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreHorizontal className="h-4 w-4 text-slate-600 hover:text-white" />
                                        </div>

                                        <div className="flex items-center gap-2 mb-4">
                                            <span className={`text-[9px] font-black uppercase tracking-widestAlpha px-2 py-0.5 rounded-md ${priorityColors[task.priority]}`}>
                                                {task.priority}
                                            </span>
                                            {task.priority === 'urgent' && <AlertCircle className="h-3.5 w-3.5 text-rose-500 animate-pulse" />}
                                        </div>

                                        <h3 className="text-sm font-black text-white leading-snug mb-3 uppercase tracking-tighterAlpha group-hover:text-ocean-400 transition-colors">{task.title}</h3>
                                        <p className="text-[11px] text-slate-500 mb-5 leading-relaxed font-bold uppercase tracking-tight italic opacity-80">{task.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {task.tags?.map((tag: string) => (
                                                <span key={tag} className="text-[8px] font-black uppercase tracking-widestAlpha bg-black/40 text-ocean-400 border border-ocean-800/20 px-2 py-1 rounded-md">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/[0.05]">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-600/40 border border-violet-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                                                    <Bot className="h-3.5 w-3.5 text-violet-400" />
                                                </div>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widestAlpha">Scout AI-4</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-600 uppercase tracking-widestAlpha group-hover:text-slate-400 transition-colors">
                                                {task.status !== 'done' ? (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-6 px-2 text-[8px] bg-white/5 hover:bg-ocean-500/20 hover:text-ocean-400"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            advanceTask(task);
                                                        }}
                                                        disabled={updateTask.isLoading}
                                                    >
                                                        Advance Scope
                                                    </Button>
                                                ) : (
                                                    <span className="text-emerald-500 flex items-center gap-1">
                                                        <Clock className="h-3 w-3" /> SECURED
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <button className="text-[10px] font-black text-slate-600 hover:text-ocean-400 flex items-center justify-center gap-2 p-4 rounded-2xl border border-dashed border-white/5 hover:border-ocean-500/30 hover:bg-ocean-500/[0.02] transition-all uppercase tracking-widestAlpha mt-2">
                                <Plus className="h-3.5 w-3.5" /> Initiate Signal
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
