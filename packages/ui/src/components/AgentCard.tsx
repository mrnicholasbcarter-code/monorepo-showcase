import { motion } from 'framer-motion';
import type { Agent } from '@monorepo/types';
import { cn } from '../utils/cn';

interface AgentCardProps {
  agent: Agent;
  onClick?: () => void;
}

const statusColors = {
  idle: 'bg-gray-400',
  active: 'bg-green-500',
  busy: 'bg-yellow-500',
  error: 'bg-red-500',
  offline: 'bg-gray-300',
};

const roleIcons: Record<string, string> = {
  architecture: '🏗️',
  'graphic-design': '🎨',
  marketing: '📢',
  sales: '💼',
  qa: '🔍',
  devops: '⚙️',
  orchestrator: '🎭',
};

export function AgentCard({ agent, onClick }: AgentCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm cursor-pointer"
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{roleIcons[agent.role] || '🤖'}</span>
          <div>
            <h3 className="font-semibold text-gray-900">{agent.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{agent.role.replace('-', ' ')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn('w-2 h-2 rounded-full', statusColors[agent.status])} />
          <span className="text-xs text-gray-600 capitalize">{agent.status}</span>
        </div>
      </div>

      {agent.currentTask && (
        <div className="mb-3 p-2 bg-blue-50 rounded text-sm">
          <span className="text-gray-600">Current: </span>
          <span className="text-gray-900">{agent.currentTask}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <p className="text-gray-500">Tasks Completed</p>
          <p className="font-semibold text-gray-900">{agent.completedTasks}</p>
        </div>
        <div>
          <p className="text-gray-500">Success Rate</p>
          <p className={cn(
            'font-semibold',
            agent.successRate >= 0.8 ? 'text-green-600' : agent.successRate >= 0.6 ? 'text-yellow-600' : 'text-red-600'
          )}>
            {(agent.successRate * 100).toFixed(0)}%
          </p>
        </div>
      </div>

      {agent.capabilities.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Capabilities</p>
          <div className="flex flex-wrap gap-1">
            {agent.capabilities.slice(0, 3).map(cap => (
              <span key={cap} className="px-2 py-0.5 bg-ocean-100 text-ocean-700 rounded text-xs">
                {cap}
              </span>
            ))}
            {agent.capabilities.length > 3 && (
              <span className="px-2 py-0.5 text-gray-500 text-xs">+{agent.capabilities.length - 3}</span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
