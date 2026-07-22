"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateTicket() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    event_name: "",
    location: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_name: formData.event_name,
          location: formData.location,
          description: formData.description,
          date: new Date().toISOString()
        })
      });
      if (res.ok) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-900 text-white relative">
      {/* Hero Section with Image Background */}
      <div 
        className="w-full h-90 flex items-center justify-center relative"
        style={{ backgroundImage: "url('https://img.magnific.com/free-vector/stylish-glowing-digital-red-lines-banner_1017-23964.jpg?semt=ais_hybrid&w=740&q=80')" }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <h1 className="relative z-10 text-4xl sm:text-5xl font-bold uppercase tracking-wide">CREATE TICKET</h1>
      </div>

      {/* Main Content Card (Connector) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-18 relative z-20 pb-12">
        <div className="bg-neutral-800 rounded-xl shadow-2xl border border-neutral-700 overflow-hidden">
          
          <div className="p-4 sm:px-6 sm:py-4 border-b border-neutral-700 flex justify-between items-center bg-neutral-800/80 backdrop-blur-sm">
            <Link href="/dashboard" className="text-neutral-400 hover:text-white transition-colors text-sm font-semibold uppercase tracking-wider">
              Click here to go back
            </Link>
          </div>

          <div className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Title</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. DewaWeb Partnership"
                  value={formData.event_name}
                  onChange={e => setFormData({...formData, event_name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Media</label>
                <input 
                  type="text" 
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="e.g. Instagram"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Description</label>
                <textarea 
                  rows={4}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  placeholder="Brief details about the partnership..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">File Upload (Proposal/Evidence)</label>
                <div className="w-full bg-neutral-900 border border-neutral-700 border-dashed rounded-lg px-4 py-8 text-center text-neutral-500 text-sm">
                  Click to upload or drag and drop<br/>
                  <span className="text-xs mt-1 block">(File upload placeholder)</span>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </main>
  );
}
