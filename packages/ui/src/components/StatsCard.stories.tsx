import type { Meta, StoryObj } from '@storybook/react';
import { StatsCard } from './StatsCard';

const meta: Meta<typeof StatsCard> = {
    title: 'Dashboard/StatsCard',
    component: StatsCard,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text' },
        value: { control: 'text' },
        trend: { control: 'number' },
        trendLabel: { control: 'text' },
    },
};

export default meta;
type Story = StoryObj<typeof StatsCard>;

export const Default: Story = {
    args: {
        title: 'Total Revenue',
        value: '$45,231.89',
        trend: 20.1,
        trendLabel: 'from last month'
    },
};

export const NegativeTrend: Story = {
    args: {
        title: 'Active Proposals',
        value: '12',
        trend: -4.3,
        trendLabel: 'from last week'
    },
};

export const NoTrend: Story = {
    args: {
        title: 'Total Projects',
        value: '349',
    },
};
