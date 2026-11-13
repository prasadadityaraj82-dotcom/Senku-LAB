import { ITEM_VISUALS_PART_1, type ItemVisualMeta } from './itemVisualsPart1';
import { ITEM_VISUALS_PART_2 } from './itemVisualsPart2';

export type {
  BuildVisualType,
  ItemVisualMeta,
  MaterialTest,
  RecipeIngredient,
  XrayPart,
} from './itemVisualsPart1';

export const ITEM_VISUALS: Record<string, ItemVisualMeta> = {
  ...ITEM_VISUALS_PART_1,
  ...ITEM_VISUALS_PART_2,
};

export function getItemVisualMeta(itemId: string): ItemVisualMeta {
  return (
    ITEM_VISUALS[itemId] ?? {
      recipe: [
        { emoji: '🪨', label: 'Raw Material' },
        { emoji: '🔥', label: 'Energy / Heat' },
      ],
      materialTest: {
        rightLabel: 'Use Proper Science Material',
        rightSticker: '10 BILLION %! ✅',
        rightOutcome: 'Right atomic structure gives maximum strength and safety.',
        wrongLabel: 'Use Random Substitute',
        wrongSticker: 'FAIL! 💥',
        wrongOutcome: 'Wrong material breaks, melts, or wastes energy.',
      },
      xrayParts: [
        { label: 'Core Material', detail: 'Provides primary strength & function' },
        { label: 'Active Mechanism', detail: 'Converts input into useful output' },
        { label: 'Protective Shell', detail: 'Keeps the system stable & safe' },
      ],
      stageResults: [
        'Raw material collected',
        'Prepared base structure',
        'Applied heat or energy process',
        'Assembled active components',
        'Finished science invention ready!',
      ],
      visualType: 'acid_flask',
    }
  );
}
