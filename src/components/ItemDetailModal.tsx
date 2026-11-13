import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { getItemEmoji, getStepEmojis } from '../data/emojis';
import { getItemById, getNextItem, isItemUnlocked } from '../data/eras';
import { getItemVisualMeta } from '../data/itemVisuals';
import type { ScienceItem } from '../types/lab';
import { BlueprintDiagram } from './BlueprintDiagram';

interface ItemDetailModalProps {
  item: ScienceItem;
  isCompleted: boolean;
  completedItemIds: string[];
  onClose: () => void;
  onComplete: (item: ScienceItem) => void;
  onOpenItem: (item: ScienceItem) => void;
}

export function ItemDetailModal({
  item,
  isCompleted,
  completedItemIds,
  onClose,
  onComplete,
  onOpenItem,
}: ItemDetailModalProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [materialChoice, setMaterialChoice] = useState<'right' | 'wrong' | null>(null);

  useEffect(() => {
    setActiveStep(0);
    setMaterialChoice(null);
  }, [item.id]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const nextItem = getNextItem(item.id);
  const nextItemUnlocked = nextItem
    ? isItemUnlocked(nextItem, isCompleted ? completedItemIds : [...completedItemIds, item.id])
    : false;
  const itemEmoji = getItemEmoji(item.id);
  const stepEmojis = getStepEmojis(item.id);
  const visualMeta = getItemVisualMeta(item.id);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-item-title"
    >
      <div className="min-h-full px-3 sm:px-6 py-5 sm:py-8 flex justify-center">
        <div className="w-full max-w-4xl rounded-3xl bg-white comic-panel overflow-hidden flex flex-col">
          {/* Top Bar */}
          <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-[#FEF08A] border-b-[3px] border-[#111827]">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-[#111827] font-display font-bold text-xs sm:text-sm text-[#111827] hover:bg-slate-100 cursor-pointer whitespace-nowrap shadow-[2px_2px_0_#111827]"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Map par Wapas</span>
            </button>

            <div className="flex items-center gap-2 font-display font-bold text-xs sm:text-sm tabular-nums">
              <span className="bg-white border-2 border-[#111827] px-2.5 py-1 rounded-lg text-[#111827]">
                Era {item.eraId}
              </span>
              <span className="bg-[#4ADE80] border-2 border-[#111827] px-2.5 py-1 rounded-lg text-[#111827]">
                +{item.xp} XP
              </span>
              <span className="bg-[#FB923C] border-2 border-[#111827] px-2.5 py-1 rounded-lg text-white">
                +{item.coins} 🪙
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close popup"
                className="p-1.5 rounded-lg bg-white border-2 border-[#111827] text-[#111827] hover:bg-rose-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Comic Content */}
          <div className="p-4 sm:p-7 space-y-6 bg-[#FFFDF7]">
            {/* Title Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-[3px] border-dashed border-slate-300">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FDE047] border-[3px] border-[#111827] shadow-[4px_4px_0_#111827] flex items-center justify-center text-4xl shrink-0">
                  {itemEmoji}
                </div>
                <div>
                  <span className="inline-block bg-[#38BDF8] border-2 border-[#111827] px-2 py-0.5 rounded-md font-display text-xs font-bold text-[#111827] mb-1">
                    {item.difficulty} Level · {isCompleted ? '✅ Crafted' : '⚡ Unlocked'}
                  </span>
                  <h2
                    id="detail-item-title"
                    className="font-display text-2xl sm:text-3xl font-extrabold text-[#111827] leading-tight"
                  >
                    <span className="bg-[#FEF08A] px-1.5 rounded">{item.name}</span>
                  </h2>
                  <p className="font-display text-sm sm:text-base font-bold text-[#EA580C] mt-0.5">
                    {item.hindiName}
                  </p>
                </div>
              </div>

              {isCompleted && (
                <div className="self-start sm:self-center bg-[#4ADE80] comic-panel-sm px-4 py-2 rounded-xl font-display font-bold text-sm text-[#111827] rotate-2">
                  ✅ CRAFTED!
                </div>
              )}
            </div>

            {/* Feature #2: Senku Crafting Recipe Bar */}
            <section className="rounded-2xl bg-[#FEF9C3] border-[3px] border-[#111827] shadow-[3px_3px_0_#111827] p-3.5 sm:p-4">
              <div className="font-display text-xs font-bold text-[#EA580C] uppercase tracking-wide mb-2">
                🧪 Crafting Recipe (Kaise Milkar Banta Hai)
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {visualMeta.recipe.map((ing, idx) => {
                  const linkedItem = ing.itemId ? getItemById(ing.itemId) : undefined;
                  const canOpen = linkedItem && isItemUnlocked(linkedItem, completedItemIds);
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      {canOpen && linkedItem ? (
                        <button
                          type="button"
                          onClick={() => onOpenItem(linkedItem)}
                          title={`Open ${linkedItem.name}`}
                          className="inline-flex items-center gap-1.5 bg-white hover:bg-[#4ADE80] border-2 border-[#111827] px-2.5 py-1.5 rounded-xl font-display text-xs sm:text-sm font-bold text-[#111827] cursor-pointer transition-colors shadow-[2px_2px_0_#111827]"
                        >
                          <span>{ing.emoji}</span>
                          <span>{ing.label}</span>
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-white border-2 border-[#111827] px-2.5 py-1.5 rounded-xl font-display text-xs sm:text-sm font-bold text-[#111827]">
                          <span>{ing.emoji}</span>
                          <span>{ing.label}</span>
                        </span>
                      )}
                      <span className="font-display font-extrabold text-base text-[#EA580C]">
                        {idx < visualMeta.recipe.length - 1 ? '+' : '='}
                      </span>
                    </div>
                  );
                })}
                <span className="inline-flex items-center gap-1.5 bg-[#4ADE80] border-2 border-[#111827] px-3 py-1.5 rounded-xl font-display text-xs sm:text-sm font-extrabold text-[#111827] shadow-[2px_2px_0_#111827]">
                  <span>{itemEmoji}</span>
                  <span>{item.name}</span>
                </span>
              </div>
            </section>

            {/* 1. Senku Style Intro */}
            <section className="rounded-2xl bg-white comic-panel-sm p-4 sm:p-5 flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#FEF08A] border-2 border-[#111827] flex items-center justify-center text-3xl shrink-0">
                👨‍🔬
              </div>
              <div className="space-y-1">
                <div className="font-display text-xs font-bold text-[#EA580C] uppercase tracking-wide">
                  Dr. Senku Style Intro
                </div>
                <p className="text-sm sm:text-base font-bold text-[#111827] leading-relaxed">
                  &ldquo;{item.senkuIntro}&rdquo;
                </p>
              </div>
            </section>

            {/* 2. Kya hai ye? */}
            <section className="rounded-2xl bg-white comic-panel-sm p-4 sm:p-5 space-y-1.5">
              <h3 className="font-display text-base font-bold text-[#111827] inline-block bg-[#DCFCE7] px-2.5 py-0.5 rounded-lg border-2 border-[#111827]">
                🤔 Kya hai ye?
              </h3>
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed pt-1">
                {item.kyaHai}
              </p>
            </section>

            {/* 3. Kaise Banta Hai? (Flowchart + Progressive Build Stage + Inside X-Ray) */}
            <section className="space-y-4">
              <h3 className="font-display text-lg font-bold text-[#111827] inline-block bg-[#FEF08A] px-3 py-1 rounded-xl border-2 border-[#111827]">
                🛠️ Kaise Banta Hai? (Tap Any Step!)
              </h3>

              <BlueprintDiagram
                item={item}
                activeStep={activeStep}
                onSelectStep={setActiveStep}
              />

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                {item.steps.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      className={`text-left rounded-xl p-3 border-2 border-[#111827] transition-all cursor-pointer flex flex-col gap-1.5 ${
                        isActive
                          ? 'bg-[#DCFCE7] shadow-[3px_3px_0_#111827] -translate-y-0.5'
                          : 'bg-white hover:bg-[#FEF9C3]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl" aria-hidden="true">{stepEmojis[idx]}</span>
                        <span className="font-display text-xs font-bold bg-[#111827] text-white px-1.5 py-0.5 rounded">
                          #{idx + 1}
                        </span>
                      </div>
                      <div className="font-display text-xs font-bold text-[#111827] leading-snug">
                        {step.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* 4. Orange "Kyu?" Box + Interactive Wrong Material Simulator & 5. Pink Star Fun Fact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
              {/* Orange "Kyu?" Box + Feature #3 Material Simulator */}
              <section className="rounded-2xl bg-[#FFEDD5] comic-panel-sm p-5 space-y-3 relative">
                <div className="inline-block bg-[#F97316] text-white font-display font-bold text-sm px-3 py-1 rounded-xl border-2 border-[#111827] -rotate-1 shadow-[2px_2px_0_#111827]">
                  🧡 Kyu Yehi Material?
                </div>
                <h4 className="font-display text-base font-bold text-[#111827] leading-snug">
                  {item.kyuMaterial.material}
                </h4>
                <p className="text-sm text-slate-800 font-medium leading-relaxed">
                  {item.kyuMaterial.reason}
                </p>

                {/* Feature #3: Interactive "What If Wrong Material?" Simulator */}
                <div className="pt-2 border-t-2 border-dashed border-[#FB923C] space-y-2.5">
                  <div className="font-display text-xs font-bold text-[#9A3412]">
                    🧪 Khud Test Karke Dekho:
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setMaterialChoice('wrong')}
                      className={`px-2.5 py-2 rounded-xl border-2 border-[#111827] font-display text-xs font-bold cursor-pointer transition-colors ${
                        materialChoice === 'wrong'
                          ? 'bg-[#EF4444] text-white shadow-[2px_2px_0_#111827]'
                          : 'bg-white text-[#111827] hover:bg-rose-50'
                      }`}
                    >
                      ❌ {visualMeta.materialTest.wrongLabel}
                    </button>
                    <button
                      type="button"
                      onClick={() => setMaterialChoice('right')}
                      className={`px-2.5 py-2 rounded-xl border-2 border-[#111827] font-display text-xs font-bold cursor-pointer transition-colors ${
                        materialChoice === 'right'
                          ? 'bg-[#22C55E] text-white shadow-[2px_2px_0_#111827]'
                          : 'bg-white text-[#111827] hover:bg-emerald-50'
                      }`}
                    >
                      ✅ {visualMeta.materialTest.rightLabel}
                    </button>
                  </div>

                  {materialChoice && (
                    <div
                      className={`rounded-xl border-2 border-[#111827] p-3 text-xs sm:text-sm font-semibold ${
                        materialChoice === 'right' ? 'bg-[#DCFCE7]' : 'bg-[#FEE2E2]'
                      }`}
                    >
                      <span className="inline-block font-display font-extrabold mr-1.5 bg-white border border-[#111827] px-1.5 py-0.5 rounded">
                        {materialChoice === 'right'
                          ? visualMeta.materialTest.rightSticker
                          : visualMeta.materialTest.wrongSticker}
                      </span>
                      <span className="text-[#111827]">
                        {materialChoice === 'right'
                          ? visualMeta.materialTest.rightOutcome
                          : visualMeta.materialTest.wrongOutcome}
                      </span>
                    </div>
                  )}
                </div>
              </section>

              {/* Pink Starburst "Fun Fact" Box */}
              <section className="rounded-2xl bg-[#FCE7F3] comic-panel-sm p-5 space-y-2 relative overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-1.5 bg-[#EC4899] text-white font-display font-bold text-sm px-3 py-1 rounded-xl border-2 border-[#111827] rotate-1 shadow-[2px_2px_0_#111827]">
                      <span>⭐</span>
                      <span>Fun Fact · 10 Billion %!</span>
                    </div>
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 64 64"
                      className="shrink-0 rotate-12"
                      aria-hidden="true"
                    >
                      <polygon
                        points="32,2 39,20 58,14 46,30 62,40 43,44 48,62 32,50 16,62 21,44 2,40 18,30 6,14 25,20"
                        fill="#F472B6"
                        stroke="#111827"
                        strokeWidth="3"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base text-[#111827] font-semibold leading-relaxed pt-3">
                    {item.funFact}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t-2 border-dashed border-pink-300 text-xs font-display font-bold text-[#9D174D]">
                  👨‍🔬 Dr. Senku says: Science is 100% logic + 0% magic!
                </div>
              </section>
            </div>

            {/* 6. Ghar pe Try Karo */}
            <section className="rounded-2xl bg-[#E0F2FE] comic-panel-sm p-5 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-block bg-[#38BDF8] text-[#111827] font-display font-bold text-sm px-3 py-1 rounded-xl border-2 border-[#111827]">
                  🏠 Ghar pe Try Karo (Safe Experiment)
                </span>
                <span className="text-xs font-display font-bold text-slate-700">
                  Home Mini Lab
                </span>
              </div>

              <h4 className="font-display text-lg font-bold text-[#111827]">
                {item.gharPeTry.title}
              </h4>

              <div className="text-sm text-slate-800 space-y-1.5 font-medium leading-relaxed">
                <p>
                  <strong className="text-[#111827]">Materials:</strong> {item.gharPeTry.materials}
                </p>
                <p>
                  <strong className="text-[#111827]">Kaise Karein:</strong> {item.gharPeTry.instructions}
                </p>
              </div>

              <div className="rounded-xl bg-white border-2 border-[#111827] px-3.5 py-2 text-xs font-semibold text-[#111827]">
                ⚠️ <strong>Safety:</strong> {item.gharPeTry.safety}
              </div>
            </section>

            {/* 7. Big Colorful Complete & Starburst Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {!isCompleted ? (
                <button
                  type="button"
                  onClick={() => onComplete(item)}
                  className="comic-btn px-7 py-4 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-display font-extrabold text-base sm:text-lg cursor-pointer flex items-center justify-center gap-2.5 whitespace-nowrap"
                >
                  <span>💥 Complete & Claim +{item.xp} XP · +{item.coins} Coins!</span>
                </button>
              ) : (
                <div className="font-display font-bold text-sm sm:text-base text-[#15803D] bg-[#DCFCE7] border-2 border-[#111827] px-4 py-2.5 rounded-xl">
                  ✅ Completed! Rewards claimed.
                </div>
              )}

              {nextItem && (isCompleted || nextItemUnlocked) && (
                <button
                  type="button"
                  onClick={() => onOpenItem(nextItem)}
                  className="comic-btn px-5 py-3.5 rounded-2xl bg-[#FDE047] hover:bg-[#FACC15] text-[#111827] font-display font-extrabold text-sm sm:text-base cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Next: {getItemEmoji(nextItem.id)} {nextItem.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
