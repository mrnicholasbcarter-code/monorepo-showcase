import Link from 'next/link';
import { ReactNode } from 'react';
import {
  LayoutDashboard,
  FileText,
  Bot,
  CheckSquare,
  BarChart3,
  MessageSquare,
  Layers,
  User,
  Settings,
  Shield,
  Zap
} from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/freelance' },
  { label: 'Proposals', icon: FileText, href: '/freelance/proposals' },
  { label: 'AI Agents', icon: Bot, href: '/freelance/agents' },
  { label: 'Task Queue', icon: CheckSquare, href: '/freelance/tasks' },
  { label: 'Uplink', icon: MessageSquare, href: '/freelance/communications' },
  { label: 'Telemetry', icon: BarChart3, href: '/freelance/analytics' },
  { label: 'Registry', icon: Layers, href: '/freelance/repositories' },
];

export default function FreelanceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 flex flex-col bg-slate-900/50 backdrop-blur-3xl sticky top-0 h-screen overflow-hidden">
        <div className="p-8">
          <Link href="/freelance" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-ocean-500 to-ocean-700 flex items-center justify-center shadow-lg shadow-ocean-500/20 group-hover:scale-105 transition-transform">
              <Zap className="h-6 w-6 text-white fill-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tighterAlpha text-white block">ClawPM</span>
              <span className="text-[10px] font-black text-ocean-400 uppercase tracking-widestAlpha">Synthetic OS</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto custom-scrollbar pb-8">
          <div className="mb-4 px-4 text-[10px] font-black text-slate-600 uppercase tracking-widestAlpha flex items-center justify-between">
            <span>Core Modules</span>
            <Shield className="h-3 w-3" />
          </div>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-400 hover:text-white hover:bg-white/[0.03] transition-all group relative"
            >
              <item.icon className="h-5 w-5 group-hover:text-ocean-400 transition-colors" />
              <span className="text-xs font-black uppercase tracking-widestAlpha">{item.label}</span>
            </Link>
          ))}

          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="mb-4 px-4 text-[10px] font-black text-slate-600 uppercase tracking-widestAlpha">System Configuration</div>
            <Link href="/freelance/settings" className="flex items-center gap-4 px-4 py-3.5 rounded-2xl text-slate-400 hover:text-white hover:bg-white/[0.03] transition-all group">
              <Settings className="h-5 w-5 group-hover:text-ocean-400 transition-colors" />
              <span className="text-xs font-black uppercase tracking-widestAlpha">Access Control</span>
            </Link>
          </div>
        </nav>

        <div className="p-6 bg-white/[0.01] border-t border-white/5">
          <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer group">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-black text-slate-400 group-hover:text-white transition-colors">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-black text-white truncate uppercase tracking-tighterAlpha">Nick Carter</div>
              <div className="text-[9px] font-bold text-ocean-400 uppercase tracking-widestAlpha">Elite Operative</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-ocean-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/10 blur-[120px] rounded-full" />
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          {children}
        </div>
      </main>
    </div>
  );
}
