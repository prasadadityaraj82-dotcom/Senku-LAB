import { useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { DAILY_EXPERIMENTS, getDailyExperimentForDate } from '../data/quizAndDaily';
import type { DailyExperiment } from '../types/lab';

interface DailyExperimentViewProps {
  todayDateStr: string;
  isDailyCompleted: boolean;
  onCompleteDaily: () => void;
}

export function DailyExperimentView({
  todayDateStr,
  isDailyCompleted,
  onCompleteDaily,
}: DailyExperimentViewProps) {
  const todaysExperiment = getDailyExperimentForDate(todayDateStr);
  const [selectedExp, setSelectedExp] = useState<DailyExperiment>(todaysExperiment);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  const isShowingToday = selectedExp.id === todaysExperiment.id;

  const toggleStep = (idx: number) => {
    setCheckedSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const pickPracticeExperiment = () => {
    const others = DAILY_EXPERIMENTS.filter((e) => e.id !== selectedExp.id);
    const random = others[Math.floor(Math.random() * others.length)];
    setSelectedExp(random);
    setCheckedSteps([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      {/* Header Banner */}
      <div className="rounded-2xl bg-[#FEF08A] comic-panel p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="inline-block bg-[#F97316] text-white border-2 border-[#111827] px-2.5 py-0.5 rounded-lg font-display text-xs font-bold">
            🔬 DAILY HOME LAB · {todayDateStr}
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111827]">
            Aaj ka Safe Home Experiment
          </h1>
          <p className="text-sm text-slate-800 font-semibold">
            Ghar ki simple cheezon se roz ek science magic karke dekho!
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isShowingToday && (
            <button
              type="button"
              onClick={() => {
                setSelectedExp(todaysExperiment);
                setCheckedSteps([]);
              }}
              className="comic-btn px-3.5 py-2 rounded-xl bg-white text-xs font-display font-bold text-[#111827] cursor-pointer whitespace-nowrap"
            >
              Today&apos;s Pick
            </button>
          )}
          <button
            type="button"
            onClick={pickPracticeExperiment}
            className="comic-btn px-3.5 py-2 rounded-xl bg-[#38BDF8] text-xs font-display font-bold text-[#111827] cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Another</span>
          </button>
        </div>
      </div>

      {/* Main Experiment Card */}
      <div className="rounded-2xl bg-white comic-panel p-5 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-[3px] border-dashed border-slate-300">
          <div>
            <div className="flex items-center gap-2 text-xs font-display font-bold text-slate-600 mb-1">
              <span className="bg-[#DCFCE7] border-2 border-[#111827] px-2 py-0.5 rounded-md text-[#111827]">
                {selectedExp.category}
              </span>
              <span>⏱️ {selectedExp.timeMinutes} min</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#111827]">
              {selectedExp.title}
            </h2>
          </div>

          {isShowingToday && isDailyCompleted && (
            <div className="bg-[#4ADE80] comic-panel-sm px-3.5 py-1.5 rounded-xl font-display font-bold text-sm text-[#111827]">
              ✅ Daily Reward Claimed!
            </div>
          )}
        </div>

        {/* Materials */}
        <div className="space-y-2">
          <h3 className="font-display text-sm font-bold text-[#111827]">
            🧺 Samaan Jo Chahiye (Materials)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedExp.materials.map((mat, i) => (
              <div
                key={i}
                className="bg-[#FEF9C3] border-2 border-[#111827] rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#111827]"
              >
                • {mat}
              </div>
            ))}
          </div>
        </div>

        {/* Steps Checklist */}
        <div className="space-y-2.5">
          <h3 className="font-display text-sm font-bold text-[#111827]">
            ✅ Steps (Tap to check off!)
          </h3>
          <div className="space-y-2.5">
            {selectedExp.steps.map((step, idx) => {
              const checked = checkedSteps.includes(idx);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => toggleStep(idx)}
                  className={`w-full text-left rounded-xl p-3.5 border-2 border-[#111827] transition-colors cursor-pointer flex items-start gap-3 ${
                    checked ? 'bg-[#DCFCE7]' : 'bg-white hover:bg-[#FEF9C3]'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg border-2 border-[#111827] shrink-0 flex items-center justify-center font-display text-xs font-bold ${
                      checked ? 'bg-[#22C55E] text-white' : 'bg-[#FDE047] text-[#111827]'
                    }`}
                  >
                    {checked ? '✓' : idx + 1}
                  </span>
                  <span className="text-sm font-semibold text-[#111827] leading-relaxed">
                    {step}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Science Behind + Safety */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-[#FCE7F3] border-2 border-[#111827] p-4 space-y-1">
            <div className="font-display font-bold text-sm text-[#BE185D]">
              ⭐ Iske Peeche ka Science
            </div>
            <p className="text-sm text-[#111827] font-medium leading-relaxed">
              {selectedExp.scienceBehind}
            </p>
          </div>

          <div className="rounded-xl bg-[#FFEDD5] border-2 border-[#111827] p-4 space-y-1">
            <div className="font-display font-bold text-sm text-[#C2410C]">
              ⚠️ Safety Check
            </div>
            <p className="text-sm text-[#111827] font-medium leading-relaxed">
              {selectedExp.safetyNote}
            </p>
          </div>
        </div>

        {/* Claim Daily Reward */}
        <div className="pt-2">
          {isShowingToday ? (
            !isDailyCompleted ? (
              <button
                type="button"
                onClick={onCompleteDaily}
                className="comic-btn px-6 py-3.5 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-display font-extrabold text-sm sm:text-base cursor-pointer whitespace-nowrap"
              >
                💥 Mark Daily Experiment Done (+30 XP · +15 Coins!)
              </button>
            ) : (
              <div className="inline-block bg-[#DCFCE7] border-2 border-[#111827] px-4 py-2 rounded-xl font-display font-bold text-sm text-[#15803D]">
                ✅ Aaj ka experiment done! Kal naya experiment aayega.
              </div>
            )
          ) : (
            <div className="text-xs font-display font-bold text-slate-600">
              Practice Mode — Daily reward ke liye &ldquo;Today&apos;s Pick&rdquo; par wapas jao.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
