-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Proposals table
CREATE TABLE proposals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('upwork', 'freelancer', 'guru', 'fiverr', 'linkedin', 'other')),
  job_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'pending', 'accepted', 'rejected', 'withdrawn')),
  budget JSONB NOT NULL,
  variant TEXT,
  ml_score DECIMAL(3,2) CHECK (ml_score >= 0 AND ml_score <= 1),
  client_name TEXT,
  description TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  submitted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agents table
CREATE TABLE agents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('architecture', 'graphic-design', 'marketing', 'sales', 'qa', 'devops', 'orchestrator')),
  status TEXT NOT NULL DEFAULT 'idle' CHECK (status IN ('idle', 'active', 'busy', 'error', 'offline')),
  current_task TEXT,
  completed_tasks INTEGER DEFAULT 0,
  success_rate DECIMAL(3,2) DEFAULT 1.0 CHECK (success_rate >= 0 AND success_rate <= 1),
  spawned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  capabilities TEXT[] DEFAULT '{}'
);

-- Tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress', 'review', 'done')),
  assigned_agent UUID REFERENCES agents(id) ON DELETE SET NULL,
  proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  due_date TIMESTAMP WITH TIME ZONE,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Communications table
CREATE TABLE communications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  platform TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('email', 'message', 'call', 'meeting')),
  subject TEXT,
  content TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('inbound', 'outbound')),
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied', 'archived')),
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Code Repositories table
CREATE TABLE code_repositories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  proposal_id UUID NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('github', 'gitlab', 'bitbucket')),
  last_commit TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived')),
  review_status TEXT CHECK (review_status IN ('pending', 'approved', 'changes-requested')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_proposals_status ON proposals(status);
CREATE INDEX idx_proposals_platform ON proposals(platform);
CREATE INDEX idx_proposals_created_at ON proposals(created_at DESC);
CREATE INDEX idx_agents_status ON agents(status);
CREATE INDEX idx_agents_role ON agents(role);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_assigned_agent ON tasks(assigned_agent);
CREATE INDEX idx_tasks_proposal_id ON tasks(proposal_id);
CREATE INDEX idx_communications_proposal_id ON communications(proposal_id);
CREATE INDEX idx_communications_status ON communications(status);
CREATE INDEX idx_repositories_proposal_id ON code_repositories(proposal_id);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables with updated_at
CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON proposals
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) - Enable for multi-tenancy later
-- ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE code_repositories ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE proposals IS 'Freelance proposals across multiple platforms';
COMMENT ON TABLE agents IS 'AI agents for automation and task execution';
COMMENT ON TABLE tasks IS 'Tasks for project management (Agile/Scrum)';
COMMENT ON TABLE communications IS 'Client communications across all channels';
COMMENT ON TABLE code_repositories IS 'Code repositories linked to proposals';
