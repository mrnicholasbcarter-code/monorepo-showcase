"use client";

import { Button } from "@monorepo/ui";

export default function RepositoriesPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900">Code Repositories</h1>
                    <p className="text-gray-500">Manage connected Git repositories across platforms.</p>
                </div>
                <Button >Connect Repo</Button>
            </div>

            <div className="flex h-[600px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
                <div className="text-center">
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">Git Integration Coming Soon</h3>
                    <p className="mt-1 text-sm text-gray-500">Repository management is under development.</p>
                </div>
            </div>
        </div>
    );
}
