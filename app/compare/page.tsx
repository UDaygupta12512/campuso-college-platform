"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

interface College {
  id: number; name: string; location: string; fees: number; rating: number;
  courses: string[]; placement: number; avgPackage: number; topCompanies: string[];
  tier: string; examAccepted: string[]; established: number; totalSeats: number;
}

const TIER_BADGE: Record<string,string> = {
  "A+":"bg-amber-400/15 text-amber-400 border-amber-400/25",
  "A": "bg-emerald-400/15 text-emerald-400 border-emerald-400/25",
  "B+":"bg-sky-400/15 text-sky-400 border-sky-400/25",
  "B": "bg-violet-400/15 text-violet-400 border-violet-400/25",
  "C": "bg-slate-400/15 text-slate-400 border-slate-400/25",
};
const TIER_SCORE: Record<string,number> = {"A+":5,"A":4,"B+":3,"B":2,"C":1};

const ROWS: { label: string; key: keyof College; format: (v: unknown)=>string; better:"higher"|"lower"|null; icon: string }[] = [
  {label:"Location",      key:"location",    format:v=>String(v),                                          better:null,    icon:"📍"},
  {label:"Annual Fees",   key:"fees",        format:v=>`₹${((v as number)/100000).toFixed(1)}L`,           better:"lower", icon:"💰"},
  {label:"Rating",        key:"rating",      format:v=>`${v} / 5`,                                          better:"higher",icon:"⭐"},
  {label:"Placement %",   key:"placement",   format:v=>`${v}%`,                                             better:"higher",icon:"📊"},
  {label:"Avg Package",   key:"avgPackage",  format:v=>`₹${((v as number)/100000).toFixed(1)} LPA`,        better:"higher",icon:"💼"},
  {label:"Total Seats",   key:"totalSeats",  format:v=>(v as number).toLocaleString(),                     better:null,    icon:"🎓"},
  {label:"Established",   key:"established", format:v=>String(v),                                           better:null,    icon:"🏛️"},
  {label:"Tier",          key:"tier",        format:v=>`Tier ${v}`,                                         better:null,    icon:"🏆"},
  {label:"Exams",         key:"examAccepted",format:v=>(v as string[]).join(", "),                          better:null,    icon:"📝"},
  {label:"Courses",       key:"courses",     format:v=>(v as string[]).join(", "),                          better:null,    icon:"📚"},
  {label:"Top Companies", key:"topCompanies",format:v=>(v as string[]).slice(0,3).join(", "),              better:null,    icon:"🏢"},
];

function Dots() {
  return (
    <div className="flex justify-center py-24">
      {[0,1,2].map(i => (
        <div key={i} className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce mx-1"
          style={{animationDelay:`${i*0.15}s`}} />
      ))}
    </div>
  );
}

function CompareContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ids = searchParams.get("ids") || "";
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ids) return;
    const idList = ids.split(",").map(Number).filter(n => n > 0);
    if (idList.length < 2) { setError("Select at least 2 colleges from the listing page."); return; }
    setLoading(true); setError("");
    fetch(`/api/compare?ids=${ids}`)
      .then(async r => {
        if (!r.ok) { const d = await r.json().catch(()=>({})); throw new Error((d as any).error || "Failed"); }
        return r.json() as Promise<College[]>;
      })
      .then(data => {
        if (!Array.isArray(data) || data.length < 2) throw new Error("Could not find those colleges");
        setColleges(data);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [ids]);

  const scores = colleges.map(c => {
    let s = 0;
    s += (c.rating/5)*25;
    s += (c.placement/100)*30;
    s += Math.min((c.avgPackage/3000000)*25, 25);
    s += ((TIER_SCORE[c.tier]??1)/5)*20;
    return Math.round(s);
  });

  const removeCollege = (id: number) => {
    const remaining = ids.split(",").filter(i => i !== String(id));
    if (remaining.length < 2) router.push("/");
    else router.replace(`/compare?ids=${remaining.join(",")}`);
  };

  if (!ids) return (
    <div className="text-center py-28 max-w-md mx-auto">
      <div className="text-6xl mb-5">⚖️</div>
      <h2 className="text-white font-bold text-xl mb-2">No Colleges Selected</h2>
      <p className="text-white/40 text-sm mb-6">Go back to the listing and tap <strong>+</strong> on any college card to select 2–3 to compare.</p>
      <Link href="/" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors">
        Browse Colleges →
      </Link>
    </div>
  );

  if (loading) return <Dots />;

  if (error) return (
    <div className="text-center py-28">
      <div className="text-5xl mb-4">❌</div>
      <p className="text-white/50 mb-4">{error}</p>
      <Link href="/" className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors">← Back to listings</Link>
    </div>
  );

  const sortedScores = [...scores].sort((a,b) => b-a);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="mb-8">
        <button onClick={() => router.back()}
          className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-5 transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Back
        </button>
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">College Comparison</h1>
        <p className="text-white/40 text-sm">
          Comparing {colleges.length} colleges · <Link href="/" className="text-indigo-400 hover:underline">Add another</Link>
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/8 mb-6">
        <table className="w-full" style={{minWidth:`${Math.max(640, colleges.length*220+160)}px`}}>
          <thead>
            <tr className="bg-[#0d0d14] border-b border-white/8">
              <th className="text-left p-5 text-white/30 text-xs uppercase tracking-wider font-semibold w-36 sticky left-0 bg-[#0d0d14] z-10">
                Criteria
              </th>
              {colleges.map((c, i) => (
                <th key={c.id} className="p-5 border-l border-white/8">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                      <span className="text-white font-black text-base">{c.name.charAt(0)}</span>
                    </div>
                    <p className="text-white font-bold text-sm leading-snug text-center max-w-[160px]">{c.name}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${TIER_BADGE[c.tier]??TIER_BADGE["C"]}`}>
                      Tier {c.tier}
                    </span>
                    {/* Score */}
                    <div className="w-full max-w-[140px]">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/40">Score</span>
                        <span className={`font-bold ${scores[i]===sortedScores[0]?"text-emerald-400":"text-white/60"}`}>
                          {scores[i]}/100
                        </span>
                      </div>
                      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${scores[i]===sortedScores[0]?"bg-gradient-to-r from-emerald-500 to-green-400":"bg-gradient-to-r from-indigo-500 to-violet-500"}`}
                          style={{width:`${scores[i]}%`}} />
                      </div>
                    </div>
                    <div className="flex gap-2 mt-1">
                      <Link href={`/colleges/${c.id}`} className="text-indigo-400 hover:text-indigo-300 text-xs transition-colors">
                        Details →
                      </Link>
                      <span className="text-white/15">·</span>
                      <button onClick={() => removeCollege(c.id)} className="text-red-400/60 hover:text-red-400 text-xs transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, ri) => (
              <tr key={row.key} className={`border-b border-white/4 hover:bg-white/[0.015] transition-colors ${ri%2===0?"bg-[#0a0a10]":"bg-[#0d0d14]"}`}>
                <td className="p-4 sticky left-0 bg-inherit z-10">
                  <span className="text-white/45 text-xs font-medium flex items-center gap-2">
                    <span className="text-sm">{row.icon}</span>{row.label}
                  </span>
                </td>
                {colleges.map((c, ci) => {
                  const val = c[row.key];
                  const numVal = typeof val === "number" ? val : null;
                  const isBest = row.better !== null && numVal !== null && colleges
                    .filter((_,i)=>i!==ci)
                    .every(o => row.better==="higher" ? numVal>=(o[row.key] as number) : numVal<=(o[row.key] as number));
                  const isWorst = row.better !== null && numVal !== null && colleges
                    .filter((_,i)=>i!==ci)
                    .every(o => row.better==="higher" ? numVal<=(o[row.key] as number) : numVal>=(o[row.key] as number));
                  return (
                    <td key={c.id} className="p-4 border-l border-white/5 text-center align-top">
                      <span className={`text-sm font-medium leading-snug block break-words ${
                        isBest && colleges.length>1 ? "text-emerald-400" : isWorst && colleges.length>1 ? "text-red-400/70" : "text-white/75"
                      }`}>
                        {row.format(val)}
                      </span>
                      {isBest && colleges.length>1 && <span className="text-[10px] text-emerald-500/60 mt-0.5 block">✓ Best</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Verdict */}
      {colleges.length>=2 && (
        <div className="bg-[#111118] border border-white/8 rounded-2xl p-6 mb-6">
          <h3 className="text-white font-bold text-base mb-1">🏆 Verdict</h3>
          <p className="text-white/35 text-xs mb-5">Based on rating, placement, avg package and tier</p>
          <div className="flex flex-wrap gap-3">
            {colleges.map((c,i) => {
              const rank = sortedScores.indexOf(scores[i]);
              const medals = ["🥇","🥈","🥉"];
              return (
                <div key={c.id} className={`flex-1 min-w-44 rounded-xl p-4 border ${
                  rank===0 ? "bg-emerald-500/8 border-emerald-500/25" : "bg-white/3 border-white/8"
                }`}>
                  <p className={`text-xs font-semibold mb-1.5 ${rank===0?"text-emerald-400":rank===1?"text-white/50":"text-white/30"}`}>
                    {medals[rank]??""} {rank===0?"Top Pick":rank===1?"Runner-Up":"3rd Place"}
                  </p>
                  <p className="text-white font-bold text-sm">{c.name}</p>
                  <p className="text-white/30 text-xs mt-1">Score: {scores[i]}/100</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm border border-indigo-500/25 px-5 py-2.5 rounded-xl hover:border-indigo-500/40 transition-all">
          ← Add More Colleges
        </Link>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 pb-20">
      <Suspense fallback={<Dots />}>
        <CompareContent />
      </Suspense>
    </div>
  );
}
