"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/applications");
        const json = await res.json();
        if (json.success && json.data) {
          setTickets(json.data);
        }
      } catch (err) {
        console.error("Gagal mengambil data tiket:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const getStatusStyle = (status: string) => {
    const s = status.toUpperCase();
    if (s === 'ACCEPTED' || s === 'APPROVED') return 'bg-green-100 text-green-800 border-green-200';
    if (s === 'DENIED' || s === 'REJECTED') return 'bg-red-100 text-red-800 border-red-200';
    if (s === 'REVISION') return 'bg-orange-100 text-orange-800 border-orange-200';
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const pendingTickets = tickets.filter(t => t.status.toUpperCase() === 'PENDING');
  const processedTickets = tickets.filter(t => t.status.toUpperCase() !== 'PENDING');

  // Komponen Tabel disesuaikan agar lebih ringkas untuk layout bersebelahan
  const TicketTable = ({ data, emptyMessage, isPending }: { data: any[], emptyMessage: string, isPending: boolean }) => (
    <div className="overflow-x-auto custom-scrollbar">
      {data.length === 0 ? (
        <div className="p-10 text-center text-muted">{emptyMessage}</div>
      ) : (
        <table className="w-full text-left border-collapse min-w-[450px]">
          <thead>
            <tr className="border-b border-line bg-surface-soft/30 text-xs uppercase tracking-wider text-muted">
              <th className="px-5 py-3 font-bold whitespace-nowrap">Event Details</th>
              <th className="px-5 py-3 font-bold whitespace-nowrap">Date</th>
              <th className="px-5 py-3 font-bold whitespace-nowrap">Status</th>
              <th className="px-5 py-3 font-bold text-right whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {data.map((ticket) => (
              <tr key={ticket.id} className="transition-colors hover:bg-brand-pale/50">
                <td className="px-5 py-4">
                  <div className="text-xs font-bold text-muted mb-1">#{ticket.id}</div>
                  <div className="text-sm font-semibold text-ink line-clamp-2">{ticket.event_name}</div>
                </td>
                <td className="px-5 py-4 text-sm text-muted whitespace-nowrap">
                  {new Date(ticket.date).toLocaleDateString()}
                </td>
                <td className="px-5 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusStyle(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <Link 
                    href={`/admin/view/${ticket.id}`}
                    className="inline-flex items-center justify-center rounded-lg border border-brand px-4 py-2 text-xs font-semibold text-brand transition-colors hover:bg-brand-pale focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    {isPending ? 'Review' : 'View'}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <main className="min-h-screen bg-background text-ink pb-16">
      <section className="bg-brand-pale py-12 sm:py-16">
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand mb-3">
            Admin Control Panel
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Media Partnership Applications
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
            Kelola semua pengajuan masuk, berikan revisi, dan pantau riwayat keputusan proposal kemitraan.
          </p>
        </div>
      </section>

      {/* 🌟 GRID LAYOUT: Kiri dan Kanan */}
      {/* Menggunakan xl:grid-cols-2 agar bersebelahan di layar lebar */}
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        
        {loading ? (
          <div className="col-span-full rounded-2xl border border-line bg-card p-10 text-center text-muted shadow-sm">
            Memuat data tiket...
          </div>
        ) : (
          <>
            {/* KIRI: PERLU TINJAUAN (PENDING) */}
            <div className="rounded-2xl border border-line bg-card shadow-[0_12px_35px_rgba(0,74,130,0.07)] overflow-hidden h-fit flex flex-col">
              <div className="p-5 sm:p-6 border-b border-line bg-yellow-50/50 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-ink">Perlu Tinjauan</h2>
                  <p className="text-xs text-muted mt-1">Menunggu keputusan Anda.</p>
                </div>
                <span className="inline-flex h-8 items-center justify-center rounded-lg bg-yellow-100 px-3 text-sm font-bold text-yellow-800 shrink-0">
                  {pendingTickets.length} Tiket
                </span>
              </div>
              <TicketTable 
                data={pendingTickets} 
                emptyMessage="Hore! Tidak ada tiket yang perlu direview saat ini." 
                isPending={true}
              />
            </div>

            {/* KANAN: RIWAYAT KEPUTUSAN (PROCESSED) */}
            <div className="rounded-2xl border border-line bg-card shadow-[0_12px_35px_rgba(0,74,130,0.07)] overflow-hidden h-fit flex flex-col">
              <div className="p-5 sm:p-6 border-b border-line bg-surface-soft/50 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-ink">Riwayat Keputusan</h2>
                  <p className="text-xs text-muted mt-1">Tiket yang sudah diproses.</p>
                </div>
                <span className="inline-flex h-8 items-center justify-center rounded-lg bg-brand-light px-3 text-sm font-bold text-brand-dark shrink-0">
                  {processedTickets.length} Tiket
                </span>
              </div>
              <TicketTable 
                data={processedTickets} 
                emptyMessage="Belum ada riwayat keputusan tiket." 
                isPending={false}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}