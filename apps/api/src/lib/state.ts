import type { Task, Proposal, Agent } from '@monorepo/types';
import { v4 as uuidv4 } from 'uuid';

// --- SHARED STATE ---

export let tasksRegistry: Task[] = [
    { id: 't1', title: 'Architect Edge Functions', description: 'Design serverless runtime for agent orchestration', status: 'in-progress', priority: 'high', tags: ['infra', 'backend'], dueDate: new Date(Date.now() + 86400000 * 5), createdAt: new Date(Date.now() - 86400000 * 10), updatedAt: new Date(Date.now() - 86400000 * 10) },
    { id: 't2', title: 'Optimize LLM Context', description: 'Implement sliding window for long-running threads', status: 'todo', priority: 'urgent', tags: ['ai', 'perf'], dueDate: new Date(Date.now() + 86400000 * 2), createdAt: new Date(Date.now() - 86400000 * 8), updatedAt: new Date(Date.now() - 86400000 * 8) },
    { id: 't3', title: 'UI Glassmorphism Audit', description: 'Review backdrop-blur values across orbit dashboards', status: 'review', priority: 'medium', tags: ['ui', 'ux'], dueDate: new Date(Date.now() + 86400000 * 1), createdAt: new Date(Date.now() - 86400000 * 7), updatedAt: new Date(Date.now() - 86400000 * 7) },
    { id: 't4', title: 'Stripe API Webhooks', description: 'Handle autonomous subscription lifecycle events', status: 'done', priority: 'high', tags: ['fintech'], dueDate: new Date(Date.now() - 86400000 * 1), createdAt: new Date(Date.now() - 86400000 * 6), updatedAt: new Date(Date.now() - 86400000 * 6) },
];

export let proposalsRegistry: Proposal[] = [
    {
        id: 'p1',
        title: 'Next.js 14 Enterprise SaaS Infrastructure',
        platform: 'upwork',
        status: 'accepted',
        budget: { min: 5000, max: 8000, currency: 'USD' },
        mlScore: 0.94,
        description: 'Build a production-ready SaaS infrastructure using Next.js 14, TurboRepo, and AWS.',
        tags: ['Next.js', 'SaaS', 'TurboRepo'],
        createdAt: new Date(Date.now() - 86400000 * 5),
        updatedAt: new Date(Date.now() - 86400000 * 5),
        jobUrl: 'https://upwork.com/jobs/123'
    },
    {
        id: 'p2',
        title: 'AI Trading Bot with TensorFlow.js Integration',
        platform: 'freelancer',
        status: 'pending',
        budget: { min: 2500, max: 4000, currency: 'USD' },
        mlScore: 0.88,
        description: 'Develop a high-performance trading bot with client-side ML predictions.',
        tags: ['AI', 'TensorFlow.js', 'Trading'],
        createdAt: new Date(Date.now() - 86400000 * 2),
        updatedAt: new Date(Date.now() - 86400000 * 2),
        jobUrl: 'https://freelancer.com/jobs/456'
    }
];

export let agentsRegistry: Agent[] = [
    {
        id: '1',
        name: 'Architecture-Prime',
        role: 'architecture',
        status: 'active',
        completedTasks: 142,
        successRate: 0.98,
        capabilities: ['system-design', 'security-audit'],
        spawnedAt: new Date(Date.now() - 86400000 * 10),
        lastActive: new Date()
    },
    {
        id: '2',
        name: 'UX-Guardian',
        role: 'graphic-design',
        status: 'idle',
        completedTasks: 85,
        successRate: 0.95,
        capabilities: ['figma-sync', 'component-gen'],
        spawnedAt: new Date(Date.now() - 86400000 * 5),
        lastActive: new Date()
    }
];

export let threadsRegistry = [
    { id: '1', name: 'Sarah M.', platform: 'upwork', preview: 'The dashboard looks great! Can we schedule a call?', time: '2m ago', unread: 2, starred: true, avatar: 'SM' },
    { id: '2', name: 'James T.', platform: 'freelancer', preview: 'I reviewed your proposal. Very impressive, but we need...', time: '1h ago', unread: 0, starred: false, avatar: 'JT' },
];

export let messagesRegistry: Record<string, any[]> = {
    '1': [
        { id: 'm1', from: 'Sarah M.', content: 'Hi! I reviewed your proposal for the Next.js SaaS platform — really impressive work!', time: '10:24 AM', self: false },
        { id: 'm2', from: 'You', content: 'Thanks Sarah! Happy to answer any questions. I have built 3 similar platforms this quarter.', time: '10:27 AM', self: true },
        { id: 'm3', from: 'Sarah M.', content: 'The dashboard looks great! Can we schedule a call for tomorrow?', time: '10:31 AM', self: false },
        { id: 'm4', from: 'Genesis (AI)', content: '📌 I have pre-filled a meeting link for 9 AM tomorrow based on your calendar availability.', time: '10:31 AM', self: false, isAI: true },
    ]
};

// --- SETTERS ---

export const setTasksRegistry = (tasks: Task[]) => { tasksRegistry = tasks; };
export const setProposalsRegistry = (proposals: Proposal[]) => { proposalsRegistry = proposals; };
export const setAgentsRegistry = (agents: Agent[]) => { agentsRegistry = agents; };

// --- SIMULATION ENGINE ---

export function startSimulation() {
    console.log('🌌 Quantum Simulation Engine Initialized');

    // Interval for Task Status Jitter (Every 45 seconds)
    setInterval(() => {
        const statuses: Task['status'][] = ['todo', 'in-progress', 'review', 'done'];
        const randomTask = tasksRegistry[Math.floor(Math.random() * tasksRegistry.length)];
        if (randomTask && randomTask.status !== 'done') {
            const currentIndex = statuses.indexOf(randomTask.status);
            const nextStatus = statuses[Math.min(currentIndex + 1, statuses.length - 1)];

            if (randomTask.status !== nextStatus) {
                console.log(`[SIM] Task ${randomTask.id} advancing: ${randomTask.status} -> ${nextStatus}`);
                randomTask.status = nextStatus;
                randomTask.updatedAt = new Date();
            }
        }
    }, 45000);

    // Interval for Simulated Agent Activity (Every 90 seconds)
    setInterval(() => {
        const activeAgents = agentsRegistry.filter(a => a.status === 'active');
        if (activeAgents.length > 0) {
            const agent = activeAgents[Math.floor(Math.random() * activeAgents.length)];
            console.log(`[SIM] Agent ${agent.name} performing background maintenance...`);
            agent.lastActive = new Date();
            agent.completedTasks = (agent.completedTasks || 0) + 1;
        }
    }, 90000);

    // Interval for Synthetic Alerts (Every 2 minutes)
    setInterval(() => {
        const threadIds = Object.keys(messagesRegistry);
        const threadId = threadIds[Math.floor(Math.random() * threadIds.length)];

        const aiMessages = [
            "📌 Intelligence update: Market volatility detected. Re-optimizing payout schedules.",
            "📡 Node sync complete: Repository telemetry aligns with current sprint objectives.",
            "🛡️ Security scan finalized: Zero vulnerabilities detected across active deployments.",
        ];

        const newMessage = {
            id: uuidv4(),
            from: 'Genesis (AI)',
            content: aiMessages[Math.floor(Math.random() * aiMessages.length)],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            self: false,
            isAI: true
        };

        if (messagesRegistry[threadId]) {
            console.log(`[SIM] Genesis AI transmitting update to Thread ${threadId}`);
            messagesRegistry[threadId].push(newMessage);
            const thread = threadsRegistry.find(t => t.id === threadId);
            if (thread) {
                thread.preview = newMessage.content;
                thread.time = 'Just now';
                thread.unread++;
            }
        }
    }, 120000);
}
