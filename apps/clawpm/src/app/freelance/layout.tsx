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
  Zap,
  Cpu,
  Activity,
  Globe,
  CreditCard
} from 'lucide-react';
import { cn } from '@monorepo/ui';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/freelance' },
  { label: 'Proposals', icon: FileText, href: '/freelance/proposals' },
  { label: 'AI Agents', icon: Bot, href: '/freelance/agents' },
  { label: 'Task Queue', icon: CheckSquare, href: '/freelance/tasks' },
  { label: 'Uplink', icon: MessageSquare, href: '/freelance/communications' },
  { label: 'Financials', icon: CreditCard, href: '/freelance/financials' },
  { label: 'Telemetry', icon: BarChart3, href: '/freelance/analytics' },
  { label: 'Registry', icon: Layers, href: '/freelance/repositories' },
  { label: 'Kernel', icon: Settings, href: '/freelance/settings' },
];

export default function FreelanceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200 selection:bg-ocean-500/30 selection:text-ocean-200">
      {/* Sidebar */}
      <aside className="w-80 border-r border-white/5 flex flex-col bg-slate-900/40 backdrop-blur-3xl sticky top-0 h-screen overflow-hidden z-50">
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="p-10 relative z-10">
          <Link href="/freelance" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute inset-0 bg-ocean-500/20 blur-xl rounded-full group-hover:bg-ocean-500/40 transition-colors" />
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-ocean-500 to-ocean-800 flex items-center justify-center shadow-2xl shadow-ocean-500/20 group-hover:scale-105 transition-transform relative z-10">
                <Zap className="h-7 w-7 text-white fill-white" />
              </div>
            </div>
            <div>
              <span className="text-3xl font-black tracking-tighterAlpha text-white block">ClawPM</span>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] font-black text-ocean-400 uppercase tracking-widestAlpha">Synthetic OS v4.2</span>
              </div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-6 space-y-1.5 mt-4 overflow-y-auto custom-scrollbar pb-8 relative z-10">
          <div className="mb-6 px-4 text-[10px] font-black text-slate-600 uppercase tracking-widestAlpha flex items-center justify-between">
            <span>Neural Core Modules</span>
            <Shield className="h-3 w-3 opacity-30" />
          </div>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 px-5 py-4 rounded-[1.25rem] text-slate-400 hover:text-white hover:bg-white/[0.03] transition-all group relative overflow-hidden"
            >
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-ocean-500 group-hover:h-6 transition-all duration-300 rounded-r-full shadow-glow" />
              <item.icon className="h-5 w-5 group-hover:text-ocean-400 transition-colors group-hover:scale-110 duration-300" />
              <span className="text-xs font-black uppercase tracking-widestAlpha">{item.label}</span>
            </Link>
          ))}

          <div className="mt-12 pt-10 border-t border-white/5">
            <div className="mb-6 px-4 text-[10px] font-black text-slate-600 uppercase tracking-widestAlpha">Protocol Settings</div>
            <Link href="/freelance/settings" className="flex items-center gap-4 px-5 py-4 rounded-[1.25rem] text-slate-400 hover:text-white hover:bg-white/[0.02] transition-all group">
              <Settings className="h-5 w-5 group-hover:text-ocean-400 transition-colors" />
              <span className="text-xs font-black uppercase tracking-widestAlpha">Kernel Access</span>
            </Link>
          </div>

          {/* System Summary Widget */}
          <div className="mt-12 p-5 rounded-3xl bg-black/40 border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widestAlpha">Fleet Status</span>
              <Activity className="h-2.5 w-2.5 text-emerald-500" />
            </div>
            <div className="space-y-3">
              {[
                { label: 'CPU', val: '24%', color: 'bg-ocean-500' },
                { label: 'MEM', val: '1.2GB', color: 'bg-violet-500' },
              ].map(s => (
                <div key={s.label} className="grid grid-cols-4 items-center gap-2">
                  <span className="text-[8px] font-black text-slate-600">{s.label}</span>
                  <div className="col-span-2 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all duration-1000", s.color)} style={{ width: s.val }} />
                  </div>
                  <span className="text-[8px] font-black text-slate-400 text-right">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-8 pb-10 bg-slate-900/40 border-t border-white/5 relative z-10">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-pointer group shadow-inner">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center transition-colors overflow-hidden group-hover:bg-slate-700">
                <User className="h-6 w-6 text-slate-500 group-hover:text-white transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-tr from-ocean-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-slate-950 flex items-center justify-center">
                <Globe className="h-2 w-2 text-ocean-400" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-black text-white truncate uppercase tracking-tighterAlpha">Nick Carter</div>
              <div className="text-[9px] font-black text-ocean-400 uppercase tracking-[0.2em]">Alpha Operative</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col relative bg-slate-950">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 z-0">
          <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-ocean-600/10 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-violet-600/10 blur-[150px] rounded-full animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
          {children}
        </div>
      </main>
    </div>
  );
}
