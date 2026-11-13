import { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { drawQuizSet } from '../data/quizAndDaily';
import type { QuizQuestion } from '../types/lab';

interface QuizViewProps {
  bestScore: number;
  sessionsCompleted: number;
  onAnswerFeedback: (isCorrect: boolean) => void;
  onFinishQuiz: (correctCount: number, coinsEarned: number) => void;
}

type QuizPhase = 'INTRO' | 'PLAYING' | 'SUMMARY';

export function QuizView({
  bestScore,
  sessionsCompleted,
  onAnswerFeedback,
  onFinishQuiz,
}: QuizViewProps) {
  const [phase, setPhase] = useState<QuizPhase>('INTRO');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const startQuiz = () => {
    setQuestions(drawQuizSet(10));
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setPhase('PLAYING');
  };

  const handleSelectOption = (optionIdx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);
    const currentQ = questions[currentIndex];
    const isCorrect = optionIdx === currentQ.correctIndex;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    onAnswerFeedback(isCorrect);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      const coinsEarned = score * 10;
      onFinishQuiz(score, coinsEarned);
      setPhase('SUMMARY');
    }
  };

  if (phase === 'INTRO') {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="rounded-3xl bg-white comic-panel p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <span className="inline-block bg-[#FB923C] text-white border-2 border-[#111827] px-3 py-1 rounded-xl font-display text-xs font-bold">
              ⚡ SCIENCE QUIZ ARENA · 10 MCQS
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827]">
              10 Billion Percent Science Quiz!
            </h1>
            <p className="text-sm sm:text-base text-slate-700 font-semibold leading-relaxed">
              10 mazedaar Hinglish science questions solve karo — har sahi jawab par seedha{' '}
              <span className="bg-[#FEF08A] border border-[#111827] px-1.5 rounded font-bold text-[#111827]">
                +10 Coins 🪙
              </span>{' '}
              milenge!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 font-display tabular-nums">
            <div className="p-4 rounded-2xl bg-[#FEF9C3] border-2 border-[#111827]">
              <div className="text-xs font-bold text-slate-600">Questions</div>
              <div className="text-xl font-extrabold text-[#111827] mt-0.5">10 MCQs</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#FFEDD5] border-2 border-[#111827]">
              <div className="text-xs font-bold text-slate-600">Reward</div>
              <div className="text-xl font-extrabold text-[#EA580C] mt-0.5">+10 🪙 / Ans</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#DCFCE7] border-2 border-[#111827]">
              <div className="text-xs font-bold text-slate-600">Best Score</div>
              <div className="text-xl font-extrabold text-[#15803D] mt-0.5">{bestScore}/10</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={startQuiz}
              className="comic-btn px-7 py-3.5 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-display font-extrabold text-base cursor-pointer inline-flex items-center gap-2 whitespace-nowrap"
            >
              <span>🚀 Start Quiz!</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <span className="text-xs font-display font-bold text-slate-600 tabular-nums">
              Quizzes played: {sessionsCompleted}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'SUMMARY') {
    const coinsEarned = score * 10;
    const rank =
      score >= 9
        ? '👨‍🔬 Dr. Senku Level Genius!'
        : score >= 7
        ? '⚡ Kingdom of Science Captain!'
        : score >= 4
        ? '🧪 Badhiya Try! Keep Crafting!'
        : '🪨 Map par thoda aur revise karo!';

    return (
      <div className="max-w-2xl mx-auto">
        <div className="rounded-3xl bg-white comic-panel p-7 sm:p-10 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#FDE047] border-[3px] border-[#111827] shadow-[4px_4px_0_#111827] flex items-center justify-center text-4xl mx-auto">
            🏆
          </div>

          <div className="space-y-1.5">
            <span className="inline-block bg-[#4ADE80] border-2 border-[#111827] px-3 py-0.5 rounded-lg font-display text-xs font-bold">
              QUIZ COMPLETE!
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#111827] tabular-nums">
              {score} / {questions.length} Correct
            </h2>
            <p className="text-base font-display font-bold text-[#EA580C]">{rank}</p>
          </div>

          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#FEF08A] border-[3px] border-[#111827] shadow-[3px_3px_0_#111827] font-display text-lg font-extrabold text-[#111827] tabular-nums">
            <span>🪙 +{coinsEarned} Coins Earned!</span>
          </div>

          <div>
            <button
              type="button"
              onClick={startQuiz}
              className="comic-btn px-7 py-3.5 rounded-2xl bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#111827] font-display font-extrabold text-base cursor-pointer inline-flex items-center gap-2 whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again!</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const answered = selectedOption !== null;
  const isCurrentCorrect = answered && selectedOption === currentQ.correctIndex;
  const progressPct = Math.round(((currentIndex + (answered ? 1 : 0)) / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {/* Progress Bar */}
      <div className="rounded-2xl bg-white comic-panel-sm p-4 space-y-2 font-display text-xs font-bold tabular-nums">
        <div className="flex items-center justify-between text-[#111827]">
          <span>
            Question {currentIndex + 1} / {questions.length}
          </span>
          <span className="text-[#EA580C]">🪙 Coins this round: +{score * 10}</span>
        </div>
        <div className="h-3 w-full rounded-full bg-slate-200 border-2 border-[#111827] overflow-hidden">
          <div
            className="h-full bg-[#22C55E] transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-3xl bg-white comic-panel p-5 sm:p-8 space-y-5">
        <div className="space-y-2">
          <span className="inline-block bg-[#FEF08A] border-2 border-[#111827] px-2.5 py-0.5 rounded-lg font-display text-xs font-bold text-[#111827]">
            Era {currentQ.eraId} Science Check
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#111827] leading-snug">
            {currentQ.question}
          </h2>
        </div>

        <div className="space-y-3">
          {currentQ.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectOpt = idx === currentQ.correctIndex;

            let optionBg = 'bg-slate-50 hover:bg-[#FEF9C3] text-[#111827]';
            if (answered) {
              if (isCorrectOpt) {
                optionBg = 'bg-[#4ADE80] text-[#111827]';
              } else if (isSelected && !isCorrectOpt) {
                optionBg = 'bg-[#FCA5A5] text-[#111827]';
              } else {
                optionBg = 'bg-slate-100 text-slate-400';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={answered}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left rounded-2xl p-4 border-[3px] border-[#111827] transition-all flex items-center justify-between gap-3 ${
                  answered ? 'cursor-default' : 'cursor-pointer shadow-[2px_3px_0_#111827]'
                } ${optionBg}`}
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-white border-2 border-[#111827] flex items-center justify-center font-display text-xs font-extrabold text-[#111827] shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm sm:text-base font-bold leading-snug">{opt}</span>
                </div>

                {answered && isCorrectOpt && <span className="text-xl shrink-0">✅</span>}
                {answered && isSelected && !isCorrectOpt && <span className="text-xl shrink-0">❌</span>}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className="pt-3 space-y-4">
            <div
              className={`rounded-2xl p-4 border-2 border-[#111827] text-sm font-semibold leading-relaxed ${
                isCurrentCorrect ? 'bg-[#DCFCE7]' : 'bg-[#FFEDD5]'
              }`}
            >
              <div className="font-display font-extrabold text-sm text-[#111827] mb-1">
                {isCurrentCorrect ? '💥 10 Billion % Sahi! +10 Coins!' : '👨‍🔬 Arre! Senku Explanation:'}
              </div>
              <p className="text-[#111827]">{currentQ.explanation}</p>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleNextQuestion}
                className="comic-btn px-6 py-3 rounded-2xl bg-[#FDE047] hover:bg-[#FACC15] text-[#111827] font-display font-extrabold text-sm sm:text-base cursor-pointer inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>
                  {currentIndex + 1 < questions.length ? 'Next Question' : 'See Results!'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
