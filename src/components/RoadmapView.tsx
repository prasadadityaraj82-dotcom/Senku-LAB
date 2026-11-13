import { useMemo, useState } from 'react';
import { getItemEmoji } from '../data/emojis';
import { isEraUnlocked, isItemUnlocked } from '../data/eras';
import type { Era, ScienceItem } from '../types/lab';

interface RoadmapViewProps {
  eras: Era[];
  completedItemIds: string[];
  onSelectItem: (item: ScienceItem) => void;
  onLockedClick: (item: ScienceItem, eraUnlocked: boolean) => void;
}

interface PositionedNode {
  item: ScienceItem;
  x: number;
  y: number;
  eraUnlocked: boolean;
  unlocked: boolean;
  completed: boolean;
}

const ERA_CARTOON_FACES: Record<number, { emoji: string; bubble: string }> = {
  1: { emoji: '👨‍🔬', bubble: 'Oye! Stone Age se shuru karo!' },
  2: { emoji: '⚒️', bubble: 'Bhatti jalao — Metals time!' },
  3: { emoji: '🧪', bubble: 'Chemistry = 10 Billion %!' },
  4: { emoji: '⚡', bubble: 'Electrons daudao — Bijli!' },
  5: { emoji: '🚀', bubble: 'Machines & Space Rocket!' },
  6: { emoji: '📱', bubble: 'Cell Phone & Signals!' },
  7: { emoji: '🪐', bubble: 'Mars Colony Mission!' },
};

const MAP_WIDTH = 1000;

export function RoadmapView({
  eras,
  completedItemIds,
  onSelectItem,
  onLockedClick,
}: RoadmapViewProps) {
  const [selectedEraFilter, setSelectedEraFilter] = useState<number | 'all'>('all');

  const visibleEras = useMemo(
    () =>
      selectedEraFilter === 'all'
        ? eras
        : eras.filter((e) => e.id === selectedEraFilter),
    [eras, selectedEraFilter]
  );

  // Build Dr. Stone Winding Tree Layout:
  // Top-Right = START -> weaves Right-to-Left, branches down -> Bottom-Left = GOAL!!
  const layout = useMemo(() => {
    const nodes: PositionedNode[] = [];
    const connections: Array<{
      from: { x: number; y: number };
      to: { x: number; y: number };
      active: boolean;
      curveOffset: number;
    }> = [];
    const eraLabels: Array<{
      era: Era;
      x: number;
      y: number;
      unlocked: boolean;
      done: boolean;
    }> = [];

    const startAnchor = { x: 870, y: 72 };
    let currentY = 92;
    const colsPerRow = 4;
    // Right-to-left X columns so it naturally starts top-right and winds left/right
    const rtlCols = [830, 610, 390, 170];
    const ltrCols = [170, 390, 610, 830];

    let rowCounter = 0;
    let prevNodePos: { x: number; y: number; completed: boolean } | null = null;

    visibleEras.forEach((era, eraIdx) => {
      const eraUnlocked = isEraUnlocked(era.id, completedItemIds);
      const eraDone = era.items.every((i) => completedItemIds.includes(i.id));

      // Place Era cartoon sticker cleanly in its own header band (Era 1 on left away from START board)
      eraLabels.push({
        era,
        x: eraIdx === 0 ? 290 : rowCounter % 2 === 0 ? 250 : 750,
        y: currentY,
        unlocked: eraUnlocked,
        done: eraDone,
      });

      currentY += 96;

      era.items.forEach((item, idxInEra) => {
        const colIdx = idxInEra % colsPerRow;
        const isNewRow = idxInEra > 0 && colIdx === 0;
        if (isNewRow) {
          rowCounter += 1;
          currentY += 168;
        }

        const isRtl = rowCounter % 2 === 0;
        const baseX = isRtl ? rtlCols[colIdx] : ltrCols[colIdx];
        const waveY = colIdx % 2 === 1 ? -16 : 16;
        const x = baseX;
        const y = currentY + waveY;

        const completed = completedItemIds.includes(item.id);
        const unlocked = eraUnlocked && isItemUnlocked(item, completedItemIds);

        const posNode: PositionedNode = {
          item,
          x,
          y,
          eraUnlocked,
          unlocked,
          completed,
        };
        nodes.push(posNode);

        if (!prevNodePos) {
          connections.push({
            from: startAnchor,
            to: { x, y },
            active: true,
            curveOffset: -36,
          });
        } else {
          connections.push({
            from: { x: prevNodePos.x, y: prevNodePos.y },
            to: { x, y },
            active: prevNodePos.completed,
            curveOffset: isRtl ? -34 : 34,
          });
        }

        prevNodePos = { x, y, completed };
      });

      rowCounter += 1;
      currentY += 165;
    });

    const goalAnchor = { x: 185, y: currentY + 24 };
    if (prevNodePos) {
      const last = prevNodePos as { x: number; y: number; completed: boolean };
      connections.push({
        from: { x: last.x, y: last.y },
        to: goalAnchor,
        active: last.completed,
        curveOffset: 42,
      });
    }

    const totalHeight = currentY + 125;

    return {
      nodes,
      connections,
      eraLabels,
      startAnchor,
      goalAnchor,
      totalHeight,
    };
  }, [visibleEras, completedItemIds]);

  const completedCount = completedItemIds.length;
  const totalCount = eras.reduce((acc, e) => acc + e.items.length, 0);

  return (
    <div className="space-y-4">
      {/* Simple Duolingo / Matiks Style Era Switcher Bar */}
      <div className="bg-white comic-panel rounded-2xl p-3 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl sm:text-3xl" aria-hidden="true">🗺️</span>
          <div>
            <h1 className="font-display text-lg sm:text-xl font-bold text-[#111827] leading-tight">
              Dr. Senku Adventure Map
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Yellow circle par click karo · Locked 🔒 kholne ke liye pichla step complete karo! ({completedCount}/{totalCount} Done)
            </p>
          </div>
        </div>

        {/* Era Quick Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          <button
            type="button"
            onClick={() => setSelectedEraFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-display text-xs font-bold border-2 border-[#111827] whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              selectedEraFilter === 'all'
                ? 'bg-[#FDE047] text-[#111827] shadow-[2px_2px_0_#111827]'
                : 'bg-slate-100 text-slate-700 hover:bg-white'
            }`}
          >
            All 7 Eras
          </button>
          {eras.map((era) => {
            const unlocked = isEraUnlocked(era.id, completedItemIds);
            const active = selectedEraFilter === era.id;
            return (
              <button
                key={era.id}
                type="button"
                onClick={() => setSelectedEraFilter(era.id)}
                className={`px-2.5 py-1.5 rounded-xl font-display text-xs font-bold border-2 border-[#111827] whitespace-nowrap shrink-0 cursor-pointer transition-colors flex items-center gap-1 ${
                  active
                    ? 'bg-[#FB923C] text-white shadow-[2px_2px_0_#111827]'
                    : unlocked
                    ? 'bg-[#FEF08A] text-[#111827] hover:bg-[#FDE047]'
                    : 'bg-slate-200 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <span>{unlocked ? '🔓' : '🔒'}</span>
                <span>Era {era.id}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="flex sm:hidden items-center justify-between px-1 text-xs font-display font-bold text-[#111827]">
        <span>👈 Swipe left/right to explore the tree</span>
        <span>Tap any yellow node!</span>
      </div>

      {/* ONE BIG COLORFUL DR. STONE ADVENTURE MAP */}
      <div className="comic-panel rounded-2xl senku-map-sunburst overflow-x-auto relative">
        <div
          className="relative mx-auto"
          style={{
            width: `${MAP_WIDTH}px`,
            height: `${layout.totalHeight}px`,
          }}
        >
          {/* SVG Layer: Thick Curved Orange / Yellow Comic Arrows */}
          <svg
            width={MAP_WIDTH}
            height={layout.totalHeight}
            viewBox={`0 0 ${MAP_WIDTH} ${layout.totalHeight}`}
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="senkuArrowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FACC15" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>

            {layout.connections.map((conn, idx) => {
              const midX = (conn.from.x + conn.to.x) / 2;
              const midY = (conn.from.y + conn.to.y) / 2 + conn.curveOffset;
              const d = `M ${conn.from.x} ${conn.from.y} Q ${midX} ${midY} ${conn.to.x} ${conn.to.y}`;

              // Arrow direction near end
              const dx = conn.to.x - midX;
              const dy = conn.to.y - midY;
              const angle = Math.atan2(dy, dx);
              const len = Math.hypot(dx, dy) || 1;
              // Pull arrowhead slightly back from node center (radius ~46px)
              const tipX = conn.to.x - (dx / len) * 52;
              const tipY = conn.to.y - (dy / len) * 52;
              const deg = (angle * 180) / Math.PI;

              return (
                <g key={idx} opacity={conn.active ? 1 : 0.45}>
                  {/* Thick black comic outline */}
                  <path
                    d={d}
                    fill="none"
                    stroke="#111827"
                    strokeWidth="15"
                    strokeLinecap="round"
                  />
                  {/* Vibrant orange/yellow inner arrow stroke */}
                  <path
                    d={d}
                    fill="none"
                    stroke={conn.active ? 'url(#senkuArrowGrad)' : '#CBD5E1'}
                    strokeWidth="9"
                    strokeLinecap="round"
                  />
                  {/* Big Comic Arrowhead */}
                  <g transform={`translate(${tipX}, ${tipY}) rotate(${deg})`}>
                    <polygon
                      points="10,0 -10,-11 -10,11"
                      fill={conn.active ? '#F97316' : '#CBD5E1'}
                      stroke="#111827"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  </g>
                </g>
              );
            })}
          </svg>

          {/* TOP-RIGHT CORNER: RED "START" COMIC BOARD */}
          <div
            className="absolute z-10 flex items-center gap-3 bg-[#EF4444] text-white comic-panel rounded-2xl px-4 py-3 rotate-2"
            style={{
              right: '24px',
              top: '20px',
            }}
          >
            <div className="w-12 h-12 rounded-xl bg-[#FEF08A] border-[3px] border-[#111827] flex items-center justify-center text-3xl shrink-0">
              👨‍🔬
            </div>
            <div>
              <div className="font-display text-2xl font-bold tracking-wide leading-none drop-shadow-[2px_2px_0_#111827]">
                START!
              </div>
              <div className="text-[11px] font-bold text-yellow-200 mt-0.5">
                Stone World Day 1
              </div>
            </div>
          </div>

          {/* ERA MILESTONE CARTOON STICKERS & HEADERS */}
          {layout.eraLabels.map((lbl) => {
            const char = ERA_CARTOON_FACES[lbl.era.id] ?? { emoji: '🧪', bubble: 'Science!' };
            return (
              <div
                key={lbl.era.id}
                className={`absolute z-10 flex items-center gap-2.5 px-3.5 py-2 rounded-xl comic-panel-sm -rotate-1 ${
                  lbl.done
                    ? 'bg-[#4ADE80] text-[#111827]'
                    : lbl.unlocked
                    ? 'bg-white text-[#111827]'
                    : 'bg-slate-200 text-slate-600'
                }`}
                style={{
                  left: `${lbl.x}px`,
                  top: `${lbl.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <span className="text-2xl" aria-hidden="true">{char.emoji}</span>
                <div className="leading-tight">
                  <div className="font-display font-bold text-xs sm:text-sm">
                    {lbl.era.code}: {lbl.era.title}
                  </div>
                  <div className="text-[11px] font-semibold opacity-85">
                    {char.bubble}
                  </div>
                </div>
              </div>
            );
          })}

          {/* ALL ITEM NODES: BRIGHT YELLOW CIRCLES (UNLOCKED) / GREY 🔒 (LOCKED) */}
          {layout.nodes.map((node) => {
            const emoji = getItemEmoji(node.item.id);
            const isNextTarget = node.unlocked && !node.completed;

            return (
              <button
                key={node.item.id}
                type="button"
                onClick={() => {
                  if (node.unlocked) {
                    onSelectItem(node.item);
                  } else {
                    onLockedClick(node.item, node.eraUnlocked);
                  }
                }}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute z-20 group flex flex-col items-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#111827]"
              >
                {/* Circle Node */}
                <div
                  className={`relative w-20 h-20 rounded-full border-[3px] border-[#111827] flex items-center justify-center transition-transform duration-150 group-hover:scale-110 ${
                    node.completed
                      ? 'bg-[#FDE047] comic-node-glow'
                      : isNextTarget
                      ? 'bg-[#FACC15] comic-node-glow'
                      : 'bg-slate-300 shadow-[3px_3px_0_#111827] opacity-85'
                  }`}
                >
                  <span className="text-3xl select-none" aria-hidden="true">
                    {emoji}
                  </span>

                  {/* Corner Status Badge */}
                  {node.completed ? (
                    <span
                      title="Crafted!"
                      className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#22C55E] border-2 border-[#111827] text-white text-xs font-bold flex items-center justify-center shadow-[1px_1px_0_#111827]"
                    >
                      ✓
                    </span>
                  ) : !node.unlocked ? (
                    <span
                      title="Locked"
                      className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-slate-600 border-2 border-[#111827] text-white text-xs flex items-center justify-center shadow-[1px_1px_0_#111827]"
                    >
                      🔒
                    </span>
                  ) : (
                    <span
                      title="Unlocked — Click to craft!"
                      className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-md bg-[#EF4444] border-2 border-[#111827] text-white font-display text-[10px] font-bold shadow-[1px_1px_0_#111827]"
                    >
                      GO!
                    </span>
                  )}
                </div>

                {/* Comic Name Tag under circle: English + Hindi */}
                <div
                  className={`mt-1.5 px-2.5 py-1 rounded-lg border-2 border-[#111827] shadow-[2px_2px_0_#111827] text-center max-w-[148px] ${
                    node.unlocked ? 'bg-white' : 'bg-slate-200'
                  }`}
                >
                  <div className="font-display font-bold text-xs text-[#111827] leading-tight truncate">
                    {node.item.name}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-600 leading-tight truncate">
                    {node.item.hindiName.split('(')[0].trim()}
                  </div>
                </div>
              </button>
            );
          })}

          {/* BOTTOM-LEFT CORNER: BLUE STARBURST "GOAL!!" BOARD */}
          <div
            className="absolute z-10"
            style={{
              left: '26px',
              bottom: '22px',
            }}
          >
            <div className="relative bg-[#38BDF8] comic-panel rounded-2xl px-5 py-4 -rotate-2 flex items-center gap-3.5 max-w-[330px]">
              <div className="w-14 h-14 rounded-2xl bg-[#FEF08A] border-[3px] border-[#111827] flex items-center justify-center text-3xl shrink-0">
                📱
              </div>
              <div>
                <div className="inline-block bg-[#1D4ED8] text-white font-display font-extrabold text-xl px-2.5 py-0.5 rounded-lg border-2 border-[#111827] -rotate-1 shadow-[2px_2px_0_#111827]">
                  GOAL!!
                </div>
                <div className="font-display font-bold text-sm text-[#111827] mt-1 leading-tight">
                  {selectedEraFilter === 'all'
                    ? 'Cell Phone · Cure-All · Mars Base!'
                    : `${visibleEras[0]?.code} Mastered!`}
                </div>
                <div className="text-[11px] font-bold text-slate-800">
                  10 Billion Percent Science!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
