import { useState } from 'react';
import {
  CHEMICAL_BOTTLES,
  evaluateChemicalMix,
  type ChemicalBottle,
} from '../data/createAndChem';
import type { DiscoveredReaction } from '../types/lab';

interface ChemicalLabViewProps {
  discoveredReactions: DiscoveredReaction[];
  onReactionSuccess: (reaction: DiscoveredReaction, isNew: boolean) => void;
  onReactionFail: () => void;
}

export function ChemicalLabView({
  discoveredReactions,
  onReactionSuccess,
  onReactionFail,
}: ChemicalLabViewProps) {
  const [bottle1, setBottle1] = useState<ChemicalBottle | null>(null);
  const [bottle2, setBottle2] = useState<ChemicalBottle | null>(null);
  const [shakeActive, setShakeActive] = useState(false);
  const [mixState, setMixState] = useState<{
    status: 'success' | 'fail';
    title: string;
    equation: string;
    callout: string;
    explanation: string;
    emoji: string;
    liquidColor: string;
    isNew?: boolean;
  } | null>(null);

  const handlePickBottle = (bottle: ChemicalBottle) => {
    setMixState(null);
    if (!bottle1) {
      setBottle1(bottle);
    } else if (!bottle2) {
      setBottle2(bottle);
    } else {
      setBottle1(bottle2);
      setBottle2(bottle);
    }
  };

  const handleMix = () => {
    if (!bottle1 || !bottle2) return;
    const result = evaluateChemicalMix(bottle1.id, bottle2.id);

    if (!result) {
      onReactionFail();
      setShakeActive(false);
      window.requestAnimationFrame(() => setShakeActive(true));
      setMixState({
        status: 'fail',
        title: 'BOOM! Dhuwa nikal gaya!',
        equation: `${bottle1.formula} + ${bottle2.formula} = ❌ Galat Mix!`,
        callout: 'GALAT MIX!',
        explanation: 'Senku bolta hai — pehle Periodic Table dekh ke aa!',
        emoji: '💨',
        liquidColor: '#64748B',
      });
      return;
    }

    const alreadyFound = discoveredReactions.some((r) => r.id === result.id);
    const saved: DiscoveredReaction = {
      id: result.id,
      title: result.title,
      equation: result.equation,
      resultEmoji: result.resultEmoji,
      callout: result.callout,
      chemicals: [bottle1.name, bottle2.name],
      discoveredAt: new Date().toISOString().slice(0, 10),
    };

    onReactionSuccess(saved, !alreadyFound);
    setMixState({
      status: 'success',
      title: result.title,
      equation: result.equation,
      callout: result.callout,
      explanation: result.explanation,
      emoji: result.resultEmoji,
      liquidColor: result.liquidColor,
      isNew: !alreadyFound,
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner + Safety Note Box */}
      <div className="rounded-2xl bg-[#E0F2FE] comic-panel p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="inline-block bg-[#EC4899] text-white border-2 border-[#111827] px-2.5 py-0.5 rounded-lg font-display text-xs font-bold mb-1">
              ⚗️ CHEMICAL REACTION SIMULATOR
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111827]">
              SENKU CHEMICAL LAB
            </h1>
            <p className="text-sm text-slate-800 font-semibold">
              2 Chemical Bottles select karo aur MIX! dabao — sahi reaction par +100 XP &amp; +50 Coins!
            </p>
          </div>

          <div className="bg-white border-2 border-[#111827] rounded-xl px-4 py-2 font-display text-sm font-bold text-[#111827] shadow-[2px_2px_0_#111827] shrink-0">
            🧪 Reactions: {discoveredReactions.length}
          </div>
        </div>

        {/* Mandatory Safety Note Box */}
        <div className="rounded-xl bg-[#FEF08A] border-[3px] border-[#111827] px-4 py-3 font-display font-extrabold text-xs sm:text-sm text-[#111827] flex items-center gap-2.5 shadow-[3px_3px_0_#111827]">
          <span className="text-xl shrink-0">⚠️</span>
          <span>
            Safety First! Ghar pe real chemical mat milao, sirf app me khelo!
          </span>
        </div>
      </div>

      {/* MIXING TABLE + REACTION ANIMATION */}
      <section
        className={`rounded-3xl bg-white comic-panel p-5 sm:p-7 space-y-5 ${
          shakeActive ? 'animate-comic-shake' : ''
        }`}
        onAnimationEnd={() => setShakeActive(false)}
      >
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-lg sm:text-xl font-extrabold text-[#111827] bg-[#DCFCE7] border-2 border-[#111827] px-3 py-1 rounded-xl">
            ⚗️ MIXING BENCH
          </h2>
          {(bottle1 || bottle2) && (
            <button
              type="button"
              onClick={() => {
                setBottle1(null);
                setBottle2(null);
                setMixState(null);
              }}
              className="text-xs font-display font-bold text-slate-600 hover:text-[#111827] underline cursor-pointer"
            >
              Empty Flasks
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Chemical Slot 1 */}
          <button
            type="button"
            onClick={() => setBottle1(null)}
            className={`w-36 h-36 rounded-2xl border-[3px] border-[#111827] flex flex-col items-center justify-center gap-1 p-3 cursor-pointer transition-all ${
              bottle1
                ? `${bottle1.colorClass} shadow-[4px_4px_0_#111827]`
                : 'bg-slate-100 border-dashed text-slate-500 hover:bg-[#FEF9C3]'
            }`}
          >
            {bottle1 ? (
              <>
                <span className="text-4xl">{bottle1.emoji}</span>
                <span className="font-display font-extrabold text-sm text-[#111827]">
                  {bottle1.name}
                </span>
                <span className="font-mono text-[10px] font-bold text-[#111827]">
                  {bottle1.formula}
                </span>
              </>
            ) : (
              <>
                <span className="font-display font-bold text-base">Bottle 1</span>
                <span className="text-xs font-semibold">Pick below</span>
              </>
            )}
          </button>

          <span className="font-display text-4xl font-extrabold text-[#EC4899] select-none">+</span>

          {/* Chemical Slot 2 */}
          <button
            type="button"
            onClick={() => setBottle2(null)}
            className={`w-36 h-36 rounded-2xl border-[3px] border-[#111827] flex flex-col items-center justify-center gap-1 p-3 cursor-pointer transition-all ${
              bottle2
                ? `${bottle2.colorClass} shadow-[4px_4px_0_#111827]`
                : 'bg-slate-100 border-dashed text-slate-500 hover:bg-[#FEF9C3]'
            }`}
          >
            {bottle2 ? (
              <>
                <span className="text-4xl">{bottle2.emoji}</span>
                <span className="font-display font-extrabold text-sm text-[#111827]">
                  {bottle2.name}
                </span>
                <span className="font-mono text-[10px] font-bold text-[#111827]">
                  {bottle2.formula}
                </span>
              </>
            ) : (
              <>
                <span className="font-display font-bold text-base">Bottle 2</span>
                <span className="text-xs font-semibold">Pick below</span>
              </>
            )}
          </button>

          <span className="font-display text-3xl font-extrabold text-[#111827] select-none hidden sm:inline">
            →
          </span>

          <button
            type="button"
            disabled={!bottle1 || !bottle2}
            onClick={handleMix}
            className={`comic-btn px-8 py-5 rounded-2xl font-display font-extrabold text-xl whitespace-nowrap ${
              bottle1 && bottle2
                ? 'bg-[#F97316] hover:bg-[#EA580C] text-white cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            🧪 MIX!
          </button>
        </div>

        {/* Animated Reaction Flask Result */}
        {mixState && (
          <div
            className={`rounded-2xl border-[3px] border-[#111827] p-5 shadow-[4px_4px_0_#111827] flex flex-col sm:flex-row items-center gap-5 ${
              mixState.status === 'success' ? 'bg-[#DCFCE7]' : 'bg-[#FEE2E2]'
            }`}
          >
            {/* Animated Bubbling Color-Changing Flask SVG */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center bg-white rounded-2xl border-2 border-[#111827]">
              <svg viewBox="0 0 100 100" className="w-24 h-24 overflow-visible">
                {mixState.status === 'success' && (
                  <>
                    <circle cx="42" cy="36" r="4.5" fill={mixState.liquidColor} stroke="#111827" strokeWidth="1.5" className="animate-bubble-1" />
                    <circle cx="56" cy="30" r="5.5" fill="#FDE047" stroke="#111827" strokeWidth="1.5" className="animate-bubble-2" />
                    <circle cx="48" cy="24" r="3.5" fill="#FFFFFF" stroke="#111827" strokeWidth="1.5" className="animate-bubble-3" />
                  </>
                )}
                <path
                  d="M40 16 L60 16 L60 36 L80 78 C82 84 78 88 72 88 L28 88 C22 88 18 84 20 78 L40 36 Z"
                  fill="#F8FAFC"
                  stroke="#111827"
                  strokeWidth="3.5"
                />
                <path
                  d="M27 64 L73 64 L78 78 C80 82 77 85 72 85 L28 85 C23 85 20 82 22 78 Z"
                  fill={mixState.liquidColor}
                  stroke="#111827"
                  strokeWidth="2"
                />
              </svg>
            </div>

            <div className="space-y-1.5 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="inline-block bg-[#EF4444] text-white font-display font-extrabold text-xs px-2.5 py-0.5 rounded-lg border-2 border-[#111827] -rotate-2">
                  BOOM!
                </span>
                <span className="inline-block bg-[#FDE047] text-[#111827] font-display font-extrabold text-xs px-2.5 py-0.5 rounded-lg border-2 border-[#111827]">
                  {mixState.callout}
                </span>
                {mixState.isNew && (
                  <span className="inline-block bg-[#22C55E] text-white font-display font-extrabold text-xs px-2.5 py-0.5 rounded-lg border-2 border-[#111827]">
                    +100 XP · +50 🪙
                  </span>
                )}
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#111827]">
                {mixState.emoji} {mixState.title}
              </h3>
              <div className="font-mono text-xs sm:text-sm font-bold text-[#0F172A] bg-white inline-block px-2.5 py-1 rounded-lg border border-[#111827]">
                {mixState.equation}
              </div>
              <p className="text-sm font-semibold text-slate-800">{mixState.explanation}</p>
            </div>
          </div>
        )}
      </section>

      {/* CHEMICAL BOTTLES SHELF */}
      <section className="rounded-3xl bg-white comic-panel p-5 sm:p-6 space-y-4">
        <h2 className="font-display text-lg font-extrabold text-[#111827]">
          🧴 CHEMICAL BOTTLES SHELF
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {CHEMICAL_BOTTLES.map((bottle) => (
            <button
              key={bottle.id}
              type="button"
              onClick={() => handlePickBottle(bottle)}
              className={`${bottle.colorClass} border-[3px] border-[#111827] shadow-[3px_3px_0_#111827] rounded-2xl p-3 flex flex-col items-center gap-1 hover:-translate-y-1 transition-transform cursor-pointer`}
            >
              <span className="text-3xl">{bottle.emoji}</span>
              <span className="font-display font-extrabold text-xs text-[#111827] leading-tight text-center">
                {bottle.name}
              </span>
              <span className="font-mono text-[10px] font-bold text-[#111827]/80">
                {bottle.formula}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* MY REACTIONS LIST */}
      <section className="rounded-3xl bg-white comic-panel p-5 sm:p-6 space-y-4">
        <h2 className="font-display text-lg font-extrabold text-[#111827]">
          📜 MY REACTIONS ({discoveredReactions.length})
        </h2>

        {discoveredReactions.length === 0 ? (
          <div className="rounded-2xl bg-[#FFFDF2] border-2 border-dashed border-slate-300 p-6 text-center text-sm font-semibold text-slate-600">
            Abhi tak koi chemical mix nahi kiya — try Acid + Base ya Hydrogen + Oxygen!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {discoveredReactions.map((rxn) => (
              <div
                key={rxn.id}
                className="rounded-2xl bg-[#DCFCE7] border-[3px] border-[#111827] shadow-[3px_3px_0_#111827] p-4 flex items-center gap-3.5"
              >
                <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#111827] flex items-center justify-center text-2xl shrink-0">
                  {rxn.resultEmoji}
                </div>
                <div className="min-w-0">
                  <div className="font-display font-extrabold text-sm text-[#111827] truncate">
                    {rxn.title}
                  </div>
                  <div className="font-mono text-xs font-bold text-slate-700 truncate">
                    {rxn.equation}
                  </div>
                  <div className="text-[11px] font-bold text-[#15803D]">
                    {rxn.callout}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
