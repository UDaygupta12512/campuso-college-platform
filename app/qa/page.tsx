"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface Question {
  id: number; title: string; body: string; author: string;
  createdAt: string; answerCount: number;
  college: { id: number; name: string } | null;
}

function timeAgo(iso: string) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (d < 60) return "just now";
  if (d < 3600) return `${Math.floor(d/60)}m ago`;
  if (d < 86400) return `${Math.floor(d/3600)}h ago`;
  return `${Math.floor(d/86400)}d ago`;
}

function Avatar({ name }: { name: string }) {
  const colors = ["from-indigo-500 to-violet-600","from-emerald-500 to-teal-600","from-rose-500 to-pink-600","from-amber-500 to-orange-600","from-sky-500 to-blue-600"];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${colors[idx]} flex items-center justify-center shrink-0`}>
      <span className="text-white text-xs font-bold">{name[0].toUpperCase()}</span>
    </div>
  );
}

export default function QAPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [showForm, setShowForm]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ title:"", body:"", author:"" });
  const [formError, setFormError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    try {
      const r = await fetch(`/api/qa?${params}`);
      setQuestions(await r.json());
    } finally { setLoading(false); }
  }, [search]);

  useEffect(() => { const t = setTimeout(load, 300); return () => clearTimeout(t); }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim() || !form.author.trim()) {
      setFormError("All fields are required"); return;
    }
    setSubmitting(true); setFormError("");
    try {
      const r = await fetch("/api/qa", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
      if (!r.ok) { setFormError("Failed to post question"); return; }
      const q: Question = await r.json();
      setQuestions(prev => [{ ...q, answerCount: 0 }, ...prev]);
      setForm({ title:"", body:"", author:"" });
      setShowForm(false);
    } catch { setFormError("Network error"); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-16 pb-20">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-emerald-600/6 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 pb-8 text-center relative">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-5">
            <span className="text-emerald-300 text-xs font-medium">💬 Community Q&A</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 tracking-tight">
            Ask. Answer. <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Decide.</span>
          </h1>
          <p className="text-white/40 text-sm sm:text-base max-w-md mx-auto mb-8">
            Get answers from students and alumni about admissions, campus life, placements and more
          </p>
          <button onClick={() => setShowForm(v => !v)}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-sm">
            {showForm ? "✕ Cancel" : "+ Ask a Question"}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Ask form */}
        {showForm && (
          <form onSubmit={submit} className="bg-[#111118] border border-white/10 rounded-2xl p-6 mb-8 shadow-xl shadow-black/30">
            <h2 className="text-white font-bold text-base mb-5">Ask a Question</h2>
            <div className="space-y-4">
              <div>
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-1.5">Your Name</label>
                <input value={form.author} onChange={e => setForm(p => ({...p, author: e.target.value}))}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-emerald-500/50 transition-all" />
              </div>
              <div>
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-1.5">Question Title</label>
                <input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))}
                  placeholder="e.g. What is the cutoff for IIT Bombay CSE?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-emerald-500/50 transition-all" />
              </div>
              <div>
                <label className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-1.5">Details</label>
                <textarea value={form.body} onChange={e => setForm(p => ({...p, body: e.target.value}))}
                  placeholder="Add more context to help others answer your question..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-emerald-500/50 transition-all resize-none" />
              </div>
            </div>
            {formError && <p className="text-red-400 text-xs mt-3">{formError}</p>}
            <button type="submit" disabled={submitting}
              className="mt-4 w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 text-white font-bold py-3 rounded-xl text-sm transition-all">
              {submitting ? "Posting…" : "Post Question →"}
            </button>
          </form>
        )}

        {/* Search */}
        <div className="relative mb-6">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search questions…"
            className="w-full bg-[#111118] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-emerald-500/50 transition-all" />
        </div>

        {/* Stats */}
        {!loading && (
          <p className="text-white/30 text-xs mb-4">
            <span className="text-white font-semibold">{questions.length}</span> question{questions.length !== 1 ? "s" : ""}
            {search && <> for "<span className="text-emerald-300">{search}</span>"</>}
          </p>
        )}

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {Array.from({length:5}).map((_,i) => (
              <div key={i} className="bg-[#111118] border border-white/6 rounded-2xl p-5 animate-pulse">
                <div className="h-4 bg-white/8 rounded w-3/4 mb-3" />
                <div className="h-3 bg-white/5 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🤔</div>
            <p className="text-white/50 font-semibold">No questions yet</p>
            <p className="text-white/25 text-sm mt-1">Be the first to ask!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map(q => (
              <Link key={q.id} href={`/qa/${q.id}`}
                className="block bg-[#111118] border border-white/8 rounded-2xl p-5 hover:border-emerald-500/25 hover:bg-white/[0.02] transition-all group">
                <div className="flex items-start gap-3">
                  <Avatar name={q.author} />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-emerald-300 transition-colors mb-1 line-clamp-2">
                      {q.title}
                    </h3>
                    <p className="text-white/35 text-xs line-clamp-2 mb-3">{q.body}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-white/30 text-xs">{q.author}</span>
                      <span className="text-white/15 text-xs">·</span>
                      <span className="text-white/25 text-xs">{timeAgo(q.createdAt)}</span>
                      {q.college && (
                        <>
                          <span className="text-white/15 text-xs">·</span>
                          <span className="text-emerald-400/70 text-xs bg-emerald-500/8 border border-emerald-500/15 px-2 py-0.5 rounded-full">
                            {q.college.name}
                          </span>
                        </>
                      )}
                      <span className="ml-auto flex items-center gap-1 text-white/30 text-xs">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                        </svg>
                        {q.answerCount} answer{q.answerCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
