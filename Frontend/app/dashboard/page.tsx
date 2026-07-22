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
      { id: 2, event_name: "Tech Conference", status: "APPROVED", date: "2026-09-10" },
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-18 relative z-20">
        <div className="bg-neutral-800 rounded-xl shadow-2xl border border-neutral-700 overflow-hidden">
          
          <div className="p-4 sm:p-5 border-b border-neutral-700 flex justify-between items-center bg-neutral-800/80 backdrop-blur-sm">
            <h2 className="text-xl font-semibold uppercase tracking-wide">Your Tickets</h2>
            <Link 
              href="/dashboard/create"
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors inline-block"
            >
              Create Ticket
            </Link>
          </div>

          <div className="p-4">
            {tickets.length === 0 ? (
              <div className="text-center py-8 text-neutral-400">
                No tickets found. Create one to get started.
              </div>
            ) : (
              <div className="space-y-2">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-3 bg-neutral-900 rounded-lg border border-neutral-700">
                    <div>
                      <h3 className="font-medium text-base">{ticket.event_name}</h3>
                      <p className="text-xs text-neutral-400">Date: {ticket.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        ticket.status === 'APPROVED' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {ticket.status}
                      </span>
                      <button className="text-neutral-400 hover:text-white text-xs font-semibold uppercase tracking-wider transition-colors">
                        Edit
                      </button>
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
    </main>
  );
}
