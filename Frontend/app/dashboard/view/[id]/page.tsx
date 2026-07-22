"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";

export default function ViewTicket({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Dummy comments state
  const [comments, setComments] = useState([
    { id: 1, user: "Admin", text: "We need to revise the proposal before approval.", date: "2026-07-21" },
    { id: 2, user: "Reviewer", text: "Looks good, just waiting for the final budget.", date: "2026-07-22" }
  ]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/applications/${unwrappedParams.id}`);
        const json = await res.json();
        if (json.success && json.data) {
          setTicket({
            ...json.data,
            date: json.data.date ? new Date(json.data.date).toISOString().split('T')[0] : "N/A"
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [unwrappedParams.id]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setComments([
      ...comments,
      { id: Date.now(), user: "You", text: newComment, date: new Date().toISOString().split('T')[0] }
    ]);
    setNewComment("");
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
    if (s === 'ACCEPTED' || s === 'APPROVED') return 'bg-green-500/20 text-green-400';
    if (s === 'DENIED') return 'bg-red-500/20 text-red-400';
    if (s === 'REVISION') return 'bg-orange-500/20 text-orange-400';
    return 'bg-yellow-500/20 text-yellow-400';
  };

  return (
    <main className="min-h-screen bg-neutral-900 text-white relative">
      {/* Hero Section with Image Background */}
      <div 
        className="w-full h-90 flex items-center justify-center relative "
        style={{ backgroundImage: "url('https://img.magnific.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg?semt=ais_hybrid&w=740&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <h1 className="relative z-10 text-4xl sm:text-5xl font-bold uppercase tracking-wide">VIEW TICKET</h1>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-18 relative z-20 pb-12 space-y-6">
        
        {/* Ticket Details Card */}
        <div className="bg-neutral-800 rounded-xl shadow-2xl border border-neutral-700 overflow-hidden">
          <div className="p-4 sm:px-6 sm:py-4 border-b border-neutral-700 flex justify-between items-center bg-neutral-800/80 backdrop-blur-sm">
            <Link href="/dashboard" className="text-neutral-400 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider">
              ← Back to Dashboard
            </Link>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(ticket.status)}`}>
              {ticket.status}
            </span>
          </div>

          <div className="p-4 sm:p-6 space-y-6">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Title</h3>
              <p className="text-lg font-medium text-white">{ticket.event_name}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Date</h3>
                <p className="text-sm text-white">{ticket.date}</p>
              </div>
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Media / Location</h3>
                <p className="text-sm text-white">{ticket.location || "N/A"}</p>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Description</h3>
              <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-700 text-sm text-neutral-300 min-h-[100px]">
                {ticket.description || "No description provided."}
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Files</h3>
              <div className="flex items-center gap-3">
                <span className="bg-neutral-900 px-4 py-2 rounded border border-neutral-700 text-sm text-neutral-400">
                  proposal_document.pdf
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Comments Section Card */}
        <div className="bg-neutral-800 rounded-xl shadow-2xl border border-neutral-700 overflow-hidden">
          <div className="p-4 sm:px-6 sm:py-4 border-b border-neutral-700 bg-neutral-800/80 backdrop-blur-sm">
            <h2 className="text-lg font-semibold uppercase tracking-wide">Comments</h2>
          </div>
          
          <div className="p-4 sm:p-6 space-y-4">
            {/* List of comments */}
            <div className="space-y-4 mb-6">
              {comments.map(comment => (
                <div key={comment.id} className="bg-neutral-900 rounded-lg p-4 border border-neutral-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-sm text-blue-400">{comment.user}</span>
                    <span className="text-[10px] text-neutral-500">{comment.date}</span>
                  </div>
                  <p className="text-sm text-neutral-300">{comment.text}</p>
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
                className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors whitespace-nowrap"
              >
                Post
              </button>
            </form>
          </div>
        </div>

      </div>
    </main>
  );
}
