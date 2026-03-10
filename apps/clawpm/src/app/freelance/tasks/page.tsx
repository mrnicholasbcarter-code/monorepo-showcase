"use client";

import { Button } from "@monorepo/ui";

export default function TasksPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tasks</h1>
                    <p className="text-gray-500">Board view for all automated and manual tasks.</p>
                </div>
                <Button >New Task</Button>
            </div>

            <div className="flex h-[600px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
                <div className="text-center">
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">Kanban Board Coming Soon</h3>
                    <p className="mt-1 text-sm text-gray-500">This feature is currently under development.</p>
                </div>
            </div>
        </div>
    );
}
