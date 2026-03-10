export type ProposalStatus = 'draft' | 'submitted' | 'pending' | 'accepted' | 'rejected' | 'withdrawn';

export type Platform = 'upwork' | 'freelancer' | 'guru' | 'fiverr' | 'linkedin' | 'other';

export type AgentRole =
  | 'architecture'
  | 'graphic-design'
  | 'marketing'
  | 'sales'
  | 'qa'
  | 'devops'
  | 'orchestrator';

export type AgentStatus = 'idle' | 'active' | 'busy' | 'error' | 'offline';

export interface Proposal {
  id: string;
  title: string;
  platform: Platform;
  jobUrl: string;
  status: ProposalStatus;
  submittedAt?: Date;
  budget: {
    min: number;
    max: number;
    currency: string;
  };
  variant?: string; // A/B test variant
  mlScore?: number; // ML prediction score
  clientName?: string;
  description: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  status: AgentStatus;
  currentTask?: string;
  completedTasks: number;
  successRate: number;
  spawnedAt: Date;
  lastActive: Date;
  capabilities: string[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  assignedAgent?: string;
  proposalId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Analytics {
  totalProposals: number;
  acceptedProposals: number;
  winRate: number;
  avgResponseTime: number; // hours
  platformStats: Record<Platform, {
    submitted: number;
    accepted: number;
    winRate: number;
  }>;
  agentStats: Record<string, {
    tasksCompleted: number;
    successRate: number;
    avgTime: number;
  }>;
}

export interface Communication {
  id: string;
  proposalId: string;
  clientName: string;
  platform: Platform;
  type: 'email' | 'message' | 'call' | 'meeting';
  subject?: string;
  content: string;
  direction: 'inbound' | 'outbound';
  timestamp: Date;
  status: 'unread' | 'read' | 'replied' | 'archived';
}

export interface CodeRepository {
  id: string;
  name: string;
  proposalId: string;
  url: string;
  platform: 'github' | 'gitlab' | 'bitbucket';
  lastCommit?: Date;
  reviewStatus?: 'pending' | 'approved' | 'changes-requested';
}

export interface FinancialRecord {
  id: string;
  proposalId?: string;
  type: 'income' | 'expense' | 'tax';
  amount: number;
  currency: string;
  label: string;
  category: string;
  status: 'paid' | 'pending' | 'overdue';
  date: Date;
}

export interface FinancialStats {
  netProfitYTD: number;
  grossRevenue: number;
  totalExpenses: number;
  taxEstimate: number;
  currentBalance: number;
  recentInvoices: FinancialRecord[];
  recentExpenses: FinancialRecord[];
}
