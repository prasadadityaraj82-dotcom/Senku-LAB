import { RECIPES_PART1 } from './recipesPart1';
import { RECIPES_PART2 } from './recipesPart2';
import type { RecipeCategory, RecipeEntry } from '../types/lab';

export const ALL_RECIPES: RecipeEntry[] = [...RECIPES_PART1, ...RECIPES_PART2];

export const RECIPE_CATEGORIES: ReadonlyArray<{
  id: 'All' | RecipeCategory;
  label: string;
  emoji: string;
  badgeColor: string;
}> = [
  { id: 'All', label: 'All', emoji: '📚', badgeColor: 'bg-[#FDE047]' },
  { id: 'Chemistry', label: 'Chemistry', emoji: '🧪', badgeColor: 'bg-[#F9A8D4]' },
  { id: 'Metals', label: 'Metals', emoji: '🛡️', badgeColor: 'bg-[#FDBA74]' },
  { id: 'Food', label: 'Food', emoji: '🍜', badgeColor: 'bg-[#FEF08A]' },
  { id: 'Electricity', label: 'Electricity', emoji: '⚡', badgeColor: 'bg-[#7DD3FC]' },
  { id: 'Machines', label: 'Machines', emoji: '⚙️', badgeColor: 'bg-[#C4B5FD]' },
  { id: 'Survival', label: 'Survival', emoji: '🔥', badgeColor: 'bg-[#86EFAC]' },
];

function norm(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function findRecipeByIngredients(nameA: string, nameB: string): RecipeEntry | undefined {
  const a = norm(nameA);
  const b = norm(nameB);
  return ALL_RECIPES.find((r) => {
    if (r.ingredients.length < 2) return false;
    const r1 = norm(r.ingredients[0]);
    const r2 = norm(r.ingredients[1]);
    return (r1 === a && r2 === b) || (r1 === b && r2 === a);
  });
}
