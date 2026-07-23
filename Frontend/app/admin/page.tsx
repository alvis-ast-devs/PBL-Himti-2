"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [tickets, setTickets] = useState<{id: number, event_name: string, status: string, date: string}[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      // Pastikan port sesuai dengan backend-mu (tadi di backend kita pakai 3000, tapi di kode temanmu 5000. Sesuaikan ya!)
      const res = await fetch("http://localhost:5000/api/applications");
      const json = await res.json();
      if (json.success) {
        const mapped = json.data.map((t: any) => ({
          ...t,
          date: t.date ? new Date(t.date).toISOString().split('T')[0] : "N/A",
          status: t.status || "PENDING" // Default jika kosong
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
    if(!confirm("Yakin ingin menghapus tiket ini secara permanen?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTickets(tickets.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🌟 FITUR BARU KHUSUS ADMIN: Update Status Cepat
  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${id}`, { 
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        // Update tampilan langsung tanpa perlu refresh
        setTickets(tickets.map(t => t.id === id ? { ...t, status: newStatus } : t));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return null;

  const pendingTickets = tickets.filter(t => t.status.toUpperCase() === "PENDING");
  const processedTickets = tickets.filter(t => t.status.toUpperCase() !== "PENDING");

  const getStatusColor = (status: string) => {
    const s = status.toUpperCase();
    if (s === 'ACCEPTED' || s === 'APPROVED') return 'bg-green-500/20 text-green-400';
    if (s === 'DENIED' || s === 'REJECTED') return 'bg-red-500/20 text-red-400';
    if (s === 'REVISION') return 'bg-orange-500/20 text-orange-400';
    return 'bg-yellow-500/20 text-yellow-400';
  };

  return (
    <main className="min-h-screen bg-neutral-900 text-white relative">
      
      {/* 🌟 INDIKATOR ADMIN (Badge di pojok kiri atas) */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-red-400">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
        <span className="text-xs font-bold uppercase tracking-widest">Admin Mode</span>
      </div>

      {/* Hero Section */}
      <div 
        className="w-full h-90 flex flex-col items-center justify-center relative"
        style={{ backgroundImage: "url('https://img.magnific.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg?semt=ais_hybrid&w=740&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        <h1 className="relative z-10 text-4xl sm:text-5xl font-bold uppercase tracking-wide text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
          CONTROL PANEL
        </h1>
        <p className="relative z-10 mt-2 text-neutral-400 tracking-widest text-sm">Manage All Applications</p>
      </div>

      {/* Main Content Card */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-18 relative z-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Card: Pending (Antrean untuk Admin) */}
          <div className="bg-neutral-800 rounded-xl shadow-2xl border border-red-900/50 overflow-hidden flex flex-col h-full">
            <div className="p-4 sm:p-5 border-b border-neutral-700 flex justify-between items-center bg-neutral-800/80 backdrop-blur-sm">
              <h2 className="text-xl font-semibold uppercase tracking-wide flex items-center gap-2">
                Action Required <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{pendingTickets.length}</span>
              </h2>
            </div>

            <div className="p-4 flex-1">
              {pendingTickets.length === 0 ? (
                <div className="text-center py-8 text-neutral-400">
                  All clear! No pending tickets.
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingTickets.map((ticket) => (
                    <div key={ticket.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-neutral-900/80 rounded-lg border border-neutral-700 hover:border-neutral-500 transition-colors">
                      <Link href={`/admin/view/${ticket.id}`} className="block flex-1">
                        <h3 className="font-medium text-base hover:text-blue-400 transition-colors">{ticket.event_name}</h3>
                        <p className="text-xs text-neutral-400 mt-1">Submitted: {ticket.date}</p>
                      </Link>
                      
                      {/* 🌟 TOMBOL AKSI KHUSUS ADMIN */}
                      <div className="flex items-center gap-2 bg-neutral-950 p-1.5 rounded-lg border border-neutral-800">
                        <button 
                          onClick={() => handleUpdateStatus(ticket.id, 'APPROVED')}
                          className="bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(ticket.id, 'REJECTED')}
                          className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Card: Processed (History) */}
          <div className="bg-neutral-800 rounded-xl shadow-2xl border border-neutral-700 overflow-hidden flex flex-col h-full">
            <div className="p-4 sm:p-5 border-b border-neutral-700 flex justify-between items-center bg-neutral-800/80 backdrop-blur-sm">
              <h2 className="text-xl font-semibold uppercase tracking-wide">Decision History</h2>
            </div>

            <div className="p-4 flex-1">
              {processedTickets.length === 0 ? (
                <div className="text-center py-8 text-neutral-400">
                  No processed tickets found.
                </div>
              ) : (
                <div className="space-y-2">
                  {processedTickets.map((ticket) => (
                    <div key={ticket.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-neutral-900 rounded-lg border border-neutral-700 opacity-80 hover:opacity-100 transition-opacity">
                      <div>
                        <h3 className="font-medium text-base">{ticket.event_name}</h3>
                        <p className="text-xs text-neutral-400">Date: {ticket.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <Link href={`/admin/view/${ticket.id}`} className="text-blue-400 hover:text-blue-300 text-xs font-semibold uppercase tracking-wider transition-colors">
                          View
                        </Link>
                        <button 
                          onClick={() => handleDelete(ticket.id)}
                          className="text-neutral-500 hover:text-red-400 text-xs font-semibold uppercase tracking-wider transition-colors"
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