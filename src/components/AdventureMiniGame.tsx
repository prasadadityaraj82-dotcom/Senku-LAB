import { useEffect, useMemo, useRef, useState } from 'react';
import type { AdventureLevel } from '../types/lab';

interface AdventureMiniGameProps {
  level: AdventureLevel;
  alreadyCleared: boolean;
  onProgressChange: (pct: number) => void;
  onWin: () => void;
  onFail: () => void;
  onSound: (kind: 'click' | 'craft' | 'eraUnlock' | 'correct' | 'wrong') => void;
}

function deterministicShuffle<T>(arr: T[], seed: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = (seed * 31 + i * 17) % (i + 1);
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  // Ensure it's not identical to original if length >= 3
  if (copy.length >= 3 && copy.every((item, idx) => item === arr[idx])) {
    const first = copy.shift()!;
    copy.push(first);
  }
  return copy;
}

export function AdventureMiniGame({
  level,
  onProgressChange,
  onWin,
  onFail,
  onSound,
}: AdventureMiniGameProps) {
  const timeLimit = level.timeLimitSec ?? 30;
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [status, setStatus] = useState<'playing' | 'won' | 'failed'>('playing');
  const [shake, setShake] = useState(false);
  const [hintText, setHintText] = useState<string | null>(null);

  // 1. tap_build state
  const [taps, setTaps] = useState(0);

  // 2. hold_rub state
  const [heat, setHeat] = useState(12);

  // 3. sequence_assemble / flowchart_cure state
  const [seqIndex, setSeqIndex] = useState(0);

  // 4. mix_reaction state
  const [pickedMix, setPickedMix] = useState<string[]>([]);
  const [mixErrors, setMixErrors] = useState(0);

  // 5. timing_action state
  const [cursorPos, setCursorPos] = useState(10); // 0..100 or countdown
  const dirRef = useRef(1);
  const [countdownVal, setCountdownVal] = useState(10);

  // 6. boss_battle state
  const [senkuHp, setSenkuHp] = useState(100);
  const [bossHp, setBossHp] = useState(100);
  const [qIndex, setQIndex] = useState(0);
  const [bossLog, setBossLog] = useState<string>('Taiyaar ho jao! Science Attack shuru!');
  const [bossStage, setBossStage] = useState<'quiz' | 'craft'>('quiz');
  const [finalCraftPicked, setFinalCraftPicked] = useState<string[]>([]);

  const wonRef = useRef(false);

  const triggerShake = () => {
    setShake(false);
    window.requestAnimationFrame(() => setShake(true));
  };

  const triggerWin = () => {
    if (wonRef.current) return;
    wonRef.current = true;
    setStatus('won');
    onProgressChange(100);
    onSound(level.isBoss ? 'eraUnlock' : 'craft');
    onWin();
  };

  const triggerFail = (reason?: string) => {
    if (wonRef.current) return;
    setStatus('failed');
    if (reason) setHintText(reason);
    onSound('wrong');
    onFail();
  };

  // Timer countdown
  useEffect(() => {
    if (status !== 'playing') return;
    const id = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(id);
          triggerFail('Time khatam ho gaya!');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, level.level]);

  // hold_rub decay loop
  useEffect(() => {
    if (status !== 'playing' || level.miniGameKind !== 'hold_rub') return;
    const id = window.setInterval(() => {
      setHeat((prev) => {
        const next = Math.max(0, prev - 2.6);
        onProgressChange(Math.round(next));
        return next;
      });
    }, 110);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, level.miniGameKind, level.level]);

  // timing_action animation loop
  useEffect(() => {
    if (status !== 'playing' || level.miniGameKind !== 'timing_action') return;

    if (level.timingMode === 'countdown') {
      const id = window.setInterval(() => {
        setCountdownVal((prev) => {
          const next = Number((prev - 0.1).toFixed(1));
          if (next < -0.5) {
            return 10; // loop back smoothly if missed so user can catch within 30s timer
          }
          const pct = Math.max(0, Math.min(100, Math.round(((10 - next) / 10) * 100)));
          onProgressChange(pct);
          return next;
        });
      }, 95);
      return () => window.clearInterval(id);
    }

    const speed = level.phaseId >= 4 ? 3.2 : 2.5;
    const id = window.setInterval(() => {
      setCursorPos((prev) => {
        let next = prev + dirRef.current * speed;
        if (next >= 96) {
          next = 96;
          dirRef.current = -1;
        } else if (next <= 4) {
          next = 4;
          dirRef.current = 1;
        }
        return next;
      });
    }, 30);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, level.miniGameKind, level.timingMode, level.level]);

  const shuffledSequence = useMemo(
    () =>
      level.sequenceSteps
        ? deterministicShuffle(level.sequenceSteps, level.level + 3)
        : [],
    [level.sequenceSteps, level.level]
  );

  const shuffledFlowchart = useMemo(
    () =>
      level.flowchartNodes
        ? deterministicShuffle(level.flowchartNodes, level.level + 7)
        : [],
    [level.flowchartNodes, level.level]
  );

  const handleRestart = () => {
    wonRef.current = false;
    setTimeLeft(timeLimit);
    setStatus('playing');
    setHintText(null);
    setTaps(0);
    setHeat(12);
    setSeqIndex(0);
    setPickedMix([]);
    setMixErrors(0);
    setCursorPos(10);
    setCountdownVal(10);
    setSenkuHp(100);
    setBossHp(100);
    setQIndex(0);
    setBossLog('Taiyaar ho jao! Science Attack shuru!');
    setBossStage('quiz');
    setFinalCraftPicked([]);
    onProgressChange(0);
    onSound('click');
  };

  if (status === 'failed') {
    return (
      <div className="rounded-2xl bg-[#FEE2E2] border-[3px] border-[#111827] shadow-[4px_4px_0_#111827] p-6 text-center space-y-4">
        <div className="text-5xl">💥😵</div>
        <h3 className="font-display text-2xl font-extrabold text-[#B91C1C]">
          Fail ho gaya! Phir se try kar! Science me haar nahi hoti!
        </h3>
        {hintText && <p className="text-sm font-bold text-slate-800">{hintText}</p>}
        <button
          type="button"
          onClick={handleRestart}
          className="comic-btn px-7 py-3.5 rounded-2xl bg-[#FDE047] hover:bg-[#FACC15] text-[#111827] font-display font-extrabold text-base cursor-pointer"
        >
          🔄 Retry Level {level.level}
        </button>
      </div>
    );
  }

  // Shared Timer Pill Bar
  const timerUrgent = timeLeft <= 7 && status === 'playing';

  return (
    <div
      className={`rounded-3xl bg-white comic-panel p-4 sm:p-6 space-y-5 ${
        shake ? 'animate-comic-shake' : ''
      }`}
      onAnimationEnd={() => setShake(false)}
    >
      {/* Task Prompt & Timer Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b-2 border-slate-200">
        <div>
          <span className="text-xs font-display font-extrabold text-[#EA580C]">
            🎯 MISSION TASK
          </span>
          <p className="font-display font-bold text-base sm:text-lg text-[#111827]">
            {level.taskPrompt}
          </p>
        </div>

        <div
          className={`px-3.5 py-1.5 rounded-xl border-2 border-[#111827] font-mono text-sm font-extrabold tabular-nums shrink-0 self-start sm:self-auto ${
            status === 'won'
              ? 'bg-[#4ADE80] text-[#111827]'
              : timerUrgent
              ? 'bg-[#EF4444] text-white'
              : 'bg-[#FEF9C3] text-[#111827]'
          }`}
        >
          {status === 'won' ? '✅ CLEARED!' : `⏱️ ${timeLeft}s`}
        </div>
      </div>

      {/* ================= 1. TAP BUILD ================= */}
      {level.miniGameKind === 'tap_build' && (() => {
        const target = level.tapTarget ?? 6;
        const stages = level.stageEmojis ?? [level.emoji];
        const stageIdx = Math.min(
          stages.length - 1,
          Math.floor((taps / target) * (stages.length - 1))
        );
        const pct = Math.min(100, Math.round((taps / target) * 100));

        return (
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="w-36 h-36 rounded-3xl bg-[#FEF9C3] border-[3px] border-[#111827] shadow-[4px_4px_0_#111827] flex flex-col items-center justify-center">
              <span className="text-6xl transition-transform duration-150">
                {stages[stageIdx]}
              </span>
              <span className="font-mono text-xs font-extrabold text-[#111827] mt-1 tabular-nums">
                {taps} / {target}
              </span>
            </div>

            {status === 'playing' ? (
              <button
                type="button"
                onClick={() => {
                  const next = taps + 1;
                  setTaps(next);
                  const nextPct = Math.min(100, Math.round((next / target) * 100));
                  onProgressChange(nextPct);
                  onSound('click');
                  if (next >= target) triggerWin();
                }}
                className="comic-btn px-8 py-4 rounded-2xl bg-[#4ADE80] hover:bg-[#22C55E] text-[#111827] font-display font-extrabold text-lg cursor-pointer"
              >
                {level.tapActionLabel ?? '🔨 TAP TO BUILD!'}
              </button>
            ) : (
              <div className="font-display font-extrabold text-xl text-[#15803D]">
                💥 {level.title} Complete! ({pct}%)
              </div>
            )}
          </div>
        );
      })()}

      {/* ================= 2. HOLD / RUB FAST ================= */}
      {level.miniGameKind === 'hold_rub' && (() => {
        const stages = level.stageEmojis ?? ['🪵', '💨', '✨', '🔥'];
        const sIdx = Math.min(stages.length - 1, Math.floor((heat / 100) * (stages.length - 1)));

        return (
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="w-full max-w-md space-y-2">
              <div className="flex items-center justify-between font-display text-sm font-extrabold">
                <span>Energy / Friction Meter</span>
                <span className="text-[#EA580C] tabular-nums">{Math.round(heat)}%</span>
              </div>
              <div className="h-7 w-full rounded-2xl bg-slate-200 border-[3px] border-[#111827] overflow-hidden p-0.5">
                <div
                  className="h-full rounded-xl bg-gradient-to-r from-[#FDE047] via-[#F97316] to-[#EF4444] transition-all duration-100"
                  style={{ width: `${Math.min(100, heat)}%` }}
                />
              </div>
            </div>

            <div className="w-28 h-28 rounded-full bg-[#FFEDD5] border-[3px] border-[#111827] shadow-[3px_3px_0_#111827] flex items-center justify-center text-5xl">
              {stages[sIdx]}
            </div>

            {status === 'playing' ? (
              <button
                type="button"
                onClick={() => {
                  onSound('click');
                  setHeat((prev) => {
                    const next = Math.min(100, prev + 15);
                    onProgressChange(Math.round(next));
                    if (next >= 100) triggerWin();
                    return next;
                  });
                }}
                className="comic-btn px-8 py-4 rounded-2xl bg-[#F97316] hover:bg-[#EA580C] text-white font-display font-extrabold text-lg cursor-pointer"
              >
                {level.tapActionLabel ?? '🔥 TAP FAST!'}
              </button>
            ) : (
              <div className="font-display font-extrabold text-xl text-[#15803D]">
                🔥 100% IGNITED! {level.title} Ready!
              </div>
            )}
          </div>
        );
      })()}

      {/* ================= 3. SEQUENCE ASSEMBLE & 6. FLOWCHART CURE ================= */}
      {(level.miniGameKind === 'sequence_assemble' || level.miniGameKind === 'flowchart_cure') &&
        (() => {
          const ordered =
            level.miniGameKind === 'flowchart_cure'
              ? level.flowchartNodes ?? []
              : level.sequenceSteps ?? [];
          const shuffled =
            level.miniGameKind === 'flowchart_cure' ? shuffledFlowchart : shuffledSequence;

          return (
            <div className="space-y-5">
              {/* Target Assembly Slots */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-[#FEF9C3] border-2 border-[#111827] rounded-2xl p-3.5">
                {ordered.map((step, idx) => {
                  const done = idx < seqIndex || status === 'won';
                  const isCurrent = idx === seqIndex && status === 'playing';
                  return (
                    <div key={step.id} className="flex items-center gap-2">
                      <div
                        className={`px-3 py-2 rounded-xl border-2 border-[#111827] flex items-center gap-1.5 font-display text-xs font-bold ${
                          done
                            ? 'bg-[#4ADE80] text-[#111827] shadow-[2px_2px_0_#111827]'
                            : isCurrent
                            ? 'bg-white text-[#111827] border-dashed'
                            : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        <span>{done ? step.emoji : `${idx + 1}.`}</span>
                        <span>{done ? step.label : isCurrent ? 'Next Step?' : 'Locked'}</span>
                      </div>
                      {idx < ordered.length - 1 && (
                        <span className="font-display font-extrabold text-[#F97316]">➜</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {hintText && (
                <div className="text-center font-display text-xs font-extrabold text-[#DC2626]">
                  ⚠️ {hintText}
                </div>
              )}

              {/* Clickable Shuffled Parts */}
              {status === 'playing' ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {shuffled.map((node) => {
                    const alreadyIdx = ordered.findIndex((o) => o.id === node.id);
                    const used = alreadyIdx < seqIndex;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        disabled={used}
                        onClick={() => {
                          const expected = ordered[seqIndex];
                          if (expected && node.id === expected.id) {
                            const nextIdx = seqIndex + 1;
                            setSeqIndex(nextIdx);
                            setHintText(null);
                            onSound('correct');
                            onProgressChange(Math.round((nextIdx / ordered.length) * 100));
                            if (nextIdx >= ordered.length) {
                              triggerWin();
                            }
                          } else {
                            onSound('wrong');
                            triggerShake();
                            setHintText(
                              `Galat order! Pehle "${expected?.label}" lagao — Senku tip!`
                            );
                          }
                        }}
                        className={`rounded-2xl border-[3px] border-[#111827] p-3 flex flex-col items-center gap-1.5 transition-all ${
                          used
                            ? 'bg-slate-100 opacity-45 cursor-not-allowed'
                            : 'bg-white hover:bg-[#FEF08A] shadow-[3px_3px_0_#111827] cursor-pointer'
                        }`}
                      >
                        <span className="text-3xl">{node.emoji}</span>
                        <span className="font-display font-bold text-xs text-[#111827] text-center">
                          {node.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center font-display font-extrabold text-xl text-[#15803D]">
                  ✅ Flowchart &amp; Assembly 100% Complete!
                </div>
              )}
            </div>
          );
        })()}

      {/* ================= 4. MIX REACTION ================= */}
      {level.miniGameKind === 'mix_reaction' && (() => {
        const options = level.mixOptions ?? [];
        const pickedItems = pickedMix
          .map((id) => options.find((o) => o.id === id))
          .filter((x): x is NonNullable<typeof x> => Boolean(x));

        return (
          <div className="space-y-5">
            {level.mixDangerMode && (
              <div className="rounded-xl bg-[#FEE2E2] border-2 border-[#111827] px-3 py-2 text-xs font-display font-extrabold text-[#B91C1C] text-center">
                ⚠️ NITROGLYCERIN DANGER! Ek bhi galat mix kiya toh BOOM ho jayega! ({2 - mixErrors} safety chances left)
              </div>
            )}

            {/* Mixing Flasks */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {[0, 1].map((slotIdx) => {
                const picked = pickedItems[slotIdx];
                return (
                  <button
                    key={slotIdx}
                    type="button"
                    onClick={() => {
                      if (!picked || status !== 'playing') return;
                      setPickedMix((prev) => prev.filter((_, i) => i !== slotIdx));
                    }}
                    className={`w-36 h-28 rounded-2xl border-[3px] border-[#111827] flex flex-col items-center justify-center p-2 cursor-pointer ${
                      picked
                        ? 'bg-[#FDE047] shadow-[3px_3px_0_#111827]'
                        : 'bg-slate-100 border-dashed text-slate-500'
                    }`}
                  >
                    {picked ? (
                      <>
                        <span className="text-3xl">{picked.emoji}</span>
                        <span className="font-display font-bold text-xs text-[#111827]">
                          {picked.label}
                        </span>
                      </>
                    ) : (
                      <span className="font-display font-bold text-xs">
                        Slot {slotIdx + 1} (Pick)
                      </span>
                    )}
                  </button>
                );
              })}

              {status === 'playing' && (
                <button
                  type="button"
                  disabled={pickedMix.length !== 2}
                  onClick={() => {
                    const correct = level.correctMixIds;
                    if (!correct) return;
                    const match =
                      (pickedMix[0] === correct[0] && pickedMix[1] === correct[1]) ||
                      (pickedMix[0] === correct[1] && pickedMix[1] === correct[0]);

                    if (match) {
                      triggerWin();
                    } else {
                      triggerShake();
                      onSound('wrong');
                      const errs = mixErrors + 1;
                      setMixErrors(errs);
                      setPickedMix([]);
                      if (level.mixDangerMode && errs >= 2) {
                        triggerFail('BOOM! Nitroglycerin shake ho gaya! Dhyan se mix karo!');
                      } else {
                        setHintText('Galat chemical combo! Senku hint: Formula dekh ke sahi 2 chuno!');
                      }
                    }
                  }}
                  className={`comic-btn px-6 py-4 rounded-2xl font-display font-extrabold text-base ${
                    pickedMix.length === 2
                      ? 'bg-[#F97316] hover:bg-[#EA580C] text-white cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  ⚗️ MIX!
                </button>
              )}
            </div>

            {hintText && status === 'playing' && (
              <div className="text-center font-display text-xs font-extrabold text-[#DC2626]">
                💥 {hintText}
              </div>
            )}

            {/* Chemical Choices */}
            {status === 'playing' ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {options.map((opt) => {
                  const selected = pickedMix.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setHintText(null);
                        onSound('click');
                        if (selected) {
                          setPickedMix((prev) => prev.filter((id) => id !== opt.id));
                        } else if (pickedMix.length < 2) {
                          const next = [...pickedMix, opt.id];
                          setPickedMix(next);
                          onProgressChange(next.length * 35);
                        } else {
                          setPickedMix([pickedMix[1], opt.id]);
                        }
                      }}
                      className={`rounded-2xl border-[3px] border-[#111827] p-3 flex flex-col items-center gap-1 cursor-pointer transition-all ${
                        selected
                          ? 'bg-[#4ADE80] shadow-[3px_3px_0_#111827] -translate-y-0.5'
                          : 'bg-[#FFFDF2] hover:bg-[#FEF9C3] shadow-[2px_2px_0_#111827]'
                      }`}
                    >
                      <span className="text-3xl">{opt.emoji}</span>
                      <span className="font-display font-extrabold text-xs text-[#111827] text-center">
                        {opt.label}
                      </span>
                      {opt.formula && (
                        <span className="font-mono text-[10px] font-bold text-slate-600">
                          {opt.formula}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-center font-display font-extrabold text-xl text-[#15803D]">
                🧪 {level.mixResultText ?? 'Perfect Chemical Reaction!'}
              </div>
            )}
          </div>
        );
      })()}

      {/* ================= 5. TIMING ACTION (Trap, Gas, Frequency, Photo, Drone, Sonar, Countdown) ================= */}
      {level.miniGameKind === 'timing_action' && (() => {
        if (level.timingMode === 'countdown') {
          const inLaunchWindow = countdownVal <= 3.2 && countdownVal >= -0.2;
          return (
            <div className="flex flex-col items-center gap-5 py-3">
              <div className="w-44 h-44 rounded-full bg-[#111827] border-4 border-[#FDE047] shadow-[4px_4px_0_#111827] flex flex-col items-center justify-center text-white">
                <span className="font-display text-xs font-bold text-[#FDE047]">
                  IGNITION WINDOW: 3 → 0
                </span>
                <span className="font-mono text-5xl font-extrabold tabular-nums text-white mt-1">
                  {countdownVal <= 0 ? '0.0' : countdownVal.toFixed(1)}
                </span>
                <span
                  className={`text-xs font-display font-bold mt-1 px-2 py-0.5 rounded ${
                    inLaunchWindow ? 'bg-[#22C55E] text-white' : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {inLaunchWindow ? '🔥 LAUNCH NOW!' : 'WAIT...'}
                </span>
              </div>

              {status === 'playing' ? (
                <button
                  type="button"
                  onClick={() => {
                    if (inLaunchWindow) {
                      triggerWin();
                    } else {
                      triggerShake();
                      onSound('wrong');
                      setHintText('Jaldi daba diya! 3..2..1..0 ke beech me IGNITE dabao!');
                    }
                  }}
                  className="comic-btn px-9 py-4 rounded-2xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-display font-extrabold text-xl cursor-pointer"
                >
                  {level.timingTargetLabel ?? '🚀 IGNITE!'}
                </button>
              ) : (
                <div className="font-display font-extrabold text-2xl text-[#15803D]">
                  🚀 3, 2, 1... BOOM!! LIFT-OFF TO THE MOON!!
                </div>
              )}

              {hintText && status === 'playing' && (
                <div className="font-display text-xs font-extrabold text-[#DC2626]">
                  ⚠️ {hintText}
                </div>
              )}
            </div>
          );
        }

        const inZone = cursorPos >= 38 && cursorPos <= 62;
        return (
          <div className="flex flex-col items-center gap-5 py-3">
            <div className="w-full max-w-lg space-y-2">
              <div className="flex justify-between font-display text-xs font-extrabold text-[#111827]">
                <span>0%</span>
                <span className="text-[#15803D]">🎯 TARGET ZONE (38–62%)</span>
                <span>100%</span>
              </div>
              <div className="relative h-11 w-full rounded-2xl bg-slate-200 border-[3px] border-[#111827] overflow-hidden">
                {/* Green Target Zone */}
                <div
                  className="absolute top-0 bottom-0 bg-[#4ADE80]/80 border-x-2 border-[#111827]"
                  style={{ left: '38%', width: '24%' }}
                />
                {/* Moving Marker */}
                <div
                  className="absolute top-1 bottom-1 w-4 -ml-2 rounded-lg bg-[#EF4444] border-2 border-[#111827]"
                  style={{ left: `${cursorPos}%` }}
                />
              </div>
            </div>

            {status === 'playing' ? (
              <button
                type="button"
                onClick={() => {
                  if (inZone) {
                    triggerWin();
                  } else {
                    triggerShake();
                    onSound('wrong');
                    setHintText('Thoda chook gaye! Jab red marker GREEN ZONE me aaye tab dabao!');
                  }
                }}
                className="comic-btn px-8 py-4 rounded-2xl bg-[#FDE047] hover:bg-[#FACC15] text-[#111827] font-display font-extrabold text-lg cursor-pointer"
              >
                {level.timingTargetLabel ?? '🎯 LOCK TARGET!'}
              </button>
            ) : (
              <div className="font-display font-extrabold text-xl text-[#15803D]">
                🎯 BULLSEYE! {level.title} Success!
              </div>
            )}

            {hintText && status === 'playing' && (
              <div className="font-display text-xs font-extrabold text-[#DC2626]">
                ⚠️ {hintText}
              </div>
            )}
          </div>
        );
      })()}

      {/* ================= 7. BOSS BATTLE (Level 27 Tsukasa & Level 50 Why-Man) ================= */}
      {level.miniGameKind === 'boss_battle' && (() => {
        const questions = level.bossQuestions ?? [];
        const currentQ = questions[qIndex];

        return (
          <div className="space-y-5">
            {/* HP Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#DCFCE7] border-2 border-[#111827] p-3 space-y-1.5">
                <div className="flex items-center justify-between font-display text-xs font-extrabold">
                  <span>🧪 Dr. Senku</span>
                  <span className="tabular-nums">HP: {senkuHp}/100</span>
                </div>
                <div className="h-4 rounded-full bg-white border-2 border-[#111827] overflow-hidden">
                  <div
                    className="h-full bg-[#22C55E] transition-all duration-300"
                    style={{ width: `${senkuHp}%` }}
                  />
                </div>
              </div>

              <div className="rounded-2xl bg-[#FEE2E2] border-2 border-[#111827] p-3 space-y-1.5">
                <div className="flex items-center justify-between font-display text-xs font-extrabold">
                  <span>
                    {level.bossEnemyEmoji} {level.bossEnemyName}
                  </span>
                  <span className="tabular-nums">HP: {bossHp}/100</span>
                </div>
                <div className="h-4 rounded-full bg-white border-2 border-[#111827] overflow-hidden">
                  <div
                    className="h-full bg-[#EF4444] transition-all duration-300"
                    style={{ width: `${bossHp}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Battle Log */}
            <div className="rounded-xl bg-[#FEF9C3] border-2 border-[#111827] px-4 py-2.5 font-display text-xs sm:text-sm font-extrabold text-[#111827] text-center">
              ⚡ {bossLog}
            </div>

            {status === 'playing' && bossStage === 'quiz' && currentQ && (
              <div className="space-y-3">
                <div className="font-display font-extrabold text-base sm:text-lg text-[#111827]">
                  Q{qIndex + 1}/{questions.length}: {currentQ.prompt}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        if (idx === currentQ.correctIndex) {
                          onSound('correct');
                          const dmg = Math.ceil(100 / questions.length);
                          const nextBossHp = Math.max(0, bossHp - dmg);
                          setBossHp(nextBossHp);
                          setBossLog(currentQ.attackLine);

                          const nextQ = qIndex + 1;
                          if (nextQ >= questions.length || nextBossHp === 0) {
                            if (level.finalCraftCombo) {
                              setBossStage('craft');
                              onProgressChange(75);
                              setBossLog(
                                'Quiz Battle Jeet Gaye! Ab Final Anti-Medusa Combo Craft karo!'
                              );
                            } else {
                              triggerWin();
                            }
                          } else {
                            setQIndex(nextQ);
                            onProgressChange(Math.round((nextQ / questions.length) * 100));
                          }
                        } else {
                          onSound('wrong');
                          triggerShake();
                          const nextSenkuHp = Math.max(0, senkuHp - 35);
                          setSenkuHp(nextSenkuHp);
                          setBossLog(
                            `OUCH! ${level.bossEnemyName} ne counter-attack kiya! (-35 HP)`
                          );
                          if (nextSenkuHp <= 0) {
                            triggerFail(`${level.bossEnemyName} ke attack se HP 0 ho gayi!`);
                          }
                        }
                      }}
                      className="rounded-xl bg-white hover:bg-[#FEF08A] border-[3px] border-[#111827] shadow-[3px_3px_0_#111827] p-3 text-left font-display font-bold text-sm text-[#111827] cursor-pointer"
                    >
                      {String.fromCharCode(65 + idx)}. {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Level 50 Final Crafting Combo Phase */}
            {status === 'playing' && bossStage === 'craft' && level.finalCraftCombo && (
              <div className="rounded-2xl bg-[#E0F2FE] border-[3px] border-[#111827] p-4 space-y-4">
                <div className="font-display font-extrabold text-base text-[#111827] text-center">
                  🛠️ FINAL CRAFTING COMBO: Select 3 parts for{' '}
                  <span className="text-[#EA580C]">{level.finalCraftCombo.resultName}</span>!
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {level.finalCraftCombo.parts.map((part) => {
                    const picked = finalCraftPicked.includes(part.id);
                    return (
                      <button
                        key={part.id}
                        type="button"
                        onClick={() => {
                          onSound('click');
                          setFinalCraftPicked((prev) =>
                            prev.includes(part.id)
                              ? prev.filter((p) => p !== part.id)
                              : [...prev, part.id]
                          );
                        }}
                        className={`rounded-2xl border-[3px] border-[#111827] p-3 flex flex-col items-center gap-1 cursor-pointer ${
                          picked
                            ? 'bg-[#4ADE80] shadow-[3px_3px_0_#111827]'
                            : 'bg-white shadow-[2px_2px_0_#111827]'
                        }`}
                      >
                        <span className="text-3xl">{part.emoji}</span>
                        <span className="font-display font-bold text-xs text-[#111827] text-center">
                          {part.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="text-center">
                  <button
                    type="button"
                    disabled={finalCraftPicked.length === 0}
                    onClick={() => {
                      const req = level.finalCraftCombo!.correctIds;
                      const ok =
                        finalCraftPicked.length === req.length &&
                        req.every((id) => finalCraftPicked.includes(id));
                      if (ok) {
                        setBossHp(0);
                        triggerWin();
                      } else {
                        triggerShake();
                        onSound('wrong');
                        setBossLog(
                          'Galat combo! Moon Dust mat chuno — sirf Diamond + Radio Dish + Transistor chahiye!'
                        );
                      }
                    }}
                    className="comic-btn px-8 py-3.5 rounded-2xl bg-[#EC4899] hover:bg-[#DB2777] text-white font-display font-extrabold text-base cursor-pointer"
                  >
                    💥 FIRE ANTI-MEDUSA CRAFT!
                  </button>
                </div>
              </div>
            )}

            {status === 'won' && (
              <div className="text-center font-display font-extrabold text-xl text-[#15803D]">
                🏆 VICTORY! {level.bossEnemyName} Defeated!
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
