import type { BuildVisualType, XrayPart } from '../data/itemVisuals';

interface ProgressiveBuildCanvasProps {
  visualType: BuildVisualType;
  activeStep: number;
  mode: 'build' | 'xray';
  stageCaption: string;
  xrayParts: [XrayPart, XrayPart, XrayPart];
  itemEmoji: string;
}

export function ProgressiveBuildCanvas({
  visualType,
  activeStep,
  mode,
  stageCaption,
  xrayParts,
  itemEmoji,
}: ProgressiveBuildCanvasProps) {
  const s = activeStep; // 0..4

  const renderProgressiveArt = () => {
    switch (visualType) {
      case 'light_bulb':
        return (
          <g>
            {/* Step 1: Tungsten Coil */}
            <path
              d="M170 92 Q178 76 186 92 Q194 108 202 92 Q210 76 218 92 Q226 108 230 92"
              fill="none"
              stroke={s >= 4 ? '#FACC15' : '#475569'}
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Step 2: Lead Wires & Glass Stem */}
            {s >= 1 && (
              <g>
                <line x1="170" y1="92" x2="180" y2="144" stroke="#111827" strokeWidth="3" />
                <line x1="230" y1="92" x2="220" y2="144" stroke="#111827" strokeWidth="3" />
                <rect x="174" y="142" width="52" height="22" rx="4" fill="#94A3B8" stroke="#111827" strokeWidth="3" />
              </g>
            )}
            {/* Step 3: Glass Globe */}
            {s >= 2 && (
              <path
                d="M176 142 C152 126 146 86 164 62 C180 42 220 42 236 62 C254 86 248 126 224 142 Z"
                fill={s >= 4 ? 'rgba(254, 240, 138, 0.72)' : 'rgba(186, 230, 253, 0.45)'}
                stroke="#111827"
                strokeWidth="3.5"
              />
            )}
            {/* Step 4: Argon Gas Swirl (No O2) */}
            {s === 3 && (
              <g>
                <circle cx="172" cy="78" r="5" fill="#38BDF8" stroke="#111827" strokeWidth="2" />
                <circle cx="228" cy="76" r="5" fill="#38BDF8" stroke="#111827" strokeWidth="2" />
                <circle cx="200" cy="60" r="5" fill="#38BDF8" stroke="#111827" strokeWidth="2" />
                <text x="200" y="34" textAnchor="middle" fill="#0369A1" fontSize="11" fontWeight="800" fontFamily="Fredoka">
                  AIR OUT · ARGON GAS IN!
                </text>
              </g>
            )}
            {/* Step 5: Glowing Light Rays + Battery */}
            {s >= 4 && (
              <g>
                <line x1="200" y1="22" x2="200" y2="38" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
                <line x1="142" y1="48" x2="156" y2="60" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
                <line x1="258" y1="48" x2="244" y2="60" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
                <line x1="126" y1="92" x2="144" y2="92" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
                <line x1="274" y1="92" x2="256" y2="92" stroke="#FACC15" strokeWidth="4" strokeLinecap="round" />
                <rect x="292" y="110" width="54" height="44" rx="8" fill="#4ADE80" stroke="#111827" strokeWidth="3" />
                <text x="319" y="137" textAnchor="middle" fill="#111827" fontSize="13" fontWeight="800" fontFamily="Fredoka">
                  + 🔋 -
                </text>
                <path d="M226 154 L292 140" fill="none" stroke="#111827" strokeWidth="3" />
                <path d="M226 146 L292 124" fill="none" stroke="#EF4444" strokeWidth="3" />
              </g>
            )}
          </g>
        );

      case 'stone_blade':
      case 'spear_craft':
        return (
          <g>
            {/* Flint Rock Base */}
            <polygon
              points={
                s === 0
                  ? '145,115 168,66 232,62 258,108 232,142 162,140'
                  : s === 1
                  ? '150,115 174,64 232,64 252,108 228,140 165,138'
                  : '165,138 192,46 218,52 232,138'
              }
              fill={s >= 3 ? '#CBD5E1' : '#94A3B8'}
              stroke="#111827"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Hammer Stone on Step 2+ */}
            {s >= 1 && s <= 3 && (
              <g>
                <circle cx="288" cy="74" r="24" fill="#FB923C" stroke="#111827" strokeWidth="3" />
                <path d="M258 84 L232 92" stroke="#EF4444" strokeWidth="4" strokeDasharray="4 3" />
                <text x="296" y="42" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="800" fontFamily="Fredoka">
                  CRACK! 45°
                </text>
              </g>
            )}
            {/* Flying Flakes on Step 3+ */}
            {s >= 2 && (
              <g>
                <polygon points="122,94 140,86 135,104" fill="#E2E8F0" stroke="#111827" strokeWidth="2" />
                <polygon points="248,128 266,120 262,138" fill="#E2E8F0" stroke="#111827" strokeWidth="2" />
              </g>
            )}
            {/* Shaft / Handle on Step 5 (or Spear) */}
            {(s >= 4 || (visualType === 'spear_craft' && s >= 2)) && (
              <g>
                <rect x="84" y="134" width="220" height="16" rx="8" fill="#D97706" stroke="#111827" strokeWidth="3" />
                {s >= 3 && (
                  <path d="M188 130 L212 152 M212 130 L188 152" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
                )}
              </g>
            )}
          </g>
        );

      case 'fire_camp':
        return (
          <g>
            {/* Tinder nest */}
            <ellipse cx="200" cy="140" rx="74" ry="18" fill="#FDE047" stroke="#111827" strokeWidth="3" />
            {s >= 1 && (
              <rect x="136" y="122" width="128" height="18" rx="4" fill="#B45309" stroke="#111827" strokeWidth="3" />
            )}
            {s >= 2 && (
              <g>
                <rect x="193" y="44" width="14" height="84" rx="5" fill="#F59E0B" stroke="#111827" strokeWidth="3" />
                <path d="M170 64 Q200 54 230 64" fill="none" stroke="#EF4444" strokeWidth="3" strokeDasharray="4 3" />
              </g>
            )}
            {s >= 3 && (
              <circle cx="200" cy="126" r="10" fill="#EF4444" stroke="#111827" strokeWidth="2.5" />
            )}
            {s >= 4 && (
              <g>
                <path
                  d="M200 32 C232 68 242 104 222 128 C210 140 190 140 178 128 C158 104 168 68 200 32 Z"
                  fill="#F97316"
                  stroke="#111827"
                  strokeWidth="3.5"
                />
                <path
                  d="M200 66 C216 86 220 108 210 122 C204 128 196 128 190 122 C180 108 184 86 200 66 Z"
                  fill="#FDE047"
                  stroke="#111827"
                  strokeWidth="2"
                />
              </g>
            )}
          </g>
        );

      case 'smelt_metal':
      case 'steel_quench':
        return (
          <g>
            {/* Furnace Body */}
            <path
              d={s === 0 ? 'M140 145 L260 145' : 'M152 148 L166 56 L234 56 L248 148 Z'}
              fill="#FDBA74"
              stroke="#111827"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Ore + Charcoal Layers */}
            {s === 0 && (
              <g>
                <circle cx="176" cy="128" r="12" fill="#334155" stroke="#111827" strokeWidth="2.5" />
                <circle cx="204" cy="126" r="14" fill="#475569" stroke="#111827" strokeWidth="2.5" />
                <circle cx="230" cy="130" r="11" fill="#1E293B" stroke="#111827" strokeWidth="2.5" />
              </g>
            )}
            {s >= 2 && (
              <g>
                <rect x="174" y="102" width="52" height="36" rx="6" fill={s >= 3 ? '#EF4444' : '#334155'} stroke="#111827" strokeWidth="3" />
                <text x="200" y="124" textAnchor="middle" fill="#FEF08A" fontSize="11" fontWeight="800" fontFamily="Fredoka">
                  {s >= 3 ? '1500°C 🔥' : 'COAL+ORE'}
                </text>
              </g>
            )}
            {/* Hammer / Water Quench on Step 5 */}
            {s >= 4 && (
              <g>
                <rect x="274" y="114" width="76" height="28" rx="6" fill="#E2E8F0" stroke="#111827" strokeWidth="3" />
                <text x="312" y="133" textAnchor="middle" fill="#111827" fontSize="12" fontWeight="800" fontFamily="Fredoka">
                  INGOT ✨
                </text>
                <path d="M248 130 L272 130" stroke="#F97316" strokeWidth="4" />
              </g>
            )}
          </g>
        );

      case 'acid_flask':
      case 'distill_perfume':
        return (
          <g>
            {/* Conical Glass Flask */}
            <path
              d="M184 44 L216 44 L216 74 L250 134 C253 142 248 148 240 148 L160 148 C152 148 147 142 150 134 L184 74 Z"
              fill="#FFFFFF"
              stroke="#111827"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Liquid Level rises with steps */}
            {s >= 1 && (
              <path
                d={
                  s === 1
                    ? 'M162 126 L238 126 L246 138 C248 143 245 145 239 145 L161 145 C155 145 152 143 154 138 Z'
                    : 'M172 106 L228 106 L246 138 C248 143 245 145 239 145 L161 145 C155 145 152 143 154 138 Z'
                }
                fill={s >= 4 ? '#4ADE80' : s >= 2 ? '#FACC15' : '#38BDF8'}
                stroke="#111827"
                strokeWidth="2"
              />
            )}
            {/* Bubbles & Vapors */}
            {s >= 2 && (
              <g>
                <circle cx="192" cy="122" r="5" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
                <circle cx="212" cy="116" r="4" fill="#FFFFFF" stroke="#111827" strokeWidth="2" />
              </g>
            )}
            {s >= 3 && (
              <path d="M196 36 Q188 24 200 18 Q212 24 204 36" fill="none" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
            )}
            {s >= 4 && (
              <g>
                <rect x="272" y="88" width="84" height="44" rx="10" fill="#FEF08A" stroke="#111827" strokeWidth="3" />
                <text x="314" y="114" textAnchor="middle" fill="#111827" fontSize="13" fontWeight="800" fontFamily="Fredoka">
                  REACTED! 🧪
                </text>
              </g>
            )}
          </g>
        );

      case 'battery_cell':
      case 'solar_cell':
        return (
          <g>
            {/* Electrolyte Jar */}
            <rect x="136" y="64" width="128" height="86" rx="10" fill="#FEF08A" stroke="#111827" strokeWidth="3.5" />
            {/* Zinc (-) Plate */}
            <rect x="156" y="46" width="22" height="88" rx="4" fill="#94A3B8" stroke="#111827" strokeWidth="3" />
            <text x="167" y="40" textAnchor="middle" fill="#111827" fontSize="12" fontWeight="800" fontFamily="Fredoka">
              (-)
            </text>
            {/* Copper (+) Plate */}
            {s >= 1 && (
              <g>
                <rect x="222" y="46" width="22" height="88" rx="4" fill="#FB923C" stroke="#111827" strokeWidth="3" />
                <text x="233" y="40" textAnchor="middle" fill="#111827" fontSize="12" fontWeight="800" fontFamily="Fredoka">
                  (+)
                </text>
              </g>
            )}
            {/* Ion Flow */}
            {s >= 2 && (
              <path d="M182 104 L218 104" stroke="#22C55E" strokeWidth="4" strokeDasharray="5 4" />
            )}
            {/* External Wire + Volt Glow */}
            {s >= 3 && (
              <path d="M167 46 L167 24 L233 24 L233 46" fill="none" stroke="#EF4444" strokeWidth="3.5" />
            )}
            {s >= 4 && (
              <g>
                <circle cx="200" cy="24" r="14" fill="#4ADE80" stroke="#111827" strokeWidth="3" />
                <text x="200" y="29" textAnchor="middle" fill="#111827" fontSize="12" fontWeight="800">
                  ⚡
                </text>
              </g>
            )}
          </g>
        );

      case 'rocket_launch':
        return (
          <g>
            {/* Rocket Hull */}
            <path
              d="M200 28 C222 52 226 92 222 128 L178 128 C174 92 178 52 200 28 Z"
              fill={s >= 1 ? '#FFFFFF' : '#E2E8F0'}
              stroke="#111827"
              strokeWidth="3.5"
            />
            {/* Tanks inside */}
            {s >= 0 && (
              <rect x="188" y="64" width="24" height="22" rx="4" fill="#38BDF8" stroke="#111827" strokeWidth="2" />
            )}
            {s >= 1 && (
              <rect x="188" y="90" width="24" height="22" rx="4" fill="#FB923C" stroke="#111827" strokeWidth="2" />
            )}
            {/* Fins & Nozzle */}
            {s >= 2 && (
              <g>
                <polygon points="178,108 156,132 178,128" fill="#EF4444" stroke="#111827" strokeWidth="3" />
                <polygon points="222,108 244,132 222,128" fill="#EF4444" stroke="#111827" strokeWidth="3" />
                <polygon points="188,128 212,128 218,140 182,140" fill="#64748B" stroke="#111827" strokeWidth="3" />
              </g>
            )}
            {/* Exhaust Flame */}
            {s >= 3 && (
              <polygon
                points="186,140 214,140 200,170"
                fill={s >= 4 ? '#F97316' : '#FACC15'}
                stroke="#111827"
                strokeWidth="3"
              />
            )}
            {s >= 4 && (
              <text x="288" y="64" textAnchor="middle" fill="#EF4444" fontSize="14" fontWeight="800" fontFamily="Fredoka">
                LIFTOFF! 🚀
              </text>
            )}
          </g>
        );

      case 'camera_lens':
      case 'telescope_tubes':
      case 'microscope_lens':
        return (
          <g>
            {/* Dark Body / Tube */}
            <rect x="122" y="66" width="156" height="62" rx="12" fill="#334155" stroke="#111827" strokeWidth="3.5" />
            {/* Convex Glass Lens */}
            {s >= 1 && (
              <ellipse cx="148" cy="97" rx="12" ry="26" fill="#7DD3FC" stroke="#111827" strokeWidth="3" />
            )}
            {/* Light Rays Converging */}
            {s >= 2 && (
              <g>
                <line x1="88" y1="80" x2="148" y2="80" stroke="#FACC15" strokeWidth="3" />
                <line x1="88" y1="114" x2="148" y2="114" stroke="#FACC15" strokeWidth="3" />
                <line x1="148" y1="80" x2="250" y2="97" stroke="#F97316" strokeWidth="3" />
                <line x1="148" y1="114" x2="250" y2="97" stroke="#F97316" strokeWidth="3" />
              </g>
            )}
            {/* Sensor / Eyepiece */}
            {s >= 3 && (
              <rect x="248" y="76" width="16" height="42" rx="4" fill="#4ADE80" stroke="#111827" strokeWidth="2.5" />
            )}
            {s >= 4 && (
              <text x="326" y="102" textAnchor="middle" fill="#15803D" fontSize="13" fontWeight="800" fontFamily="Fredoka">
                IN FOCUS! ✨
              </text>
            )}
          </g>
        );

      case 'mars_dome':
      case 'fusion_tokamak':
      case 'satellite_orbit':
        return (
          <g>
            {/* Planet / Orbit Base */}
            <path d="M96 146 Q200 116 304 146" fill="#FB923C" stroke="#111827" strokeWidth="3.5" />
            {/* Dome / Core */}
            {s >= 1 && (
              <path
                d="M142 136 C142 82 258 82 258 136 Z"
                fill={s >= 3 ? '#7DD3FC' : '#E2E8F0'}
                stroke="#111827"
                strokeWidth="3.5"
              />
            )}
            {/* Green Life / Plasma inside */}
            {s >= 2 && (
              <circle cx="200" cy="116" r="14" fill="#4ADE80" stroke="#111827" strokeWidth="2.5" />
            )}
            {/* Radiation Shield / Solar Wings */}
            {s >= 3 && (
              <path
                d="M130 136 C130 68 270 68 270 136"
                fill="none"
                stroke="#EF4444"
                strokeWidth="4"
                strokeDasharray="6 4"
              />
            )}
            {s >= 4 && (
              <text x="200" y="48" textAnchor="middle" fill="#15803D" fontSize="14" fontWeight="800" fontFamily="Fredoka">
                10 BILLION % ACTIVE! {itemEmoji}
              </text>
            )}
          </g>
        );

      default:
        return (
          <g>
            {/* Universal 5-Stage Progressive Craft Assembly */}
            {/* Stage 1: Raw Ingredient Block */}
            <rect x="64" y="68" width="66" height="66" rx="14" fill="#FDE047" stroke="#111827" strokeWidth="3.5" />
            <text x="97" y="110" textAnchor="middle" fontSize="28">
              {itemEmoji}
            </text>

            {/* Stage 2-3: Process Machine */}
            {s >= 1 && (
              <g>
                <path d="M134 101 L162 101" stroke="#111827" strokeWidth="4" />
                <polygon points="168,101 158,94 158,108" fill="#F97316" stroke="#111827" strokeWidth="2" />
                <circle
                  cx="204"
                  cy="101"
                  r="34"
                  fill={s >= 2 ? '#FB923C' : '#E2E8F0'}
                  stroke="#111827"
                  strokeWidth="3.5"
                />
                <text x="204" y="109" textAnchor="middle" fontSize="22">
                  {s >= 2 ? '⚡' : '⚙️'}
                </text>
              </g>
            )}

            {/* Stage 4-5: Finished Starburst Item */}
            {s >= 3 && (
              <g>
                <path d="M242 101 L270 101" stroke="#111827" strokeWidth="4" />
                <polygon points="276,101 266,94 266,108" fill="#22C55E" stroke="#111827" strokeWidth="2" />
                <rect
                  x="280"
                  y="64"
                  width="74"
                  height="74"
                  rx="18"
                  fill={s >= 4 ? '#4ADE80' : '#BAE6FD'}
                  stroke="#111827"
                  strokeWidth="3.5"
                />
                <text x="317" y="110" textAnchor="middle" fontSize="30">
                  {itemEmoji}
                </text>
                {s >= 4 && (
                  <text x="317" y="50" textAnchor="middle" fill="#15803D" fontSize="13" fontWeight="800" fontFamily="Fredoka">
                    DONE! ✨
                  </text>
                )}
              </g>
            )}
          </g>
        );
    }
  };

  if (mode === 'xray') {
    return (
      <div className="rounded-2xl bg-[#E0F2FE] border-[3px] border-[#111827] shadow-[3px_3px_0_#111827] p-4 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="bg-[#1D4ED8] text-white font-display font-bold text-xs px-2.5 py-1 rounded-lg border-2 border-[#111827]">
            🔍 INSIDE X-RAY CUTAWAY
          </span>
          <span className="text-xs font-display font-bold text-[#111827]">
            3 Key Parts Inside
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Cutaway Graphic */}
          <div className="md:col-span-5 bg-white border-[3px] border-[#111827] rounded-2xl p-4 flex flex-col items-center justify-center relative min-h-[170px]">
            <div className="w-24 h-24 rounded-full bg-[#FEF08A] border-[3px] border-[#111827] flex items-center justify-center text-5xl shadow-[3px_3px_0_#111827]">
              {itemEmoji}
            </div>
            {/* 3 Callout Pins */}
            <span className="absolute top-3 left-3 w-7 h-7 rounded-full bg-[#EF4444] text-white border-2 border-[#111827] font-display font-bold text-xs flex items-center justify-center">
              1
            </span>
            <span className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#F97316] text-white border-2 border-[#111827] font-display font-bold text-xs flex items-center justify-center">
              2
            </span>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-[#22C55E] text-white border-2 border-[#111827] font-display font-bold text-xs flex items-center justify-center">
              3
            </span>
          </div>

          {/* 3 Clean Callout Explanations */}
          <div className="md:col-span-7 space-y-2">
            {xrayParts.map((part, idx) => {
              const badgeColor =
                idx === 0 ? 'bg-[#EF4444]' : idx === 1 ? 'bg-[#F97316]' : 'bg-[#22C55E]';
              return (
                <div
                  key={idx}
                  className="bg-white border-2 border-[#111827] rounded-xl p-2.5 flex items-start gap-2.5"
                >
                  <span
                    className={`w-6 h-6 rounded-full ${badgeColor} text-white border-2 border-[#111827] font-display font-bold text-xs flex items-center justify-center shrink-0 mt-0.5`}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-display font-bold text-sm text-[#111827]">
                      {part.label}
                    </div>
                    <p className="text-xs text-slate-700 font-medium">{part.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white border-[3px] border-[#111827] shadow-[3px_3px_0_#111827] p-3 sm:p-4 space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="bg-[#4ADE80] text-[#111827] font-display font-bold text-xs px-2.5 py-1 rounded-lg border-2 border-[#111827]">
          🔨 AFTER STEP {activeStep + 1} LOOKS LIKE THIS
        </span>
        <span className="text-xs font-display font-bold text-[#EA580C]">
          Stage {activeStep + 1} / 5
        </span>
      </div>

      <svg
        viewBox="0 0 400 175"
        className="w-full h-auto max-h-[210px] rounded-xl bg-[#FFFDF2] border-2 border-[#111827]"
        role="img"
        aria-label={`Build diagram stage ${activeStep + 1}: ${stageCaption}`}
      >
        <defs>
          <pattern id="comicDots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.2" fill="rgba(17,24,39,0.08)" />
          </pattern>
        </defs>
        <rect width="400" height="175" fill="url(#comicDots)" />
        {renderProgressiveArt()}
      </svg>

      <div className="bg-[#FEF9C3] border-2 border-[#111827] rounded-xl px-3.5 py-2 text-xs sm:text-sm font-display font-bold text-[#111827]">
        👉 Result: {stageCaption}
      </div>
    </div>
  );
}
