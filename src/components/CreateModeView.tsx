import { useEffect, useMemo, useState } from 'react';
import { getItemEmoji } from '../data/emojis';
import { ALL_ITEMS, isEraUnlocked, isItemUnlocked } from '../data/eras';
import { evaluateCraftAttempt } from '../data/createAndChem';
import { getElementBySymbol } from '../data/periodicTable';
import type { CreatedInvention } from '../types/lab';

export interface InventoryToken {
  id: string;
  name: string;
  emoji: string;
  kind: 'item' | 'element';
}

export interface PreselectedRecipePair {
  slot1: InventoryToken;
  slot2: InventoryToken;
}

interface CreateModeViewProps {
  completedItemIds: string[];
  craftedElementSymbols: string[];
  preselectedElementSymbol: string | null;
  onClearPreselectedElement: () => void;
  preselectedRecipePair: PreselectedRecipePair | null;
  onClearPreselectedRecipe: () => void;
  inventions: CreatedInvention[];
  onCraftSuccess: (invention: CreatedInvention, isNew: boolean) => void;
  onCraftFail: () => void;
  onGoToMap: () => void;
}

export function CreateModeView({
  completedItemIds,
  craftedElementSymbols,
  preselectedElementSymbol,
  onClearPreselectedElement,
  preselectedRecipePair,
  onClearPreselectedRecipe,
  inventions,
  onCraftSuccess,
  onCraftFail,
  onGoToMap,
}: CreateModeViewProps) {
  const [slot1, setSlot1] = useState<InventoryToken | null>(null);
  const [slot2, setSlot2] = useState<InventoryToken | null>(null);
  const [shakeActive, setShakeActive] = useState(false);
  const [feedback, setFeedback] = useState<{
    kind: 'success' | 'discovery' | 'fail' | 'repeat';
    title: string;
    subtitle: string;
    emoji: string;
  } | null>(null);

  const inventoryTokens = useMemo<InventoryToken[]>(() => {
    const mapTokens: InventoryToken[] = ALL_ITEMS.filter(
      (item) => isEraUnlocked(item.eraId, completedItemIds) && isItemUnlocked(item, completedItemIds)
    ).map((item) => ({
      id: item.id,
      name: item.name,
      emoji: getItemEmoji(item.id),
      kind: 'item',
    }));

    const elementTokens: InventoryToken[] = craftedElementSymbols
      .map((sym) => getElementBySymbol(sym))
      .filter((el): el is NonNullable<typeof el> => Boolean(el))
      .map((el) => ({
        id: `el-${el.symbol}`,
        name: `${el.name} (${el.symbol})`,
        emoji: '⚛️',
        kind: 'element',
      }));

    return [...mapTokens, ...elementTokens];
  }, [completedItemIds, craftedElementSymbols]);

  useEffect(() => {
    if (!preselectedElementSymbol) return;
    const el = getElementBySymbol(preselectedElementSymbol);
    if (el) {
      const token: InventoryToken = {
        id: `el-${el.symbol}`,
        name: `${el.name} (${el.symbol})`,
        emoji: '⚛️',
        kind: 'element',
      };
      setSlot1(token);
      setFeedback(null);
    }
    onClearPreselectedElement();
  }, [preselectedElementSymbol, onClearPreselectedElement]);

  useEffect(() => {
    if (!preselectedRecipePair) return;
    setSlot1(preselectedRecipePair.slot1);
    setSlot2(preselectedRecipePair.slot2);
    setFeedback(null);
    onClearPreselectedRecipe();
  }, [preselectedRecipePair, onClearPreselectedRecipe]);

  const handleSelectToken = (token: InventoryToken) => {
    setFeedback(null);
    if (!slot1) {
      setSlot1(token);
    } else if (!slot2) {
      setSlot2(token);
    } else {
      setSlot1(slot2);
      setSlot2(token);
    }
  };

  const handleCraft = () => {
    if (!slot1 || !slot2) return;
    const outcome = evaluateCraftAttempt(slot1, slot2);

    if (outcome.status === 'fail') {
      onCraftFail();
      setShakeActive(false);
      window.requestAnimationFrame(() => setShakeActive(true));
      setFeedback({
        kind: 'fail',
        emoji: '💥',
        title: 'BOOM! Fail ho gaya!',
        subtitle: '10 Billion Percent galat combo! Phir se try kar!',
      });
      return;
    }

    const alreadyCreated = inventions.some((inv) => inv.id === outcome.result.id);
    const created: CreatedInvention = {
      id: outcome.result.id,
      name: outcome.result.name,
      emoji: outcome.result.emoji,
      ingredients: [slot1.name, slot2.name],
      isCustomDiscovery: outcome.status === 'discovery',
      createdAt: new Date().toISOString().slice(0, 10),
    };

    onCraftSuccess(created, !alreadyCreated);

    if (alreadyCreated) {
      setFeedback({
        kind: 'repeat',
        emoji: outcome.result.emoji,
        title: `Already Crafted: ${outcome.result.name}!`,
        subtitle: 'Naya combo try karo +100 XP aur +50 Coins jeetne ke liye!',
      });
    } else if (outcome.status === 'discovery') {
      setFeedback({
        kind: 'discovery',
        emoji: outcome.result.emoji,
        title: `NEW INVENTION! You invented ${outcome.result.name}!`,
        subtitle: '+100 XP · +50 Coins earned & saved to My Inventions!',
      });
    } else {
      setFeedback({
        kind: 'success',
        emoji: outcome.result.emoji,
        title: `10 BILLION % CRAFTED: ${outcome.result.name}!`,
        subtitle: `${outcome.result.description} (+100 XP · +50 Coins!)`,
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Heading */}
      <div className="rounded-2xl bg-[#FEF08A] comic-panel p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="inline-block bg-[#EF4444] text-white border-2 border-[#111827] px-2.5 py-0.5 rounded-lg font-display text-xs font-bold -rotate-1">
            🔨 CREATE MODE · SENKU WORKSHOP
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111827]">
            MY INVENTION LAB
          </h1>
          <p className="text-sm text-slate-800 font-semibold">
            Inventory se koi bhi 2 cheezein chuno aur CRAFT dabao! Nayi invention par +100 XP &amp; +50 Coins!
          </p>
        </div>

        <div className="bg-white border-2 border-[#111827] rounded-xl px-4 py-2 font-display text-sm font-bold text-[#111827] shadow-[2px_2px_0_#111827] shrink-0">
          🏆 Inventions: {inventions.length}
        </div>
      </div>

      {/* CRAFTING TABLE */}
      <section
        className={`rounded-3xl bg-white comic-panel p-5 sm:p-7 space-y-5 ${
          shakeActive ? 'animate-comic-shake' : ''
        }`}
        onAnimationEnd={() => setShakeActive(false)}
      >
        <div className="flex items-center justify-between gap-2">
          <h2 className="font-display text-lg sm:text-xl font-extrabold text-[#111827] bg-[#FFEDD5] border-2 border-[#111827] px-3 py-1 rounded-xl">
            ⚒️ CRAFTING TABLE
          </h2>
          {(slot1 || slot2) && (
            <button
              type="button"
              onClick={() => {
                setSlot1(null);
                setSlot2(null);
                setFeedback(null);
              }}
              className="text-xs font-display font-bold text-slate-600 hover:text-[#111827] underline cursor-pointer"
            >
              Clear Slots
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 py-2">
          {/* Slot 1 */}
          <button
            type="button"
            onClick={() => setSlot1(null)}
            className={`w-36 h-36 rounded-2xl border-[3px] border-[#111827] flex flex-col items-center justify-center gap-1.5 p-3 transition-all cursor-pointer ${
              slot1
                ? 'bg-[#FDE047] shadow-[4px_4px_0_#111827]'
                : 'bg-slate-100 border-dashed text-slate-500 hover:bg-[#FEF9C3]'
            }`}
          >
            {slot1 ? (
              <>
                <span className="text-4xl">{slot1.emoji}</span>
                <span className="font-display font-bold text-xs text-[#111827] leading-tight text-center">
                  {slot1.name}
                </span>
                <span className="text-[10px] font-bold text-slate-600">Tap to remove</span>
              </>
            ) : (
              <>
                <span className="text-2xl font-display font-bold">Slot 1</span>
                <span className="text-xs font-semibold">Tap item below</span>
              </>
            )}
          </button>

          <span className="font-display text-4xl font-extrabold text-[#F97316] select-none">+</span>

          {/* Slot 2 */}
          <button
            type="button"
            onClick={() => setSlot2(null)}
            className={`w-36 h-36 rounded-2xl border-[3px] border-[#111827] flex flex-col items-center justify-center gap-1.5 p-3 transition-all cursor-pointer ${
              slot2
                ? 'bg-[#FDE047] shadow-[4px_4px_0_#111827]'
                : 'bg-slate-100 border-dashed text-slate-500 hover:bg-[#FEF9C3]'
            }`}
          >
            {slot2 ? (
              <>
                <span className="text-4xl">{slot2.emoji}</span>
                <span className="font-display font-bold text-xs text-[#111827] leading-tight text-center">
                  {slot2.name}
                </span>
                <span className="text-[10px] font-bold text-slate-600">Tap to remove</span>
              </>
            ) : (
              <>
                <span className="text-2xl font-display font-bold">Slot 2</span>
                <span className="text-xs font-semibold">Tap item below</span>
              </>
            )}
          </button>

          <span className="font-display text-3xl font-extrabold text-[#111827] select-none hidden sm:inline">
            =
          </span>

          <button
            type="button"
            disabled={!slot1 || !slot2}
            onClick={handleCraft}
            className={`comic-btn px-8 py-5 rounded-2xl font-display font-extrabold text-xl whitespace-nowrap ${
              slot1 && slot2
                ? 'bg-[#22C55E] hover:bg-[#16A34A] text-white cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            💥 CRAFT!
          </button>
        </div>

        {/* Result Banner */}
        {feedback && (
          <div
            className={`rounded-2xl border-[3px] border-[#111827] p-4 flex items-center gap-3.5 shadow-[3px_3px_0_#111827] ${
              feedback.kind === 'fail'
                ? 'bg-[#FEE2E2]'
                : feedback.kind === 'repeat'
                ? 'bg-[#E0F2FE]'
                : 'bg-[#DCFCE7]'
            }`}
          >
            <span className="text-4xl shrink-0">{feedback.emoji}</span>
            <div>
              <div className="font-display font-extrabold text-base sm:text-lg text-[#111827]">
                {feedback.title}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-800">{feedback.subtitle}</p>
            </div>
          </div>
        )}
      </section>

      {/* MY INVENTORY */}
      <section className="rounded-3xl bg-white comic-panel p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-lg font-extrabold text-[#111827]">
            🎒 MY INVENTORY ({inventoryTokens.length} Unlocked Items)
          </h2>
          {inventoryTokens.length < 3 && (
            <button
              type="button"
              onClick={onGoToMap}
              className="px-3 py-1 rounded-xl bg-[#FEF08A] border-2 border-[#111827] font-display text-xs font-bold text-[#111827] hover:bg-[#FDE047] cursor-pointer"
            >
              🗺️ Unlock more on Map!
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {inventoryTokens.map((token) => (
            <button
              key={token.id}
              type="button"
              onClick={() => handleSelectToken(token)}
              className="group flex flex-col items-center gap-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#111827]"
            >
              <div
                className={`w-15 h-15 rounded-full border-[3px] border-[#111827] shadow-[2px_3px_0_#111827] flex items-center justify-center text-2xl transition-transform group-hover:scale-110 ${
                  token.kind === 'element' ? 'bg-[#BAE6FD]' : 'bg-[#FDE047]'
                }`}
              >
                {token.emoji}
              </div>
              <span className="text-[11px] font-display font-bold text-[#111827] max-w-[78px] truncate text-center">
                {token.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* MY INVENTIONS GALLERY */}
      <section className="rounded-3xl bg-white comic-panel p-5 sm:p-6 space-y-4">
        <h2 className="font-display text-lg font-extrabold text-[#111827]">
          ✨ MY INVENTIONS ({inventions.length})
        </h2>

        {inventions.length === 0 ? (
          <div className="rounded-2xl bg-[#FFFDF2] border-2 border-dashed border-slate-300 p-6 text-center text-sm font-semibold text-slate-600">
            Abhi tak koi invention craft nahi ki — upar Slots mein 2 cheezein daal kar CRAFT! dabao!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {inventions.map((inv) => (
              <div
                key={inv.id}
                className="rounded-2xl bg-[#FEF9C3] border-[3px] border-[#111827] shadow-[3px_3px_0_#111827] p-4 flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl bg-white border-2 border-[#111827] flex items-center justify-center text-2xl shrink-0">
                  {inv.emoji}
                </div>
                <div className="min-w-0">
                  <div className="font-display font-extrabold text-sm text-[#111827] truncate">
                    {inv.name}
                  </div>
                  <div className="text-xs font-semibold text-slate-700 truncate">
                    {inv.ingredients[0]} + {inv.ingredients[1]}
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
