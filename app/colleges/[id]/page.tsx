"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface College {
  id: number; name: string; location: string; city: string; state: string;
  fees: number; rating: number; courses: string[]; placement: number;
  avgPackage: number; topCompanies: string[]; tier: string;
  examAccepted: string[]; established: number; totalSeats: number;
}
type Tab = "overview" | "courses" | "placements" | "reviews";

const TIER_BADGE: Record<string,string> = {
  "A+":"bg-amber-400/15 text-amber-400 border-amber-400/25",
  "A": "bg-emerald-400/15 text-emerald-400 border-emerald-400/25",
  "B+":"bg-sky-400/15 text-sky-400 border-sky-400/25",
  "B": "bg-violet-400/15 text-violet-400 border-violet-400/25",
  "C": "bg-slate-400/15 text-slate-400 border-slate-400/25",
};
const DURATIONS: Record<string,string> = {
  "B.Tech":"4 years","M.Tech":"2 years","MBA":"2 years","MCA":"3 years",
  "BCA":"3 years","B.Sc":"3 years","M.Sc":"2 years","PhD":"3–5 years","Law":"5 years",
};
const REVIEWS = [
  { name:"Rahul S.", batch:"2023", rating:5, text:"World-class faculty and incredible campus culture. Placed at Amazon with a great package. The alumni network opens doors you never imagined." },
  { name:"Priya M.", batch:"2022", rating:4, text:"Exceptional labs and research facilities. The environment truly pushes you to excel. One of the best decisions of my life." },
  { name:"Arjun K.", batch:"2023", rating:4, text:"Very industry-aligned curriculum. Professors are accessible and helpful. Peer learning here is unmatched." },
  { name:"Sneha R.", batch:"2021", rating:5, text:"Brilliant experience overall. Internship support from the college was top-notch. Campus life and cultural events make it memorable." },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({length:5}).map((_,i) => (
        <svg key={i} className={`w-4 h-4 ${i<n?"fill-amber-400 text-amber-400":"fill-white/10 text-white/10"}`} viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  );
}

export default function CollegeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [addedToCompare, setAddedToCompare] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/colleges/${id}`)
      .then(async r => {
        if (r.status === 404) { setNotFound(true); return; }
        if (!r.ok) throw new Error();
        setCollege(await r.json());
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCompare = () => {
    if (!college) return;
    const stored = JSON.parse(sessionStorage.getItem("compareIds") || "[]") as number[];
    if (stored.includes(college.id)) {
      setAddedToCompare(false);
      sessionStorage.setItem("compareIds", JSON.stringify(stored.filter((i: number) => i !== college.id)));
    } else if (stored.length < 3) {
      const next = [...stored, college.id];
      sessionStorage.setItem("compareIds", JSON.stringify(next));
      setAddedToCompare(true);
    }
  };

  useEffect(() => {
    if (!college) return;
    const stored = JSON.parse(sessionStorage.getItem("compareIds") || "[]") as number[];
    setAddedToCompare(stored.includes(college.id));
  }, [college]);

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 animate-pulse">
        <div className="h-4 w-16 bg-white/10 rounded mb-8" />
        <div className="flex gap-5 mb-8">
          <div className="w-16 h-16 bg-white/10 rounded-2xl shrink-0" />
          <div className="flex-1 space-y-3">
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="h-7 w-2/3 bg-white/8 rounded" />
            <div className="h-4 w-1/3 bg-white/5 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1,2,3,4].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl" />)}
        </div>
      </div>
    </div>
  );

  if (notFound) return (
    <div className="min-h-screen bg-[#0a0a0f] pt-20 flex flex-col items-center justify-center gap-4">
      <div className="text-6xl">🎓</div>
      <p className="text-white/60 text-xl font-bold">College not found</p>
      <Link href="/" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-colors">
        Browse Colleges
      </Link>
    </div>
  );

  if (!college) return null;

  const TABS: {key: Tab; label: string; icon: string}[] = [
    {key:"overview",label:"Overview",icon:"ℹ️"},
    {key:"courses",label:"Courses",icon:"📚"},
    {key:"placements",label:"Placements",icon:"💼"},
    {key:"reviews",label:"Reviews",icon:"⭐"},
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-16 pb-20">
      {/* Hero */}
      <div className="bg-gradient-to-b from-indigo-950/30 via-indigo-950/10 to-transparent border-b border-white/6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <button onClick={() => router.back()}
            className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-6 transition-colors group">
            <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
            </svg>
            Back
          </button>

          <div className="flex flex-col sm:flex-row gap-5 items-start mb-7">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl flex items-center justify-center shrink-0 shadow-xl shadow-indigo-500/20">
              <span className="text-white font-black text-xl">{college.name.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${TIER_BADGE[college.tier]??TIER_BADGE["C"]}`}>
                  Tier {college.tier}
                </span>
                <span className="text-white/25 text-xs">Est. {college.established}</span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-white mb-2 leading-tight">{college.name}</h1>
              <div className="flex flex-wrap gap-3 sm:gap-5 text-sm text-white/45">
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  {college.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 fill-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span className="text-white font-semibold">{college.rating}</span>/5
                </span>
                <span>{college.totalSeats.toLocaleString()} seats</span>
              </div>
            </div>
            {/* Add to compare button */}
            <button onClick={handleAddToCompare}
              className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                addedToCompare
                  ? "bg-indigo-500/20 border-indigo-500/50 text-indigo-300"
                  : "bg-white/5 border-white/12 text-white/60 hover:border-indigo-500/40 hover:text-indigo-300 hover:bg-indigo-500/10"
              }`}>
              {addedToCompare ? "✓ Added to Compare" : "+ Add to Compare"}
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {label:"Annual Fees", value:`₹${(college.fees/100000).toFixed(1)}L`, icon:"💰"},
              {label:"Placement Rate", value:`${college.placement}%`, icon:"📊"},
              {label:"Avg Package", value:`₹${(college.avgPackage/100000).toFixed(1)} LPA`, icon:"💼"},
              {label:"Total Seats", value:college.totalSeats.toLocaleString(), icon:"🎓"},
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/8 rounded-2xl p-4 text-center hover:bg-white/8 transition-colors">
                <p className="text-xl mb-1">{s.icon}</p>
                <p className="text-white font-bold text-lg sm:text-xl">{s.value}</p>
                <p className="text-white/35 text-xs mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex border-b border-white/8 mt-6 overflow-x-auto">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all whitespace-nowrap border-b-2 -mb-px ${
                tab === t.key ? "text-indigo-400 border-indigo-500" : "text-white/40 border-transparent hover:text-white/65"
              }`}>
              <span className="text-base">{t.icon}</span>{t.label}
            </button>
          ))}
        </div>

        <div className="mt-7">
          {/* OVERVIEW */}
          {tab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-[#111118] border border-white/8 rounded-2xl p-6">
                <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-indigo-500/15 rounded-lg flex items-center justify-center">📝</span>
                  Exams Accepted
                </h3>
                <div className="flex flex-wrap gap-2">
                  {college.examAccepted.map(e => (
                    <span key={e} className="bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-sm px-3 py-1.5 rounded-xl">{e}</span>
                  ))}
                </div>
              </div>
              <div className="bg-[#111118] border border-white/8 rounded-2xl p-6">
                <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-emerald-500/15 rounded-lg flex items-center justify-center">🏢</span>
                  Top Recruiters
                </h3>
                <div className="flex flex-wrap gap-2">
                  {college.topCompanies.map(c => (
                    <span key={c} className="bg-white/5 border border-white/10 text-white/65 text-sm px-3 py-1.5 rounded-xl">{c}</span>
                  ))}
                </div>
              </div>
              <div className="bg-[#111118] border border-white/8 rounded-2xl p-6 md:col-span-2">
                <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 bg-violet-500/15 rounded-lg flex items-center justify-center">ℹ️</span>
                  About {college.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {college.name} is one of India's premier educational institutions, established in {college.established}.
                  Located in {college.city}, {college.state}, it is recognized as a Tier {college.tier} institution
                  offering programs in {college.courses.slice(0,4).join(", ")}{college.courses.length>4?" and more":""}.
                  With an impressive placement rate of {college.placement}% and average package of ₹{(college.avgPackage/100000).toFixed(1)} LPA,
                  graduates are highly sought by companies like {college.topCompanies.slice(0,3).join(", ")}.
                  Admissions are accepted through {college.examAccepted.join(" / ")}.
                </p>
              </div>
            </div>
          )}

          {/* COURSES */}
          {tab === "courses" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {college.courses.map((c, i) => (
                <div key={c} className="bg-[#111118] border border-white/8 rounded-2xl p-5 hover:border-indigo-500/25 transition-colors group">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600/25 to-violet-600/15 rounded-xl flex items-center justify-center mb-4">
                    <span className="text-indigo-400 font-black text-sm">{String(i+1).padStart(2,"0")}</span>
                  </div>
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-indigo-300 transition-colors">{c}</h3>
                  <div className="space-y-1.5">
                    <p className="text-white/35 text-xs">Duration: <span className="text-white/55">{DURATIONS[c]??"2–4 years"}</span></p>
                    <p className="text-white/35 text-xs">Annual Fees: <span className="text-white/55">₹{(college.fees/100000).toFixed(1)}L</span></p>
                    <p className="text-white/35 text-xs">Admission via: <span className="text-white/55">{college.examAccepted[0]}</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PLACEMENTS */}
          {tab === "placements" && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {label:"Placement Rate",value:`${college.placement}%`,sub:"Students placed",icon:"📊",from:"from-indigo-600/20",border:"border-indigo-500/15"},
                  {label:"Average Package",value:`₹${(college.avgPackage/100000).toFixed(1)} LPA`,sub:"Annual CTC",icon:"💰",from:"from-emerald-600/20",border:"border-emerald-500/15"},
                  {label:"Highest Package",value:`₹${((college.avgPackage*2.8)/100000).toFixed(0)} LPA`,sub:"Best offer",icon:"🚀",from:"from-violet-600/20",border:"border-violet-500/15"},
                ].map(s => (
                  <div key={s.label} className={`bg-gradient-to-b ${s.from} to-transparent border ${s.border} rounded-2xl p-6 text-center`}>
                    <span className="text-3xl block mb-3">{s.icon}</span>
                    <p className="text-white font-black text-2xl mb-1">{s.value}</p>
                    <p className="text-white/50 text-xs">{s.label}</p>
                    <p className="text-white/25 text-xs mt-0.5">{s.sub}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#111118] border border-white/8 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-white font-bold text-sm">Placement Success Rate</h3>
                  <span className="text-indigo-400 font-bold text-sm">{college.placement}%</span>
                </div>
                <div className="h-3 bg-white/8 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full" style={{width:`${college.placement}%`}} />
                </div>
                <div className="flex justify-between text-white/25 text-xs mt-2"><span>0%</span><span>100%</span></div>
              </div>
              <div className="bg-[#111118] border border-white/8 rounded-2xl p-6">
                <h3 className="text-white font-bold text-sm mb-5">Top Recruiting Companies</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {college.topCompanies.map(company => (
                    <div key={company} className="bg-white/4 hover:bg-white/8 border border-white/6 rounded-xl p-3 text-center transition-colors group">
                      <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                        <span className="text-white text-xs font-black">{company.charAt(0)}</span>
                      </div>
                      <p className="text-white/60 text-xs font-medium leading-tight">{company}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* REVIEWS */}
          {tab === "reviews" && (
            <div className="space-y-4">
              {/* Rating summary */}
              <div className="flex items-center gap-5 bg-[#111118] border border-white/8 rounded-2xl p-5 mb-2">
                <div className="text-center shrink-0">
                  <p className="text-white font-black text-4xl mb-1">{college.rating}</p>
                  <Stars n={Math.round(college.rating)} />
                  <p className="text-white/30 text-xs mt-1">{REVIEWS.length} reviews</p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {[5,4,3,2,1].map(n => {
                    const cnt = REVIEWS.filter(r => r.rating === n).length;
                    return (
                      <div key={n} className="flex items-center gap-2">
                        <span className="text-white/30 text-xs w-2.5">{n}</span>
                        <svg className="w-3 h-3 fill-amber-400 shrink-0" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-400/60 rounded-full" style={{width:`${(cnt/REVIEWS.length)*100}%`}} />
                        </div>
                        <span className="text-white/25 text-xs w-3">{cnt}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {REVIEWS.map((r,i) => (
                <div key={i} className="bg-[#111118] border border-white/8 rounded-2xl p-5 hover:border-white/14 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{r.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{r.name}</p>
                        <p className="text-white/30 text-xs">Batch of {r.batch}</p>
                      </div>
                    </div>
                    <Stars n={r.rating} />
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
