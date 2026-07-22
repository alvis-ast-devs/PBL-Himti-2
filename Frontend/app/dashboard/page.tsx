"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [tickets, setTickets] = useState<{id: number, event_name: string, status: string, date: string}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage for mockup
    const defaultTickets = [
      { id: 1, event_name: "Annual Music Fest", status: "PENDING", date: "2026-08-15" },
      { id: 2, event_name: "Tech Conference", status: "ACCEPTED", date: "2026-09-10" },
      { id: 3, event_name: "Gaming Tournament", status: "DENIED", date: "2026-10-01" },
      { id: 4, event_name: "Art Exhibition", status: "REVISION", date: "2026-11-20" },
    ];
    
    const stored = localStorage.getItem("mock_tickets");
    if (stored) {
      setTickets(JSON.parse(stored));
    } else {
      setTickets(defaultTickets);
      localStorage.setItem("mock_tickets", JSON.stringify(defaultTickets));
    }
    setLoading(false);
  }, []);

  const handleDelete = (id: number) => {
    const updated = tickets.filter(t => t.id !== id);
    setTickets(updated);
    localStorage.setItem("mock_tickets", JSON.stringify(updated));
  };

  if (loading) return null; // Prevent hydration mismatch

  const pendingTickets = tickets.filter(t => t.status.toUpperCase() === "PENDING");
  const processedTickets = tickets.filter(t => t.status.toUpperCase() !== "PENDING");

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
        className="w-full h-90 flex items-center justify-center relative"
        style={{ backgroundImage: "url('https://img.magnific.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg?semt=ais_hybrid&w=740&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <h1 className="relative z-10 text-4xl sm:text-5xl font-bold uppercase tracking-wide">TICKETS</h1>
      </div>

      {/* Main Content Card (Connector) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-18 relative z-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Card: Pending */}
          <div className="bg-neutral-800 rounded-xl shadow-2xl border border-neutral-700 overflow-hidden flex flex-col h-full">
            <div className="p-4 sm:p-5 border-b border-neutral-700 flex justify-between items-center bg-neutral-800/80 backdrop-blur-sm">
              <h2 className="text-xl font-semibold uppercase tracking-wide">Pending Tickets</h2>
              <Link 
                href="/dashboard/create"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors inline-block"
              >
                Create Ticket
              </Link>
            </div>

            <div className="p-4 flex-1">
              {pendingTickets.length === 0 ? (
                <div className="text-center py-8 text-neutral-400">
                  No pending tickets found.
                </div>
              ) : (
                <div className="space-y-2">
                  {pendingTickets.map((ticket) => (
                    <div key={ticket.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-neutral-900 rounded-lg border border-neutral-700">
                      <Link href={`/dashboard/view/${ticket.id}`} className="block hover:opacity-80 transition-opacity">
                        <h3 className="font-medium text-base hover:text-blue-400 transition-colors">{ticket.event_name}</h3>
                        <p className="text-xs text-neutral-400">Date: {ticket.date}</p>
                      </Link>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <Link href={`/dashboard/edit/${ticket.id}`} className="text-neutral-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors">
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(ticket.id)}
                          className="text-red-400 hover:text-red-300 text-xs font-semibold uppercase tracking-wider transition-colors"
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
          <div className="bg-neutral-800 rounded-xl shadow-2xl border border-neutral-700 overflow-hidden flex flex-col h-full">
            <div className="p-4 sm:p-5 border-b border-neutral-700 flex justify-between items-center bg-neutral-800/80 backdrop-blur-sm">
              <h2 className="text-xl font-semibold uppercase tracking-wide">Processed Tickets</h2>
            </div>

            <div className="p-4 flex-1">
              {processedTickets.length === 0 ? (
                <div className="text-center py-8 text-neutral-400">
                  No processed tickets found.
                </div>
              ) : (
                <div className="space-y-2">
                  {processedTickets.map((ticket) => (
                    <div key={ticket.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-neutral-900 rounded-lg border border-neutral-700">
                      <div>
                        <h3 className="font-medium text-base">{ticket.event_name}</h3>
                        <p className="text-xs text-neutral-400">Date: {ticket.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <Link href={`/dashboard/view/${ticket.id}`} className="text-blue-400 hover:text-blue-300 text-xs font-semibold uppercase tracking-wider transition-colors">
                          View
                        </Link>
                        <Link href={`/dashboard/edit/${ticket.id}`} className="text-neutral-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors">
                          Edit
                        </Link>
                        <button 
                          onClick={() => handleDelete(ticket.id)}
                          className="text-red-400 hover:text-red-300 text-xs font-semibold uppercase tracking-wider transition-colors"
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
