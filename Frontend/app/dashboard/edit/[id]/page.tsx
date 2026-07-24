"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function EditTicket({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  
  const [formData, setFormData] = useState({
    event_name: "",
    location: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/applications/${unwrappedParams.id}`);
        const json = await res.json();
        if (json.success && json.data) {
          const restricted = ['ACCEPTED', 'APPROVED', 'DENIED', 'REJECTED'];
          if (restricted.includes(json.data.status.toUpperCase())) {
            alert("Ticket cannot be edited anymore.");
            router.push('/dashboard');
            return;
          }
          
          setFormData({
            event_name: json.data.event_name || "",
            location: json.data.location || "",
            description: json.data.description || "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/applications/${unwrappedParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return null;

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen bg-brand-pale text-ink relative">
        {/* Hero Section */}
        <div className="w-full flex items-center relative pt-16 pb-28 sm:pt-20 sm:pb-32 lg:pt-24 lg:pb-36">
          <div className="absolute inset-0 bg-brand-dark"></div>
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">Edit Ticket</h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-18 relative z-20 pb-12">
        <div className="bg-card rounded-lg shadow-[0_24px_70px_rgba(0,74,130,0.14)] border border-line overflow-hidden">
          
          <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-line flex justify-between items-center bg-card/90 backdrop-blur-sm">
            <Link href="/dashboard" className="text-muted hover:text-ink transition-colors text-sm font-bold uppercase tracking-wider">
              ← Back to Dashboard
            </Link>
          </div>

          <div className="p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted">Title</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-surface-soft border border-line rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                  placeholder="e.g. DewaWeb Partnership"
                  value={formData.event_name}
                  onChange={e => setFormData({...formData, event_name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted">Media</label>
                <input 
                  type="text" 
                  className="w-full bg-surface-soft border border-line rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-brand transition-colors"
                  placeholder="e.g. Instagram"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted">Description</label>
                <textarea 
                  rows={4}
                  className="w-full bg-surface-soft border border-line rounded-lg px-4 py-2.5 text-sm text-ink focus:outline-none focus:border-brand transition-colors resize-none"
                  placeholder="Brief details about the partnership..."
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted">File Upload (Proposal/Evidence)</label>
                <div className="w-full bg-surface-soft border border-line border-dashed rounded-lg px-4 py-8 text-center text-muted text-sm">
                  Click to upload or drag and drop<br/>
                  <span className="text-xs mt-1 block">(File upload placeholder)</span>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-brand hover:bg-brand-dark text-white px-4 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors"
                >
                  Update Ticket
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </main>
    <LandingFooter />
    </>
  );
}
