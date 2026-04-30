"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Answer { id: number; body: string; author: string; createdAt: string; }
interface Question {
  id: number; title: string; body: string; author: string; createdAt: string;
  college: { id: number; name: string } | null;
  answers: Answer[];
}

function timeAgo(iso: string) {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (d < 60) return "just now";
  if (d < 3600) return `${Math.floor(d/60)}m ago`;
  if (d < 86400) return `${Math.floor(d/3600)}h ago`;
  return `${Math.floor(d/86400)}d ago`;
}
function Avatar({ name, size="md" }: { name: string; size?: "sm"|"md" }) {
  const colors = ["from-indigo-500 to-violet-600","from-emerald-500 to-teal-600","from-rose-500 to-pink-600","from-amber-500 to-orange-600","from-sky-500 to-blue-600"];
  const idx = name.charCodeAt(0) % colors.length;
  const sz = size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";
  return (
    <div className={`${sz} rounded-full bg-gradient-to-br ${colors[idx]} flex items-center justify-center shrink-0`}>
      <span className="text-white font-bold">{name[0].toUpperCase()}</span>
    </div>
  );
}

export default function QuestionDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [answer, setAnswer]     = useState({ body:"", author:"" });
  const [posting, setPosting]   = useState(false);
  const [answerError, setAnswerError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/qa/${id}`)
      .then(async r => { if (r.status === 404) { setNotFound(true); return; } setQuestion(await r.json()); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  const postAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.body.trim() || !answer.author.trim()) { setAnswerError("Both fields required"); return; }
    setPosting(true); setAnswerError("");
    try {
      const r = await fetch(`/api/qa/${id}`, { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(answer) });
      if (!r.ok) { setAnswerError("Failed to post"); return; }
      const newAns: Answer = await r.json();
      setQuestion(prev => prev ? { ...prev, answers: [...prev.answers, newAns] } : prev);
      setAnswer({ body:"", author:"" });
    } catch { setAnswerError("Network error"); }
    finally { setPosting(false); }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 max-w-3xl mx-auto px-4 animate-pulse">
      <div className="h-4 w-16 bg-white/10 rounded mb-6" />
      <div className="h-6 bg-white/8 rounded w-3/4 mb-3" />
      <div className="h-4 bg-white/5 rounded w-full mb-2" />
      <div className="h-4 bg-white/5 rounded w-2/3" />
    </div>
  );

  if (notFound || !question) return (
    <div className="min-h-screen bg-[#0a0a0f] pt-24 flex flex-col items-center justify-center gap-4">
      <div className="text-5xl">❓</div>
      <p className="text-white/60 text-xl font-bold">Question not found</p>
      <Link href="/qa" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">Back to Q&A</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f] pt-16 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-10">
        {/* Back */}
        <button onClick={() => router.back()} className="flex items-center gap-1.5 text-white/40 hover:text-white/70 text-sm mb-6 transition-colors group">
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
          </svg>
          Back to Q&A
        </button>

        {/* Question */}
        <div className="bg-[#111118] border border-white/10 rounded-2xl p-6 mb-6">
          {question.college && (
            <Link href={`/colleges/${question.college.id}`}
              className="inline-block text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-4 hover:bg-emerald-500/15 transition-colors">
              🏫 {question.college.name}
            </Link>
          )}
          <h1 className="text-white font-black text-xl leading-snug mb-3">{question.title}</h1>
          <p className="text-white/55 text-sm leading-relaxed mb-5">{question.body}</p>
          <div className="flex items-center gap-3 pt-4 border-t border-white/6">
            <Avatar name={question.author} />
            <div>
              <p className="text-white/70 text-xs font-semibold">{question.author}</p>
              <p className="text-white/25 text-xs">{timeAgo(question.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Answers */}
        <div className="mb-8">
          <h2 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
            <span className="w-5 h-5 bg-emerald-500/15 rounded-lg flex items-center justify-center text-xs">💬</span>
            {question.answers.length} Answer{question.answers.length !== 1 ? "s" : ""}
          </h2>
          {question.answers.length === 0 ? (
            <div className="text-center py-10 bg-white/[0.02] border border-white/5 rounded-2xl">
              <p className="text-white/30 text-sm">No answers yet — be the first!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {question.answers.map((a, i) => (
                <div key={a.id} className="bg-[#111118] border border-white/8 rounded-2xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1 shrink-0">
                      <div className="w-6 h-6 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-emerald-400 text-[10px] font-black">{i+1}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/65 text-sm leading-relaxed mb-4">{a.body}</p>
                      <div className="flex items-center gap-2 pt-3 border-t border-white/5">
                        <Avatar name={a.author} size="sm" />
                        <span className="text-white/50 text-xs font-semibold">{a.author}</span>
                        <span className="text-white/20 text-xs">·</span>
                        <span className="text-white/25 text-xs">{timeAgo(a.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Post answer */}
        <div className="bg-[#111118] border border-white/10 rounded-2xl p-6">
          <h3 className="text-white font-bold text-sm mb-5">Your Answer</h3>
          <form onSubmit={postAnswer} className="space-y-4">
            <div>
              <label className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-1.5">Your Name</label>
              <input value={answer.author} onChange={e => setAnswer(p => ({...p, author: e.target.value}))}
                placeholder="e.g. Priya Singh"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-emerald-500/50 transition-all" />
            </div>
            <div>
              <label className="text-white/40 text-xs font-semibold uppercase tracking-wider block mb-1.5">Answer</label>
              <textarea value={answer.body} onChange={e => setAnswer(p => ({...p, body: e.target.value}))}
                placeholder="Share your knowledge or experience…"
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 text-sm focus:outline-none focus:border-emerald-500/50 transition-all resize-none" />
            </div>
            {answerError && <p className="text-red-400 text-xs">{answerError}</p>}
            <button type="submit" disabled={posting}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/15">
              {posting ? "Posting…" : "Post Answer →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
