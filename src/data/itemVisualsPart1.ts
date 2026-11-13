export interface RecipeIngredient {
  emoji: string;
  label: string;
  itemId?: string;
}

export interface MaterialTest {
  rightLabel: string;
  rightSticker: string;
  rightOutcome: string;
  wrongLabel: string;
  wrongSticker: string;
  wrongOutcome: string;
}

export interface XrayPart {
  label: string;
  detail: string;
}

export type BuildVisualType =
  | 'stone_blade'
  | 'wood_axe'
  | 'fire_camp'
  | 'rope_twist'
  | 'clay_pot'
  | 'a_frame_shelter'
  | 'spear_craft'
  | 'bow_arrow'
  | 'smelt_metal'
  | 'electrolysis_metal'
  | 'steel_quench'
  | 'panning_gold'
  | 'crystal_compress'
  | 'acid_flask'
  | 'soap_bars'
  | 'glass_blow'
  | 'polymer_chain'
  | 'cement_block'
  | 'distill_perfume'
  | 'powder_mix'
  | 'battery_cell'
  | 'wire_draw'
  | 'light_bulb'
  | 'fuse_link'
  | 'switch_gate'
  | 'led_diode'
  | 'torch_beam'
  | 'electric_motor'
  | 'fan_blades'
  | 'solar_cell'
  | 'speaker_wave'
  | 'mic_wave'
  | 'camera_lens'
  | 'telescope_tubes'
  | 'microscope_lens'
  | 'bicycle_gear'
  | 'fridge_cycle'
  | 'microchip_wafer'
  | 'rocket_launch'
  | 'signal_wave'
  | 'fiber_light'
  | 'satellite_orbit'
  | 'smartphone_layers'
  | 'fusion_tokamak'
  | 'hydroponic_jar'
  | 'printer_3d'
  | 'mars_dome';

export interface ItemVisualMeta {
  recipe: RecipeIngredient[];
  materialTest: MaterialTest;
  xrayParts: [XrayPart, XrayPart, XrayPart];
  stageResults: [string, string, string, string, string];
  visualType: BuildVisualType;
}

export const ITEM_VISUALS_PART_1: Record<string, ItemVisualMeta> = {
  'stone-tools': {
    recipe: [
      { emoji: '🪨', label: 'Flint Rock' },
      { emoji: '🪨', label: 'Hammer Stone' },
    ],
    materialTest: {
      rightLabel: 'Try Flint Stone',
      rightSticker: 'SLICE! ✨',
      rightOutcome: 'Curved conchoidal edge banti hai — razor-sharp blade ready!',
      wrongLabel: 'Try Soft Chalk',
      wrongSticker: 'CRUMBLE! 💥',
      wrongOutcome: 'Maarte hi chalk safed powder ban kar bikhar jaata hai!',
    },
    xrayParts: [
      { label: 'Razor Flake Edge', detail: '45° angled micro-sharp cutting edge' },
      { label: 'Conchoidal Curves', detail: 'Wave-like shock marks that stay sharp' },
      { label: 'Thumb Grip Spine', detail: 'Thick flat back so hand stays safe' },
    ],
    stageResults: [
      'Raw oval Flint patthar chuna',
      'Heavy round Hammer Stone ready',
      '45° angle strike — pehla chip nikla!',
      'Dono side se sharp flakes hataye',
      'Razor-sharp Stone Blade taiyar!',
    ],
    visualType: 'stone_blade',
  },
  'wood-tools': {
    recipe: [
      { emoji: '🪵', label: 'Hardwood Branch' },
      { emoji: '🔪', label: 'Stone Blade', itemId: 'stone-tools' },
    ],
    materialTest: {
      rightLabel: 'Try Dry Hardwood',
      rightSticker: 'SOLID! 💪',
      rightOutcome: 'Tight dry cellulose fibers heavy shock bina toote jhel lete hain!',
      wrongLabel: 'Try Wet Green Twig',
      wrongSticker: 'BEND! 〰️',
      wrongOutcome: 'Geeli lakdi naram hokar mud jaati hai aur sukhne par crack hoti hai!',
    },
    xrayParts: [
      { label: 'Fire-Hardened Tip', detail: 'Moisture removed by heat for extra stiffness' },
      { label: 'Notched Head Slot', detail: 'Holds stone head tight without slipping' },
      { label: 'Ergonomic Lever Handle', detail: 'Multiplies swing torque 5x' },
    ],
    stageResults: [
      'Seedhi sukhi hardwood daali mili',
      'Upar ki geeli bark chheel kar hatayi',
      'Top par tool head ke liye notch kaata',
      'Aag ke paas sek kar tip hard ki',
      'Balanced Lever Handle ready!',
    ],
    visualType: 'wood_axe',
  },
  fire: {
    recipe: [
      { emoji: '🪵', label: 'Wood Tools', itemId: 'wood-tools' },
      { emoji: '🌾', label: 'Dry Grass' },
      { emoji: '🌬️', label: 'Oxygen Air' },
    ],
    materialTest: {
      rightLabel: 'Try Dry Grass Tinder',
      rightSticker: 'IGNITE! 🔥',
      rightOutcome: 'High surface area + kam moisture = 250°C par turant flame!',
      wrongLabel: 'Try Thick Wet Log',
      wrongSticker: 'SMOKE! 💨',
      wrongOutcome: 'Paani heat ko absorb kar leta hai, 250°C ignition tak pahunchta hi nahi!',
    },
    xrayParts: [
      { label: 'Glowing Blue Core', detail: 'Hottest zone (~1,400°C) with complete O2 mix' },
      { label: 'Orange Carbon Flame', detail: 'Tiny glowing soot particles giving light' },
      { label: 'Charcoal Ember Bed', detail: 'Steady heat fuel base' },
    ],
    stageResults: [
      'Sukhi ghaas ka tinder nest bana',
      'Fireboard mein V-notch kaata',
      'Spindle tez ghumane se friction heat badhi',
      '250°C par kaali dhool mein red ember chamka!',
      'Halki phoonk se O2 mili — BOOM! Aag jal uthi!',
    ],
    visualType: 'fire_camp',
  },
  rope: {
    recipe: [
      { emoji: '🌴', label: 'Plant Fibers' },
      { emoji: '🪨', label: 'Stone Tools', itemId: 'stone-tools' },
    ],
    materialTest: {
      rightLabel: 'Try Reverse-Twist 2 Strands',
      rightSticker: 'LOCKED! 🪢',
      rightOutcome: 'Opposite spring tension ek dusre ko lock karke 10x strength deti hai!',
      wrongLabel: 'Try Straight Un-Twisted Fibers',
      wrongSticker: 'SNAP! ✂️',
      wrongOutcome: 'Reshe ek ek karke fisal kar turant toot jaate hain!',
    },
    xrayParts: [
      { label: 'Twin Helical Strands', detail: 'Twisted clockwise individually' },
      { label: 'Counter-Twist Lock', detail: 'Wound anti-clockwise together so it never unravels' },
      { label: 'High-Friction Core', detail: 'Pulling harder tightens the grip' },
    ],
    stageResults: [
      'Nariyal/bark ke lambe fibers nikale',
      'Fibers ko clockwise twist kar strand bana',
      'Do barabar strands saath rakhe',
      'Opposite direction mein reverse-twist kiya',
      'Super-strong high-tensile Rope ready!',
    ],
    visualType: 'rope_twist',
  },
  'clay-pot': {
    recipe: [
      { emoji: '🪨', label: 'Wet Clay + Sand' },
      { emoji: '🔥', label: 'Fire (800°C)', itemId: 'fire' },
    ],
    materialTest: {
      rightLabel: 'Bake at 800°C Kiln',
      rightSticker: 'CERAMIC! 🏺',
      rightOutcome: 'Clay particles sinter hokar waterproof stone-hard ghada ban jaate hain!',
      wrongLabel: 'Dry Only in Sunlight',
      wrongSticker: 'MELT! 💧',
      wrongOutcome: 'Paani daalte hi dhoop mein sukhi mitti wapas keechad ban jaati hai!',
    },
    xrayParts: [
      { label: 'Vitrified Clay Wall', detail: '800°C heat fused particles permanently' },
      { label: 'Microscopic Pores', detail: 'Allows tiny evaporation to keep water cool' },
      { label: 'Sand Temper Grains', detail: 'Prevents cracking while drying' },
    ],
    stageResults: [
      'Kankad chhaan kar smooth clay li',
      'Air bubbles nikalne ke liye mitti goothi',
      'Coils jod kar gol pot shape diya',
      'Chaav mein dheere-dheere sukhaya',
      '800°C aag mein pak kar waterproof Ceramic bana!',
    ],
    visualType: 'clay_pot',
  },
  shelter: {
    recipe: [
      { emoji: '🪵', label: 'Wood Tools', itemId: 'wood-tools' },
      { emoji: '🪢', label: 'Rope', itemId: 'rope' },
      { emoji: '🍃', label: 'Leaves' },
    ],
    materialTest: {
      rightLabel: 'Try Triangle A-Frame',
      rightSticker: 'ROCK SOLID! ⛺',
      rightOutcome: 'Triangle geometry load ko dono taraf distribute karti hai — zero wobble!',
      wrongLabel: 'Try Loose Square Box',
      wrongSticker: 'COLLAPSE! 💨',
      wrongOutcome: 'Tez hawa aate hi square frame side mein jhuk kar gir jaata hai!',
    },
    xrayParts: [
      { label: 'Triangle Truss Frame', detail: 'Rigid geometry resists wind push' },
      { label: 'Overlapping Leaf Roof', detail: 'Shingles shed rain downward like tiles' },
      { label: 'Dry Leaf Floor Bed', detail: 'Traps air to stop ground heat loss' },
    ],
    stageResults: [
      'Oonchi sukhi safe zameen chuni',
      '3 poles baandh kar Triangle Tripod khada kiya',
      '45° slope par lambi ridge beam lagayi',
      'Neeche se upar overlapping patte bichaaye',
      'Dry floor insulation ke saath Camp ready!',
    ],
    visualType: 'a_frame_shelter',
  },
  spear: {
    recipe: [
      { emoji: '🪵', label: 'Wood Shaft', itemId: 'wood-tools' },
      { emoji: '🪨', label: 'Stone Tip', itemId: 'stone-tools' },
      { emoji: '🪢', label: 'Rope', itemId: 'rope' },
    ],
    materialTest: {
      rightLabel: 'Balance Front-Heavy (1/3)',
      rightSticker: 'BULLSEYE! 🎯',
      rightOutcome: 'Aage Center of Mass hone se spear hawa mein seedhi nose-first udti hai!',
      wrongLabel: 'Balance Tail-Heavy',
      wrongSticker: 'TUMBLE! 🌀',
      wrongOutcome: 'Hawa mein phekte hi spear gol-gol ghoom kar gir jaati hai!',
    },
    xrayParts: [
      { label: 'Symmetrical Flint Tip', detail: 'Focuses KE = ½mv² on tiny point' },
      { label: 'Resin + Cord Binding', detail: 'Locks stone tightly inside split wood' },
      { label: '1/3 Front Balance Point', detail: 'Keeps flight straight like a dart' },
    ],
    stageResults: [
      '6ft seedhi halki lakdi chuni',
      'Leaf-shaped flint spearhead banaya',
      'Wood tip mein split notch kaata',
      'Pine resin + rassi se tight baandha',
      '1/3 front balance par aerodynamic Spear ready!',
    ],
    visualType: 'spear_craft',
  },
  'bow-arrow': {
    recipe: [
      { emoji: '🪵', label: 'Flexible Wood', itemId: 'wood-tools' },
      { emoji: '🪢', label: 'Rope String', itemId: 'rope' },
      { emoji: '🔱', label: 'Spear Tech', itemId: 'spear' },
    ],
    materialTest: {
      rightLabel: 'Try Non-Stretch String + Springy Wood',
      rightSticker: 'ZOOM! 🏹',
      rightOutcome: 'Wood bend hone mein elastic energy store hoti hai → 200 km/h arrow!',
      wrongLabel: 'Try Stretchy Rubber String',
      wrongSticker: 'FIZZLE! 🐌',
      wrongOutcome: 'Rubber khud energy heat mein waste kar deta hai, teer slow girta hai!',
    },
    xrayParts: [
      { label: 'Tillered Bow Limbs', detail: 'Bends smoothly to store ½kx² energy' },
      { label: 'Low-Stretch Bowstring', detail: 'Transfers 100% snap-back force to arrow' },
      { label: 'Fletched Feathers', detail: 'Spins & stabilizes arrow in mid-air' },
    ],
    stageResults: [
      'Lachili bamboo/ash stave chuni',
      'Dono ends barabar bend (Tillering) kiye',
      'Low-stretch rassi string lagayi',
      'Teer ke peeche stabilizing feathers lagaye',
      'Draw & Release — Elastic Energy Bow ready!',
    ],
    visualType: 'bow_arrow',
  },
  iron: {
    recipe: [
      { emoji: '🧲', label: 'Iron Sand' },
      { emoji: '⚫', label: 'Charcoal' },
      { emoji: '🔥', label: 'Fire (1500°C)', itemId: 'fire' },
    ],
    materialTest: {
      rightLabel: 'Smelt with Charcoal (1,538°C)',
      rightSticker: 'FORGED! ⚒️',
      rightOutcome: 'Carbon Iron Oxide se oxygen chheen kar pure shining Iron chhodta hai!',
      wrongLabel: 'Heat Ore Without Charcoal',
      wrongSticker: 'STUCK! 🪨',
      wrongOutcome: 'Oxygen alag hi nahi hogi — sirf garam laal mitti bachegi!',
    },
    xrayParts: [
      { label: 'Pure Iron Core (Fe)', detail: 'Oxygen stripped away by CO gas' },
      { label: 'Slag Impurity Layer', detail: 'Light silicate waste squeezed out by hammer' },
      { label: 'Bellows Air Blast', detail: 'Pumps O2 to hit 1,500°C+' },
    ],
    stageResults: [
      'Magnet se kaali Iron Sand collect ki',
      'Mitti ki tall chimney bhatti banayi',
      'Charcoal aur Iron Ore ki layers bhari',
      'Tez hawa blast se 1,500°C par smelt kiya',
      'Hathode se slag nikal kar Pure Iron bar ready!',
    ],
    visualType: 'smelt_metal',
  },
  copper: {
    recipe: [
      { emoji: '💚', label: 'Malachite Ore' },
      { emoji: '🏺', label: 'Clay Crucible', itemId: 'clay-pot' },
      { emoji: '🔥', label: 'Fire (1085°C)', itemId: 'fire' },
    ],
    materialTest: {
      rightLabel: 'Use Copper for Wires',
      rightSticker: 'FLOWS! ⚡',
      rightOutcome: 'Free electrons bina ruke daudte hain — 6x kam resistance!',
      wrongLabel: 'Use Iron for Wires',
      wrongSticker: 'HOT! 🌡️',
      wrongOutcome: 'High resistance se wire garam hokar bijli waste aur rust ho jaata hai!',
    },
    xrayParts: [
      { label: 'Metallic Copper Sea', detail: 'Outer free electrons flow effortlessly' },
      { label: 'Ductile Crystal Grains', detail: 'Stretches into thin wire without snapping' },
      { label: 'Protective Green Patina', detail: 'Surface oxide stops deep rusting' },
    ],
    stageResults: [
      'Hara Malachite copper patthar dhunda',
      'Ore ko pees kar fine powder banaya',
      'Crucible mein charcoal ke saath 1,085°C heat diya',
      'Pighla laal-chamakdar copper mold mein daala',
      'Peet kar flexible Copper sheet & wire ready!',
    ],
    visualType: 'smelt_metal',
  },
  aluminium: {
    recipe: [
      { emoji: '🪨', label: 'Bauxite Ore' },
      { emoji: '⚡', label: 'High Electricity' },
    ],
    materialTest: {
      rightLabel: 'Build Airplane with Aluminium',
      rightSticker: 'FLY HIGH! ✈️',
      rightOutcome: 'Steel se 3x halka aur hawa mein rust-proof oxide shield banata hai!',
      wrongLabel: 'Build Airplane with Pure Iron',
      wrongSticker: 'TOO HEAVY! 🪨',
      wrongOutcome: '3x zyada wazan hone se plane runway se ud hi nahi payega!',
    },
    xrayParts: [
      { label: 'Lightweight Al Core', detail: 'Only 2.7 g/cm³ density (1/3rd of Steel)' },
      { label: 'Invisible Oxide Skin', detail: '2nm Al2O3 coat blocks corrosion forever' },
      { label: 'Cryolite Bath Cell', detail: 'Lowers melting temp from 2,000°C to 950°C' },
    ],
    stageResults: [
      'Laal Bauxite ore mining kiya',
      'Safed Alumina powder purify kiya',
      'Cryolite bath mein 950°C par ghola',
      'Heavy electric current se Electrolysis kiya',
      'Halka aur rust-free Aluminium sheet ready!',
    ],
    visualType: 'electrolysis_metal',
  },
  steel: {
    recipe: [
      { emoji: '⚒️', label: 'Iron (99%)', itemId: 'iron' },
      { emoji: '⚫', label: 'Carbon (1%)' },
    ],
    materialTest: {
      rightLabel: 'Add 1% Carbon + Quench',
      rightSticker: 'UNBREAKABLE! 🛡️',
      rightOutcome: 'Carbon atoms iron layers ko lock kar dete hain — mega-strong Steel!',
      wrongLabel: 'Add 5% Carbon (Too Much)',
      wrongSticker: 'CRACK! 💥',
      wrongOutcome: 'Zyada carbon se metal glass ki tarah brittle hokar toot jaata hai!',
    },
    xrayParts: [
      { label: 'Iron Crystal Lattice', detail: 'Strong metallic framework' },
      { label: '1% Locked Carbon Atoms', detail: 'Stop atomic layers from slipping' },
      { label: 'Quenched Surface', detail: 'Fast water cooling locks ultra-hard skin' },
    ],
    stageResults: [
      'Kachha pig iron bhatti mein pighlaya',
      'Oxygen blast se extra carbon hataya',
      'Exact 1% Carbon mix kiya',
      'Laal-garam steel ko peet kar shape diya',
      'Paani mein Quench karke Faulad (Steel) ready!',
    ],
    visualType: 'steel_quench',
  },
  gold: {
    recipe: [
      { emoji: '🏞️', label: 'River Gravel' },
      { emoji: '🔥', label: 'Furnace (1064°C)', itemId: 'fire' },
    ],
    materialTest: {
      rightLabel: 'Coat Chip Pins with Gold',
      rightSticker: 'FOREVER! 👑',
      rightOutcome: 'Gold kabhi oxidize (kaala) nahi hota — 100 saal baad bhi zero signal loss!',
      wrongLabel: 'Coat Chip Pins with Iron',
      wrongSticker: 'RUSTED! 🟤',
      wrongOutcome: 'Hawa ki nami se iron pins par zang lag kar chip dead ho jayegi!',
    },
    xrayParts: [
      { label: 'High Density (19.3 g/cm³)', detail: '7x heavier than sand so it sinks fast' },
      { label: 'Noble Electron Shell', detail: 'Never reacts with air, water, or normal acids' },
      { label: 'Ultra-Malleable Foil', detail: '1 gram beats into 1 square meter sheet' },
    ],
    stageResults: [
      'Nadi ke mod par gravel ikattha kiya',
      'Thali mein ghumaya — bhari gold neeche baitha',
      'Magnet se black iron sand alag ki',
      'Borax flux ke saath 1,064°C par pighlaya',
      '99.9% pure 24K Gold ingot taiyar!',
    ],
    visualType: 'panning_gold',
  },
  silver: {
    recipe: [
      { emoji: '⛏️', label: 'Silver Ore' },
      { emoji: '🔥', label: 'Cupel Furnace', itemId: 'fire' },
    ],
    materialTest: {
      rightLabel: 'Silver Coating on Mirror',
      rightSticker: '95% SHINE! ✨',
      rightOutcome: 'Silver visible light ka 95%+ reflect karta hai — crystal clear mirror!',
      wrongLabel: 'Raw Steel Mirror',
      wrongSticker: 'DIM! 🌫️',
      wrongOutcome: 'Steel sirf ~55% light reflect karta hai, image dull aur dark dikhegi!',
    },
    xrayParts: [
      { label: '95% Reflective Layer', detail: 'Highest optical reflection of all metals' },
      { label: '#1 Electrical Conductor', detail: 'Lowest electron resistance on Periodic Table' },
      { label: 'Antibacterial Ions', detail: 'Disrupts microbe cell walls naturally' },
    ],
    stageResults: [
      'Argentite/Galena silver ore nikala',
      'Roast karke sulfur gas udayi',
      'Bone-ash cupel mein 1,000°C par garam kiya',
      'Lead oxidize hokar absorb ho gaya',
      'Chamakdar Pure Silver button taiyar!',
    ],
    visualType: 'smelt_metal',
  },
  coal: {
    recipe: [
      { emoji: '🌿', label: 'Ancient Plants' },
      { emoji: '⛰️', label: '300M Yrs Pressure' },
    ],
    materialTest: {
      rightLabel: 'Smelt Iron with Coal/Coke',
      rightSticker: '1500°C! 🔥',
      rightOutcome: '90% Carbon energy density aasani se loha pighlane ki heat deti hai!',
      wrongLabel: 'Smelt Iron with Fresh Wood',
      wrongSticker: 'TOO COOL! 🌡️',
      wrongOutcome: 'Lakdi ka paani temperature ko ~850°C par rok deta hai — loha nahi pighlega!',
    },
    xrayParts: [
      { label: 'Dense Carbon Matrix', detail: '80–95% pure packed carbon energy' },
      { label: 'Low Moisture Core', detail: 'Burns far hotter than wood' },
      { label: 'Coke Porous Form', detail: 'Lets air blast pass right through ore' },
    ],
    stageResults: [
      'Purane swamps mein dead plants dabe',
      'Mitti aur rock layers ka wazan badha',
      'Heat + pressure se paani aur gases niklin',
      '90% Carbon wala hard Anthracite bana',
      'Bina hawa garam kar Coke fuel ready!',
    ],
    visualType: 'crystal_compress',
  },
  diamond: {
    recipe: [
      { emoji: '⚫', label: 'Pure Carbon', itemId: 'coal' },
      { emoji: '💥', label: '50,000 atm Pressure' },
    ],
    materialTest: {
      rightLabel: 'Use Diamond Drill Tip',
      rightSticker: 'CUTS ALL! 💎',
      rightOutcome: 'Mohs 10/10 3D tetrahedral lattice granite aur glass ko makkhan ki tarah kaat-ta hai!',
      wrongLabel: 'Use Graphite Pencil Tip',
      wrongSticker: 'SMUDGE! ✏️',
      wrongOutcome: 'Graphite ke flat carbon sheets fisal kar paper par sirf line chhodte hain!',
    },
    xrayParts: [
      { label: '3D Tetrahedral sp³ Bonds', detail: 'Every carbon locked tightly to 4 neighbors' },
      { label: '58 Light Facets', detail: 'Bounces light inside (Total Internal Reflection)' },
      { label: 'Mohs 10 Hardness', detail: 'Hardest natural crystal on Earth' },
    ],
    stageResults: [
      'Mantle ke 150km neeche Carbon jama hua',
      '50,000 atm crushing pressure laga',
      'Carbon atoms 3D tetrahedral crystal mein jude',
      'Kimberlite volcano ne surface par launch kiya',
      '58 angles cut — dazzling Diamond ready!',
    ],
    visualType: 'crystal_compress',
  },
  marble: {
    recipe: [
      { emoji: '🐚', label: 'Sea Shells (CaCO3)' },
      { emoji: '🌋', label: 'Heat + Pressure' },
    ],
    materialTest: {
      rightLabel: 'Clean Marble with Mild Soap',
      rightSticker: 'GLOSSY! 🏛️',
      rightOutcome: 'Neutral soap CaCO3 crystals ko bina damage kiye chamka deta hai!',
      wrongLabel: 'Pour Strong Acid on Marble',
      wrongSticker: 'FIZZ ROT! 🫧',
      wrongOutcome: 'Acid CaCO3 ko react karke CO2 bubbles mein badal kar surface kharab kar deta hai!',
    },
    xrayParts: [
      { label: 'Interlocking Calcite', detail: 'Re-crystallized CaCO3 grains' },
      { label: 'Translucent Glow', detail: 'Light enters 2–3mm giving statue warmth' },
      { label: 'Mineral Vein Lines', detail: 'Iron & clay impurities create patterns' },
    ],
    stageResults: [
      'Samundar shells se Limestone jama hua',
      'Tectonic plates ne rock ko neeche dabaya',
      'Heat + pressure se interlocking crystals bane',
      'Minerals se colourful veins patterns aaye',
      'Cut & Polish — Taj Mahal style Marble ready!',
    ],
    visualType: 'crystal_compress',
  },
  sand: {
    recipe: [
      { emoji: '⛰️', label: 'Quartz Rock' },
      { emoji: '🌊', label: 'River Grinding' },
    ],
    materialTest: {
      rightLabel: 'Extract Silicon from Silica Sand',
      rightSticker: 'CHIPS! 💻',
      rightOutcome: 'SiO2 se nikla pure Silicon duniya ka #1 computer chip semiconductor hai!',
      wrongLabel: 'Use Normal Mud / Clay',
      wrongSticker: 'IMPURE! 🟤',
      wrongOutcome: 'Mitti mein iron aur organic kachra hota hai — na glass saaf banega na chip!',
    },
    xrayParts: [
      { label: 'SiO2 Quartz Grains', detail: 'Hard mineral left after erosion' },
      { label: 'Silicon Atom Core', detail: '4 valence electrons — perfect semiconductor' },
      { label: 'High Melting Base', detail: 'Forms transparent glass when cooled fast' },
    ],
    stageResults: [
      'Baarish aur dhoop se granite pahad toote',
      'Nadi ne soft minerals ghool kar quartz chhoda',
      'Dho kar white Silica Sand alag ki',
      '1,700°C par pighlao toh Glass base bana',
      'Carbon reduction se Pure Silicon chips base ready!',
    ],
    visualType: 'panning_gold',
  },
  acid: {
    recipe: [
      { emoji: '💛', label: 'Sulfur' },
      { emoji: '🔥', label: 'Fire', itemId: 'fire' },
      { emoji: '💧', label: 'Water' },
    ],
    materialTest: {
      rightLabel: 'Pour Acid Slowly into Water',
      rightSticker: 'SAFE MIX! 🧪',
      rightOutcome: 'Bada paani heat absorb kar leta hai — controlled Sulfuric Acid ready!',
      wrongLabel: 'Pour Water into Strong Acid',
      wrongSticker: 'SPLASH! 💥',
      wrongOutcome: 'Extreme heat se paani turant boil hokar acid bahar uछal sakta hai!',
    },
    xrayParts: [
      { label: 'Free H⁺ Ions', detail: 'Reactive hydrogen ions (pH < 7)' },
      { label: 'Sulfate Group (SO4²⁻)', detail: 'Carries charge inside car batteries' },
      { label: 'Glass Flask Shield', detail: 'Acid cannot dissolve SiO2 glass' },
    ],
    stageResults: [
      'Hot spring se peela Sulfur collect kiya',
      'Sulfur jala kar SO2 gas banayi',
      'Catalyst se SO2 ko SO3 mein oxidize kiya',
      'Controlled tarike se paani mein absorb kiya',
      'King of Chemicals H2SO4 Acid ready!',
    ],
    visualType: 'acid_flask',
  },
  base: {
    recipe: [
      { emoji: '🪵', label: 'Wood Ash' },
      { emoji: '💧', label: 'Water' },
    ],
    materialTest: {
      rightLabel: 'Neutralize Acid Spill with Base',
      rightSticker: 'SAFE! 💧',
      rightOutcome: 'Acid + Base milkar harmless Salt aur Paani bana dete hain (pH = 7)!',
      wrongLabel: 'Mix Strong Acid + Pure Water Only',
      wrongSticker: 'STILL ACID! ⚠️',
      wrongOutcome: 'Paani sirf dilute karta hai, pH 7 neutralize nahi kar sakta!',
    },
    xrayParts: [
      { label: 'Hydroxide Ions (OH⁻)', detail: 'Grabs H⁺ ions & breaks down grease' },
      { label: 'Potash / NaOH Core', detail: 'Derived from wood ash & lime' },
      { label: 'pH > 7 Alkaline Scale', detail: 'Turns turmeric deep red' },
    ],
    stageResults: [
      'Jali hui lakdi ki safed raakh ikattha ki',
      'Paani mein ghol kar chhana (Potash Lye)',
      'Chuna (Quicklime) + Paani mila kar react kiya',
      'Strong Caustic Soda (NaOH) bana',
      'pH > 7 Alkaline Base solution ready!',
    ],
    visualType: 'acid_flask',
  },
  salt: {
    recipe: [
      { emoji: '🌊', label: 'Seawater' },
      { emoji: '☀️', label: 'Sunlight Heat' },
    ],
    materialTest: {
      rightLabel: 'Evaporate Brine Slowly',
      rightSticker: 'CUBES! 🧂',
      rightOutcome: 'Na⁺ aur Cl⁻ ions perfect 90° cubic crystal lattice mein jam jaate hain!',
      wrongLabel: 'Eat Raw Metallic Sodium + Chlorine',
      wrongSticker: 'TOXIC! ☠️',
      wrongOutcome: 'Pure Sodium paani mein phat-ta hai aur Chlorine zeherili gas hai!',
    },
    xrayParts: [
      { label: 'Na⁺ + Cl⁻ Ionic Grid', detail: 'Alternating + and - ions locked tight' },
      { label: '90° Cubic Symmetry', detail: 'Every crystal grows as tiny cubes' },
      { label: 'Trace Iodine Add-on', detail: 'Keeps human thyroid healthy' },
    ],
    stageResults: [
      'Samundar ka khara paani shallow pan mein bhara',
      'Dhoop se paani vapor ban kar uda',
      'Saturation par Na⁺ aur Cl⁻ paas aaye',
      'Perfect tiny square Cube Crystals bane',
      'Wash & Iodize — Pure Table Salt ready!',
    ],
    visualType: 'crystal_compress',
  },
  soap: {
    recipe: [
      { emoji: '🌻', label: 'Plant Oil' },
      { emoji: '🧼', label: 'Base (Lye)', itemId: 'base' },
    ],
    materialTest: {
      rightLabel: 'Wash Hands with Soap + Water',
      rightSticker: 'GERMS GONE! 🫧',
      rightOutcome: 'Soap ki tail virus ki fat layer phaad kar paani ke saath baha deti hai!',
      wrongLabel: 'Wash Oily Hands with Plain Water',
      wrongSticker: 'STILL OILY! 🛢️',
      wrongOutcome: 'Tel aur paani mix hi nahi hote — germs chipke rehte hain!',
    },
    xrayParts: [
      { label: 'Oil-Loving Tail', detail: 'Dives into grease & breaks virus membranes' },
      { label: 'Water-Loving Head', detail: 'Pulls trapped dirt away with rinse water' },
      { label: 'Glycerin Byproduct', detail: 'Keeps skin soft & moisturized' },
    ],
    stageResults: [
      'Nariyal ya olive oil select kiya',
      'Wood ash se bana Lye (Base) ready kiya',
      'Garam oil mein base mila kar lagatar chalaya',
      'Mixture gaadha pudding (Trace) ban gaya',
      'Mold mein jama kar cure kiya — Soap ready!',
    ],
    visualType: 'soap_bars',
  },
  glass: {
    recipe: [
      { emoji: '⏳', label: 'Silica Sand', itemId: 'sand' },
      { emoji: '🧪', label: 'Soda Ash', itemId: 'base' },
      { emoji: '🔥', label: 'Fire (1400°C)', itemId: 'fire' },
    ],
    materialTest: {
      rightLabel: 'Add Soda Ash + Limestone to Sand',
      rightSticker: 'CLEAR! 🪟',
      rightOutcome: 'Melting point 300°C kam hota hai aur waterproof clear glass banta hai!',
      wrongLabel: 'Skip Limestone (Only Sand + Soda)',
      wrongSticker: 'DISSOLVES! 💧',
      wrongOutcome: 'Water Glass ban jayega jo baarish ke paani mein dheere-dheere ghul jaata hai!',
    },
    xrayParts: [
      { label: 'Amorphous SiO2 Net', detail: 'No crystal walls so light passes straight' },
      { label: 'Soda Ash Flux', detail: 'Drops melt point from 1700°C to 1400°C' },
      { label: 'Lime Stabilizer', detail: 'Makes glass completely waterproof' },
    ],
    stageResults: [
      '70% Sand + 15% Soda Ash + 10% Lime mix kiya',
      '1,400°C bhatti mein chamakdar lava pighla',
      'Air bubbles upar nikal kar clear melt bana',
      'Pipe blow / flat roll se shape diya',
      'Slow Annealing cooling — Crystal Clear Glass!',
    ],
    visualType: 'glass_blow',
  },
  plastic: {
    recipe: [
      { emoji: '⚫', label: 'Hydrocarbons', itemId: 'coal' },
      { emoji: '🧪', label: 'Catalyst', itemId: 'acid' },
    ],
    materialTest: {
      rightLabel: 'Coat Electric Wire with Plastic',
      rightSticker: 'INSULATED! 🔌',
      rightOutcome: 'Zero free electrons — bijli wire ke andar hi rehti hai, shock nahi lagta!',
      wrongLabel: 'Coat Electric Wire with Foil',
      wrongSticker: 'SHORT! ⚡',
      wrongOutcome: 'Metal foil khud bijli conduct kar degi aur turant short circuit hoga!',
    },
    xrayParts: [
      { label: 'Long Polymer Chains', detail: 'Thousands of ethylene monomers linked' },
      { label: 'Locked Covalent Bonds', detail: 'No free electrons → top electrical insulator' },
      { label: 'Thermoplastic Mold', detail: 'Melts cleanly into any shape' },
    ],
    stageResults: [
      'Hydrocarbon se small monomers nikale',
      'Cracking se reactive Ethylene gas banayi',
      'Catalyst se lakho monomers chain mein jode',
      'Thanda kar small resin pellets kaate',
      'Mold mein press kar waterproof Plastic ready!',
    ],
    visualType: 'polymer_chain',
  },
  cement: {
    recipe: [
      { emoji: '🏛️', label: 'Limestone', itemId: 'marble' },
      { emoji: '⏳', label: 'Sand & Gravel', itemId: 'sand' },
      { emoji: '🔥', label: 'Kiln (1450°C)', itemId: 'fire' },
    ],
    materialTest: {
      rightLabel: 'Mix Cement + Sand + Gravel + Steel',
      rightSticker: 'FORTRESS! 🧱',
      rightOutcome: 'Stones load sambhalte hain, cement glue banta hai aur steel bending rokta hai!',
      wrongLabel: 'Pour Plain Cement + Water Only',
      wrongSticker: 'CRACKS! 💔',
      wrongOutcome: 'Bina sand-gravel ke plain cement sukhne par shrink hokar darar pad jaati hai!',
    },
    xrayParts: [
      { label: 'C-S-H Crystal Needles', detail: 'Grows with water to lock stones together' },
      { label: 'Gravel & Sand Skeleton', detail: 'Carries massive compressive weight' },
      { label: 'Gypsum Retarder', detail: 'Gives workers time before hardening' },
    ],
    stageResults: [
      '75% Limestone + 25% Clay bareek peesa',
      '1,450°C rotary kiln mein Clinkers banaye',
      '3% Gypsum mila kar powder peesa',
      'Sand + Gravel + Paani mila kar Hydration shuru',
      'Curing ke baad Rock-Hard Concrete ready!',
    ],
    visualType: 'cement_block',
  },
  perfume: {
    recipe: [
      { emoji: '🌸', label: 'Flower Petals' },
      { emoji: '🪟', label: 'Glass Condenser', itemId: 'glass' },
    ],
    materialTest: {
      rightLabel: 'Blend Essential Oil in Ethanol',
      rightSticker: 'FRAGRANCE! 🌸',
      rightOutcome: 'Oil alcohol mein ghulta hai aur 78°C low boiling pt se hawa mein mehkta hai!',
      wrongLabel: 'Mix Essential Oil in Plain Water',
      wrongSticker: 'FLOATS! 💧',
      wrongOutcome: 'Oil aur paani kabhi mix nahi hote — oil upar tair kar chipka rehta hai!',
    },
    xrayParts: [
      { label: 'Steam Extractor Flask', detail: 'Opens plant oil glands gently' },
      { label: 'Cold Glass Condenser', detail: 'Turns fragrance vapor back to liquid' },
      { label: 'Volatile Ester Molecules', detail: 'Evaporate fast on warm skin' },
    ],
    stageResults: [
      'Fresh rose petals / citrus peels liye',
      'Steam pass kar aromatic oils nikale',
      'Cold glass tube se vapor condense kiya',
      'Paani ke upar tairta pure oil alag kiya',
      'Ethanol mein blend kar Perfume ready!',
    ],
    visualType: 'distill_perfume',
  },
  gunpowder: {
    recipe: [
      { emoji: '🧂', label: 'Saltpeter (75%)' },
      { emoji: '⚫', label: 'Charcoal (15%)', itemId: 'coal' },
      { emoji: '💛', label: 'Sulfur (10%)' },
    ],
    materialTest: {
      rightLabel: 'Include 75% KNO3 Oxidizer',
      rightSticker: 'THRUST! 💥',
      rightOutcome: 'KNO3 band tube ke andar khud Oxygen supply kar 1000x gas banata hai!',
      wrongLabel: 'Pack Only Charcoal Powder in Tube',
      wrongSticker: 'NO BURN! 💨',
      wrongOutcome: 'Band tube mein hawa ki oxygen nahi milegi, charcoal jalega hi nahi!',
    },
    xrayParts: [
      { label: 'KNO3 Oxidizer (75%)', detail: 'Locked oxygen atoms inside solid salt' },
      { label: 'Charcoal Fuel (15%)', detail: 'Burns fast into CO2 gas' },
      { label: 'Sulfur Trigger (10%)', detail: 'Lowers ignition temperature' },
    ],
    stageResults: [
      'Pure white Saltpeter crystals nikale',
      'Willow wood ka ultra-fine Charcoal peesa',
      '75 : 15 : 10 exact ratio measure kiya',
      'Safety ke liye halki nami ke saath mix kiya',
      'Granulate kar Fireworks Propellant ready!',
    ],
    visualType: 'powder_mix',
  },
  fertilizer: {
    recipe: [
      { emoji: '🌬️', label: 'Air Nitrogen (N2)' },
      { emoji: '💧', label: 'Hydrogen (H2)' },
      { emoji: '⚒️', label: 'Iron Catalyst', itemId: 'iron' },
    ],
    materialTest: {
      rightLabel: 'Convert N2 to Ammonia (NH3)',
      rightSticker: 'GREEN BOOM! 🌱',
      rightOutcome: 'Plants NH3 aur Nitrates turant absorb karke 4x zyada fasal ugate hain!',
      wrongLabel: 'Blow Raw Air Nitrogen on Soil',
      wrongSticker: 'STARVED! 🥀',
      wrongOutcome: 'Hawa ka N≡N triple bond itna tight hai ki roots usse tod hi nahi saktin!',
    },
    xrayParts: [
      { label: 'Nitrogen (N)', detail: 'Builds green leaves & plant proteins' },
      { label: 'Phosphorus (P)', detail: 'Drives strong root & flower growth' },
      { label: 'Potassium (K)', detail: 'Boosts plant immunity & water balance' },
    ],
    stageResults: [
      'Hawa se 78% Nitrogen gas alag ki',
      'Paani/gas se Hydrogen gas nikali',
      '450°C + 200 atm + Iron catalyst par react kiya',
      'Liquid Ammonia (NH3) condense hua',
      'Phosphate & Potash mila kar NPK Fertilizer ready!',
    ],
    visualType: 'acid_flask',
  },
};
