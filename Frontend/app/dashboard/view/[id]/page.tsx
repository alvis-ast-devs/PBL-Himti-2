"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";

const normalizeStatus = (s: string) => {
  if (!s) return 'DRAFT';
  const upper = s.toUpperCase();
  if (upper === 'PENDING') return 'SUBMITTED';
  if (upper === 'ACCEPTED') return 'APPROVED';
  if (upper === 'DENIED') return 'REJECTED';
  if (upper === 'REVISION') return 'REVISION REQUIRED';
  return upper;
};

export default function ViewTicket({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/applications/${unwrappedParams.id}`);
        const json = await res.json();
        if (json.success && json.data) {
          setTicket({
            ...json.data,
            status: normalizeStatus(json.data.status),
            date: json.data.date ? new Date(json.data.date).toISOString().split('T')[0] : "N/A"
          });
        }
        const commentsRes = await fetch(`http://localhost:5000/api/applications/${unwrappedParams.id}/comments`);
        const commentsJson = await commentsRes.json();
        if (commentsJson.success) {
          setComments(commentsJson.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [unwrappedParams.id]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${unwrappedParams.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 1, message: newComment }) // Hardcoded user_id for now
      });
      const json = await res.json();
      if (json.success) {
        setComments([...comments, json.data]);
        setNewComment("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return null;

  if (!ticket) {
    return (
      <main className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Ticket Not Found</h1>
          <Link href="/dashboard" className="text-blue-400 hover:underline">Return to Dashboard</Link>
        </div>
      </main>
    );
  }

  const getStatusColor = (status: string) => {
    const s = status.toUpperCase();
    if (s === 'APPROVED' || s === 'COMPLETED') return 'bg-status-approved-surface text-status-approved-foreground';
    if (s === 'REJECTED') return 'bg-status-rejected-surface text-status-rejected-foreground';
    if (s === 'REVISION REQUIRED') return 'bg-status-review-surface text-status-review-foreground';
    if (s === 'UNDER REVIEW') return 'bg-blue-500/20 text-blue-400';
    return 'bg-status-submitted-surface text-status-submitted-foreground';
  };

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-brand-pale text-ink relative">
        {/* Hero Section */}
        <div className="w-full flex items-center relative pt-16 pb-28 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-36">
          <div className="absolute inset-0 bg-brand-dark"></div>
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">View Ticket</h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-18 relative z-20 pb-12 space-y-6">
        
        {/* Ticket Details Card */}
        <div className="bg-card rounded-lg shadow-[0_24px_70px_rgba(0,74,130,0.14)] border border-line overflow-hidden">
          <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-line flex justify-between items-center bg-card/90 backdrop-blur-sm">
            <Link href="/dashboard" className="text-muted hover:text-ink transition-colors text-sm font-bold uppercase tracking-wider">
              ← Back to Dashboard
            </Link>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
          </div>

          <div className="p-4 sm:p-6 space-y-6">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1">Title</h3>
              <p className="text-lg font-bold text-ink">{ticket.event_name}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1">Date</h3>
                <p className="text-sm text-ink">{ticket.date}</p>
              </div>
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1">Media / Location</h3>
                <p className="text-sm text-ink">{ticket.location || "N/A"}</p>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1">Description</h3>
              <div className="bg-surface-soft rounded-lg p-4 border border-line text-sm text-ink min-h-[100px]">
                {ticket.description || "No description provided."}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-muted mb-1">Files</h3>
              <div className="flex items-center gap-3">
                <span className="bg-surface-soft px-4 py-2 rounded border border-line text-sm text-ink">
                  proposal_document.pdf
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section Card */}
        <div className="bg-card rounded-lg shadow-[0_24px_70px_rgba(0,74,130,0.14)] border border-line overflow-hidden">
          <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-line bg-card/90 backdrop-blur-sm">
            <h2 className="text-2xl font-bold leading-tight text-ink">Comments</h2>
          </div>
          
          <div className="p-4 sm:p-6 space-y-4">
            {/* List of comments */}
            <div className="space-y-4 mb-6">
              {comments.map(comment => (
                <div key={comment.id} className="bg-surface-soft rounded-lg p-4 border border-line">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm text-brand-dark">{comment.user?.name || `User ${comment.user_id}`}</span>
                    <span className="text-[10px] text-muted">{new Date(comment.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-ink">{comment.message}</p>
                </div>
              ))}
            </div>

            {/* Add comment form */}
            <form onSubmit={handleAddComment} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-surface-soft border border-line rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-brand transition-colors"
              />
              <button 
                type="submit"
                className="bg-brand hover:bg-brand-dark text-white px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
              >
                Post
              </button>
            </form>
          </div>
        </div>

      </div>
    </main>
    <LandingFooter />
    </>
  );
}
