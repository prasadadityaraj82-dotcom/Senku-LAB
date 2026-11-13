import { useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Search, X } from 'lucide-react';
import { ALL_RECIPES, RECIPE_CATEGORIES } from '../data/recipes';
import type { RecipeCategory, RecipeEntry } from '../types/lab';

interface RecipeBookViewProps {
  learnedRecipeIds: string[];
  onMarkLearned: (recipe: RecipeEntry) => void;
  onTryInCreateMode: (recipe: RecipeEntry) => void;
}

const CATEGORY_CARD_BG: Record<RecipeCategory, string> = {
  Chemistry: 'bg-[#FCE7F3]',
  Metals: 'bg-[#FFEDD5]',
  Food: 'bg-[#FEF9C3]',
  Electricity: 'bg-[#E0F2FE]',
  Machines: 'bg-[#EDE9FE]',
  Survival: 'bg-[#DCFCE7]',
};

export function RecipeBookView({
  learnedRecipeIds,
  onMarkLearned,
  onTryInCreateMode,
}: RecipeBookViewProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | RecipeCategory>('All');
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeEntry | null>(null);

  const filteredRecipes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ALL_RECIPES.filter((r) => {
      if (activeCategory !== 'All' && r.category !== activeCategory) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.finalProduct.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.ingredients.some((ing) => ing.toLowerCase().includes(q))
      );
    });
  }, [search, activeCategory]);

  return (
    <div className="space-y-5">
      {/* Header + Search + Category Filters */}
      <div className="rounded-3xl bg-white comic-panel p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="inline-block bg-[#FDE047] border-2 border-[#111827] px-2.5 py-0.5 rounded-lg font-display text-xs font-extrabold text-[#111827] mb-1">
              📖 SENKU DIARY · {ALL_RECIPES.length} SCIENCE RECIPES
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111827]">
              RECIPE BOOK · SENKU DIARY
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-700">
              Chemistry, Metals, Food, Electricity, Machines &amp; Survival ke 100+ formulas! Har recipe padhne par +50 XP!
            </p>
          </div>

          <div className="bg-[#DCFCE7] border-2 border-[#111827] rounded-xl px-4 py-2 font-display text-sm font-extrabold text-[#111827] shadow-[2px_2px_0_#111827] shrink-0 tabular-nums">
            ✅ Learned: {learnedRecipeIds.length} / {ALL_RECIPES.length}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Recipe dhundo... Steel, Soap, Battery, Ramen, Gunpowder"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFDF2] border-[3px] border-[#111827] font-display text-sm font-bold text-[#111827] placeholder:text-slate-400 focus:outline-none focus:bg-[#FEF9C3]"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {RECIPE_CATEGORIES.map((cat) => {
            const count =
              cat.id === 'All'
                ? ALL_RECIPES.length
                : ALL_RECIPES.filter((r) => r.category === cat.id).length;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-display text-xs font-extrabold border-2 border-[#111827] whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5 transition-all ${
                  active
                    ? `${cat.badgeColor} text-[#111827] shadow-[2px_2px_0_#111827]`
                    : 'bg-slate-100 text-slate-700 hover:bg-white'
                }`}
              >
                <span aria-hidden="true">{cat.emoji}</span>
                <span>
                  {cat.label} ({count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recipes Grid */}
      {filteredRecipes.length === 0 ? (
        <div className="rounded-3xl bg-white comic-panel p-10 text-center space-y-2">
          <div className="text-4xl">🔍</div>
          <div className="font-display font-extrabold text-lg text-[#111827]">
            Koi recipe nahi mili!
          </div>
          <p className="text-sm font-semibold text-slate-600">
            &ldquo;Steel&rdquo;, &ldquo;Soap&rdquo;, &ldquo;Battery&rdquo;, ya &ldquo;Acid&rdquo; search karke dekho.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map((recipe) => {
            const isLearned = learnedRecipeIds.includes(recipe.id);
            return (
              <button
                key={recipe.id}
                type="button"
                onClick={() => setSelectedRecipe(recipe)}
                className={`${CATEGORY_CARD_BG[recipe.category]} rounded-2xl border-[3px] border-[#111827] shadow-[4px_4px_0_#111827] p-4 text-left flex flex-col justify-between gap-3 hover:-translate-y-1 transition-transform cursor-pointer`}
              >
                <div className="space-y-2.5">
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-12 h-12 rounded-xl bg-white border-2 border-[#111827] flex items-center justify-center text-2xl shrink-0">
                        {recipe.emoji}
                      </span>
                      <div className="min-w-0">
                        <span className="text-[10px] font-display font-extrabold uppercase tracking-wide text-slate-700">
                          {recipe.category}
                        </span>
                        <h2 className="font-display font-extrabold text-base text-[#111827] leading-tight truncate">
                          {recipe.name}
                        </h2>
                      </div>
                    </div>
                    {isLearned && (
                      <span className="bg-[#22C55E] text-white border-2 border-[#111827] rounded-lg px-2 py-0.5 text-[10px] font-display font-extrabold shrink-0">
                        ✅ Learned
                      </span>
                    )}
                  </div>

                  {/* Formula Box: Ing1 + Ing2 -> Final Product */}
                  <div className="rounded-xl bg-white border-2 border-[#111827] p-2.5 text-xs font-display font-bold text-[#111827] flex flex-wrap items-center gap-1.5">
                    <span className="bg-[#FEF9C3] border border-[#111827] px-2 py-0.5 rounded-lg">
                      {recipe.ingredientEmojis[0] ?? '🧪'} {recipe.ingredients[0]}
                    </span>
                    <span className="text-[#EA580C] font-extrabold">+</span>
                    <span className="bg-[#FEF9C3] border border-[#111827] px-2 py-0.5 rounded-lg">
                      {recipe.ingredientEmojis[1] ?? '⚗️'} {recipe.ingredients[1]}
                    </span>
                    <span className="text-[#15803D] font-extrabold">→</span>
                    <span className="bg-[#DCFCE7] border border-[#111827] px-2 py-0.5 rounded-lg font-extrabold">
                      {recipe.finalProduct}
                    </span>
                  </div>
                </div>

                {/* Footer: Difficulty + XP */}
                <div className="flex items-center justify-between text-xs font-display font-extrabold pt-1 border-t border-[#111827]/15">
                  <span
                    className={`px-2 py-0.5 rounded-md border border-[#111827] ${
                      recipe.difficulty === 'Easy'
                        ? 'bg-[#86EFAC]'
                        : recipe.difficulty === 'Medium'
                        ? 'bg-[#FDE047]'
                        : 'bg-[#FCA5A5]'
                    }`}
                  >
                    {recipe.difficulty}
                  </span>
                  <span className="text-[#15803D]">+{recipe.xpReward} XP</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Full Detail Modal */}
      {selectedRecipe && (() => {
        const isLearned = learnedRecipeIds.includes(selectedRecipe.id);
        return (
          <div
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs overflow-y-auto flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-2xl rounded-3xl bg-white comic-panel overflow-hidden my-4">
              {/* Modal Top */}
              <div
                className={`${CATEGORY_CARD_BG[selectedRecipe.category]} px-5 py-4 border-b-[3px] border-[#111827] flex items-center justify-between gap-3`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-14 h-14 rounded-2xl bg-white border-[3px] border-[#111827] shadow-[3px_3px_0_#111827] flex items-center justify-center text-3xl shrink-0">
                    {selectedRecipe.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-xs font-extrabold text-[#111827] bg-white border border-[#111827] px-2 py-0.5 rounded-md">
                        {selectedRecipe.category}
                      </span>
                      <span
                        className={`font-display text-xs font-extrabold border border-[#111827] px-2 py-0.5 rounded-md ${
                          selectedRecipe.safety === 'Safe'
                            ? 'bg-[#4ADE80] text-[#111827]'
                            : selectedRecipe.safety === 'Dhyan Se'
                            ? 'bg-[#FB923C] text-white'
                            : 'bg-[#EF4444] text-white'
                        }`}
                      >
                        Safety: {selectedRecipe.safety}
                      </span>
                    </div>
                    <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#111827] truncate mt-0.5">
                      {selectedRecipe.name}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedRecipe(null)}
                  aria-label="Close recipe details"
                  className="p-2 rounded-xl bg-white border-2 border-[#111827] text-[#111827] hover:bg-rose-100 cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 sm:p-6 space-y-4 bg-[#FFFDF7]">
                {/* Visual Equation Strip */}
                <div className="rounded-2xl bg-[#FEF9C3] border-[3px] border-[#111827] p-4 flex flex-wrap items-center justify-center gap-2 font-display font-extrabold text-sm sm:text-base text-[#111827]">
                  <span className="bg-white border-2 border-[#111827] px-3 py-1.5 rounded-xl">
                    {selectedRecipe.ingredientEmojis[0] ?? '🧪'} {selectedRecipe.ingredients[0]}
                  </span>
                  <span className="text-2xl text-[#EA580C]">+</span>
                  <span className="bg-white border-2 border-[#111827] px-3 py-1.5 rounded-xl">
                    {selectedRecipe.ingredientEmojis[1] ?? '⚗️'} {selectedRecipe.ingredients[1]}
                  </span>
                  <span className="text-2xl text-[#15803D]">→</span>
                  <span className="bg-[#4ADE80] border-2 border-[#111827] px-3.5 py-1.5 rounded-xl">
                    {selectedRecipe.emoji} {selectedRecipe.finalProduct}
                  </span>
                </div>

                {/* Step-by-Step in Hindi */}
                <div className="rounded-2xl bg-white border-2 border-[#111827] p-4 space-y-2.5">
                  <div className="font-display text-sm font-extrabold text-[#111827] flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#EA580C]" />
                    <span>Step-by-Step Kaise Banega (Hindi Guide)</span>
                  </div>
                  <div className="space-y-2">
                    {selectedRecipe.stepsHindi.map((step, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-[#F8FAFC] border border-slate-300 px-3 py-2 text-sm font-semibold text-[#111827]"
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Senku Tip */}
                <div className="rounded-2xl bg-[#E0F2FE] border-2 border-[#111827] p-4 space-y-1">
                  <div className="font-display text-xs font-extrabold text-[#0369A1]">
                    🧪 SENKU TIP
                  </div>
                  <p className="text-sm font-bold text-[#111827]">{selectedRecipe.senkuTip}</p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      const chosen = selectedRecipe;
                      setSelectedRecipe(null);
                      onTryInCreateMode(chosen);
                    }}
                    className="comic-btn py-3.5 px-4 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-display font-extrabold text-sm sm:text-base cursor-pointer"
                  >
                    🔨 Try in Create Mode
                  </button>

                  <button
                    type="button"
                    disabled={isLearned}
                    onClick={() => onMarkLearned(selectedRecipe)}
                    className={`comic-btn py-3.5 px-4 rounded-2xl font-display font-extrabold text-sm sm:text-base inline-flex items-center justify-center gap-1.5 ${
                      isLearned
                        ? 'bg-[#DCFCE7] text-[#15803D] cursor-default'
                        : 'bg-[#22C55E] hover:bg-[#16A34A] text-white cursor-pointer'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {isLearned
                        ? 'Already Learned!'
                        : `Mark as Learned (+${selectedRecipe.xpReward} XP)`}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
