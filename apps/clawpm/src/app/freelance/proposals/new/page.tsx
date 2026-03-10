"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Button,
    Card,
    Input,
    Label,
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    Slider,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@monorepo/ui";

export default function NewProposalPage() {
    const [budget, setBudget] = useState([500]);
    const [platform, setPlatform] = useState("upwork");

    return (
        <div className="flex flex-col gap-8 p-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-ocean-900 dark:text-ocean-100">
                        Create Proposal
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Configure your AI agent to generate a highly-optimized, multi-variant proposal.
                    </p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline">Save Draft</Button>
                    <Button className="bg-ocean-600 hover:bg-ocean-700 text-white shadow-glow">
                        Generate & Submit
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main configuration area */}
                <div className="md:col-span-2 space-y-8">
                    <Card className="p-6 border-ocean-200/50 dark:border-ocean-800/50 shadow-premium bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <span className="bg-ocean-100 dark:bg-ocean-900 text-ocean-600 dark:text-ocean-300 p-2 rounded-md">
                                🎯
                            </span>
                            Target Client
                        </h2>
                        <div className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Job Title / Role</Label>
                                <Input id="title" placeholder="e.g. Senior Full-Stack Engineer for SaaS MVP" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label>Platform</Label>
                                    <Select value={platform} onValueChange={setPlatform}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select platform" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Freelance Marketplaces</SelectLabel>
                                                <SelectItem value="upwork">Upwork</SelectItem>
                                                <SelectItem value="freelancer">Freelancer.com</SelectItem>
                                                <SelectItem value="fiverr">Fiverr</SelectItem>
                                                <SelectItem value="guru">Guru</SelectItem>
                                                <SelectItem value="linkedin">LinkedIn ProFinder</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Client Budget: ${budget[0]}</Label>
                                    <div className="pt-4 px-2">
                                        <Slider
                                            value={budget}
                                            onValueChange={setBudget}
                                            max={10000}
                                            step={100}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Job Description</Label>
                                <textarea
                                    id="description"
                                    className="flex min-h-[150px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Paste the original job description here for the AI to analyze..."
                                />
                            </div>
                        </div>
                    </Card>

                    <Tabs defaultValue="approach" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="approach">Technical Approach</TabsTrigger>
                            <TabsTrigger value="portfolio">Portfolio Matches</TabsTrigger>
                            <TabsTrigger value="abtest">A/B Optimization</TabsTrigger>
                        </TabsList>

                        <TabsContent value="approach" className="mt-6">
                            <Card className="p-6">
                                <div className="space-y-4">
                                    <p className="text-sm text-muted-foreground">
                                        Select the angles your AI Agent should emphasize when writing this proposal.
                                    </p>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Button variant="outline" className="justify-start h-auto py-4 flex-col items-start px-6 gap-2 border-ocean-500 bg-ocean-50 dark:bg-ocean-950">
                                            <span className="font-semibold text-ocean-700 dark:text-ocean-300">Speed to Market</span>
                                            <span className="text-xs text-muted-foreground whitespace-normal text-left">Focus on rapid delivery using modern stacks (Next.js, TurboRepo).</span>
                                        </Button>
                                        <Button variant="outline" className="justify-start h-auto py-4 flex-col items-start px-6 gap-2">
                                            <span className="font-semibold">Enterprise Scalability</span>
                                            <span className="text-xs text-muted-foreground whitespace-normal text-left">Emphasize robust architecture and maintainability.</span>
                                        </Button>
                                        <Button variant="outline" className="justify-start h-auto py-4 flex-col items-start px-6 gap-2">
                                            <span className="font-semibold">AI Integration</span>
                                            <span className="text-xs text-muted-foreground whitespace-normal text-left">Highlight experience building intelligent LLM features.</span>
                                        </Button>
                                        <Button variant="outline" className="justify-start h-auto py-4 flex-col items-start px-6 gap-2">
                                            <span className="font-semibold">Cost Efficiency</span>
                                            <span className="text-xs text-muted-foreground whitespace-normal text-left">Focus on optimizing resources and serverless infra.</span>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </TabsContent>
                        <TabsContent value="portfolio" className="mt-6">
                            <Card className="p-12 text-center text-muted-foreground border-dashed">
                                The agent is analyzing the job description to match your best relevant projects.
                            </Card>
                        </TabsContent>
                        <TabsContent value="abtest" className="mt-6">
                            <Card className="p-12 text-center text-muted-foreground border-dashed">
                                Configure tone variations (e.g. Aggressive vs Consultative) for automated A/B testing framework.
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Sidebar / AI Settings */}
                <div className="space-y-6">
                    <Card className="p-6 bg-gradient-to-br from-ocean-500 to-ocean-700 text-white shadow-glow">
                        <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                            ✨ Genesis Agent
                        </h3>
                        <p className="text-ocean-100 text-sm mb-6">
                            Assign this task to your master agent. It will autonomously fetch repository history, draft, and optimize the proposal based on ML likelihood models.
                        </p>
                        <div className="bg-white/10 rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-ocean-100">Success Predictor</span>
                                <span className="font-bold text-green-300">87%</span>
                            </div>
                            <div className="w-full bg-black/20 rounded-full h-2">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "87%" }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="bg-green-400 h-2 rounded-full"
                                />
                            </div>
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-semibold mb-4">ML Parameters</h3>
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <div className="flex justify-between text-sm">
                                    <Label>Bid Aggressiveness</Label>
                                    <span className="text-muted-foreground">High</span>
                                </div>
                                <Slider defaultValue={[80]} max={100} step={1} />
                            </div>
                            <div className="grid gap-2 mt-6">
                                <div className="flex justify-between text-sm">
                                    <Label>Cover Letter Length</Label>
                                    <span className="text-muted-foreground">Concise</span>
                                </div>
                                <Slider defaultValue={[25]} max={100} step={1} />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
