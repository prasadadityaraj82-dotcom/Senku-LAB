import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import {
  PERIODIC_ELEMENTS,
  type ElementCategory,
  type PeriodicElement,
} from '../data/periodicTable';

interface PeriodicTableViewProps {
  onUseInCreateMode: (element: PeriodicElement) => void;
}

const CATEGORY_STYLES: Record<ElementCategory, { bg: string; label: string }> = {
  metal: { bg: 'bg-[#FB923C] text-[#111827]', label: 'Metals' },
  nonmetal: { bg: 'bg-[#4ADE80] text-[#111827]', label: 'Non-Metals' },
  gas: { bg: 'bg-[#38BDF8] text-[#111827]', label: 'Gases' },
  noble: { bg: 'bg-[#F472B6] text-[#111827]', label: 'Noble Gases' },
};

export function PeriodicTableView({ onUseInCreateMode }: PeriodicTableViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCat, setFilterCat] = useState<'all' | ElementCategory>('all');
  const [selectedElement, setSelectedElement] = useState<PeriodicElement | null>(null);

  const filteredElements = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PERIODIC_ELEMENTS.filter((el) => {
      const catMatch = filterCat === 'all' || el.category === filterCat;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        el.name.toLowerCase().includes(q) ||
        el.hindiName.toLowerCase().includes(q) ||
        el.symbol.toLowerCase().includes(q) ||
        String(el.number) === q
      );
    });
  }, [searchQuery, filterCat]);

  const showFullGrid = searchQuery.trim() === '' && filterCat === 'all';

  return (
    <div className="space-y-5">
      {/* Header + Search + Filter Controls */}
      <div className="rounded-2xl bg-white comic-panel p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="inline-block bg-[#38BDF8] border-2 border-[#111827] px-2.5 py-0.5 rounded-lg font-display text-xs font-bold text-[#111827] mb-1">
              ⚛️ ALL 118 ELEMENTS
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-[#111827]">
              PERIODIC TABLE LAB
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">
              Kisi bhi element par click karo — Hindi naam, kahan milta hai &amp; Senku Fun Fact dekho!
            </p>
          </div>

          {/* Color Legend */}
          <div className="flex flex-wrap gap-2 text-xs font-display font-bold">
            {(Object.keys(CATEGORY_STYLES) as ElementCategory[]).map((cat) => (
              <span
                key={cat}
                className={`${CATEGORY_STYLES[cat].bg} border-2 border-[#111827] px-2.5 py-1 rounded-lg`}
              >
                {CATEGORY_STYLES[cat].label}
              </span>
            ))}
          </div>
        </div>

        {/* Search & Filter Row */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Element dhundo... Fe, Gold, Oxygen, 79"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFFDF2] border-[3px] border-[#111827] font-display text-sm font-bold text-[#111827] placeholder:text-slate-400 focus:outline-none focus:bg-[#FEF9C3]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {(
              [
                { id: 'all', label: 'All (118)' },
                { id: 'metal', label: 'Metals' },
                { id: 'nonmetal', label: 'Non-Metals' },
                { id: 'gas', label: 'Gases' },
                { id: 'noble', label: 'Noble Gases' },
              ] as const
            ).map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setFilterCat(btn.id)}
                className={`px-3 py-2 rounded-xl font-display text-xs font-bold border-2 border-[#111827] whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  filterCat === btn.id
                    ? 'bg-[#FDE047] text-[#111827] shadow-[2px_2px_0_#111827]'
                    : 'bg-slate-100 text-slate-700 hover:bg-white'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Full 18-Column Periodic Table OR Filtered Grid */}
      {showFullGrid ? (
        <div className="rounded-2xl bg-white comic-panel p-3 sm:p-5 overflow-x-auto">
          <div className="text-xs font-display font-bold text-slate-500 mb-2 sm:hidden">
            👈 Swipe horizontally to view all 18 groups
          </div>
          <div
            className="grid gap-1.5 min-w-[960px]"
            style={{
              gridTemplateColumns: 'repeat(18, minmax(0, 1fr))',
              gridTemplateRows: 'repeat(9, minmax(56px, auto))',
            }}
          >
            {PERIODIC_ELEMENTS.map((el) => (
              <button
                key={el.number}
                type="button"
                onClick={() => setSelectedElement(el)}
                style={{
                  gridRow: el.row,
                  gridColumn: el.col,
                }}
                className={`${CATEGORY_STYLES[el.category].bg} border-2 border-[#111827] rounded-lg p-1 text-left flex flex-col justify-between hover:scale-110 hover:z-10 transition-transform cursor-pointer shadow-[1px_2px_0_#111827]`}
              >
                <span className="font-mono text-[9px] font-bold leading-none opacity-80">
                  {el.number}
                </span>
                <span className="font-display text-sm sm:text-base font-extrabold leading-none text-center">
                  {el.symbol}
                </span>
                <span className="text-[8px] font-bold truncate leading-tight text-center">
                  {el.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-white comic-panel p-4 sm:p-6">
          {filteredElements.length === 0 ? (
            <div className="text-center py-8 font-display font-bold text-slate-500">
              Koi element nahi mila — &ldquo;Fe&rdquo;, &ldquo;Gold&rdquo;, ya &ldquo;Oxygen&rdquo; try karo!
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
              {filteredElements.map((el) => (
                <button
                  key={el.number}
                  type="button"
                  onClick={() => setSelectedElement(el)}
                  className={`${CATEGORY_STYLES[el.category].bg} border-[3px] border-[#111827] rounded-xl p-2.5 text-left flex flex-col justify-between min-h-[82px] hover:-translate-y-0.5 transition-transform cursor-pointer shadow-[3px_3px_0_#111827]`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold">{el.number}</span>
                    <span className="text-[10px] font-display font-bold">
                      {el.dangerLevel === 'Safe' ? '🟢' : el.dangerLevel === 'Dhyan Se' ? '🟠' : '🔴'}
                    </span>
                  </div>
                  <div className="font-display text-xl font-extrabold leading-none my-1">
                    {el.symbol}
                  </div>
                  <div className="text-xs font-display font-bold truncate">{el.name}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Element Detail Modal */}
      {selectedElement && (
        <div
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs overflow-y-auto flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-xl rounded-3xl bg-white comic-panel overflow-hidden">
            <div className={`px-5 py-4 border-b-[3px] border-[#111827] flex items-center justify-between ${CATEGORY_STYLES[selectedElement.category].bg}`}>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white border-[3px] border-[#111827] shadow-[3px_3px_0_#111827] flex flex-col items-center justify-center">
                  <span className="font-mono text-[10px] font-bold leading-none">#{selectedElement.number}</span>
                  <span className="font-display text-2xl font-extrabold leading-none">{selectedElement.symbol}</span>
                </div>
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-[#111827] leading-tight">
                    {selectedElement.name}
                  </h2>
                  <p className="font-display text-sm font-bold text-[#111827]/85">
                    {selectedElement.hindiName}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedElement(null)}
                aria-label="Close element details"
                className="p-2 rounded-xl bg-white border-2 border-[#111827] text-[#111827] hover:bg-rose-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4 bg-[#FFFDF7]">
              {/* Danger Level */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-display text-xs font-bold bg-[#FEF08A] border-2 border-[#111827] px-2.5 py-1 rounded-lg">
                  Category: {CATEGORY_STYLES[selectedElement.category].label}
                </span>
                <span
                  className={`font-display text-xs font-extrabold border-2 border-[#111827] px-3 py-1 rounded-lg ${
                    selectedElement.dangerLevel === 'Safe'
                      ? 'bg-[#4ADE80] text-[#111827]'
                      : selectedElement.dangerLevel === 'Dhyan Se'
                      ? 'bg-[#FB923C] text-white'
                      : 'bg-[#EF4444] text-white'
                  }`}
                >
                  Danger Level: {selectedElement.dangerLevel}
                </span>
              </div>

              <div className="rounded-2xl bg-white border-2 border-[#111827] p-3.5 space-y-1">
                <div className="font-display text-xs font-bold text-[#EA580C]">
                  🌍 Kahan Milta Hai?
                </div>
                <p className="text-sm font-semibold text-[#111827]">{selectedElement.whereFound}</p>
              </div>

              <div className="rounded-2xl bg-[#E0F2FE] border-2 border-[#111827] p-3.5 space-y-1">
                <div className="font-display text-xs font-bold text-[#0369A1]">
                  🛠️ Kahan Kaam Aata Hai?
                </div>
                <p className="text-sm font-semibold text-[#111827]">{selectedElement.uses}</p>
              </div>

              <div className="rounded-2xl bg-[#FCE7F3] border-2 border-[#111827] p-3.5 space-y-1">
                <div className="font-display text-xs font-bold text-[#BE185D]">
                  ⭐ Senku Fun Fact
                </div>
                <p className="text-sm font-bold text-[#111827]">{selectedElement.funFact}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const chosen = selectedElement;
                  setSelectedElement(null);
                  onUseInCreateMode(chosen);
                }}
                className="comic-btn w-full py-3.5 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-display font-extrabold text-base cursor-pointer"
              >
                🔨 Isse Craft Karo (Use in Create Mode!)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
