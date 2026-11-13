import { ADVENTURE_LEVELS_PART1, ADVENTURE_PHASES_PART1 } from './adventurePart1';
import { ADVENTURE_LEVELS_PART2, ADVENTURE_PHASES_PART2 } from './adventurePart2';
import type { AdventureLevel, AdventurePhase } from '../types/lab';

export const ADVENTURE_PHASES: AdventurePhase[] = [
  ...ADVENTURE_PHASES_PART1,
  ...ADVENTURE_PHASES_PART2,
];

export const ADVENTURE_LEVELS: AdventureLevel[] = [
  ...ADVENTURE_LEVELS_PART1,
  ...ADVENTURE_LEVELS_PART2,
];

export function getAdventureLevel(levelNum: number): AdventureLevel | undefined {
  return ADVENTURE_LEVELS.find((l) => l.level === levelNum);
}

export function getNextUnlockedAdventureLevel(completedLevels: number[]): number {
  for (const lvl of ADVENTURE_LEVELS) {
    if (!completedLevels.includes(lvl.level)) {
      return lvl.level;
    }
  }
  return 50;
}

export function isAdventureLevelUnlocked(levelNum: number, completedLevels: number[]): boolean {
  if (levelNum <= 1) return true;
  return completedLevels.includes(levelNum - 1) || completedLevels.includes(levelNum);
}
