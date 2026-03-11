'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@monorepo/ui';
import { Search, Send, Paperclip, Star, Inbox, Bot, Clock, Shield, Zap, MessageSquare } from 'lucide-react';

export default function CommunicationsPage() {
    const [selected, setSelected] = useState('1');
    const [draft, setDraft] = useState('');

    const { data: threads, isLoading: threadsLoading } = trpc.communications.listThreads.useQuery();
    const { data: messages, isLoading: messagesLoading } = trpc.communications.getThreadMessages.useQuery({ threadId: selected });

    const utils = trpc.useContext();
    const sendMutation = trpc.communications.sendMessage.useMutation({
        onSuccess: () => {
            utils.communications.getThreadMessages.invalidate({ threadId: selected });
            utils.communications.listThreads.invalidate();
            setDraft('');
        }
    });

    const handleSend = () => {
        if (!draft.trim()) return;
        sendMutation.mutate({ threadId: selected, content: draft });
    };

    const activeThread = threads?.find((t: any) => t.id === selected);

    if (threadsLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] gap-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-ocean-500/20 blur-3xl animate-pulse rounded-full" />
                    <div className="w-16 h-16 border-4 border-ocean-500/20 border-t-ocean-500 rounded-full animate-spin relative z-10" />
                </div>
                <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] animate-pulse">Decrypting Comms Uplink...</p>
            </div>
        );
    }

    return (
        <div className="flex h-full overflow-hidden bg-transparent">
            {/* Thread List */}
            <div className="w-[400px] border-r border-white/5 flex flex-col bg-slate-900/20 backdrop-blur-3xl shrink-0">
                <div className="p-8 border-b border-white/5">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-black text-white uppercase tracking-tighterAlpha flex items-center gap-3">
                            <MessageSquare className="h-6 w-6 text-ocean-400" /> Uplink
                        </h1>
                        <Button variant="outline" className="h-9 px-4 text-[9px] font-black uppercase tracking-widestAlpha border-white/10 hover:bg-white/5 rounded-xl">New Signal</Button>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-600 group-focus-within:text-ocean-400 transition-colors" />
                        <input
                            placeholder="Filter registry..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-[10px] font-black text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-ocean-500/30 transition-all uppercase tracking-widestAlpha"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
                    {threads?.map((thread: any) => (
                        <button
                            key={thread.id}
                            onClick={() => setSelected(thread.id)}
                            className={`w-full text-left p-5 rounded-[1.5rem] transition-all relative group ${selected === thread.id ? 'bg-ocean-500/10 border border-ocean-500/20' : 'bg-transparent border border-transparent hover:bg-white/[0.02]'}`}
                        >
                            {selected === thread.id && (
                                <motion.div layoutId="active-thread-bg" className="absolute inset-0 rounded-[1.5rem] bg-ocean-500/5 -z-10" />
                            )}
                            <div className="flex items-start gap-4">
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-ocean-500 to-ocean-800 flex items-center justify-center text-[10px] font-black text-white uppercase tracking-tighter shrink-0 shadow-lg shadow-black/20 group-hover:scale-105 transition-transform">
                                        {thread.avatar}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-950 flex items-center justify-center">
                                        <div className={`w-1.5 h-1.5 rounded-full ${thread.unread > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`} />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1.5">
                                        <span className={`text-xs font-black truncate uppercase tracking-widestAlpha ${selected === thread.id ? 'text-white' : 'text-slate-300'}`}>{thread.name}</span>
                                        <span className="text-[9px] text-slate-600 font-bold uppercase">{thread.time}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="px-2 py-0.5 rounded-md bg-black/40 border border-white/5 text-[8px] font-black uppercase text-ocean-400 tracking-widestAlpha">{thread.platform}</div>
                                        {thread.starred && <Star className="h-2.5 w-2.5 text-amber-500 fill-amber-400" />}
                                    </div>
                                    <p className={`text-[11px] truncate leading-relaxed font-bold uppercase tracking-tight italic ${selected === thread.id ? 'text-slate-400' : 'text-slate-500'}`}>{thread.preview}</p>
                                </div>
                                {thread.unread > 0 && (
                                    <span className="bg-ocean-500 text-white text-[9px] rounded-lg px-1.5 py-0.5 mt-1 shrink-0 font-black shadow-glow">
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
                {activeThread ? (
                    <>
                        <div className="p-8 border-b border-white/5 flex items-center justify-between backdrop-blur-2xl bg-white/[0.01] z-10">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black text-ocean-400 uppercase tracking-tighter shadow-inner">
                                    {activeThread.avatar}
                                </div>
                                <div>
                                    <div className="font-black text-white uppercase tracking-widestAlpha text-base mb-1">{activeThread.name}</div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                            <span className="text-[9px] text-emerald-400/80 font-black uppercase tracking-widestAlpha">Online</span>
                                        </div>
                                        <div className="w-px h-2 bg-white/10" />
                                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widestAlpha">{activeThread.platform} Protocol Secure</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="outline" className="h-11 w-11 p-0 border-white/10 rounded-2xl hover:bg-white/5 transition-all"><Shield className="h-4 w-4 text-slate-500" /></Button>
                                <Button variant="outline" className="h-11 w-11 p-0 border-white/10 rounded-2xl hover:bg-white/5 transition-all group"><Zap className="h-4 w-4 text-ocean-400 group-hover:fill-ocean-400/20" /></Button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-10 flex flex-col gap-10 custom-scrollbar z-10">
                            {messagesLoading ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="w-8 h-8 border-2 border-ocean-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : (
                                <div className="space-y-12">
                                    {messages?.map((msg: any, i: number) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.08 }}
                                            className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[70%] rounded-[2rem] px-8 py-6 relative group ${msg.self
                                                ? 'bg-ocean-600 text-white shadow-2xl shadow-ocean-950/50 rounded-tr-none border border-ocean-400/30'
                                                : msg.isAI
                                                    ? 'bg-violet-950/40 border border-violet-500/30 text-violet-50 rounded-tl-none backdrop-blur-3xl'
                                                    : 'bg-white/[0.03] border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-3xl'
                                                }`}>
                                                {msg.isAI && (
                                                    <div className="flex items-center gap-2 mb-4 border-b border-violet-500/20 pb-4">
                                                        <div className="w-6 h-6 rounded-lg bg-violet-500/20 flex items-center justify-center">
                                                            <Bot className="h-3.5 w-3.5 text-violet-400" />
                                                        </div>
                                                        <span className="text-[10px] text-violet-400 font-black uppercase tracking-[0.2em]">Autovox Intelligence</span>
                                                    </div>
                                                )}
                                                <p className="text-sm leading-relaxed font-bold uppercase tracking-tight">{msg.content}</p>
                                                <div className={`flex items-center gap-2 mt-6 text-[9px] font-black uppercase tracking-[0.2em] ${msg.self ? 'text-ocean-200/50 justify-end' : 'text-slate-600'}`}>
                                                    <Clock className="h-3 w-3" />
                                                    {msg.time} • SECURED
                                                </div>

                                                {/* Visual decoration for bubbles */}
                                                <div className={`absolute top-0 w-4 h-4 -z-10 ${msg.self ? 'right-0 -translate-y-2' : 'left-0 -translate-y-2'}`}>
                                                    <div className={`w-full h-full rounded-full blur-xl ${msg.self ? 'bg-ocean-400/20' : msg.isAI ? 'bg-violet-400/20' : 'bg-slate-400/10'}`} />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="p-8 border-t border-white/5 backdrop-blur-3xl z-10 bg-white/[0.01]">
                            <div className="flex items-center gap-5 bg-black/40 border border-white/10 rounded-[2rem] p-3 focus-within:border-ocean-500/30 transition-all shadow-inner">
                                <button className="p-4 text-slate-600 hover:text-ocean-400 hover:bg-white/5 rounded-2xl transition-all">
                                    <Paperclip className="h-5 w-5" />
                                </button>
                                <input
                                    value={draft}
                                    onChange={e => setDraft(e.target.value)}
                                    placeholder="TRANSMIT SECURE SIGNAL..."
                                    className="flex-1 bg-transparent text-xs font-black text-white placeholder:text-slate-700 focus:outline-none uppercase tracking-widestAlpha"
                                />
                                <button
                                    className="p-4 bg-ocean-600 hover:bg-ocean-500 text-white rounded-2xl shadow-glow transition-all active:scale-95 group disabled:opacity-50 disabled:pointer-events-none"
                                    onClick={handleSend}
                                    disabled={sendMutation.isLoading}
                                >
                                    <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </div>
                            <div className="mt-5 flex items-center justify-between px-4">
                                <div className="flex gap-8">
                                    <div className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-ocean-500 animate-pulse" />
                                        <span className="text-[9px] text-slate-600 font-black uppercase tracking-widestAlpha">Neural Core Active</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-3 w-3 text-slate-700" />
                                        <span className="text-[9px] text-slate-700 font-black uppercase tracking-widestAlpha">256-Bit Encrypted</span>
                                    </div>
                                </div>
                                <span className="text-[9px] text-slate-700 font-black uppercase tracking-widestAlpha px-3 py-1 rounded-full border border-slate-800/50 bg-white/[0.02]">Status: Buffered</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center gap-8 opacity-20 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-ocean-500/20 blur-[100px] rounded-full group-hover:bg-ocean-500/40 transition-colors" />
                            <Inbox className="h-24 w-24 text-slate-500 relative" />
                        </div>
                        <p className="text-sm font-black uppercase tracking-[0.5em] text-slate-600">Select Signal for Uplink</p>
                    </div>
                )}
            </div>
        </div>
    );
}
