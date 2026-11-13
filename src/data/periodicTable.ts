import { PERIODIC_PART_1, type PeriodicElement } from './periodicPart1';
import { PERIODIC_PART_2 } from './periodicPart2';

export type { ElementCategory, ElementDanger, PeriodicElement } from './periodicPart1';

export const PERIODIC_ELEMENTS: PeriodicElement[] = [
  ...PERIODIC_PART_1,
  ...PERIODIC_PART_2,
];

export function getElementBySymbol(symbol: string): PeriodicElement | undefined {
  return PERIODIC_ELEMENTS.find((e) => e.symbol === symbol);
}
