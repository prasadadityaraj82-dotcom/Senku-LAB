import { Volume2, VolumeX } from 'lucide-react';

export type ActiveTab =
  | 'roadmap'
  | 'adventure'
  | 'create'
  | 'periodic'
  | 'chemical'
  | 'recipes'
  | 'daily'
  | 'quiz';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  coins: number;
  xp: number;
  level: number;
  xpInLevel: number;
  xpForNextLevel: number;
  streak: number;
  completedCount: number;
  totalItemsCount: number;
  unlockedErasCount: number;
  totalErasCount: number;
  muted: boolean;
  onToggleMute: () => void;
}

const NAV_TABS: ReadonlyArray<{ id: ActiveTab; label: string; mobileLabel: string; emoji: string }> = [
  { id: 'roadmap', label: 'Map', mobileLabel: 'Map', emoji: '🗺️' },
  { id: 'adventure', label: 'Adventure', mobileLabel: 'Story', emoji: '🚀' },
  { id: 'create', label: 'Create', mobileLabel: 'Create', emoji: '🔨' },
  { id: 'periodic', label: 'Periodic', mobileLabel: 'Elements', emoji: '⚛️' },
  { id: 'chemical', label: 'Chem Lab', mobileLabel: 'Chem', emoji: '⚗️' },
  { id: 'recipes', label: 'Recipe Book', mobileLabel: 'Recipes', emoji: '📖' },
  { id: 'daily', label: 'Daily', mobileLabel: 'Daily', emoji: '🔬' },
  { id: 'quiz', label: 'Quiz', mobileLabel: 'Quiz', emoji: '⚡' },
];

export function Header({
  activeTab,
  onSelectTab,
  coins,
  level,
  xpInLevel,
  xpForNextLevel,
  streak,
  completedCount,
  totalItemsCount,
  unlockedErasCount,
  totalErasCount,
  muted,
  onToggleMute,
}: HeaderProps) {
  const xpPercent = Math.min(100, Math.round((xpInLevel / xpForNextLevel) * 100));
  const eraPercent = Math.min(100, Math.round((completedCount / totalItemsCount) * 100));

  return (
    <header className="sticky top-0 z-30 bg-white border-b-[3px] border-[#111827] shadow-[0_3px_0_rgba(17,24,39,0.12)]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        {/* Top Row */}
        <div className="flex items-center justify-between gap-2 sm:gap-3 h-14">
          {/* Logo */}
          <button
            type="button"
            onClick={() => onSelectTab('roadmap')}
            className="flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="w-9 h-9 rounded-xl bg-[#FDE047] border-[3px] border-[#111827] shadow-[2px_2px_0_#111827] flex items-center justify-center text-lg">
              🧪
            </span>
            <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#111827]">
              SENKU <span className="bg-[#4ADE80] px-1.5 py-0.5 rounded-lg border-2 border-[#111827]">LAB</span>
            </span>
          </button>

          {/* Desktop Navigation Tabs (Duolingo style) */}
          <nav
            className="hidden lg:flex items-center gap-1 overflow-x-auto"
            aria-label="Primary navigation"
          >
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectTab(tab.id)}
                  className={`px-2 py-1 rounded-xl font-display text-xs xl:text-[13px] font-bold border-2 transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 ${
                    isActive
                      ? 'bg-[#FDE047] border-[#111827] text-[#111827] shadow-[2px_2px_0_#111827]'
                      : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-100 hover:text-[#111827]'
                  }`}
                >
                  <span aria-hidden="true">{tab.emoji}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Player Stats HUD */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 font-display text-xs sm:text-sm font-bold tabular-nums">
            <div
              className="flex items-center gap-1 bg-[#FEF9C3] border-2 border-[#111827] rounded-xl px-2 sm:px-2.5 py-1"
              title="Science Coins"
            >
              <span aria-hidden="true">🪙</span>
              <span className="text-[#111827]">{coins}</span>
            </div>

            <div
              className="flex items-center gap-1 bg-[#DCFCE7] border-2 border-[#111827] rounded-xl px-2 sm:px-2.5 py-1"
              title="Scientist Level"
            >
              <span aria-hidden="true">🏆</span>
              <span className="text-[#111827]">Lv.{level}</span>
            </div>

            <div
              className="hidden sm:flex items-center gap-1 bg-[#FFEDD5] border-2 border-[#111827] rounded-xl px-2.5 py-1"
              title="Daily Streak"
            >
              <span aria-hidden="true">🔥</span>
              <span className="text-[#111827]">{streak}d</span>
            </div>

            <button
              type="button"
              onClick={onToggleMute}
              aria-label={muted ? 'Unmute sound' : 'Mute sound'}
              className="p-2 rounded-xl border-2 border-[#111827] bg-slate-100 hover:bg-[#FDE047] text-[#111827] transition-colors cursor-pointer"
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* XP Bar + Era Progress Bar */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 py-2 border-t-2 border-slate-200 text-xs font-display font-bold tabular-nums">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-[#111827]">
              <span>XP Level {level}</span>
              <span className="text-[#15803D]">
                {xpInLevel} / {xpForNextLevel} XP
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-200 border-2 border-[#111827] overflow-hidden">
              <div
                className="h-full bg-[#22C55E] transition-all duration-300"
                style={{ width: `${xpPercent}%` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-[#111827]">
              <span>
                Era {unlockedErasCount}/{totalErasCount}
              </span>
              <span className="text-[#C2410C]">
                {completedCount}/{totalItemsCount} ({eraPercent}%)
              </span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-slate-200 border-2 border-[#111827] overflow-hidden">
              <div
                className="h-full bg-[#F97316] transition-all duration-300"
                style={{ width: `${eraPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Scrollable Nav Strip */}
        <nav
          className="flex lg:hidden items-center gap-1.5 overflow-x-auto border-t-2 border-slate-200 py-1.5 text-xs font-display font-bold"
          aria-label="Mobile navigation"
        >
          {NAV_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`px-2.5 py-1 rounded-lg border-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? 'bg-[#FDE047] border-[#111827] text-[#111827] shadow-[1px_1px_0_#111827]'
                    : 'bg-transparent border-transparent text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span aria-hidden="true">{tab.emoji}</span>
                <span>{tab.mobileLabel}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
