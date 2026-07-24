"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [tickets, setTickets] = useState<{id: number, event_name: string, status: string, date: string}[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/applications");
      const json = await res.json();
      if (json.success) {
        const mapped = json.data.map((t: any) => ({
          ...t,
          date: t.date ? new Date(t.date).toISOString().split('T')[0] : "N/A"
        }));
        setTickets(mapped);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTickets(tickets.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return null; // Prevent hydration mismatch

  const pendingTickets = tickets.filter(t => t.status.toUpperCase() === "PENDING");
  const processedTickets = tickets.filter(t => t.status.toUpperCase() !== "PENDING");

  const getStatusColor = (status: string) => {
    const s = status.toUpperCase();
    if (s === 'ACCEPTED' || s === 'APPROVED') return 'bg-status-approved-surface text-status-approved-foreground';
    if (s === 'DENIED' || s === 'REJECTED') return 'bg-status-rejected-surface text-status-rejected-foreground';
    if (s === 'REVISION') return 'bg-status-review-surface text-status-review-foreground';
    return 'bg-status-submitted-surface text-status-submitted-foreground';
  };

  return (
    <main className="min-h-screen bg-brand-pale text-ink relative">
      {/* Hero Section with Image Background */}
      <div 
        className="w-full h-90 flex items-center justify-center relative"
        style={{ backgroundImage: "url('https://img.magnific.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg?semt=ais_hybrid&w=740&q=80')" }}
      >
        <div className="absolute inset-0 bg-brand-dark/70"></div>
        <h1 className="relative z-10 text-4xl sm:text-5xl font-bold uppercase tracking-wide text-white">TICKETS</h1>
      </div>

      {/* Main Content Card (Connector) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-18 relative z-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Card: Pending */}
          <div className="bg-card rounded-xl shadow-[0_24px_70px_rgba(0,74,130,0.14)] border border-line overflow-hidden flex flex-col h-full">
            <div className="p-4 sm:p-5 border-b border-line flex justify-between items-center bg-card/90 backdrop-blur-sm">
              <h2 className="text-xl font-bold uppercase tracking-wide text-ink">Pending Tickets</h2>
              <Link 
                href="/dashboard/create"
                className="bg-brand hover:bg-brand-dark text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors inline-block"
              >
                Create Ticket
              </Link>
            </div>

            <div className="p-4 flex-1">
              {pendingTickets.length === 0 ? (
                <div className="text-center py-8 text-muted">
                  No pending tickets found.
                </div>
              ) : (
                <div className="space-y-2">
                  {pendingTickets.map((ticket) => (
                    <div key={ticket.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-surface-soft rounded-lg border border-line">
                      <Link href={`/dashboard/view/${ticket.id}`} className="block hover:opacity-80 transition-opacity">
                        <h3 className="font-bold text-base text-ink hover:text-brand transition-colors">{ticket.event_name}</h3>
                        <p className="text-xs text-muted">Date: {ticket.date}</p>
                      </Link>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <Link href={`/dashboard/edit/${ticket.id}`} className="text-muted hover:text-ink text-xs font-bold uppercase tracking-wider transition-colors">
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(ticket.id)}
                          className="text-status-rejected-foreground hover:opacity-80 text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Card: Processed */}
          <div className="bg-card rounded-xl shadow-[0_24px_70px_rgba(0,74,130,0.14)] border border-line overflow-hidden flex flex-col h-full">
            <div className="p-4 sm:p-5 border-b border-line flex justify-between items-center bg-card/90 backdrop-blur-sm">
              <h2 className="text-xl font-bold uppercase tracking-wide text-ink">Processed Tickets</h2>
            </div>

            <div className="p-4 flex-1">
              {processedTickets.length === 0 ? (
                <div className="text-center py-8 text-muted">
                  No processed tickets found.
                </div>
              ) : (
                <div className="space-y-2">
                  {processedTickets.map((ticket) => (
                    <div key={ticket.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-surface-soft rounded-lg border border-line">
                      <Link href={`/dashboard/view/${ticket.id}`} className="block hover:opacity-80 transition-opacity">
                        <h3 className="font-bold text-base text-ink hover:text-brand transition-colors">{ticket.event_name}</h3>
                        <p className="text-xs text-muted">Date: {ticket.date}</p>
                      </Link>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <Link href={`/dashboard/edit/${ticket.id}`} className="text-muted hover:text-ink text-xs font-bold uppercase tracking-wider transition-colors">
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(ticket.id)}
                          className="text-status-rejected-foreground hover:opacity-80 text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
