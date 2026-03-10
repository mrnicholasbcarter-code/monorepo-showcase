'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@monorepo/ui';
import { Search, Send, Paperclip, Star, Inbox, Bot, Clock, Shield, Zap } from 'lucide-react';

export default function CommunicationsPage() {
    const [selected, setSelected] = useState('1');
    const [draft, setDraft] = useState('');

    const { data: threads, isLoading: threadsLoading } = trpc.communications.listThreads.useQuery();
    const { data: messages, isLoading: messagesLoading } = trpc.communications.getThreadMessages.useQuery({ threadId: selected });

    const activeThread = threads?.find(t => t.id === selected);

    if (threadsLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
                <div className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-500 font-mono text-xs uppercase tracking-widestAlpha">Decrypting Comms Uplink...</p>
            </div>
        );
    }

    return (
        <div className="flex h-full overflow-hidden bg-slate-950/20">
            {/* Thread List */}
            <div className="w-96 border-r border-white/5 flex flex-col backdrop-blur-xl bg-white/[0.01]">
                <div className="p-6 border-b border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-xl font-black text-white uppercase tracking-widestAlpha flex items-center gap-2">
                            <Inbox className="h-4 w-4 text-ocean-400" /> Uplink
                        </h1>
                        <Button variant="outline" className="h-8 text-[9px] font-black uppercase tracking-widestAlpha border-white/10 hover:bg-white/5">New Signal</Button>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-600 group-focus-within:text-ocean-400 transition-colors" />
                        <input
                            placeholder="Filter signals..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3 py-3 text-[10px] font-bold text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-ocean-500/30 transition-all uppercase tracking-widestAlpha"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {threads?.map((thread) => (
                        <button
                            key={thread.id}
                            onClick={() => setSelected(thread.id)}
                            className={`w-full text-left p-5 border-b border-white/[0.02] hover:bg-white/[0.02] transition-all relative ${selected === thread.id ? 'bg-white/[0.04]' : ''}`}
                        >
                            {selected === thread.id && <motion.div layoutId="active-thread" className="absolute left-0 top-0 bottom-0 w-1 bg-ocean-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]" />}
                            <div className="flex items-start gap-4">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-ocean-500 to-ocean-800 flex items-center justify-center text-xs font-black text-white uppercase tracking-tighter shrink-0 shadow-xl shadow-black/20 group-hover:scale-105 transition-transform">
                                    {thread.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-black text-slate-200 truncate uppercase tracking-tighterAlpha">{thread.name}</span>
                                        <span className="text-[9px] text-slate-600 font-bold uppercase">{thread.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[9px] font-black uppercase tracking-widestAlpha bg-ocean-950/60 text-ocean-400 border border-ocean-800/40 px-2 py-0.5 rounded-full">{thread.platform}</span>
                                        {thread.starred && <Star className="h-3 w-3 text-amber-500 fill-amber-500 shadow-amber-500/20" />}
                                    </div>
                                    <p className="text-[11px] text-slate-500 truncate leading-relaxed italic">{thread.preview}</p>
                                </div>
                                {thread.unread > 0 && (
                                    <span className="bg-ocean-500 text-white text-[9px] rounded-full w-5 h-5 flex items-center justify-center shrink-0 font-black shadow-lg shadow-ocean-900/50 animate-pulse">
                                        {thread.unread}
                                    </span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Message Thread */}
            <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-950/40">
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                {activeThread ? (
                    <>
                        <div className="p-6 border-b border-white/5 flex items-center justify-between backdrop-blur-md bg-slate-900/20 z-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-black text-ocean-400 uppercase tracking-tighter">
                                    {activeThread.avatar}
                                </div>
                                <div>
                                    <div className="font-black text-white uppercase tracking-widestAlpha text-sm">{activeThread.name}</div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widestAlpha">{activeThread.platform} Protocol Secure</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" className="h-9 w-9 p-0 border-white/10 rounded-xl"><Shield className="h-3.5 w-3.5 text-slate-500" /></Button>
                                <Button variant="outline" className="h-9 w-9 p-0 border-white/10 rounded-xl"><Zap className="h-3.5 w-3.5 text-ocean-400" /></Button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6 custom-scrollbar z-10">
                            {messagesLoading ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-ocean-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : (
                                messages?.map((msg, i) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`max-w-[85%] md:max-w-[65%] rounded-2xl px-6 py-4 relative group ${msg.self
                                            ? 'bg-ocean-600/90 text-white shadow-xl shadow-ocean-950/40 rounded-tr-none border border-ocean-400/20'
                                            : msg.isAI
                                                ? 'bg-violet-950/40 border border-violet-500/30 text-violet-100 rounded-tl-none backdrop-blur-xl'
                                                : 'bg-white/[0.03] border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-xl'
                                            }`}>
                                            {msg.isAI && (
                                                <div className="flex items-center gap-2 mb-2 border-b border-violet-500/20 pb-2">
                                                    <Bot className="h-3.5 w-3.5 text-violet-400" />
                                                    <span className="text-[10px] text-violet-400 font-black uppercase tracking-widestAlpha">Autovox Intelligence</span>
                                                </div>
                                            )}
                                            <p className="text-[13px] leading-relaxed font-medium">{msg.content}</p>
                                            <div className={`flex items-center gap-1.5 mt-3 text-[9px] font-black uppercase tracking-widestAlpha ${msg.self ? 'text-ocean-200/60 justify-end' : 'text-slate-600'}`}>
                                                <Clock className="h-2.5 w-2.5" />
                                                {msg.time} • SEALED
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        <div className="p-6 border-t border-white/5 backdrop-blur-md z-10">
                            <div className="flex items-center gap-4 bg-white/[0.02] border border-white/10 rounded-2xl p-2 focus-within:border-ocean-500/30 transition-all">
                                <button className="p-3 text-slate-600 hover:text-ocean-400 transition-colors">
                                    <Paperclip className="h-4 w-4" />
                                </button>
                                <input
                                    value={draft}
                                    onChange={e => setDraft(e.target.value)}
                                    placeholder="TRANSMIT SECURE SIGNAL..."
                                    className="flex-1 bg-transparent text-xs font-bold text-slate-200 placeholder:text-slate-600 focus:outline-none uppercase tracking-widestAlpha"
                                />
                                <button
                                    className="p-3 bg-ocean-600 hover:bg-ocean-500 text-white rounded-xl shadow-lg shadow-ocean-950/50 transition-all active:scale-95"
                                    onClick={() => setDraft('')}
                                >
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="mt-3 flex items-center justify-between px-2">
                                <div className="flex gap-4">
                                    <span className="text-[9px] text-slate-700 font-bold uppercase tracking-tighterAlpha">Neural Mode Active</span>
                                    <span className="text-[9px] text-slate-700 font-bold uppercase tracking-tighterAlpha">Encryption High</span>
                                </div>
                                <span className="text-[9px] text-slate-700 font-bold uppercase tracking-tighterAlpha px-2 py-0.5 rounded border border-slate-800">Draft Auto-Saved</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 opacity-20">
                        <Inbox className="h-12 w-12 text-slate-500" />
                        <p className="text-[10px] font-black uppercase tracking-widestAlpha text-slate-500">Select Signal for Uplink</p>
                    </div>
                )}
            </div>
        </div>
    );
}
