import { motion } from 'framer-motion';
import type { Proposal } from '@monorepo/types';
import { cn } from '../utils/cn';

interface ProposalCardProps {
  proposal: Proposal;
  onClick?: () => void;
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-700',
  submitted: 'bg-blue-100 text-blue-700',
  pending: 'bg-yellow-100 text-yellow-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  withdrawn: 'bg-gray-100 text-gray-500',
};

const platformColors = {
  upwork: 'text-green-600',
  freelancer: 'text-blue-600',
  guru: 'text-purple-600',
  fiverr: 'text-green-500',
  linkedin: 'text-blue-700',
  other: 'text-gray-600',
};

export function ProposalCard({ proposal, onClick }: ProposalCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm cursor-pointer"
      whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{proposal.title}</h3>
          <p className={cn('text-sm font-medium', platformColors[proposal.platform])}>
            {proposal.platform.charAt(0).toUpperCase() + proposal.platform.slice(1)}
          </p>
        </div>
        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', statusColors[proposal.status])}>
          {proposal.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{proposal.description}</p>

      <div className="flex items-center justify-between text-sm">
        <div className="text-gray-700 font-medium">
          ${proposal.budget.min.toLocaleString()} - ${proposal.budget.max.toLocaleString()}
        </div>
        {proposal.mlScore && (
          <div className="flex items-center gap-1">
            <span className="text-xs text-gray-500">ML Score:</span>
            <span className={cn(
              'font-semibold',
              proposal.mlScore >= 0.7 ? 'text-green-600' : proposal.mlScore >= 0.4 ? 'text-yellow-600' : 'text-red-600'
            )}>
              {(proposal.mlScore * 100).toFixed(0)}%
            </span>
          </div>
        )}
      </div>

      {proposal.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {proposal.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
              {tag}
            </span>
          ))}
          {proposal.tags.length > 3 && (
            <span className="px-2 py-0.5 text-gray-500 text-xs">+{proposal.tags.length - 3}</span>
          )}
        </div>
      )}
    </motion.div>
  );
}
