import type { Meta, StoryObj } from '@storybook/react';
import { ProposalCard } from './ProposalCard';

const meta: Meta<typeof ProposalCard> = {
    title: 'Dashboard/ProposalCard',
    component: ProposalCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        platform: { control: 'select', options: ['Upwork', 'Freelancer', 'Fiverr'] },
        budget: { control: 'text' },
        status: { control: 'select', options: ['draft', 'submitted', 'won', 'lost'] },
        mlScore: { control: 'number', min: 0, max: 1, step: 0.01 },
    },
};

export default meta;
type Story = StoryObj<typeof ProposalCard>;

export const DraftWithHighMLScore: Story = {
    args: {
        title: 'Senior Next.js Developer for High-Traffic SaaS',
        platform: 'Upwork',
        budget: '$150/hr',
        status: 'draft',
        mlScore: 0.94,
    },
};

export const WonProposal: Story = {
    args: {
        title: 'Build AI-Powered Dashboard using Turborepo',
        platform: 'Fiverr',
        budget: '$8,500',
        status: 'won',
        mlScore: 0.88,
    },
};

export const LostProposal: Story = {
    args: {
        title: 'Simple WordPress To React Migration',
        platform: 'Freelancer',
        budget: '$500',
        status: 'lost',
        mlScore: 0.23,
    },
};
