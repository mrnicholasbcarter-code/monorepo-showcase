'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@monorepo/ui';
import { Plus, MoreHorizontal, Clock, CheckCircle2, User } from 'lucide-react';

type Priority = 'high' | 'medium' | 'low';
type Column = 'backlog' | 'in_progress' | 'review' | 'done';

interface Task {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    assignee: string;
    dueDate: string;
    tags: string[];
}

const initialColumns: Record<Column, { label: string; tasks: Task[] }> = {
    backlog: {
        label: 'Backlog',
        tasks: [
            { id: '1', title: 'Research competitor pricing', description: 'Analyze top 5 competitor pricing models', priority: 'medium', assignee: 'You', dueDate: 'Mar 15', tags: ['research'] },
            { id: '2', title: 'Draft cold outreach template', description: 'Create 3 cold outreach variants for Upwork', priority: 'high', assignee: 'Genesis', dueDate: 'Mar 14', tags: ['marketing', 'ai'] },
        ],
    },
    in_progress: {
        label: 'In Progress',
        tasks: [
            { id: '3', title: 'Build analytics dashboard', description: 'Implement Chart.js graphs for revenue tracking', priority: 'high', assignee: 'You', dueDate: 'Mar 12', tags: ['dev'] },
            { id: '4', title: 'Optimize proposal scoring model', description: 'Improve ML accuracy from 82% to 95%', priority: 'high', assignee: 'Scout', dueDate: 'Mar 11', tags: ['ai', 'ml'] },
        ],
    },
    review: {
        label: 'In Review',
        tasks: [
            { id: '5', title: 'New proposal creation form', description: 'UX review for the multi-step proposal wizard', priority: 'medium', assignee: 'You', dueDate: 'Mar 10', tags: ['ux', 'dev'] },
        ],
    },
    done: {
        label: 'Done',
        tasks: [
            { id: '6', title: 'Set up monorepo Storybook', description: 'Initialized component playground with all UI primitives', priority: 'low', assignee: 'You', dueDate: 'Mar 9', tags: ['infra'] },
            { id: '7', title: 'Integrate tRPC + Supabase', description: 'Full type-safe API layer with edge functions', priority: 'high', assignee: 'You', dueDate: 'Mar 8', tags: ['backend'] },
        ],
    },
};

const priorityColors: Record<Priority, string> = {
    high: 'bg-red-500/20 text-red-400 border border-red-500/30',
    medium: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    low: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
};

const columnColors: Record<Column, string> = {
    backlog: 'border-slate-700',
    in_progress: 'border-blue-500/40',
    review: 'border-violet-500/40',
    done: 'border-emerald-500/40',
};

export default function TasksPage() {
    const [columns, setColumns] = useState(initialColumns);

    return (
        <div className="flex flex-col h-full gap-6 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Task Board</h1>
                    <p className="text-slate-400 text-sm mt-1">Kanban-style task management for your freelance workflow.</p>
                </div>
                <Button className="bg-ocean-600 hover:bg-ocean-500 text-white gap-2">
                    <Plus className="h-4 w-4" /> New Task
                </Button>
            </div>

            <div className="flex gap-5 overflow-x-auto pb-4 flex-1">
                {(Object.entries(columns) as [Column, typeof columns[Column]][]).map(([colId, col]) => (
                    <div key={colId} className={`min-w-[300px] rounded-xl border ${columnColors[colId]} bg-white/[0.02] backdrop-blur-sm flex flex-col`}>
                        <div className="p-4 border-b border-white/5 flex items-center justify-between">
                            <span className="font-semibold text-white">{col.label}</span>
                            <span className="text-xs bg-white/10 text-slate-400 rounded-full px-2 py-0.5">{col.tasks.length}</span>
                        </div>
                        <div className="p-3 flex flex-col gap-3 flex-1 overflow-y-auto">
                            {col.tasks.map((task, i) => (
                                <motion.div
                                    key={task.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/8 rounded-lg p-3 cursor-pointer group transition-all"
                                >
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <p className="text-sm font-medium text-white leading-tight">{task.title}</p>
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreHorizontal className="h-4 w-4 text-slate-400" />
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-3 leading-relaxed">{task.description}</p>
                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {task.tags.map(tag => (
                                            <span key={tag} className="text-xs bg-ocean-900/50 text-ocean-300 border border-ocean-700/30 rounded-full px-2 py-0.5">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className={`text-xs rounded-full px-2 py-0.5 ${priorityColors[task.priority]}`}>
                                            {task.priority}
                                        </span>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Clock className="h-3 w-3" />
                                            {task.dueDate}
                                            <div className="flex items-center gap-1">
                                                <User className="h-3 w-3" />
                                                {task.assignee}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                            <button className="text-sm text-slate-600 hover:text-slate-400 flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                                <Plus className="h-4 w-4" /> Add task
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
