import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    title: 'UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
        },
        size: {
            control: 'select',
            options: ['default', 'sm', 'lg', 'icon'],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
    args: {
        children: 'Button',
        variant: 'default',
    },
};

export const Secondary: Story = {
    args: {
        children: 'Secondary',
        variant: 'secondary',
    },
};

export const Outline: Story = {
    args: {
        children: 'Outline',
        variant: 'outline',
    },
};

export const PremiumDestructive: Story = {
    args: {
        children: 'Delete Project',
        variant: 'destructive',
    },
};

export const Ghost: Story = {
    args: {
        children: 'Ghost Button',
        variant: 'ghost',
    },
};
