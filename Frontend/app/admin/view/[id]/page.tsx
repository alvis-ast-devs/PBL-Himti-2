"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminViewTicket({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const router = useRouter();
  const [ticket, setTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // State khusus Admin
  const [adminNotes, setAdminNotes] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [unwrappedParams.id]);

  // Fungsi khusus Admin untuk memproses tiket beserta catatan
  const handleProcessTicket = async (newStatus: string) => {
    if (!confirm(`Anda yakin ingin menandai tiket ini sebagai ${newStatus}?`)) return;
    
    setIsUpdating(true);
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${unwrappedParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          status: newStatus,
          // Di dunia nyata, adminNotes ini akan disimpan di tabel terpisah (misal: tabel Comments)
          // Untuk saat ini kita log saja sebagai contoh
        })
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
      <main className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        <h1 className="text-2xl font-bold">Ticket Not Found</h1>
      </main>
    );
  }

  const getStatusColor = (status: string) => {
    const s = status.toUpperCase();
    if (s === 'ACCEPTED' || s === 'APPROVED') return 'bg-green-500/20 text-green-400 border-green-500/50';
    if (s === 'DENIED' || s === 'REJECTED') return 'bg-red-500/20 text-red-400 border-red-500/50';
    if (s === 'REVISION') return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
    return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
  };

  return (
    <main className="min-h-screen bg-neutral-900 text-white relative pb-12">
      {/* 🌟 INDIKATOR ADMIN */}
      <div className="absolute top-6 left-6 z-50 flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)] border border-red-400">
        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
        <span className="text-xs font-bold uppercase tracking-widest">Admin Review Mode</span>
      </div>

      <div 
        className="w-full h-72 flex items-center justify-center relative "
        style={{ backgroundImage: "url('https://img.magnific.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg?semt=ais_hybrid&w=740&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        <h1 className="relative z-10 text-3xl sm:text-4xl font-bold uppercase tracking-wide text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">
          TICKET REVIEW
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 flex flex-col lg:flex-row gap-6">
        
        {/* KIRI: Detail Tiket (Data Asli dari User) */}
        <div className="flex-1 bg-neutral-800 rounded-xl shadow-2xl border border-neutral-700 overflow-hidden h-fit">
          <div className="p-4 sm:px-6 sm:py-4 border-b border-neutral-700 flex justify-between items-center bg-neutral-800/80">
            <Link href="/admin" className="text-neutral-400 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider">
              ← Back to Control Panel
            </Link>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(ticket.status)}`}>
              Current: {ticket.status}
            </span>
          </div>

          <div className="p-4 sm:p-6 space-y-6">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Event / Title</h3>
              <p className="text-xl font-medium text-white">{ticket.event_name}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Submission Date</h3>
                <p className="text-sm text-white">{ticket.date}</p>
              </div>
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Media / Location</h3>
                <p className="text-sm text-white">{ticket.location || "N/A"}</p>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">Proposal Description</h3>
              <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-700 text-sm text-neutral-300 min-h-[120px]">
                {ticket.description || "No description provided."}
              </div>
            </div>
          </div>
        </div>

        {/* KANAN: Panel Keputusan Admin */}
        <div className="w-full lg:w-96 bg-neutral-900 rounded-xl shadow-2xl border border-red-900/50 overflow-hidden h-fit flex flex-col">
          <div className="p-4 border-b border-neutral-800 bg-neutral-950">
            <h2 className="text-sm font-bold uppercase tracking-widest text-red-400">Admin Decision Panel</h2>
          </div>
          
          <div className="p-5 space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Review Notes (Feedback)</label>
              <textarea 
                rows={4}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Tulis alasan penolakan, persetujuan, atau instruksi revisi di sini..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors resize-none"
              ></textarea>
            </div>

            <div className="space-y-3 pt-2">
              <button 
                onClick={() => handleProcessTicket('APPROVED')}
                disabled={isUpdating}
                className="w-full bg-green-600/20 hover:bg-green-600 text-green-500 hover:text-white border border-green-600/50 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-50"
              >
                Approve Ticket
              </button>
              
              <button 
                onClick={() => handleProcessTicket('REVISION')}
                disabled={isUpdating}
                className="w-full bg-orange-600/20 hover:bg-orange-600 text-orange-500 hover:text-white border border-orange-600/50 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-50"
              >
                Request Revision
              </button>

              <button 
                onClick={() => handleProcessTicket('REJECTED')}
                disabled={isUpdating}
                className="w-full bg-red-600/20 hover:bg-red-600 text-red-500 hover:text-white border border-red-600/50 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-50"
              >
                Reject Ticket
              </button>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}