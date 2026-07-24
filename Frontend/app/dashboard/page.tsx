"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function Dashboard() {
  const [tickets, setTickets] = useState<{id: number, event_name: string, status: string, date: string, updated_at?: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [editedFilter, setEditedFilter] = useState("ALL");

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

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.event_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || t.status.toUpperCase() === statusFilter;
    let matchesEdited = true;
    if (editedFilter === "EDITED") matchesEdited = !!t.updated_at;
    if (editedFilter === "NOT_EDITED") matchesEdited = !t.updated_at;
    return matchesSearch && matchesStatus && matchesEdited;
  });
  const pendingTickets = filteredTickets.filter(t => t.status.toUpperCase() === "PENDING");
  const processedTickets = filteredTickets.filter(t => t.status.toUpperCase() !== "PENDING");

  const getStatusColor = (status: string) => {
    const s = status.toUpperCase();
    if (s === 'ACCEPTED' || s === 'APPROVED') return 'bg-status-approved-surface text-status-approved-foreground';
    if (s === 'DENIED' || s === 'REJECTED') return 'bg-status-rejected-surface text-status-rejected-foreground';
    if (s === 'REVISION') return 'bg-status-review-surface text-status-review-foreground';
    return 'bg-status-submitted-surface text-status-submitted-foreground';
  };

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-brand-pale text-ink relative">
        {/* Hero Section */}
        <div className="w-full flex items-center relative pt-16 pb-28 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-36">
          <div className="absolute inset-0 bg-brand-dark"></div>
          <div className="relative z-10 w-full max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">Tickets</h1>
        </div>
      </div>

      {/* Main Content Card (Connector) */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 -mt-18 relative z-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr_1fr] gap-6">

          {/* Filters Card */}
          <div className="bg-card rounded-[1.75rem] shadow-[0_24px_70px_rgba(0,74,130,0.14)] border border-line overflow-hidden flex flex-col h-max">
            <div className="px-6 py-5 border-b border-line">
              <h2 className="text-2xl font-bold leading-tight text-ink">Filters</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2 block">Search</label>
                <input 
                  type="text" 
                  placeholder="Search tickets..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-soft border border-line rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2 block">Status</label>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full bg-surface-soft border border-line rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-brand transition-colors appearance-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="PENDING">Pending</option>
                  <option value="ACCEPTED">Accepted</option>
                  <option value="APPROVED">Approved</option>
                  <option value="DENIED">Denied</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="REVISION">Revision</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted mb-2 block">Edited</label>
                <select 
                  value={editedFilter}
                  onChange={(e) => setEditedFilter(e.target.value)}
                  className="w-full bg-surface-soft border border-line rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-brand transition-colors appearance-none"
                >
                  <option value="ALL">All Tickets</option>
                  <option value="EDITED">Edited</option>
                  <option value="NOT_EDITED">Not Edited</option>
                </select>
              </div>
            </div>
          </div>

          {/* Left Card: Pending */}
          <div className="bg-card rounded-[1.75rem] shadow-[0_24px_70px_rgba(0,74,130,0.14)] border border-line overflow-hidden flex flex-col h-full">
            <div className="px-6 py-5 sm:px-8 sm:py-6 border-b border-line flex justify-between items-center bg-card/90 backdrop-blur-sm">
              <h2 className="text-2xl font-bold leading-tight text-ink">Pending Tickets</h2>
              <Link
                href="/dashboard/create"
                className="bg-brand hover:bg-brand-dark text-white px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors inline-block"
              >
                Create Ticket
              </Link>
            </div>

            <div className="p-4 sm:p-6 flex-1">
              {pendingTickets.length === 0 ? (
                <div className="py-8 text-muted">
                  No pending tickets found.
                </div>
              ) : (
                <div className="space-y-2">
                  {pendingTickets.map((ticket) => (
                    <div key={ticket.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-surface-soft rounded-lg border border-line">
                      <Link href={`/dashboard/view/${ticket.id}`} className="flex-1 min-w-0 hover:opacity-80 transition-opacity">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-base text-ink hover:text-brand transition-colors truncate">{ticket.event_name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                          {ticket.updated_at && <span className="text-[10px] text-muted italic font-normal shrink-0">Edited {new Date(ticket.updated_at).toLocaleDateString()}</span>}
                        </div>
                        <p className="text-xs text-muted mt-1">Date: {ticket.date}</p>
                      </Link>
                      <div className="flex items-center gap-4 shrink-0 justify-end min-w-[110px]">
                        <div className="w-10 text-right">
                          {!['ACCEPTED', 'APPROVED', 'DENIED', 'REJECTED'].includes(ticket.status.toUpperCase()) && (
                            <Link href={`/dashboard/edit/${ticket.id}`} className="text-muted hover:text-ink text-xs font-bold uppercase tracking-wider transition-colors">
                              Edit
                            </Link>
                          )}
                        </div>
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
          <div className="bg-card rounded-[1.75rem] shadow-[0_24px_70px_rgba(0,74,130,0.14)] border border-line overflow-hidden flex flex-col h-full">
            <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-line flex justify-between items-center bg-card/90 backdrop-blur-sm">
              <h2 className="text-2xl font-bold leading-tight text-ink">Processed Tickets</h2>
            </div>

            <div className="p-4 sm:p-6 flex-1">
              {processedTickets.length === 0 ? (
                <div className="py-8 text-muted">
                  No processed tickets found.
                </div>
              ) : (
                <div className="space-y-2">
                  {processedTickets.map((ticket) => (
                    <div key={ticket.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-surface-soft rounded-lg border border-line">
                      <Link href={`/dashboard/view/${ticket.id}`} className="flex-1 min-w-0 hover:opacity-80 transition-opacity">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-bold text-base text-ink hover:text-brand transition-colors truncate">{ticket.event_name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                          {ticket.updated_at && <span className="text-[10px] text-muted italic font-normal shrink-0">Edited {new Date(ticket.updated_at).toLocaleDateString()}</span>}
                        </div>
                        <p className="text-xs text-muted mt-1">Date: {ticket.date}</p>
                      </Link>
                      <div className="flex items-center gap-4 shrink-0 justify-end min-w-[110px]">
                        <div className="w-10 text-right">
                          {!['ACCEPTED', 'APPROVED', 'DENIED', 'REJECTED'].includes(ticket.status.toUpperCase()) && (
                            <Link href={`/dashboard/edit/${ticket.id}`} className="text-muted hover:text-ink text-xs font-bold uppercase tracking-wider transition-colors">
                              Edit
                            </Link>
                          )}
                        </div>
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
    <LandingFooter />
    </>
  );
}
