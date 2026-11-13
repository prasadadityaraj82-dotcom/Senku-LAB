export type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Expert';

export type DiagramKind =
  | 'tool_craft'
  | 'fire_combustion'
  | 'fiber_pottery'
  | 'smelt_furnace'
  | 'crystal_mineral'
  | 'chem_reaction'
  | 'circuit_power'
  | 'electromagnet_motor'
  | 'optics_waves'
  | 'thermal_cycle'
  | 'rocket_propulsion'
  | 'digital_signal'
  | 'space_future';

export interface ProcessStep {
  title: string;
  detail: string;
}

export interface ScienceItem {
  id: string;
  eraId: number;
  name: string;
  hindiName: string;
  iconKey: string;
  difficulty: Difficulty;
  xp: number;
  coins: number;
  diagramKind: DiagramKind;
  diagramLabels: {
    input: string;
    process: string;
    output: string;
    formula: string;
  };
  senkuIntro: string;
  kyaHai: string;
  steps: [ProcessStep, ProcessStep, ProcessStep, ProcessStep, ProcessStep];
  kyuMaterial: {
    material: string;
    reason: string;
  };
  funFact: string;
  gharPeTry: {
    title: string;
    materials: string;
    instructions: string;
    safety: string;
  };
}

export interface Era {
  id: number;
  code: string;
  title: string;
  hindiSubtitle: string;
  description: string;
  accentColor: 'green' | 'orange';
  items: ScienceItem[];
}

export interface DailyExperiment {
  id: string;
  title: string;
  category: string;
  timeMinutes: number;
  materials: string[];
  steps: string[];
  scienceBehind: string;
  safetyNote: string;
}

export interface QuizQuestion {
  id: string;
  eraId: number;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
}

export interface CreatedInvention {
  id: string;
  name: string;
  emoji: string;
  ingredients: [string, string];
  isCustomDiscovery: boolean;
  createdAt: string;
}

export interface DiscoveredReaction {
  id: string;
  title: string;
  equation: string;
  resultEmoji: string;
  callout: string;
  chemicals: [string, string];
  discoveredAt: string;
}

export type AdventureMiniGameKind =
  | 'tap_build'
  | 'hold_rub'
  | 'sequence_assemble'
  | 'mix_reaction'
  | 'timing_action'
  | 'flowchart_cure'
  | 'boss_battle';

export interface AdventureBossQuestion {
  prompt: string;
  options: [string, string, string, string];
  correctIndex: number;
  attackLine: string;
}

export interface AdventureLevel {
  level: number;
  phaseId: number;
  title: string;
  hindiSubtitle: string;
  emoji: string;
  isBoss?: boolean;
  xpReward: number;
  coinReward: number;
  senkuDialogue: string;
  taskPrompt: string;
  miniGameKind: AdventureMiniGameKind;
  timeLimitSec?: number;
  // Config fields used depending on miniGameKind
  tapTarget?: number;
  tapActionLabel?: string;
  stageEmojis?: string[];
  sequenceSteps?: Array<{ id: string; label: string; emoji: string }>;
  mixOptions?: Array<{ id: string; label: string; emoji: string; formula?: string }>;
  correctMixIds?: [string, string];
  mixResultText?: string;
  mixDangerMode?: boolean;
  timingMode?: 'trap' | 'gas_dodge' | 'frequency' | 'photo' | 'drone' | 'sonar' | 'countdown';
  timingTargetLabel?: string;
  flowchartNodes?: Array<{ id: string; label: string; emoji: string }>;
  bossEnemyName?: string;
  bossEnemyEmoji?: string;
  bossQuestions?: AdventureBossQuestion[];
  finalCraftCombo?: {
    parts: Array<{ id: string; label: string; emoji: string }>;
    correctIds: string[];
    resultName: string;
  };
  cutsceneTitle?: string;
  cutsceneText?: string;
}

export interface AdventurePhase {
  id: number;
  title: string;
  subtitle: string;
  badgeColor: string;
  emoji: string;
  levelRange: [number, number];
}

export type RecipeCategory =
  | 'Chemistry'
  | 'Metals'
  | 'Food'
  | 'Electricity'
  | 'Machines'
  | 'Survival';

export type RecipeSafety = 'Safe' | 'Dhyan Se' | 'Khatarnak';
export type RecipeDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface RecipeEntry {
  id: string;
  category: RecipeCategory;
  name: string;
  emoji: string;
  ingredients: string[];
  ingredientEmojis: string[];
  finalProduct: string;
  difficulty: RecipeDifficulty;
  xpReward: number;
  stepsHindi: [string, string, string];
  senkuTip: string;
  safety: RecipeSafety;
}

export interface PlayerProgress {
  xp: number;
  coins: number;
  streak: number;
  lastActiveDate: string;
  completedItemIds: string[];
  dailyCompletedDates: string[];
  quizSessionsCompleted: number;
  quizBestScore: number;
  muted: boolean;
  inventions: CreatedInvention[];
  discoveredReactions: DiscoveredReaction[];
  craftedElementSymbols: string[];
  adventureCompletedLevels: number[];
  senkuTrophyEarned: boolean;
  learnedRecipeIds: string[];
}
