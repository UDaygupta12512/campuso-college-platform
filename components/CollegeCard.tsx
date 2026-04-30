"use client";
import Link from "next/link";

interface College {
  id: number; name: string; location: string; fees: number;
  rating: number; courses: string[]; placement: number;
  avgPackage: number; tier: string; image?: string | null;
}
interface CollegeCardProps {
  college: College;
  compareIds?: number[];
  onCompareToggle?: (id: number) => void;
}

const TIER_BADGE: Record<string, string> = {
  "A+": "bg-amber-400/15 text-amber-400 border-amber-400/25",
  "A":  "bg-emerald-400/15 text-emerald-400 border-emerald-400/25",
  "B+": "bg-sky-400/15 text-sky-400 border-sky-400/25",
  "B":  "bg-violet-400/15 text-violet-400 border-violet-400/25",
  "C":  "bg-slate-400/15 text-slate-400 border-slate-400/25",
};
const TIER_TOP: Record<string, string> = {
  "A+": "from-amber-500/50 to-orange-500/10",
  "A":  "from-emerald-500/50 to-green-500/10",
  "B+": "from-sky-500/50 to-blue-500/10",
  "B":  "from-violet-500/50 to-purple-500/10",
  "C":  "from-slate-500/40 to-gray-500/5",
};

export default function CollegeCard({ college, compareIds = [], onCompareToggle }: CollegeCardProps) {
  const isSelected = compareIds.includes(college.id);
  const maxReached = compareIds.length >= 3 && !isSelected;

  return (
    <div className={`group relative flex flex-col bg-[#111118] rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 ${
      isSelected
        ? "border-2 border-indigo-500/70 shadow-xl shadow-indigo-500/10"
        : "border border-white/8 hover:border-white/20 hover:shadow-xl hover:shadow-black/50"
    }`}>
      {/* colour strip */}
      <div className={`h-[3px] w-full bg-gradient-to-r ${TIER_TOP[college.tier] ?? TIER_TOP["C"]}`} />

      {/* selected badge */}
      {isSelected && (
        <div className="absolute top-3 right-3 w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center z-10 shadow-lg">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
          </svg>
        </div>
      )}

      <div className="flex flex-col flex-1 p-5">
        {/* Top row */}
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border mb-1.5 ${TIER_BADGE[college.tier] ?? TIER_BADGE["C"]}`}>
              Tier {college.tier}
            </span>
            <h3 className="font-bold text-white text-sm leading-snug line-clamp-2 group-hover:text-indigo-300 transition-colors pr-6">
              {college.name}
            </h3>
          </div>
          <div className="flex items-center gap-1 shrink-0 bg-white/6 px-2 py-1 rounded-lg border border-white/8">
            <svg className="w-3 h-3 fill-amber-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span className="text-white font-bold text-xs">{college.rating}</span>
          </div>
        </div>

        {/* Location */}
        <p className="flex items-center gap-1 text-white/40 text-xs mb-4">
          <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
          {college.location}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Fees", value: `₹${(college.fees/100000).toFixed(1)}L`, sub: "/yr" },
            { label: "Placed", value: `${college.placement}%`, sub: "" },
            { label: "Avg Pkg", value: `₹${(college.avgPackage/100000).toFixed(1)}L`, sub: "" },
          ].map(s => (
            <div key={s.label} className="bg-white/4 rounded-xl py-2 px-1 text-center border border-white/4">
              <p className="text-white/35 text-[9px] uppercase tracking-wide mb-0.5">{s.label}</p>
              <p className="text-white font-semibold text-[11px]">{s.value}<span className="text-white/30 text-[9px]">{s.sub}</span></p>
            </div>
          ))}
        </div>

        {/* Course chips */}
        <div className="flex flex-wrap gap-1 mb-4">
          {college.courses.slice(0, 3).map(c => (
            <span key={c} className="text-[10px] bg-white/5 text-white/45 px-2 py-0.5 rounded-full border border-white/6">{c}</span>
          ))}
          {college.courses.length > 3 && (
            <span className="text-[10px] text-white/25 px-1 py-0.5">+{college.courses.length - 3} more</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <Link href={`/colleges/${college.id}`}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-xs font-semibold py-2.5 rounded-xl text-center transition-colors">
            View Details
          </Link>
          {onCompareToggle && (
            <button
              onClick={() => !maxReached && onCompareToggle(college.id)}
              disabled={maxReached}
              title={isSelected ? "Remove from compare" : maxReached ? "Max 3 colleges" : "Add to compare"}
              className={`w-10 h-10 rounded-xl text-xs font-bold border transition-all flex items-center justify-center ${
                isSelected
                  ? "bg-indigo-500/25 border-indigo-500/60 text-indigo-300"
                  : maxReached
                  ? "border-white/5 text-white/15 cursor-not-allowed"
                  : "border-white/12 text-white/50 hover:border-indigo-500/50 hover:text-indigo-300 hover:bg-indigo-500/10 active:scale-95"
              }`}>
              {isSelected ? "✓" : "+"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
