"use client";
import { useState } from "react";
import Link from "next/link";

interface College {
  id: number; name: string; location: string; fees: number; rating: number;
  courses: string[]; placement: number; avgPackage: number; tier: string;
}
interface PredictResult { exam: string; rank: number; tiers: string[]; colleges: College[]; message: string; error?: string; }

const EXAMS = [
  {value:"JEE", label:"JEE", sub:"Main / Advanced", icon:"⚡", desc:"B.Tech · IITs, NITs, IIITs"},
  {value:"CAT", label:"CAT", sub:"Common Aptitude", icon:"📈", desc:"MBA · IIMs & top B-Schools"},
  {value:"NEET",label:"NEET",sub:"Medical Entrance", icon:"🏥", desc:"MBBS · Medical colleges"},
];
const TIER_BADGE: Record<string,string> = {
  "A+":"bg-amber-400/15 text-amber-400 border-amber-400/25",
  "A": "bg-emerald-400/15 text-emerald-400 border-emerald-400/25",
  "B+":"bg-sky-400/15 text-sky-400 border-sky-400/25",
  "B": "bg-violet-400/15 text-violet-400 border-violet-400/25",
  "C": "bg-slate-400/15 text-slate-400 border-slate-400/25",
};
const HINTS: Record<string,string> = {
  JEE:"e.g. 1500 for IIT · 25000 for NIT · 80000 for private",
  CAT:"e.g. 500 for IIM · 3000 for other B-schools",
  NEET:"e.g. 2000 for AIIMS · 30000 for state colleges",
};
const SAMPLE_RANKS: Record<string,{label:string;rank:string}[]> = {
  JEE:[{label:"IIT level",rank:"1000"},{label:"NIT level",rank:"15000"},{label:"Private",rank:"60000"}],
  CAT:[{label:"IIM level",rank:"200"},{label:"Top B-school",rank:"1500"},{label:"Good MBA",rank:"5000"}],
  NEET:[{label:"AIIMS level",rank:"500"},{label:"Govt Medical",rank:"8000"},{label:"State College",rank:"25000"}],
};

export default function PredictorPage() {
  const [exam, setExam] = useState("JEE");
  const [rank, setRank] = useState("");
  const [result, setResult] = useState<PredictResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [fieldError, setFieldError] = useState("");

  const predict = async (overrideRank?: string) => {
    const r = overrideRank ?? rank;
    const rankNum = parseInt(r);
    if (!r.trim() || isNaN(rankNum) || rankNum <= 0) { setFieldError("Please enter a valid positive rank"); return; }
    if (rankNum > 2000000) { setFieldError("Rank must be below 20,00,000"); return; }
    setFieldError(""); setLoading(true); setResult(null);
    try {
      const res = await fetch(`/api/predict?exam=${exam}&rank=${rankNum}`);
      const data: PredictResult = await res.json();
      if (!res.ok) { setFieldError(data.error ?? "Something went wrong"); return; }
      setResult(data);
    } catch { setFieldError("Network error. Please try again."); }
    finally { setLoading(false); }
  };

  const useSample = (r: string) => { setRank(r); setResult(null); setFieldError(""); predict(r); };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-16 pb-20">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-violet-300 text-xs font-medium">🧠 Smart Rank Predictor</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 tracking-tight">
            Predict Your{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Colleges</span>
          </h1>
          <p className="text-white/40 text-sm sm:text-base max-w-md mx-auto">
            Enter your exam and rank to discover where you're eligible
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Input card */}
        <div className="bg-[#111118] border border-white/8 rounded-2xl p-6 sm:p-8 mb-8 shadow-xl shadow-black/30">
          {/* Step 1 — Exam */}
          <div className="mb-7">
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Step 1 — Select Exam</p>
            <div className="grid grid-cols-3 gap-3">
              {EXAMS.map(e => (
                <button key={e.value} onClick={() => { setExam(e.value); setResult(null); setFieldError(""); }}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    exam===e.value
                      ? "bg-indigo-500/10 border-indigo-500/50 ring-1 ring-indigo-500/20 shadow-lg shadow-indigo-500/5"
                      : "bg-white/3 border-white/8 hover:bg-white/6 hover:border-white/15"
                  }`}>
                  <span className="text-2xl block mb-2">{e.icon}</span>
                  <p className="text-white font-bold text-sm">{e.label}</p>
                  <p className="text-white/35 text-[11px] mt-0.5 hidden sm:block">{e.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 — Rank */}
          <div className="mb-7">
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">Step 2 — Enter Your Rank</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25 text-sm font-mono">#</span>
              <input type="number" min={1} placeholder={HINTS[exam]} value={rank}
                onChange={e => { setRank(e.target.value); setFieldError(""); }}
                onKeyDown={e => e.key==="Enter" && predict()}
                className={`w-full bg-white/5 border rounded-xl pl-8 pr-10 py-4 text-white placeholder-white/20 focus:outline-none transition-all text-base font-mono ${
                  fieldError ? "border-red-500/50 focus:border-red-500/70" : "border-white/10 focus:border-indigo-500/60 focus:bg-white/6"
                }`} />
              {rank && (
                <button onClick={() => { setRank(""); setFieldError(""); setResult(null); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              )}
            </div>
            {fieldError && (
              <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                {fieldError}
              </p>
            )}
            {/* Sample ranks */}
            <div className="flex gap-2 mt-3 flex-wrap">
              <span className="text-white/25 text-xs pt-1">Try:</span>
              {SAMPLE_RANKS[exam].map(s => (
                <button key={s.rank} onClick={() => useSample(s.rank)}
                  className="text-xs px-3 py-1 bg-white/5 border border-white/10 text-white/50 rounded-full hover:bg-indigo-500/10 hover:border-indigo-500/30 hover:text-indigo-300 transition-all">
                  {s.label} ({s.rank})
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button onClick={() => predict()} disabled={loading || !rank.trim()}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:from-indigo-700 active:to-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 text-base">
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Predicting…
              </>
            ) : "🔍 Predict My Colleges"}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div>
            <div className={`rounded-2xl p-4 mb-5 border ${result.colleges.length>0?"bg-indigo-500/6 border-indigo-500/20":"bg-orange-500/6 border-orange-500/20"}`}>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div>
                  <p className="text-white/40 text-xs mb-0.5">Results for</p>
                  <p className="text-white font-bold">
                    {result.exam} Rank <span className="text-indigo-400">#{result.rank.toLocaleString()}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {result.tiers.map(t => (
                    <span key={t} className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${TIER_BADGE[t]??TIER_BADGE["C"]}`}>
                      Tier {t}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-white/40 text-xs">{result.message}</p>
            </div>

            {result.colleges.length===0 ? (
              <div className="text-center py-16 bg-[#111118] border border-white/8 rounded-2xl">
                <div className="text-5xl mb-4">😔</div>
                <p className="text-white/55 font-semibold">No colleges found for this rank</p>
                <p className="text-white/25 text-sm mt-1 mb-5">The dataset may not cover this specific range</p>
                <button onClick={() => { setRank(""); setResult(null); }}
                  className="text-indigo-400 border border-indigo-500/30 px-4 py-2 rounded-xl text-sm hover:border-indigo-500/50 transition-colors">
                  Try a different rank
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.colleges.map((college, i) => (
                  <div key={college.id} className="bg-[#111118] border border-white/8 rounded-2xl p-5 hover:border-indigo-500/25 transition-all group">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/15 flex items-center justify-center shrink-0">
                        <span className="text-indigo-400 font-black text-sm">#{i+1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mb-1 ${TIER_BADGE[college.tier]??TIER_BADGE["C"]}`}>
                          Tier {college.tier}
                        </span>
                        <h3 className="text-white font-bold text-sm leading-snug group-hover:text-indigo-300 transition-colors">{college.name}</h3>
                        <p className="text-white/35 text-xs mt-0.5">{college.location}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 bg-white/5 px-2 py-1 rounded-lg">
                        <svg className="w-3 h-3 fill-amber-400" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <span className="text-white text-xs font-bold">{college.rating}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {[
                        {label:"Fees/yr", value:`₹${(college.fees/100000).toFixed(1)}L`},
                        {label:"Placed", value:`${college.placement}%`},
                        {label:"Avg Pkg", value:`₹${(college.avgPackage/100000).toFixed(1)}L`},
                      ].map(s => (
                        <div key={s.label} className="bg-white/4 rounded-xl py-2 text-center border border-white/4">
                          <p className="text-white/30 text-[9px] uppercase tracking-wide">{s.label}</p>
                          <p className="text-white text-xs font-semibold">{s.value}</p>
                        </div>
                      ))}
                    </div>
                    <Link href={`/colleges/${college.id}`}
                      className="block text-center bg-indigo-600/12 hover:bg-indigo-600/22 border border-indigo-500/25 text-indigo-300 hover:text-indigo-200 text-xs font-semibold py-2 rounded-xl transition-all">
                      View College Details →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* How it works */}
        {!result && !loading && (
          <div className="bg-white/2 border border-white/5 rounded-2xl p-6 mt-2">
            <h3 className="text-white/50 font-bold text-xs uppercase tracking-wider mb-4">How It Works</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {n:"1",title:"Select Exam",desc:"Choose JEE, CAT, or NEET"},
                {n:"2",title:"Enter Rank",desc:"Your all-India rank from the result"},
                {n:"3",title:"See Matches",desc:"Colleges ranked by tier and placement"},
              ].map(item => (
                <div key={item.n} className="flex gap-3 items-start">
                  <div className="w-7 h-7 bg-indigo-500/15 border border-indigo-500/25 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-indigo-400 text-xs font-black">{item.n}</span>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm font-semibold">{item.title}</p>
                    <p className="text-white/30 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
