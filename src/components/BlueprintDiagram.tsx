import { useState } from 'react';
import { getItemEmoji, getStepEmojis } from '../data/emojis';
import { getItemVisualMeta } from '../data/itemVisuals';
import type { ScienceItem } from '../types/lab';
import { ProgressiveBuildCanvas } from './ProgressiveBuildCanvas';

interface BlueprintDiagramProps {
  item: ScienceItem;
  activeStep: number;
  onSelectStep: (idx: number) => void;
}

export function BlueprintDiagram({ item, activeStep, onSelectStep }: BlueprintDiagramProps) {
  const [viewMode, setViewMode] = useState<'build' | 'xray'>('build');
  const emojis = getStepEmojis(item.id);
  const itemEmoji = getItemEmoji(item.id);
  const visualMeta = getItemVisualMeta(item.id);
  const currentStep = item.steps[activeStep];

  return (
    <div className="rounded-2xl comic-panel senku-yellow-sunburst p-4 sm:p-6 relative overflow-hidden space-y-4">
      {/* Top Comic Stickers + Build / X-Ray Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1 bg-white border-[3px] border-[#111827] p-1 rounded-xl shadow-[2px_2px_0_#111827]">
          <button
            type="button"
            onClick={() => setViewMode('build')}
            className={`px-3 py-1 rounded-lg font-display font-bold text-xs cursor-pointer transition-colors ${
              viewMode === 'build'
                ? 'bg-[#FDE047] text-[#111827] border-2 border-[#111827]'
                : 'text-slate-600 hover:text-[#111827]'
            }`}
          >
            🔨 Build View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('xray')}
            className={`px-3 py-1 rounded-lg font-display font-bold text-xs cursor-pointer transition-colors ${
              viewMode === 'xray'
                ? 'bg-[#38BDF8] text-[#111827] border-2 border-[#111827]'
                : 'text-slate-600 hover:text-[#111827]'
            }`}
          >
            🔍 Inside X-Ray
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-block bg-[#EF4444] text-white font-display font-bold text-xs px-2.5 py-1 rounded-md border-2 border-[#111827] rotate-2 shadow-[2px_2px_0_#111827]">
            POW!
          </span>
          <span className="inline-block bg-[#F97316] text-white font-display font-bold text-xs px-2.5 py-1 rounded-md border-2 border-[#111827] -rotate-2 shadow-[2px_2px_0_#111827]">
            BOOM!
          </span>
          <span className="hidden sm:inline-block bg-[#38BDF8] text-[#111827] font-display font-bold text-xs px-2.5 py-1 rounded-md border-2 border-[#111827] rotate-1 shadow-[2px_2px_0_#111827]">
            10 BILLION %!
          </span>
        </div>
      </div>

      {/* Big Colorful Circle Flowchart with Curved Arrows */}
      <div className="relative py-1">
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-1">
          {item.steps.map((_, idx) => {
            const isActive = activeStep === idx;
            const isPast = idx < activeStep;
            return (
              <div key={idx} className="flex items-center gap-1 sm:gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('build');
                    onSelectStep(idx);
                  }}
                  className="group flex flex-col items-center gap-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#111827]"
                >
                  <div
                    className={`w-13 h-13 sm:w-15 sm:h-15 rounded-full border-[3px] border-[#111827] flex items-center justify-center text-2xl sm:text-3xl transition-transform duration-150 ${
                      isActive
                        ? 'bg-[#4ADE80] scale-110 shadow-[0_0_0_4px_rgba(255,255,255,0.85),4px_4px_0_#111827]'
                        : isPast
                        ? 'bg-[#FACC15] shadow-[3px_3px_0_#111827] group-hover:scale-105'
                        : 'bg-white shadow-[3px_3px_0_#111827] group-hover:scale-105'
                    }`}
                  >
                    <span aria-hidden="true">{emojis[idx]}</span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-md border-2 border-[#111827] font-display text-[11px] font-bold whitespace-nowrap ${
                      isActive ? 'bg-[#111827] text-[#FDE047]' : 'bg-white text-[#111827]'
                    }`}
                  >
                    Step {idx + 1}
                  </span>
                </button>

                {idx < item.steps.length - 1 && (
                  <svg
                    width="32"
                    height="24"
                    viewBox="0 0 34 26"
                    className="shrink-0 -mt-5 hidden sm:block"
                    aria-hidden="true"
                  >
                    <path
                      d={idx % 2 === 0 ? 'M2 16 Q17 4 27 12' : 'M2 10 Q17 22 27 14'}
                      fill="none"
                      stroke="#111827"
                      strokeWidth="7"
                      strokeLinecap="round"
                    />
                    <path
                      d={idx % 2 === 0 ? 'M2 16 Q17 4 27 12' : 'M2 10 Q17 22 27 14'}
                      fill="none"
                      stroke="#F97316"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <polygon
                      points="33,13 23,6 24,20"
                      fill="#F97316"
                      stroke="#111827"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Progressive Build / Inside X-Ray Stage */}
      <ProgressiveBuildCanvas
        visualType={visualMeta.visualType}
        activeStep={activeStep}
        mode={viewMode}
        stageCaption={visualMeta.stageResults[activeStep]}
        xrayParts={visualMeta.xrayParts}
        itemEmoji={itemEmoji}
      />

      {/* Active Step Comic Speech Banner */}
      <div className="rounded-xl bg-white comic-panel-sm p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-start gap-3">
          <span className="w-9 h-9 rounded-full bg-[#FDE047] border-2 border-[#111827] flex items-center justify-center text-lg shrink-0">
            {emojis[activeStep]}
          </span>
          <div>
            <div className="font-display font-bold text-sm sm:text-base text-[#111827]">
              Step {activeStep + 1}: {currentStep.title}
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
              {currentStep.detail}
            </p>
          </div>
        </div>

        <span className="self-start sm:self-center shrink-0 bg-[#FEF08A] border-2 border-[#111827] px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold text-[#111827]">
          {item.diagramLabels.formula}
        </span>
      </div>
    </div>
  );
}
