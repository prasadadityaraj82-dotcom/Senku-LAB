import { useEffect, useState } from 'react';

interface SplashIntroProps {
  onFinish: () => void;
}

const DURATION_MS = 10000;

export function SplashIntro({ onFinish }: SplashIntroProps) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const interval = window.setInterval(() => {
      const elapsed = performance.now() - start;
      if (elapsed >= DURATION_MS) {
        setElapsedMs(DURATION_MS);
        window.clearInterval(interval);
        setExiting(true);
        window.setTimeout(onFinish, 350);
      } else {
        setElapsedMs(elapsed);
      }
    }, 50);

    return () => window.clearInterval(interval);
  }, [onFinish]);

  const handleSkip = () => {
    setExiting(true);
    window.setTimeout(onFinish, 220);
  };

  const progressPct = Math.min(100, Math.round((elapsedMs / DURATION_MS) * 100));
  const secondsLeft = Math.max(0, Math.ceil((DURATION_MS - elapsedMs) / 1000));

  const speechText =
    elapsedMs < 3400
      ? 'Yo! Main hoon Dr. Senku! Let’s dance & do science!'
      : elapsedMs < 7000
      ? 'Stone Age se Moon Mission tak — sab kuch craft karenge!'
      : 'GET EXCITED! 10 Billion Percent Lab Ready!';

  return (
    <div
      className={`fixed inset-0 z-[100] senku-sunburst-bg flex flex-col items-center justify-center p-4 transition-opacity duration-300 ${
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Senku Lab Starting Animation"
    >
      {/* Top Skip Button */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 comic-btn px-4 py-2 rounded-xl bg-white hover:bg-[#FEF08A] font-display text-xs sm:text-sm font-extrabold text-[#111827] cursor-pointer"
      >
        Skip Intro ({secondsLeft}s) →
      </button>

      <div className="max-w-lg w-full flex flex-col items-center text-center gap-5">
        {/* Senku Speech Bubble */}
        <div className="bg-white comic-panel rounded-2xl px-5 py-2.5 font-display font-extrabold text-sm sm:text-base text-[#111827] max-w-md">
          💬 &ldquo;{speechText}&rdquo;
        </div>

        {/* Cute Dancing Chibi Dr. Senku Character */}
        <div className="relative flex flex-col items-center justify-center pt-2">
          {/* Floating Music Notes & Science Sparkles */}
          <span
            aria-hidden="true"
            className="absolute -left-5 top-4 text-2xl sm:text-3xl animate-senku-note-1 select-none"
          >
            🎵
          </span>
          <span
            aria-hidden="true"
            className="absolute -right-5 top-2 text-2xl sm:text-3xl animate-senku-note-2 select-none"
          >
            🎶
          </span>
          <span
            aria-hidden="true"
            className="absolute -right-8 bottom-14 text-xl sm:text-2xl animate-senku-note-1 select-none"
          >
            ⚛️
          </span>

          <svg
            viewBox="0 0 160 185"
            className="w-44 h-48 sm:w-52 sm:h-56 overflow-visible drop-shadow-[0_6px_0_rgba(17,24,39,0.22)]"
            aria-hidden="true"
          >
            {/* Ground Dance Shadow */}
            <ellipse
              cx="80"
              cy="174"
              rx="36"
              ry="7"
              fill="#111827"
              className="animate-senku-shadow"
            />

            {/* Whole Dancing Chibi Body */}
            <g className="animate-senku-dance">
              {/* Left Leg */}
              <g className="animate-senku-leg-l">
                <rect
                  x="61"
                  y="140"
                  width="13"
                  height="22"
                  rx="6"
                  fill="#FDE68A"
                  stroke="#111827"
                  strokeWidth="3"
                />
                <ellipse
                  cx="65"
                  cy="163"
                  rx="10"
                  ry="6"
                  fill="#92400E"
                  stroke="#111827"
                  strokeWidth="3"
                />
              </g>

              {/* Right Leg */}
              <g className="animate-senku-leg-r">
                <rect
                  x="86"
                  y="140"
                  width="13"
                  height="22"
                  rx="6"
                  fill="#FDE68A"
                  stroke="#111827"
                  strokeWidth="3"
                />
                <ellipse
                  cx="95"
                  cy="163"
                  rx="10"
                  ry="6"
                  fill="#92400E"
                  stroke="#111827"
                  strokeWidth="3"
                />
              </g>

              {/* Left Waving Arm */}
              <g className="animate-senku-arm-l">
                <path
                  d="M57 104 Q34 94 29 76"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="13"
                  strokeLinecap="round"
                />
                <path
                  d="M57 104 Q34 94 29 76"
                  fill="none"
                  stroke="#111827"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle
                  cx="28"
                  cy="73"
                  r="7"
                  fill="#FDE68A"
                  stroke="#111827"
                  strokeWidth="3"
                />
              </g>

              {/* Right Waving Arm Holding Glowing Flask */}
              <g className="animate-senku-arm-r">
                <path
                  d="M103 104 Q126 94 132 76"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="13"
                  strokeLinecap="round"
                />
                <path
                  d="M103 104 Q126 94 132 76"
                  fill="none"
                  stroke="#111827"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <circle
                  cx="133"
                  cy="73"
                  r="7"
                  fill="#FDE68A"
                  stroke="#111827"
                  strokeWidth="3"
                />
                {/* Tiny Science Flask */}
                <path
                  d="M128 52 L138 52 L138 58 L145 70 C146 73 144 75 140 75 L126 75 C122 75 120 73 121 70 L128 58 Z"
                  fill="#4ADE80"
                  stroke="#111827"
                  strokeWidth="2.5"
                />
              </g>

              {/* Cute Stone-World Lab Coat Torso */}
              <path
                d="M55 98 L105 98 L112 142 L48 142 Z"
                fill="#FFFFFF"
                stroke="#111827"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Rope Belt */}
              <rect
                x="51"
                y="122"
                width="58"
                height="7"
                rx="3.5"
                fill="#D97706"
                stroke="#111827"
                strokeWidth="2.5"
              />
              {/* E=mc2 on coat */}
              <text
                x="80"
                y="116"
                textAnchor="middle"
                fontSize="10"
                fontWeight="900"
                fill="#DC2626"
                fontFamily="monospace"
              >
                E=mc²
              </text>

              {/* Iconic Leek Spiky Hair */}
              <path
                d="M42 62 L32 24 L56 40 L63 8 L78 36 L93 6 L100 38 L126 22 L117 62 Z"
                fill="#4ADE80"
                stroke="#111827"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              {/* Light Yellow Hair Tips */}
              <path
                d="M47 56 L42 33 L58 46 L66 20 L79 44 L91 18 L99 45 L118 31 L112 56 Z"
                fill="#FEF08A"
                opacity="0.7"
              />

              {/* Chibi Face */}
              <circle
                cx="80"
                cy="70"
                r="27"
                fill="#FDE68A"
                stroke="#111827"
                strokeWidth="3.5"
              />

              {/* Cute Blush Cheeks */}
              <ellipse cx="62" cy="76" rx="4.5" ry="2.5" fill="#FB7185" opacity="0.75" />
              <ellipse cx="98" cy="76" rx="4.5" ry="2.5" fill="#FB7185" opacity="0.75" />

              {/* Happy Sparkling Eyes */}
              <circle cx="69" cy="68" r="4" fill="#111827" />
              <circle cx="67.5" cy="66.5" r="1.4" fill="#FFFFFF" />
              <circle cx="91" cy="68" r="4" fill="#111827" />
              <circle cx="89.5" cy="66.5" r="1.4" fill="#FFFFFF" />

              {/* Petrification Crack Marks */}
              <path
                d="M61 57 L65 62 M99 57 L95 62"
                stroke="#111827"
                strokeWidth="2.2"
                strokeLinecap="round"
              />

              {/* Big Happy Grin */}
              <path
                d="M71 78 Q80 88 89 78 Z"
                fill="#EF4444"
                stroke="#111827"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </div>

        {/* Cool SENKU LAB Title Below Dancing Senku */}
        <div className="animate-senku-title space-y-3 w-full">
          <div className="inline-flex items-center gap-3 bg-white border-[4px] border-[#111827] shadow-[6px_6px_0_#111827] rounded-3xl px-6 py-3 sm:px-8 sm:py-4">
            <span className="text-3xl sm:text-4xl">🧪</span>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111827]">
              SENKU{' '}
              <span className="bg-[#4ADE80] border-[3px] border-[#111827] px-2.5 py-0.5 rounded-2xl inline-block -rotate-2">
                LAB
              </span>
            </h1>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="bg-[#FDE047] border-2 border-[#111827] px-3 py-1 rounded-xl font-display font-extrabold text-xs sm:text-sm text-[#111827] shadow-[2px_2px_0_#111827]">
              ⚡ 10 BILLION PERCENT SCIENCE GAME ⚡
            </span>
          </div>

          {/* 10-Second Progress Bar */}
          <div className="max-w-xs mx-auto w-full space-y-1 pt-1">
            <div className="flex justify-between font-display text-xs font-extrabold text-[#111827]">
              <span>Loading Lab...</span>
              <span className="tabular-nums">{progressPct}%</span>
            </div>
            <div className="h-3.5 w-full rounded-full bg-white border-[3px] border-[#111827] overflow-hidden">
              <div
                className="h-full bg-[#F97316] transition-all duration-75"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
