"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminViewTicket({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isPostingComment, setIsPostingComment] = useState(false);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/applications/${unwrappedParams.id}`);
        const json = await res.json();
        if (json.success && json.data) {
          setTicket({
            ...json.data,
            date: json.data.date ? new Date(json.data.date).toISOString().split('T')[0] : "N/A",
            status: json.data.status || "PENDING"
          });
        }
      } catch (err) {
        console.error("Gagal mengambil tiket:", err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/applications/${unwrappedParams.id}/comments`);
        const json = await res.json();
        if (json.success && json.data) {
          setComments(json.data);
        }
      } catch (err) {
        console.error("Gagal mengambil komentar:", err);
      }
    };

    Promise.all([fetchTicket(), fetchComments()]).finally(() => {
      setLoading(false);
    });
  }, [unwrappedParams.id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setIsPostingComment(true);
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${unwrappedParams.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: 1, message: newComment })
      });
      const json = await res.json();
      
      if (res.ok && json.success) {
        setComments([...comments, json.data]);
        setNewComment("");
      } else {
        alert("Gagal mengirim pesan.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setIsPostingComment(false);
    }
  };

  const handleProcessTicket = async (newStatus: string) => {
    if (!confirm(`Anda yakin ingin mengubah status tiket ini menjadi ${newStatus}?`)) return;
    
    setIsUpdating(true);
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${unwrappedParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (res.ok) {
        alert(`Status berhasil diubah menjadi ${newStatus}`);
        router.push("/admin"); 
      }
    } catch (err) {
      console.error(err);
      alert("Gagal memperbarui status.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return null;

  if (!ticket) {
    return (
      <main className="min-h-screen bg-background text-ink flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Ticket Not Found</h1>
          <Link href="/admin" className="text-brand hover:underline">Return to Control Panel</Link>
        </div>
      </main>
    );
  }

  const getStatusStyle = (status: string) => {
    const s = status.toUpperCase();
    if (s === 'ACCEPTED' || s === 'APPROVED') return 'bg-green-100 text-green-800 border-green-200';
    if (s === 'DENIED' || s === 'REJECTED') return 'bg-red-100 text-red-800 border-red-200';
    if (s === 'REVISION') return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  return (
    <main className="min-h-screen bg-background text-ink pb-16">
      
      {/* Indikator Admin Mode */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-2 bg-brand-light text-brand-dark px-4 py-1.5 rounded-full border border-line shadow-sm">
        <div className="w-2 h-2 rounded-full bg-brand animate-pulse"></div>
        <span className="text-xs font-bold uppercase tracking-widest">Admin Review Mode</span>
      </div>

      {/* Hero Section */}
      <section className="border-b border-line bg-surface-soft py-12 sm:py-16 pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand mb-2">
            Ticket Review
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl max-w-3xl">
            {ticket.event_name}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        
        {/* KIRI: Detail & Diskusi */}
        <div className="space-y-8">
          
          {/* Card: Detail Tiket */}
          <div className="rounded-2xl border border-line bg-card shadow-[0_12px_35px_rgba(0,74,130,0.07)] overflow-hidden">
            <div className="p-4 sm:px-6 sm:py-4 border-b border-line flex flex-wrap gap-4 justify-between items-center bg-surface-soft/50">
              <Link href="/admin" className="text-muted hover:text-brand transition-colors text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                <span aria-hidden="true">←</span> Back to Panel
              </Link>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusStyle(ticket.status)}`}>
                Current: {ticket.status}
              </span>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted mb-1">Submission Date</h3>
                  <p className="text-sm text-ink">{ticket.date}</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted mb-1">Media / Location</h3>
                  <p className="text-sm text-ink">{ticket.location || "N/A"}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted mb-2">Proposal Description</h3>
                <div className="rounded-xl border border-line bg-surface-soft p-5 text-sm leading-6 text-muted min-h-[120px]">
                  {ticket.description || "No description provided."}
                </div>
              </div>
            </div>
          </div>

          {/* Card: Diskusi */}
          <div className="rounded-2xl border border-line bg-card shadow-[0_12px_35px_rgba(0,74,130,0.07)] overflow-hidden">
            <div className="p-4 sm:px-6 sm:py-4 border-b border-line flex justify-between items-center bg-surface-soft/50">
              <h2 className="text-lg font-bold text-ink">Discussion</h2>
              <span className="text-xs text-brand-dark bg-brand-light px-3 py-1 rounded-lg font-semibold tracking-wide">
                Admin Channel
              </span>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="space-y-4 mb-6 max-h-[350px] overflow-y-auto pr-2">
                {comments.length === 0 ? (
                  <p className="text-sm text-muted text-center italic py-8">Belum ada diskusi untuk tiket ini.</p>
                ) : (
                  comments.map((comment, index) => {
                    const senderName = comment.user?.name || `User #${comment.user_id}`;
                    const isAdmin = comment.user_id === 1;
                    
                    return (
                      <div key={comment.id || index} className={`rounded-xl p-5 border ${isAdmin ? 'bg-brand-pale border-brand-light/50 ml-6' : 'bg-surface-soft border-line mr-6'}`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className={`font-bold text-sm ${isAdmin ? 'text-brand-dark' : 'text-ink'}`}>
                            {isAdmin ? 'Admin (You)' : senderName}
                          </span>
                          <span className="text-xs text-muted">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm leading-6 text-muted">{comment.message}</p>
                      </div>
                    );
                  })
                )}
              </div>

              <form onSubmit={handleAddComment} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input 
                  type="text" 
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  disabled={isPostingComment}
                  placeholder="Kirim instruksi atau catatan ke user..."
                  className="flex-1 rounded-lg border border-line bg-background px-4 py-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors disabled:opacity-50"
                />
                <button 
                  type="submit"
                  disabled={isPostingComment || !newComment.trim()}
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-brand px-6 text-sm font-semibold text-black transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:opacity-50"
                >
                  {isPostingComment ? 'Sending...' : 'Send Reply'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* KANAN: Decision Panel */}
        <div className="h-fit sticky top-24 rounded-2xl border border-line bg-card shadow-[0_12px_35px_rgba(0,74,130,0.07)] overflow-hidden">
          <div className="p-4 sm:px-6 sm:py-4 border-b border-line bg-surface-soft/50">
            <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-ink">Decision Panel</h2>
          </div>
          
          <div className="p-6">
            {ticket.status.toUpperCase() === 'PENDING' ? (
              <div className="space-y-4">
                <p className="text-sm leading-6 text-muted mb-4">
                  Pilih keputusan akhir untuk pengajuan ini. Pastikan Anda telah memberikan instruksi di kolom diskusi jika meminta revisi.
                </p>
                
                <button 
                  onClick={() => handleProcessTicket('APPROVED')}
                  disabled={isUpdating}
                  className="w-full inline-flex min-h-11 items-center justify-center rounded-lg bg-[#008A2E] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#006e25] disabled:opacity-50"
                >
                  Approve Ticket
                </button>
                
                <button 
                  onClick={() => handleProcessTicket('REVISION')}
                  disabled={isUpdating}
                  className="w-full inline-flex min-h-11 items-center justify-center rounded-lg bg-[#D97706] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#b46305] disabled:opacity-50"
                >
                  Request Revision
                </button>

                <button 
                  onClick={() => handleProcessTicket('REJECTED')}
                  disabled={isUpdating}
                  className="w-full inline-flex min-h-11 items-center justify-center rounded-lg bg-[#DC2626] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#b91c1c] disabled:opacity-50"
                >
                  Reject Ticket
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="inline-block rounded-xl border border-line bg-brand-pale px-6 py-4 text-sm leading-6 text-brand-dark">
                  <strong>Decision Finalized:</strong>
                  <p className="mt-1 text-muted text-xs">Tiket ini sudah diproses dan statusnya tidak dapat diubah lagi.</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}