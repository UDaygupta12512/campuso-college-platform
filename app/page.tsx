"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import CollegeCard from "@/components/CollegeCard";

interface College {
  id: number; name: string; location: string; city: string; state: string;
  fees: number; rating: number; courses: string[]; placement: number;
  avgPackage: number; tier: string; image?: string | null;
}
interface ApiResponse { colleges: College[]; total: number; page: number; totalPages: number; }

const STATES = ["Bihar","Delhi","Goa","Gujarat","Himachal Pradesh","Karnataka","Madhya Pradesh","Maharashtra","Odisha","Punjab","Rajasthan","Tamil Nadu","Telangana","Uttarakhand","Uttar Pradesh","West Bengal"];
const COURSES = ["B.Tech","M.Tech","MBA","MCA","BCA","B.Sc","M.Sc","PhD","Law"];
const FEE_OPTIONS = [
  { label: "Any Fees", value: "" },
  { label: "Under ₹50K", value: "50000" },
  { label: "Under ₹1L", value: "100000" },
  { label: "Under ₹2L", value: "200000" },
  { label: "Under ₹3L", value: "300000" },
  { label: "Under ₹5L", value: "500000" },
];
const SORT_OPTIONS = [
  { label: "Top Rated", value: "rating" },
  { label: "Best Placement", value: "placement" },
  { label: "Lowest Fees", value: "fees" },
];

function SkeletonCard() {
  return (
    <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden">
      <div className="h-[3px] bg-white/8" />
      <div className="p-5 space-y-3 animate-pulse">
        <div className="h-3 bg-white/10 rounded-full w-14" />
        <div className="h-4 bg-white/8 rounded-full w-3/4" />
        <div className="h-3 bg-white/5 rounded-full w-1/2" />
        <div className="grid grid-cols-3 gap-2 pt-1">
          {[1,2,3].map(i => <div key={i} className="h-12 bg-white/5 rounded-xl" />)}
        </div>
        <div className="flex gap-1.5 pt-1">
          {[1,2,3].map(i => <div key={i} className="h-5 w-12 bg-white/5 rounded-full" />)}
        </div>
        <div className="flex gap-2 pt-1">
          <div className="flex-1 h-9 bg-white/8 rounded-xl" />
          <div className="w-10 h-9 bg-white/5 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [course, setCourse] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [page, setPage] = useState(1);
  const [compareIds, setCompareIds] = useState<number[]>([]);

  useEffect(() => {
    const t = setTimeout(() => { setDebouncedSearch(search); setPage(1); }, 350);
    return () => clearTimeout(t);
  }, [search]);

  const fetchColleges = useCallback(async () => {
    setLoading(true); setError("");
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (stateFilter) params.set("state", stateFilter);
    if (maxFees) params.set("maxFees", maxFees);
    if (course) params.set("course", course);
    params.set("sortBy", sortBy);
    params.set("page", String(page));
    try {
      const res = await fetch(`/api/colleges?${params}`);
      if (!res.ok) throw new Error("Failed");
      setData(await res.json());
    } catch { setError("Failed to load colleges. Please try again."); }
    finally { setLoading(false); }
  }, [debouncedSearch, stateFilter, maxFees, course, sortBy, page]);

  useEffect(() => { fetchColleges(); }, [fetchColleges]);

  const resetFilters = () => { setSearch(""); setStateFilter(""); setMaxFees(""); setCourse(""); setSortBy("rating"); setPage(1); };
  const toggleCompare = (id: number) => setCompareIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  const hasFilters = !!(search || stateFilter || maxFees || course || sortBy !== "rating");
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-16 pb-28">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/25 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10 text-center relative">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-indigo-300 text-xs font-medium">50 Top Indian Colleges</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
            Find Your{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
              Dream College
            </span>
          </h1>
          <p className="text-white/40 text-base sm:text-lg max-w-lg mx-auto mb-8">
            Explore, compare, and predict your admission chances at India's top institutions
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 text-center mb-10">
            {[["50+","Colleges"],["4","Features"],["3","Exams"]].map(([n,l]) => (
              <div key={l}>
                <p className="text-2xl font-black text-white">{n}</p>
                <p className="text-white/35 text-xs mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search + Filters sticky bar */}
      <div className="sticky top-16 z-30 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/6 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input type="text" placeholder="Search colleges…" value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#111118] border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-white placeholder-white/25 focus:outline-none focus:border-indigo-500/60 transition-all text-sm h-10" />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>

          {/* Filter row */}
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            {[
              { value: stateFilter, onChange: (v: string) => { setStateFilter(v); setPage(1); }, options: [["", "All States"], ...STATES.map(s => [s, s])] },
              { value: maxFees, onChange: (v: string) => { setMaxFees(v); setPage(1); }, options: FEE_OPTIONS.map(f => [f.value, f.label]) },
              { value: course, onChange: (v: string) => { setCourse(v); setPage(1); }, options: [["", "All Courses"], ...COURSES.map(c => [c, c])] },
              { value: sortBy, onChange: (v: string) => { setSortBy(v); setPage(1); }, options: SORT_OPTIONS.map(s => [s.value, s.label]) },
            ].map((sel, i) => (
              <select key={i} value={sel.value} onChange={e => sel.onChange(e.target.value)}
                className="bg-[#111118] border border-white/10 rounded-xl px-3 py-2 text-white/65 text-xs focus:outline-none focus:border-indigo-500/50 cursor-pointer h-10 min-w-0">
                {sel.options.map(([v, l]) => <option key={v} value={v} className="bg-[#1a1a2e]">{l}</option>)}
              </select>
            ))}
            {hasFilters && (
              <button onClick={resetFilters}
                className="h-10 px-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs hover:bg-red-500/18 transition-colors flex items-center gap-1.5 whitespace-nowrap">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6">
        {/* Count + compare indicator */}
        {!loading && data && !error && (
          <div className="flex items-center justify-between mb-5">
            <p className="text-white/40 text-xs">
              <span className="text-white font-semibold">{data.total}</span> colleges found
              {debouncedSearch && <> · "<span className="text-indigo-300">{debouncedSearch}</span>"</>}
            </p>
            {compareIds.length > 0 && (
              <button onClick={() => setCompareIds([])}
                className="text-white/30 text-xs hover:text-white/50 transition-colors flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Clear {compareIds.length} selected
              </button>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="text-5xl">⚠️</div>
            <p className="text-white/50">{error}</p>
            <button onClick={fetchColleges} className="text-indigo-400 border border-indigo-500/30 px-4 py-2 rounded-xl text-sm hover:border-indigo-500/50 transition-colors">
              Try again
            </button>
          </div>
        )}

        {/* Grid */}
        {!error && (
          loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : data?.colleges.length === 0 ? (
            <div className="text-center py-28">
              <div className="text-6xl mb-4">🎓</div>
              <p className="text-white/50 text-lg font-medium mb-2">No colleges found</p>
              <p className="text-white/25 text-sm mb-6">Try broadening your search or filters</p>
              <button onClick={resetFilters} className="text-indigo-400 border border-indigo-500/30 px-5 py-2.5 rounded-xl text-sm hover:border-indigo-500/50 transition-colors">
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data?.colleges.map(college => (
                <CollegeCard key={college.id} college={college} compareIds={compareIds} onCompareToggle={toggleCompare} />
              ))}
            </div>
          )
        )}

        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
              className="flex items-center gap-1 px-4 py-2 bg-[#111118] border border-white/10 rounded-xl text-white/50 text-sm hover:bg-white/6 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
              </svg>
              Prev
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                    p === page ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25" : "bg-[#111118] border border-white/10 text-white/50 hover:bg-white/6 hover:text-white"
                  }`}>{p}</button>
              ))}
            </div>
            <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
              className="flex items-center gap-1 px-4 py-2 bg-[#111118] border border-white/10 rounded-xl text-white/50 text-sm hover:bg-white/6 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all">
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Floating compare bar */}
      {compareIds.length > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-[#16162a] border border-indigo-500/40 rounded-2xl px-5 py-3 flex items-center gap-4 shadow-2xl shadow-indigo-500/20 backdrop-blur-sm">
            <div className="flex gap-1.5 items-center">
              {[1,2,3].map(n => (
                <div key={n} className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                  n <= compareIds.length ? "bg-indigo-600 text-white" : "bg-white/8 text-white/20 border border-white/8"
                }`}>{n}</div>
              ))}
              <span className="text-white/60 text-sm ml-1">
                {compareIds.length === 1 ? "selected — add 1 more" : compareIds.length === 2 ? "selected — add 1 more or compare" : "selected"}
              </span>
            </div>
            <div className="h-5 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              {compareIds.length >= 2 && (
                <button onClick={() => router.push(`/compare?ids=${compareIds.join(",")}`)}
                  className="bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white text-sm font-semibold px-4 py-1.5 rounded-xl transition-colors whitespace-nowrap">
                  Compare →
                </button>
              )}
              <button onClick={() => setCompareIds([])}
                className="text-white/30 hover:text-white/60 transition-colors p-1.5 rounded-lg hover:bg-white/6" title="Clear selection">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
