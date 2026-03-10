import { ReactNode } from 'react';
import { Card } from './Card';
import { cn } from '../utils/cn';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  icon?: ReactNode;
  className?: string;
}

export function StatsCard({ title, value, change, icon, className }: StatsCardProps) {
  return (
    <Card className={cn('relative overflow-hidden group border-white/5 bg-white/[0.01] backdrop-blur-3xl rounded-[2rem] p-8', className)}>
      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1">
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widestAlpha mb-4">{title}</p>
          <p className="text-4xl font-black text-white uppercase tracking-tighterAlpha mb-4 group-hover:text-ocean-400 transition-colors">{value}</p>
          {change && (
            <div className={cn(
              'flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widestAlpha',
              change.trend === 'up' ? 'text-emerald-400' : 'text-rose-400'
            )}>
              {change.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              <span>{Math.abs(change.value)}% DELTA</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-ocean-400 group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
        )}
      </div>

      {/* Decorative background signal */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-ocean-500/5 blur-3xl rounded-full group-hover:bg-ocean-500/10 transition-colors" />
    </Card>
  );
}
