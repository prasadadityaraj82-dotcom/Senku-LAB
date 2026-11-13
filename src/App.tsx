import { useEffect, useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { AdventureModeView } from './components/AdventureModeView';
import { ChemicalLabView } from './components/ChemicalLabView';
import { CreateModeView, type PreselectedRecipePair } from './components/CreateModeView';
import { DailyExperimentView } from './components/DailyExperimentView';
import { Header, type ActiveTab } from './components/Header';
import { ItemDetailModal } from './components/ItemDetailModal';
import { PeriodicTableView } from './components/PeriodicTableView';
import { QuizView } from './components/QuizView';
import { RecipeBookView } from './components/RecipeBookView';
import { RoadmapView } from './components/RoadmapView';
import { SplashIntro } from './components/SplashIntro';
import { ALL_ITEMS, ERAS, isEraUnlocked } from './data/eras';
import type { PeriodicElement } from './data/periodicTable';
import type {
  AdventureLevel,
  CreatedInvention,
  DiscoveredReaction,
  PlayerProgress,
  RecipeEntry,
  ScienceItem,
} from './types/lab';
import { playLabSound } from './utils/sound';

const STORAGE_KEY = 'senku_lab_progress_v1';
const XP_PER_LEVEL = 200;

function getTodayDateString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function createInitialProgress(): PlayerProgress {
  const today = getTodayDateString();
  return {
    xp: 0,
    coins: 0,
    streak: 1,
    lastActiveDate: today,
    completedItemIds: [],
    dailyCompletedDates: [],
    quizSessionsCompleted: 0,
    quizBestScore: 0,
    muted: false,
    inventions: [],
    discoveredReactions: [],
    craftedElementSymbols: [],
    adventureCompletedLevels: [],
    senkuTrophyEarned: false,
    learnedRecipeIds: [],
  };
}

function loadProgress(): PlayerProgress {
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialProgress();
    const parsed = JSON.parse(raw) as Partial<PlayerProgress>;

    let streak = typeof parsed.streak === 'number' && parsed.streak > 0 ? parsed.streak : 1;
    const lastActive = typeof parsed.lastActiveDate === 'string' ? parsed.lastActiveDate : today;
    if (lastActive !== today) {
      streak = lastActive === yesterday ? streak + 1 : 1;
    }

    return {
      xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
      coins: typeof parsed.coins === 'number' ? parsed.coins : 0,
      streak,
      lastActiveDate: today,
      completedItemIds: Array.isArray(parsed.completedItemIds) ? parsed.completedItemIds : [],
      dailyCompletedDates: Array.isArray(parsed.dailyCompletedDates) ? parsed.dailyCompletedDates : [],
      quizSessionsCompleted: typeof parsed.quizSessionsCompleted === 'number' ? parsed.quizSessionsCompleted : 0,
      quizBestScore: typeof parsed.quizBestScore === 'number' ? parsed.quizBestScore : 0,
      muted: Boolean(parsed.muted),
      inventions: Array.isArray(parsed.inventions) ? parsed.inventions : [],
      discoveredReactions: Array.isArray(parsed.discoveredReactions) ? parsed.discoveredReactions : [],
      craftedElementSymbols: Array.isArray(parsed.craftedElementSymbols) ? parsed.craftedElementSymbols : [],
      adventureCompletedLevels: Array.isArray(parsed.adventureCompletedLevels)
        ? parsed.adventureCompletedLevels
        : [],
      senkuTrophyEarned: Boolean(parsed.senkuTrophyEarned),
      learnedRecipeIds: Array.isArray(parsed.learnedRecipeIds) ? parsed.learnedRecipeIds : [],
    };
  } catch {
    return createInitialProgress();
  }
}

interface ToastState {
  id: number;
  kind: 'success' | 'era' | 'locked';
  message: string;
}

export default function App() {
  const [progress, setProgress] = useState<PlayerProgress>(() => loadProgress());
  const [activeTab, setActiveTab] = useState<ActiveTab>('roadmap');
  const [selectedItem, setSelectedItem] = useState<ScienceItem | null>(null);
  const [preselectedElementSymbol, setPreselectedElementSymbol] = useState<string | null>(null);
  const [preselectedRecipePair, setPreselectedRecipePair] = useState<PreselectedRecipePair | null>(
    null
  );
  const [toast, setToast] = useState<ToastState | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const todayDateStr = getTodayDateString();

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota issues
    }
  }, [progress]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = (kind: ToastState['kind'], message: string) => {
    setToast({ id: Date.now(), kind, message });
  };

  const level = Math.floor(progress.xp / XP_PER_LEVEL) + 1;
  const xpInLevel = progress.xp % XP_PER_LEVEL;

  const unlockedErasCount = useMemo(
    () => ERAS.filter((era) => isEraUnlocked(era.id, progress.completedItemIds)).length,
    [progress.completedItemIds]
  );

  const handleSelectItem = (item: ScienceItem) => {
    playLabSound('click', progress.muted);
    setSelectedItem(item);
  };

  const handleLockedClick = (item: ScienceItem, eraUnlocked: boolean) => {
    playLabSound('locked', progress.muted);
    if (!eraUnlocked) {
      showToast('locked', `🔒 Era ${item.eraId} locked! Pehle Era ${item.eraId - 1} complete karo.`);
      return;
    }
    const idx = ALL_ITEMS.findIndex((i) => i.id === item.id);
    const prev = idx > 0 ? ALL_ITEMS[idx - 1] : null;
    if (prev) {
      showToast('locked', `🔒 "${item.name}" locked! Pehle "${prev.name}" craft karo.`);
    }
  };

  const handleCompleteItem = (item: ScienceItem) => {
    if (progress.completedItemIds.includes(item.id)) return;

    const updatedCompleted = [...progress.completedItemIds, item.id];
    const currentEra = ERAS.find((e) => e.id === item.eraId);
    const eraCompletedNow =
      currentEra ? currentEra.items.every((i) => updatedCompleted.includes(i.id)) : false;
    const nextEra = ERAS.find((e) => e.id === item.eraId + 1);

    if (eraCompletedNow && nextEra) {
      playLabSound('eraUnlock', progress.muted);
      showToast(
        'era',
        `🎉 10 BILLION %! ${currentEra?.code} Clear! ${nextEra.code} (${nextEra.title}) Unlocked!`
      );
    } else {
      playLabSound('craft', progress.muted);
      showToast('success', `💥 ${item.name} Crafted! +${item.xp} XP & +${item.coins} Coins!`);
    }

    setProgress((prev) => ({
      ...prev,
      xp: prev.xp + item.xp,
      coins: prev.coins + item.coins,
      completedItemIds: updatedCompleted,
      lastActiveDate: todayDateStr,
    }));
  };

  const handleCompleteDaily = () => {
    if (progress.dailyCompletedDates.includes(todayDateStr)) return;
    playLabSound('craft', progress.muted);
    showToast('success', '🧪 Daily Experiment Done! +30 XP & +15 Coins!');
    setProgress((prev) => ({
      ...prev,
      xp: prev.xp + 30,
      coins: prev.coins + 15,
      dailyCompletedDates: [...prev.dailyCompletedDates, todayDateStr],
      lastActiveDate: todayDateStr,
    }));
  };

  const handleQuizAnswerFeedback = (isCorrect: boolean) => {
    playLabSound(isCorrect ? 'correct' : 'wrong', progress.muted);
  };

  const handleFinishQuiz = (correctCount: number, coinsEarned: number) => {
    if (coinsEarned > 0) {
      playLabSound('eraUnlock', progress.muted);
      showToast('success', `⚡ Quiz Complete! +${coinsEarned} Coins & +20 XP!`);
    }
    setProgress((prev) => ({
      ...prev,
      coins: prev.coins + coinsEarned,
      xp: prev.xp + 20,
      quizSessionsCompleted: prev.quizSessionsCompleted + 1,
      quizBestScore: Math.max(prev.quizBestScore, correctCount),
      lastActiveDate: todayDateStr,
    }));
  };

  const handleCraftSuccess = (invention: CreatedInvention, isNew: boolean) => {
    if (isNew) {
      playLabSound('craft', progress.muted);
      showToast('success', `💥 NEW INVENTION! ${invention.name}! +100 XP & +50 Coins!`);
      setProgress((prev) => ({
        ...prev,
        xp: prev.xp + 100,
        coins: prev.coins + 50,
        inventions: [invention, ...prev.inventions],
        lastActiveDate: todayDateStr,
      }));
    } else {
      playLabSound('click', progress.muted);
    }
  };

  const handleCraftFail = () => {
    playLabSound('wrong', progress.muted);
  };

  const handleUseElementInCreateMode = (element: PeriodicElement) => {
    playLabSound('click', progress.muted);
    setProgress((prev) => ({
      ...prev,
      craftedElementSymbols: prev.craftedElementSymbols.includes(element.symbol)
        ? prev.craftedElementSymbols
        : [...prev.craftedElementSymbols, element.symbol],
    }));
    setPreselectedElementSymbol(element.symbol);
    setActiveTab('create');
    showToast('success', `⚛️ ${element.name} (${element.symbol}) Craft Table me bhej diya!`);
  };

  const handleReactionSuccess = (reaction: DiscoveredReaction, isNew: boolean) => {
    if (isNew) {
      playLabSound('eraUnlock', progress.muted);
      showToast('era', `⚗️ ${reaction.callout} ${reaction.title}! +100 XP & +50 Coins!`);
      setProgress((prev) => ({
        ...prev,
        xp: prev.xp + 100,
        coins: prev.coins + 50,
        discoveredReactions: [reaction, ...prev.discoveredReactions],
        lastActiveDate: todayDateStr,
      }));
    } else {
      playLabSound('click', progress.muted);
    }
  };

  const handleReactionFail = () => {
    playLabSound('wrong', progress.muted);
  };

  const handleCompleteAdventureLevel = (lvl: AdventureLevel, isFirstClear: boolean) => {
    if (!isFirstClear) {
      showToast('success', `✅ Level ${lvl.level} Replayed!`);
      return;
    }

    if (lvl.level === 50) {
      showToast(
        'era',
        `🏆 YOU ARE 10 BILLION PERCENT SENKU! +${lvl.xpReward} XP & +${lvl.coinReward} Coins!`
      );
    } else if (lvl.isBoss) {
      showToast(
        'era',
        `👑 BOSS CLEARED: ${lvl.title}! +${lvl.xpReward} XP & +${lvl.coinReward} Coins!`
      );
    } else {
      showToast(
        'success',
        `🚀 Level ${lvl.level} Clear! +${lvl.xpReward} XP & +${lvl.coinReward} Coins!`
      );
    }

    setProgress((prev) => ({
      ...prev,
      xp: prev.xp + lvl.xpReward,
      coins: prev.coins + lvl.coinReward,
      adventureCompletedLevels: prev.adventureCompletedLevels.includes(lvl.level)
        ? prev.adventureCompletedLevels
        : [...prev.adventureCompletedLevels, lvl.level],
      senkuTrophyEarned: prev.senkuTrophyEarned || lvl.level === 50,
      lastActiveDate: todayDateStr,
    }));
  };

  const handleLockedAdventureClick = (levelNum: number) => {
    playLabSound('locked', progress.muted);
    showToast('locked', `🔒 Level ${levelNum} locked! Pehle Level ${levelNum - 1} complete karo.`);
  };

  const handleMarkRecipeLearned = (recipe: RecipeEntry) => {
    if (progress.learnedRecipeIds.includes(recipe.id)) return;
    playLabSound('craft', progress.muted);
    showToast('success', `📖 Recipe Learned: ${recipe.name}! +${recipe.xpReward} XP!`);
    setProgress((prev) => ({
      ...prev,
      xp: prev.xp + recipe.xpReward,
      learnedRecipeIds: [...prev.learnedRecipeIds, recipe.id],
      lastActiveDate: todayDateStr,
    }));
  };

  const handleTryRecipeInCreateMode = (recipe: RecipeEntry) => {
    playLabSound('click', progress.muted);
    const ing1 = recipe.ingredients[0] ?? 'Material 1';
    const ing2 = recipe.ingredients[1] ?? 'Material 2';
    setPreselectedRecipePair({
      slot1: {
        id: `recipe-ing-${ing1.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: ing1,
        emoji: recipe.ingredientEmojis[0] ?? '🧪',
        kind: 'item',
      },
      slot2: {
        id: `recipe-ing-${ing2.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: ing2,
        emoji: recipe.ingredientEmojis[1] ?? '⚗️',
        kind: 'item',
      },
    });
    setActiveTab('create');
    showToast('success', `🔨 ${ing1} + ${ing2} Crafting Table me bhej diya!`);
  };

  const handleResetProgress = () => {
    const fresh = createInitialProgress();
    setProgress(fresh);
    setConfirmReset(false);
    setSelectedItem(null);
    setPreselectedElementSymbol(null);
    setPreselectedRecipePair(null);
    showToast('success', '🔄 Progress reset! Stone Age Day 1 shuru!');
  };

  const isDailyCompleted = progress.dailyCompletedDates.includes(todayDateStr);

  return (
    <div className="min-h-screen senku-sunburst-bg text-[#111827] flex flex-col">
      <Header
        activeTab={activeTab}
        onSelectTab={(tab) => {
          playLabSound('click', progress.muted);
          setActiveTab(tab);
        }}
        coins={progress.coins}
        xp={progress.xp}
        level={level}
        xpInLevel={xpInLevel}
        xpForNextLevel={XP_PER_LEVEL}
        streak={progress.streak}
        completedCount={progress.completedItemIds.length}
        totalItemsCount={ALL_ITEMS.length}
        unlockedErasCount={unlockedErasCount}
        totalErasCount={ERAS.length}
        muted={progress.muted}
        onToggleMute={() =>
          setProgress((prev) => ({ ...prev, muted: !prev.muted }))
        }
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 py-5 sm:py-7">
        {activeTab === 'roadmap' && (
          <RoadmapView
            eras={ERAS}
            completedItemIds={progress.completedItemIds}
            onSelectItem={handleSelectItem}
            onLockedClick={handleLockedClick}
          />
        )}

        {activeTab === 'adventure' && (
          <AdventureModeView
            completedLevels={progress.adventureCompletedLevels}
            senkuTrophyEarned={progress.senkuTrophyEarned}
            onCompleteLevel={handleCompleteAdventureLevel}
            onLockedLevelClick={handleLockedAdventureClick}
            onPlaySound={(kind) => playLabSound(kind, progress.muted)}
          />
        )}

        {activeTab === 'create' && (
          <CreateModeView
            completedItemIds={progress.completedItemIds}
            craftedElementSymbols={progress.craftedElementSymbols}
            preselectedElementSymbol={preselectedElementSymbol}
            onClearPreselectedElement={() => setPreselectedElementSymbol(null)}
            preselectedRecipePair={preselectedRecipePair}
            onClearPreselectedRecipe={() => setPreselectedRecipePair(null)}
            inventions={progress.inventions}
            onCraftSuccess={handleCraftSuccess}
            onCraftFail={handleCraftFail}
            onGoToMap={() => setActiveTab('roadmap')}
          />
        )}

        {activeTab === 'periodic' && (
          <PeriodicTableView onUseInCreateMode={handleUseElementInCreateMode} />
        )}

        {activeTab === 'chemical' && (
          <ChemicalLabView
            discoveredReactions={progress.discoveredReactions}
            onReactionSuccess={handleReactionSuccess}
            onReactionFail={handleReactionFail}
          />
        )}

        {activeTab === 'recipes' && (
          <RecipeBookView
            learnedRecipeIds={progress.learnedRecipeIds}
            onMarkLearned={handleMarkRecipeLearned}
            onTryInCreateMode={handleTryRecipeInCreateMode}
          />
        )}

        {activeTab === 'daily' && (
          <DailyExperimentView
            todayDateStr={todayDateStr}
            isDailyCompleted={isDailyCompleted}
            onCompleteDaily={handleCompleteDaily}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            bestScore={progress.quizBestScore}
            sessionsCompleted={progress.quizSessionsCompleted}
            onAnswerFeedback={handleQuizAnswerFeedback}
            onFinishQuiz={handleFinishQuiz}
          />
        )}
      </main>

      {/* Clean Comic Footer */}
      <footer className="border-t-[3px] border-[#111827] bg-white py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-display font-bold text-[#111827]">
          <span>🧪 SENKU LAB · Kingdom of Science · Progress saved automatically!</span>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setShowSplash(true)}
              className="inline-flex items-center gap-1 text-slate-600 hover:text-[#111827] cursor-pointer"
            >
              <span>🎬 Replay Intro</span>
            </button>

            {!confirmReset ? (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-1.5 text-slate-600 hover:text-[#111827] cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Progress</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[#EA580C]">Reset all XP & unlocks?</span>
                <button
                  type="button"
                  onClick={handleResetProgress}
                  className="px-2.5 py-1 rounded-lg bg-[#EF4444] text-white border-2 border-[#111827] cursor-pointer"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 text-[#111827] border-2 border-[#111827] cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </footer>

      {/* Detail Popup Modal */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          isCompleted={progress.completedItemIds.includes(selectedItem.id)}
          completedItemIds={progress.completedItemIds}
          onClose={() => setSelectedItem(null)}
          onComplete={handleCompleteItem}
          onOpenItem={(next) => {
            playLabSound('click', progress.muted);
            setSelectedItem(next);
          }}
        />
      )}

      {/* Comic Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-5 right-5 z-[60] max-w-sm rounded-2xl comic-panel px-4 py-3 text-sm font-display font-bold text-[#111827] ${
            toast.kind === 'era'
              ? 'bg-[#38BDF8]'
              : toast.kind === 'success'
              ? 'bg-[#FDE047]'
              : 'bg-white'
          }`}
        >
          {toast.message}
        </div>
      )}

      {/* 10-Second Starting App Animation */}
      {showSplash && <SplashIntro onFinish={() => setShowSplash(false)} />}
    </div>
  );
}
