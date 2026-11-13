import { findRecipeByIngredients } from './recipes';

export interface CraftingRecipeResult {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export interface ChemicalBottle {
  id: string;
  name: string;
  formula: string;
  emoji: string;
  colorClass: string;
  hindiTag: string;
}

export interface ChemicalMixResult {
  id: string;
  title: string;
  equation: string;
  resultEmoji: string;
  callout: string;
  explanation: string;
  liquidColor: string;
}

function pairKey(a: string, b: string): string {
  return [a, b].sort().join('::');
}

// Known Classic Dr. Senku Crafting Combos
const KNOWN_CRAFT_RECIPES: Record<string, CraftingRecipeResult> = {
  [pairKey('stone-tools', 'wood-tools')]: {
    id: 'craft-spear',
    name: 'Spear',
    emoji: '🔱',
    description: 'Sharp stone tip + solid wooden shaft = Long-range hunting Spear!',
  },
  [pairKey('stone-tools', 'fire')]: {
    id: 'craft-cooked-food',
    name: 'Cooked Food',
    emoji: '🍖',
    description: 'Stone knife se cut kiya aur Aag par pakaya — Safe & tasty energy food!',
  },
  [pairKey('iron', 'coal')]: {
    id: 'craft-steel',
    name: 'Steel',
    emoji: '🛡️',
    description: 'Iron + 1% Carbon (Coal) = Unbreakable Faulad Steel!',
  },
  [pairKey('copper', 'wire')]: {
    id: 'craft-motor',
    name: 'Motor',
    emoji: '⚙️',
    description: 'Copper coil + conductive wire = Spinning Electric Motor!',
  },
  [pairKey('battery', 'bulb')]: {
    id: 'craft-torch',
    name: 'Torch',
    emoji: '🔦',
    description: 'Battery power + Glowing Bulb = Portable Science Torch!',
  },
  [pairKey('battery', 'wire')]: {
    id: 'craft-electricity',
    name: 'Electricity Circuit',
    emoji: '⚡',
    description: 'Battery voltage + Copper wire loop = Flowing DC Electricity!',
  },
  [pairKey('glass', 'acid')]: {
    id: 'craft-test-tube',
    name: 'Test Tube Lab',
    emoji: '🧪',
    description: 'Acid-proof Glass + Sulfuric Acid = Real Chemistry Test Tube!',
  },
  [pairKey('wood-tools', 'rope')]: {
    id: 'craft-bow-arrow',
    name: 'Bow Arrow',
    emoji: '🏹',
    description: 'Flexible wood + tight rope string = Elastic Energy Bow & Arrow!',
  },
  [pairKey('sand', 'fire')]: {
    id: 'craft-glass',
    name: 'Molten Glass',
    emoji: '🪟',
    description: 'Silica Sand + High Fire = Transparent Glass!',
  },
  [pairKey('acid', 'base')]: {
    id: 'craft-salt',
    name: 'Neutral Salt',
    emoji: '🧂',
    description: 'Acid + Base neutralize hokar harmless Salt & Water banate hain!',
  },
  [pairKey('motor', 'fan')]: {
    id: 'craft-turbine',
    name: 'Wind Turbine',
    emoji: '🌬️',
    description: 'Motor + Fan blades reverse mein chalao toh Bijli paida hoti hai!',
  },
  [pairKey('solar-panel', 'battery')]: {
    id: 'craft-solar-bank',
    name: 'Solar Power Bank',
    emoji: '☀️',
    description: 'Sunlight se charge hone wali 24/7 Green Energy Station!',
  },
  [pairKey('computer-chip', 'rocket')]: {
    id: 'craft-autopilot-rocket',
    name: 'Autopilot Rocket',
    emoji: '🚀',
    description: 'Microchip guidance + Rocket thrust = Precision Space Launch!',
  },
  [pairKey('el-Fe', 'el-C')]: {
    id: 'craft-element-steel',
    name: 'Pure Carbon Steel',
    emoji: '⚔️',
    description: 'Element Fe + Element C = High-strength Alloy Steel!',
  },
  [pairKey('el-Na', 'el-Cl')]: {
    id: 'craft-element-nacl',
    name: 'NaCl Crystal',
    emoji: '🧂',
    description: 'Sodium + Chlorine milkar edible Table Salt bana!',
  },
  [pairKey('el-H', 'el-O')]: {
    id: 'craft-element-h2o',
    name: 'Pure H2O Water',
    emoji: '💧',
    description: 'Hydrogen + Oxygen = Life-giving Pure Water!',
  },
  [pairKey('el-Si', 'computer-chip')]: {
    id: 'craft-super-cpu',
    name: 'Super Processor',
    emoji: '💻',
    description: 'Ultra-pure Silicon wafer + Chip design = Turbo CPU!',
  },
};

// Incompatible / Funny Fail Combos so wrong choices trigger Senku shake!
const INVALID_CRAFT_PAIRS = new Set<string>([
  pairKey('fire', 'rope'),
  pairKey('fire', 'plastic'),
  pairKey('fire', 'refrigerator'),
  pairKey('fire', 'ac'),
  pairKey('fire', 'gunpowder'),
  pairKey('acid', 'iron'),
  pairKey('acid', 'marble'),
  pairKey('acid', 'aluminium'),
  pairKey('soap', 'gunpowder'),
  pairKey('perfume', 'cement'),
  pairKey('salt', 'computer-chip'),
  pairKey('clay-pot', 'gunpowder'),
  pairKey('shelter', 'fire'),
  pairKey('bicycle', 'gunpowder'),
  pairKey('paper', 'fire'),
  pairKey('el-Na', 'acid'),
  pairKey('el-K', 'acid'),
]);

export type CraftAttemptOutcome =
  | { status: 'fail' }
  | { status: 'known'; result: CraftingRecipeResult }
  | { status: 'discovery'; result: CraftingRecipeResult };

export function evaluateCraftAttempt(
  itemA: { id: string; name: string; emoji: string },
  itemB: { id: string; name: string; emoji: string }
): CraftAttemptOutcome {
  // Same item twice or known bad clash -> BOOM fail!
  if (itemA.id === itemB.id) {
    return { status: 'fail' };
  }

  const key = pairKey(itemA.id, itemB.id);
  if (INVALID_CRAFT_PAIRS.has(key)) {
    return { status: 'fail' };
  }

  const known = KNOWN_CRAFT_RECIPES[key];
  if (known) {
    return { status: 'known', result: known };
  }

  const bookRecipe = findRecipeByIngredients(itemA.name, itemB.name);
  if (bookRecipe) {
    return {
      status: 'known',
      result: {
        id: `recipe-${bookRecipe.id}`,
        name: bookRecipe.finalProduct,
        emoji: bookRecipe.emoji,
        description: bookRecipe.senkuTip,
      },
    };
  }

  // Creative combination -> New Invention!
  return {
    status: 'discovery',
    result: {
      id: `custom-${key}`,
      name: `${itemA.name} + ${itemB.name}`,
      emoji: itemB.emoji,
      description: `NEW INVENTION! Tumne ${itemA.name} aur ${itemB.name} ko mila kar ek naya science combo banaya!`,
    },
  };
}

// ================= CHEMICAL LAB DATA =================

export const CHEMICAL_BOTTLES: ChemicalBottle[] = [
  { id: 'acid', name: 'Acid', formula: 'HCl / H2SO4', emoji: '🧪', colorClass: 'bg-[#FCA5A5]', hindiTag: 'Tezaab' },
  { id: 'base', name: 'Base', formula: 'NaOH', emoji: '⚗️', colorClass: 'bg-[#93C5FD]', hindiTag: 'Kshaar' },
  { id: 'hydrogen', name: 'Hydrogen', formula: 'H2', emoji: '🎈', colorClass: 'bg-[#FDE047]', hindiTag: 'Halka Gas' },
  { id: 'oxygen', name: 'Oxygen', formula: 'O2', emoji: '💨', colorClass: 'bg-[#7DD3FC]', hindiTag: 'Pran Vayu' },
  { id: 'carbon', name: 'Carbon', formula: 'C', emoji: '⚫', colorClass: 'bg-[#CBD5E1]', hindiTag: 'Koyla Element' },
  { id: 'sodium', name: 'Sodium', formula: 'Na', emoji: '🧨', colorClass: 'bg-[#FDBA74]', hindiTag: 'Reactive Metal' },
  { id: 'chlorine', name: 'Chlorine', formula: 'Cl2', emoji: '🟢', colorClass: 'bg-[#86EFAC]', hindiTag: 'Green Gas' },
  { id: 'water', name: 'Water', formula: 'H2O', emoji: '💧', colorClass: 'bg-[#BAE6FD]', hindiTag: 'Paani' },
  { id: 'salt', name: 'Salt', formula: 'NaCl', emoji: '🧂', colorClass: 'bg-[#F8FAFC]', hindiTag: 'Namak' },
  { id: 'soap-base', name: 'Soap Base', formula: 'Fat + Lye', emoji: '🫧', colorClass: 'bg-[#FEF08A]', hindiTag: 'Sabun Base' },
  { id: 'perfume', name: 'Perfume', formula: 'Esters', emoji: '🌸', colorClass: 'bg-[#F9A8D4]', hindiTag: 'Khushboo' },
  { id: 'baking-soda', name: 'Baking Soda', formula: 'NaHCO3', emoji: '🥣', colorClass: 'bg-[#E2E8F0]', hindiTag: 'Meetha Soda' },
  { id: 'vinegar', name: 'Vinegar', formula: 'CH3COOH', emoji: '🍶', colorClass: 'bg-[#FDE68A]', hindiTag: 'Sirka' },
  { id: 'sulfur', name: 'Sulfur', formula: 'S', emoji: '💛', colorClass: 'bg-[#FEF08A]', hindiTag: 'Gandhak' },
];

export const CHEMICAL_REACTIONS: Record<string, ChemicalMixResult> = {
  [pairKey('acid', 'base')]: {
    id: 'rxn-neutralization',
    title: 'Salt + Water',
    equation: 'HCl + NaOH → NaCl + H2O',
    resultEmoji: '🧂',
    callout: 'Neutralization! BOOM!',
    explanation: 'Strong Acid aur Strong Base ek dusre ko neutralize karke safe Namak aur Paani banate hain!',
    liquidColor: '#4ADE80',
  },
  [pairKey('hydrogen', 'oxygen')]: {
    id: 'rxn-water',
    title: 'Pure Water (H2O)',
    equation: '2H2 + O2 → 2H2O + Energy',
    resultEmoji: '💧',
    callout: 'Pani ban gaya!',
    explanation: 'Do Hydrogen aur ek Oxygen atom bond banakar Rocket Fuel energy ke saath pure Paani banate hain!',
    liquidColor: '#38BDF8',
  },
  [pairKey('carbon', 'oxygen')]: {
    id: 'rxn-co2',
    title: 'Carbon Dioxide (CO2)',
    equation: 'C + O2 → CO2',
    resultEmoji: '🫧',
    callout: 'Fizz Gas Ban Gayi!',
    explanation: 'Carbon oxygen ke saath jal kar CO2 gas banata hai — cold drinks ka fizz aur plants ka khana!',
    liquidColor: '#A78BFA',
  },
  [pairKey('sodium', 'chlorine')]: {
    id: 'rxn-nacl',
    title: 'Table Salt (NaCl)',
    equation: '2Na + Cl2 → 2NaCl',
    resultEmoji: '🧂',
    callout: 'Ionic Crystal Magic!',
    explanation: 'Explosive Sodium aur zeherili Chlorine ek electron share karke harmless khane ka Namak ban jaate hain!',
    liquidColor: '#FDE047',
  },
  [pairKey('soap-base', 'perfume')]: {
    id: 'rxn-soap',
    title: 'Scented Soap',
    equation: 'Soap Base + Esters → Fragrant Soap',
    resultEmoji: '🧼',
    callout: 'Khushbudar Sabun Ready!',
    explanation: 'Saponified soap base mein aromatic esters milne se germ-killer fragrant Soap banta hai!',
    liquidColor: '#F472B6',
  },
  [pairKey('vinegar', 'baking-soda')]: {
    id: 'rxn-volcano',
    title: 'CO2 Volcano Fizz',
    equation: 'CH3COOH + NaHCO3 → CO2↑ + H2O',
    resultEmoji: '🌋',
    callout: 'FIZZ VOLCANO!',
    explanation: 'Kitchen Acid (Sirka) aur Base (Baking Soda) milte hi tez CO2 bubbles ubal padte hain!',
    liquidColor: '#FB923C',
  },
  [pairKey('sulfur', 'oxygen')]: {
    id: 'rxn-so2',
    title: 'Sulfur Dioxide (SO2)',
    equation: 'S + O2 → SO2',
    resultEmoji: '💨',
    callout: 'Sulfuric Acid Step 1!',
    explanation: 'Sulfur ko oxygen mein jalane se SO2 gas banti hai jo Sulfuric Acid banane ka pehla step hai!',
    liquidColor: '#FACC15',
  },
  [pairKey('acid', 'water')]: {
    id: 'rxn-dilute-acid',
    title: 'Dilute Electrolyte',
    equation: 'H2SO4 + H2O → H3O⁺ + HSO4⁻',
    resultEmoji: '🔋',
    callout: 'Battery Electrolyte Ready!',
    explanation: 'Paani mein acid milane par free H⁺ ions bante hain jo battery mein bijli chalane ke kaam aate hain!',
    liquidColor: '#60A5FA',
  },
  [pairKey('water', 'salt')]: {
    id: 'rxn-brine',
    title: 'Conductive Brine Solution',
    equation: 'NaCl + H2O → Na⁺(aq) + Cl⁻(aq)',
    resultEmoji: '⚡',
    callout: 'Salt Water Conducts!',
    explanation: 'Paani mein namak ghulne se Na⁺ aur Cl⁻ ions azad hokar electricity conduct karte hain!',
    liquidColor: '#2DD4BF',
  },
};

export function evaluateChemicalMix(chemA: string, chemB: string): ChemicalMixResult | null {
  if (chemA === chemB) return null;
  return CHEMICAL_REACTIONS[pairKey(chemA, chemB)] ?? null;
}
