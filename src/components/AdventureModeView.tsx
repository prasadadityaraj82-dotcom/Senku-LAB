import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Lock, Trophy } from 'lucide-react';
import {
  ADVENTURE_LEVELS,
  ADVENTURE_PHASES,
  getAdventureLevel,
  getNextUnlockedAdventureLevel,
  isAdventureLevelUnlocked,
} from '../data/adventure';
import type { AdventureLevel } from '../types/lab';
import { AdventureMiniGame } from './AdventureMiniGame';

interface AdventureModeViewProps {
  completedLevels: number[];
  senkuTrophyEarned: boolean;
  onCompleteLevel: (level: AdventureLevel, isFirstClear: boolean) => void;
  onLockedLevelClick: (levelNum: number) => void;
  onPlaySound: (kind: 'click' | 'craft' | 'eraUnlock' | 'correct' | 'wrong') => void;
}

function SenkuAvatar({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className="shrink-0"
      aria-hidden="true"
    >
      {/* Spiky leek hair */}
      <path
        d="M14 28 L10 10 L23 18 L28 4 L35 17 L44 5 L45 19 L56 12 L50 28 Z"
        fill="#4ADE80"
        stroke="#111827"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M16 25 L22 14 L30 22 L38 12 L46 24 Z"
        fill="#FEF08A"
        opacity="0.6"
      />
      {/* Face */}
      <circle cx="32" cy="36" r="15" fill="#FDE68A" stroke="#111827" strokeWidth="3" />
      {/* Eyes */}
      <circle cx="26.5" cy="35" r="2.2" fill="#111827" />
      <circle cx="37.5" cy="35" r="2.2" fill="#111827" />
      {/* Petrification crack lines */}
      <path d="M23 29 L25 32 M40 29 L38 32" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
      {/* Confident grin */}
      <path
        d="M27 42 Q32 46 38 41"
        fill="none"
        stroke="#111827"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* Collar */}
      <path
        d="M20 50 L32 58 L44 50"
        fill="#FFFFFF"
        stroke="#111827"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AdventureModeView({
  completedLevels,
  senkuTrophyEarned,
  onCompleteLevel,
  onLockedLevelClick,
  onPlaySound,
}: AdventureModeViewProps) {
  const currentUnlockedLevel = useMemo(
    () => getNextUnlockedAdventureLevel(completedLevels),
    [completedLevels]
  );

  const defaultPhaseId = useMemo(() => {
    const lvl = getAdventureLevel(currentUnlockedLevel);
    return lvl?.phaseId ?? 1;
  }, [currentUnlockedLevel]);

  const [selectedPhaseId, setSelectedPhaseId] = useState<number>(defaultPhaseId);
  const [activeLevelNum, setActiveLevelNum] = useState<number | null>(null);
  const [miniGameProgress, setMiniGameProgress] = useState<number>(0);
  const [levelWonNow, setLevelWonNow] = useState<boolean>(false);
  const [cutsceneLevel, setCutsceneLevel] = useState<AdventureLevel | null>(null);

  const activeLevel = activeLevelNum ? getAdventureLevel(activeLevelNum) : undefined;

  const phaseLevels = useMemo(
    () => ADVENTURE_LEVELS.filter((l) => l.phaseId === selectedPhaseId),
    [selectedPhaseId]
  );

  const overallPercent = Math.round((completedLevels.length / ADVENTURE_LEVELS.length) * 100);

  const openLevel = (lvlNum: number) => {
    if (!isAdventureLevelUnlocked(lvlNum, completedLevels)) {
      onLockedLevelClick(lvlNum);
      return;
    }
    const target = getAdventureLevel(lvlNum);
    if (!target) return;
    onPlaySound('click');
    setSelectedPhaseId(target.phaseId);
    setActiveLevelNum(lvlNum);
    setMiniGameProgress(completedLevels.includes(lvlNum) ? 100 : 0);
    setLevelWonNow(false);
    setCutsceneLevel(null);
  };

  // ================= LEVEL GAMEPLAY SCREEN =================
  if (activeLevel) {
    const alreadyCleared = completedLevels.includes(activeLevel.level);
    const canAdvance = levelWonNow || alreadyCleared;
    const nextLvlNum = activeLevel.level < 50 ? activeLevel.level + 1 : null;

    return (
      <div className="max-w-4xl mx-auto space-y-5">
        {/* Top Bar: Back + Level Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onPlaySound('click');
              setActiveLevelNum(null);
              setCutsceneLevel(null);
            }}
            className="comic-btn px-4 py-2 rounded-xl bg-white hover:bg-[#FEF08A] font-display text-sm font-extrabold text-[#111827] inline-flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Adventure Map</span>
          </button>

          <div className="flex items-center gap-2 font-display text-xs sm:text-sm font-extrabold">
            <span className="bg-[#FDE047] border-2 border-[#111827] px-3 py-1 rounded-xl">
              {activeLevel.isBoss ? '👑 BOSS LEVEL' : `LEVEL ${activeLevel.level} / 50`}
            </span>
            <span className="bg-[#DCFCE7] border-2 border-[#111827] px-3 py-1 rounded-xl">
              +{activeLevel.xpReward} XP · +{activeLevel.coinReward} 🪙
            </span>
          </div>
        </div>

        {/* TOP: Story Dialogue Box */}
        <div className="rounded-3xl bg-[#FEF9C3] comic-panel p-4 sm:p-5 flex items-start gap-3.5 sm:gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#4ADE80] border-[3px] border-[#111827] shadow-[3px_3px_0_#111827] flex items-center justify-center shrink-0">
            <SenkuAvatar size={52} />
          </div>
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-[#111827] text-[#FDE047] font-display text-xs font-extrabold px-2 py-0.5 rounded-md">
                DR. SENKU
              </span>
              <h2 className="font-display text-lg sm:text-xl font-extrabold text-[#111827]">
                {activeLevel.emoji} {activeLevel.title} — {activeLevel.hindiSubtitle}
              </h2>
            </div>
            <p className="text-sm sm:text-base font-bold text-[#111827] leading-snug">
              &ldquo;{activeLevel.senkuDialogue}&rdquo;
            </p>
          </div>
        </div>

        {/* MIDDLE: Interactive Mini-game */}
        <AdventureMiniGame
          key={activeLevel.level}
          level={activeLevel}
          alreadyCleared={alreadyCleared}
          onProgressChange={setMiniGameProgress}
          onWin={() => {
            setLevelWonNow(true);
            const firstTime = !completedLevels.includes(activeLevel.level);
            onCompleteLevel(activeLevel, firstTime);
            if (activeLevel.cutsceneTitle) {
              setCutsceneLevel(activeLevel);
            }
          }}
          onFail={() => {}}
          onSound={onPlaySound}
        />

        {/* Boss Cutscene / Moon Trophy Banner */}
        {cutsceneLevel && (
          <div className="rounded-3xl bg-[#38BDF8] comic-panel p-5 sm:p-6 text-center space-y-3">
            <div className="text-5xl">{cutsceneLevel.level === 50 ? '🏆🌕' : '🎉💥'}</div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111827]">
              {cutsceneLevel.cutsceneTitle}
            </h3>
            <p className="text-sm sm:text-base font-bold text-[#111827] max-w-2xl mx-auto">
              {cutsceneLevel.cutsceneText}
            </p>
            <div className="inline-block bg-[#FDE047] border-2 border-[#111827] px-4 py-1.5 rounded-xl font-display font-extrabold text-sm">
              Reward Earned: +{cutsceneLevel.xpReward} XP &amp; +{cutsceneLevel.coinReward} Coins!
            </div>
          </div>
        )}

        {/* BOTTOM: Level Progress Bar + Next Level Button */}
        <div className="rounded-2xl bg-white comic-panel p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:flex-1 space-y-1.5">
            <div className="flex items-center justify-between font-display text-xs font-extrabold text-[#111827]">
              <span>Level Progress</span>
              <span className="tabular-nums text-[#15803D]">{miniGameProgress}%</span>
            </div>
            <div className="h-4 w-full rounded-full bg-slate-200 border-2 border-[#111827] overflow-hidden">
              <div
                className="h-full bg-[#22C55E] transition-all duration-200"
                style={{ width: `${miniGameProgress}%` }}
              />
            </div>
          </div>

          {nextLvlNum ? (
            <button
              type="button"
              disabled={!canAdvance}
              onClick={() => openLevel(nextLvlNum)}
              className={`comic-btn px-6 py-3 rounded-2xl font-display font-extrabold text-sm sm:text-base inline-flex items-center gap-2 whitespace-nowrap shrink-0 ${
                canAdvance
                  ? 'bg-[#4ADE80] hover:bg-[#22C55E] text-[#111827] cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>Next Level (Lv.{nextLvlNum})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setActiveLevelNum(null)}
              className="comic-btn px-6 py-3 rounded-2xl bg-[#FDE047] hover:bg-[#FACC15] text-[#111827] font-display font-extrabold text-sm sm:text-base whitespace-nowrap shrink-0 cursor-pointer"
            >
              🏆 Back to Moon Victory Map
            </button>
          )}
        </div>
      </div>
    );
  }

  // ================= ADVENTURE STORY MAP SCREEN =================
  return (
    <div className="space-y-6">
      {/* Top Hero Story Banner */}
      <div className="rounded-3xl bg-white comic-panel p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-block bg-[#EF4444] text-white border-2 border-[#111827] px-2.5 py-0.5 rounded-lg font-display text-xs font-bold -rotate-1">
              🚀 STORY ADVENTURE · 6 PHASES · 50 LEVELS
            </span>
            {senkuTrophyEarned && (
              <span className="inline-flex items-center gap-1 bg-[#FDE047] text-[#111827] border-2 border-[#111827] px-2.5 py-0.5 rounded-lg font-display text-xs font-extrabold">
                <Trophy className="w-3.5 h-3.5" />
                YOU ARE 10 BILLION PERCENT SENKU!
              </span>
            )}
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111827]">
            DR. SENKU ADVENTURE MODE
          </h1>
          <p className="text-sm font-semibold text-slate-700">
            Stone Age Day 1 se Moon Mission tak play karo! Har level complete karne par +100 XP &amp; +50 Coins (Boss: +500 to +1000 XP)!
          </p>
        </div>

        <button
          type="button"
          onClick={() => openLevel(currentUnlockedLevel)}
          className="comic-btn px-6 py-3.5 rounded-2xl bg-[#4ADE80] hover:bg-[#22C55E] text-[#111827] font-display font-extrabold text-base whitespace-nowrap shrink-0 cursor-pointer"
        >
          {completedLevels.length >= 50
            ? '🌕 Replay Moon Boss (Lv.50)'
            : `▶ Play Level ${currentUnlockedLevel}`}
        </button>
      </div>

      {/* SENKU WALKING FROM START TO MOON PROGRESS MAP */}
      <section className="rounded-3xl senku-map-sunburst comic-panel p-4 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-block bg-[#EF4444] text-white border-[3px] border-[#111827] px-3 py-1 rounded-xl font-display font-extrabold text-xs sm:text-sm shadow-[2px_2px_0_#111827]">
            🚩 START · DAY 1
          </span>
          <span className="bg-white border-2 border-[#111827] px-3 py-1 rounded-xl font-display text-xs sm:text-sm font-extrabold text-[#111827] tabular-nums">
            Journey Progress: {completedLevels.length} / 50 ({overallPercent}%)
          </span>
          <span className="inline-block bg-[#38BDF8] text-[#111827] border-[3px] border-[#111827] px-3 py-1 rounded-xl font-display font-extrabold text-xs sm:text-sm shadow-[2px_2px_0_#111827]">
            🌕 GOAL · MOON MISSION
          </span>
        </div>

        {/* Visual Walking Track across 6 Phases */}
        <div className="relative bg-white/85 border-[3px] border-[#111827] rounded-2xl p-4 sm:p-5 overflow-x-auto">
          <div className="min-w-[640px] relative">
            {/* Curved/Straight Orange Path */}
            <div className="absolute left-8 right-8 top-9 h-3 bg-slate-200 border-2 border-[#111827] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#F97316] transition-all duration-500"
                style={{ width: `${overallPercent}%` }}
              />
            </div>

            <div className="relative grid grid-cols-6 gap-2">
              {ADVENTURE_PHASES.map((phase) => {
                const [startL, endL] = phase.levelRange;
                const totalInPhase = endL - startL + 1;
                const clearedInPhase = completedLevels.filter(
                  (n) => n >= startL && n <= endL
                ).length;
                const senkuHere =
                  currentUnlockedLevel >= startL && currentUnlockedLevel <= endL;
                const isSelected = selectedPhaseId === phase.id;

                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => {
                      onPlaySound('click');
                      setSelectedPhaseId(phase.id);
                    }}
                    className="flex flex-col items-center gap-1.5 cursor-pointer group"
                  >
                    {/* Senku Walking Sprite above current Phase */}
                    <div className="h-11 flex items-end justify-center">
                      {senkuHere ? (
                        <div className="flex flex-col items-center">
                          <span className="bg-[#111827] text-[#FDE047] text-[9px] font-display font-extrabold px-1.5 rounded">
                            SENKU Lv.{currentUnlockedLevel}
                          </span>
                          <SenkuAvatar size={34} />
                        </div>
                      ) : (
                        <span className="text-[11px] font-display font-bold text-slate-600">
                          Lv.{startL}-{endL}
                        </span>
                      )}
                    </div>

                    {/* Phase Node Circle */}
                    <div
                      className={`w-14 h-14 rounded-full border-[3px] border-[#111827] flex items-center justify-center text-2xl transition-transform group-hover:scale-110 ${
                        clearedInPhase === totalInPhase
                          ? 'bg-[#4ADE80] shadow-[3px_3px_0_#111827]'
                          : senkuHere
                          ? 'bg-[#FDE047] comic-node-glow'
                          : isSelected
                          ? `${phase.badgeColor} shadow-[3px_3px_0_#111827]`
                          : 'bg-slate-100'
                      }`}
                    >
                      {phase.emoji}
                    </div>

                    <span
                      className={`font-display text-[11px] font-extrabold text-center leading-tight px-1.5 py-0.5 rounded-lg ${
                        isSelected
                          ? 'bg-[#FDE047] border-2 border-[#111827] text-[#111827]'
                          : 'text-[#111827]'
                      }`}
                    >
                      Phase {phase.id} ({clearedInPhase}/{totalInPhase})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PHASE LEVELS PATHWAY */}
      {(() => {
        const currentPhase = ADVENTURE_PHASES.find((p) => p.id === selectedPhaseId);
        if (!currentPhase) return null;

        return (
          <section className="rounded-3xl bg-white comic-panel p-4 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-slate-200">
              <div>
                <span
                  className={`inline-block ${currentPhase.badgeColor} border-2 border-[#111827] px-2.5 py-0.5 rounded-lg font-display text-xs font-extrabold text-[#111827] mb-1`}
                >
                  {currentPhase.emoji} LEVELS {currentPhase.levelRange[0]}–{currentPhase.levelRange[1]}
                </span>
                <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#111827]">
                  {currentPhase.title}
                </h2>
                <p className="text-xs sm:text-sm font-semibold text-slate-600">
                  {currentPhase.subtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
              {phaseLevels.map((lvl) => {
                const cleared = completedLevels.includes(lvl.level);
                const unlocked = isAdventureLevelUnlocked(lvl.level, completedLevels);
                const isCurrent = lvl.level === currentUnlockedLevel;

                return (
                  <button
                    key={lvl.level}
                    type="button"
                    onClick={() => openLevel(lvl.level)}
                    className={`rounded-2xl border-[3px] border-[#111827] p-4 text-left flex flex-col justify-between gap-3 transition-transform cursor-pointer ${
                      cleared
                        ? 'bg-[#DCFCE7] shadow-[3px_3px_0_#111827] hover:-translate-y-0.5'
                        : isCurrent
                        ? 'bg-[#FEF08A] comic-node-glow hover:-translate-y-0.5'
                        : unlocked
                        ? 'bg-white shadow-[3px_3px_0_#111827] hover:-translate-y-0.5'
                        : 'bg-slate-100 opacity-75'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-11 h-11 rounded-xl bg-white border-2 border-[#111827] flex items-center justify-center text-2xl shrink-0">
                          {unlocked ? lvl.emoji : '🔒'}
                        </span>
                        <div>
                          <div className="font-mono text-[11px] font-extrabold text-slate-600">
                            LEVEL {lvl.level} {lvl.isBoss ? '· 👑 BOSS' : ''}
                          </div>
                          <div className="font-display font-extrabold text-sm text-[#111827] leading-tight">
                            {lvl.title}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs font-display font-bold pt-2 border-t border-slate-300/70">
                      <span className="text-[#15803D]">
                        +{lvl.xpReward} XP · +{lvl.coinReward} 🪙
                      </span>
                      <span>
                        {cleared ? (
                          <span className="text-[#15803D]">✅ Done</span>
                        ) : isCurrent ? (
                          <span className="bg-[#EF4444] text-white px-2 py-0.5 rounded-md border border-[#111827]">
                            PLAY ▶
                          </span>
                        ) : unlocked ? (
                          'Play'
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-500">
                            <Lock className="w-3 h-3" /> Locked
                          </span>
                        )}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        );
      })()}
    </div>
  );
}
