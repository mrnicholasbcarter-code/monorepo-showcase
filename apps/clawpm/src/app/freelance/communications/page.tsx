'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@monorepo/ui';
import { Search, Send, Paperclip, Star, Inbox, Bot, Clock } from 'lucide-react';

const threads = [
    { id: '1', name: 'Sarah M.', platform: 'Upwork', preview: 'The dashboard looks great! Can we schedule a call?', time: '2m ago', unread: 2, starred: true, avatar: 'SM' },
    { id: '2', name: 'James T.', platform: 'Freelancer', preview: 'I reviewed your proposal. Very impressive, but we need...', time: '1h ago', unread: 0, starred: false, avatar: 'JT' },
    { id: '3', name: 'CryptoVault Inc.', platform: 'Direct', preview: 'Following up on the smart contract audit project', time: '3h ago', unread: 1, starred: true, avatar: 'CV' },
    { id: '4', name: 'Alicia R.', platform: 'Fiverr', preview: 'Milestone 2 complete — files are in the shared drive', time: '1d ago', unread: 0, starred: false, avatar: 'AR' },
    { id: '5', name: 'Tech Stack Co.', platform: 'Upwork', preview: 'Genesis AI submitted the first draft. Looks solid.', time: '2d ago', unread: 0, starred: false, avatar: 'TS' },
];

const messages = [
    { id: '1', from: 'Sarah M.', content: 'Hi! I reviewed your proposal for the Next.js SaaS platform — really impressive work!', time: '10:24 AM', self: false },
    { id: '2', from: 'You', content: 'Thanks Sarah! Happy to answer any questions. I have built 3 similar platforms this quarter.', time: '10:27 AM', self: true },
    { id: '3', from: 'Sarah M.', content: 'The dashboard looks great! Can we schedule a call for tomorrow?', time: '10:31 AM', self: false },
    { id: '4', from: 'Genesis (AI)', content: '📌 I have pre-filled a meeting link for 9 AM tomorrow based on your calendar availability.', time: '10:31 AM', self: false, isAI: true },
];

export default function CommunicationsPage() {
    const [selected, setSelected] = useState('1');
    const [draft, setDraft] = useState('');

    const activeThread = threads.find(t => t.id === selected);

    return (
        <div className="flex h-full overflow-hidden">
            {/* Thread List */}
            <div className="w-80 border-r border-white/8 flex flex-col">
                <div className="p-4 border-b border-white/8">
                    <div className="flex items-center justify-between mb-3">
                        <h1 className="font-bold text-white">Inbox</h1>
                        <Button variant="outline" className="h-7 text-xs px-2">Compose</Button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
                        <input
                            placeholder="Search messages..."
                            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-ocean-500/50"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {threads.map((thread) => (
                        <button
                            key={thread.id}
                            onClick={() => setSelected(thread.id)}
                            className={`w-full text-left p-4 border-b border-white/5 hover:bg-white/[0.03] transition-colors ${selected === thread.id ? 'bg-white/[0.05]' : ''}`}
                        >
                            <div className="flex items-start gap-3">
                                <div className="w-9 h-9 rounded-full bg-ocean-700 flex items-center justify-center text-xs font-bold text-ocean-200 shrink-0">
                                    {thread.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-sm font-medium text-white truncate">{thread.name}</span>
                                        <span className="text-xs text-slate-600 shrink-0 ml-2">{thread.time}</span>
                                    </div>
                                    <div className="flex items-center gap-1 mb-1">
                                        <span className="text-xs bg-ocean-900/60 text-ocean-400 border border-ocean-700/30 px-1.5 py-0.5 rounded-full">{thread.platform}</span>
                                        {thread.starred && <Star className="h-3 w-3 text-amber-400 fill-amber-400" />}
                                    </div>
                                    <p className="text-xs text-slate-500 truncate leading-relaxed">{thread.preview}</p>
                                </div>
                                {thread.unread > 0 && (
                                    <span className="bg-ocean-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shrink-0 font-bold">
                                        {thread.unread}
                                    </span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Message Thread */}
            <div className="flex-1 flex flex-col">
                {activeThread && (
                    <>
                        <div className="p-4 border-b border-white/8 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-ocean-700 flex items-center justify-center text-xs font-bold text-ocean-200">
                                {activeThread.avatar}
                            </div>
                            <div>
                                <div className="font-semibold text-white">{activeThread.name}</div>
                                <div className="text-xs text-slate-500">{activeThread.platform}</div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                    className={`flex ${msg.self ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[70%] rounded-xl px-4 py-2.5 ${msg.self
                                            ? 'bg-ocean-600 text-white'
                                            : msg.isAI
                                                ? 'bg-violet-900/40 border border-violet-500/30 text-violet-200'
                                                : 'bg-white/[0.05] border border-white/8 text-slate-200'
                                        }`}>
                                        {msg.isAI && (
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <Bot className="h-3 w-3 text-violet-400" />
                                                <span className="text-xs text-violet-400 font-medium">Genesis AI</span>
                                            </div>
                                        )}
                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                        <div className={`flex items-center gap-1 mt-1 text-xs ${msg.self ? 'text-ocean-200 justify-end' : 'text-slate-600'}`}>
                                            <Clock className="h-2.5 w-2.5" />
                                            {msg.time}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-white/8">
                            <div className="flex items-center gap-3 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3">
                                <button className="text-slate-500 hover:text-slate-300 transition-colors">
                                    <Paperclip className="h-4 w-4" />
                                </button>
                                <input
                                    value={draft}
                                    onChange={e => setDraft(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none"
                                />
                                <button className="text-ocean-400 hover:text-ocean-300 transition-colors" onClick={() => setDraft('')}>
                                    <Send className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
