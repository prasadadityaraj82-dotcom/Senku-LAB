import { ERAS_PART_1 } from './erasPart1';
import { ERAS_PART_2 } from './erasPart2';
import type { Era, ScienceItem } from '../types/lab';

export const ERAS: Era[] = [...ERAS_PART_1, ...ERAS_PART_2];

export const ALL_ITEMS: ScienceItem[] = ERAS.flatMap((era) => era.items);

export function getItemById(id: string): ScienceItem | undefined {
  return ALL_ITEMS.find((item) => item.id === id);
}

export function getNextItem(id: string): ScienceItem | undefined {
  const idx = ALL_ITEMS.findIndex((item) => item.id === id);
  if (idx === -1 || idx === ALL_ITEMS.length - 1) return undefined;
  return ALL_ITEMS[idx + 1];
}

export function isEraUnlocked(eraId: number, completedIds: string[]): boolean {
  if (eraId === 1) return true;
  const prevEra = ERAS.find((e) => e.id === eraId - 1);
  if (!prevEra) return false;
  return prevEra.items.every((item) => completedIds.includes(item.id));
}

export function isItemUnlocked(item: ScienceItem, completedIds: string[]): boolean {
  if (completedIds.includes(item.id)) return true;
  const idx = ALL_ITEMS.findIndex((x) => x.id === item.id);
  if (idx <= 0) return true;
  return completedIds.includes(ALL_ITEMS[idx - 1].id);
}
