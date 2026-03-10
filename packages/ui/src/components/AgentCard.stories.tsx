import type { Meta, StoryObj } from '@storybook/react';
import { AgentCard } from './AgentCard';

const meta: Meta<typeof AgentCard> = {
    title: 'Dashboard/AgentCard',
    component: AgentCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        name: { control: 'text' },
        role: { control: 'text' },
        status: { control: 'select', options: ['idle', 'working', 'offline'] },
        tasksCompleted: { control: 'number' },
        successRate: { control: 'number', min: 0, max: 100 },
    },
};

export default meta;
type Story = StoryObj<typeof AgentCard>;

export const ActiveAgent: Story = {
    args: {
        name: 'Genesis',
        role: 'Proposal Optimizer',
        status: 'working',
        tasksCompleted: 142,
        successRate: 98,
        actionLabel: 'View Active Tasks'
    },
};

export const IdleAgent: Story = {
    args: {
        name: 'Scout',
        role: 'Job Feed Analyzer',
        status: 'idle',
        tasksCompleted: 4521,
        successRate: 99,
        actionLabel: 'Assign Task'
    },
};

export const OfflineAgent: Story = {
    args: {
        name: 'DraftKit',
        role: 'Cover Letter Generator',
        status: 'offline',
        tasksCompleted: 89,
        successRate: 85,
        actionLabel: 'Wake Up Agent'
    },
};
