-- Seed data for development/testing

-- Sample Proposals
INSERT INTO proposals (title, platform, job_url, status, budget, description, tags, ml_score, client_name) VALUES
('Full-stack TypeScript Developer for SaaS Platform', 'upwork', 'https://upwork.com/job/123', 'accepted', '{"min": 5000, "max": 8000, "currency": "USD"}', 'Looking for an experienced full-stack developer proficient in TypeScript, React, and Node.js...', ARRAY['TypeScript', 'React', 'Node.js', 'PostgreSQL'], 0.87, 'TechCorp Inc'),
('Next.js Developer for E-commerce Migration', 'freelancer', 'https://freelancer.com/job/456', 'pending', '{"min": 3000, "max": 5000, "currency": "USD"}', 'Need a skilled Next.js developer to migrate our e-commerce platform...', ARRAY['Next.js', 'E-commerce', 'Migration'], 0.72, NULL),
('React Native Mobile App Development', 'upwork', 'https://upwork.com/job/789', 'submitted', '{"min": 8000, "max": 12000, "currency": "USD"}', 'Build a cross-platform mobile app for iOS and Android...', ARRAY['React Native', 'Mobile', 'iOS', 'Android'], 0.65, 'StartupXYZ'),
('Backend API with NestJS and PostgreSQL', 'guru', 'https://guru.com/job/101', 'draft', '{"min": 4000, "max": 6000, "currency": "USD"}', 'Create RESTful API using NestJS framework...', ARRAY['NestJS', 'PostgreSQL', 'API'], NULL, NULL),
('UI/UX Design for Dashboard Application', 'fiverr', 'https://fiverr.com/gig/202', 'rejected', '{"min": 2000, "max": 3000, "currency": "USD"}', 'Design modern dashboard interface with Figma...', ARRAY['Figma', 'UI/UX', 'Dashboard'], 0.45, 'DesignCo');

-- Sample Agents
INSERT INTO agents (name, role, status, current_task, completed_tasks, success_rate, capabilities) VALUES
('ArchBot Alpha', 'architecture', 'active', 'Designing microservices architecture for Project X', 47, 0.94, ARRAY['System Design', 'Scalability', 'Cloud Architecture', 'API Design']),
('QA Sentinel', 'qa', 'busy', 'Running integration tests on payment module', 89, 0.97, ARRAY['Automated Testing', 'Code Review', 'Bug Detection', 'Performance Testing']),
('DevOps Commander', 'devops', 'idle', NULL, 56, 0.91, ARRAY['CI/CD', 'Docker', 'Kubernetes', 'Monitoring']),
('Sales Navigator', 'sales', 'active', 'Following up with 3 high-value leads', 34, 0.76, ARRAY['Lead Generation', 'Outreach', 'Proposal Optimization', 'CRM Management']),
('Design Wizard', 'graphic-design', 'idle', NULL, 28, 0.88, ARRAY['Figma', 'Branding', 'UI Design', 'Illustrations']),
('Marketing Maven', 'marketing', 'active', 'Creating A/B test variants for proposal', 42, 0.82, ARRAY['Copywriting', 'SEO', 'Content Strategy', 'A/B Testing']);

-- Sample Tasks
INSERT INTO tasks (title, description, status, assigned_agent, proposal_id, priority, tags) VALUES
('Set up project repository', 'Initialize Git repo and configure CI/CD pipeline', 'done', (SELECT id FROM agents WHERE name = 'DevOps Commander'), (SELECT id FROM proposals WHERE title LIKE '%Full-stack TypeScript%'), 'high', ARRAY['setup', 'devops']),
('Design database schema', 'Create ERD and PostgreSQL schema', 'in-progress', (SELECT id FROM agents WHERE name = 'ArchBot Alpha'), (SELECT id FROM proposals WHERE title LIKE '%Full-stack TypeScript%'), 'high', ARRAY['database', 'architecture']),
('Code review: Payment module', 'Review payment processing implementation', 'review', (SELECT id FROM agents WHERE name = 'QA Sentinel'), (SELECT id FROM proposals WHERE title LIKE '%Full-stack TypeScript%'), 'urgent', ARRAY['review', 'qa']);

-- Sample Communications
INSERT INTO communications (proposal_id, client_name, platform, type, subject, content, direction, status) VALUES
((SELECT id FROM proposals WHERE title LIKE '%Full-stack TypeScript%'), 'TechCorp Inc', 'upwork', 'message', 'Project kickoff', 'Hi, looking forward to starting this project!', 'inbound', 'read'),
((SELECT id FROM proposals WHERE title LIKE '%Full-stack TypeScript%'), 'TechCorp Inc', 'email', 'email', 'Re: Project timeline', 'Thanks for the details. We can deliver in 6 weeks.', 'outbound', 'replied');

-- Sample Code Repositories
INSERT INTO code_repositories (name, proposal_id, url, platform, status, review_status) VALUES
('techcorp-saas-platform', (SELECT id FROM proposals WHERE title LIKE '%Full-stack TypeScript%'), 'https://github.com/client/saas-platform', 'github', 'active', 'approved'),
('ecommerce-migration', (SELECT id FROM proposals WHERE title LIKE '%Next.js Developer%'), 'https://gitlab.com/client/ecommerce', 'gitlab', 'active', 'pending');
