"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { formatDateOnly } from "@/lib/date";

interface Gallery {
  id: string;
  clientName: string;
  sessionDate: string;
  sessionType: string;
  createdAt: string;
  expiresAt: string;
  photos: { id: string; url: string; filename: string }[];
  coverPhotoId: string | null;
}

function getPin(): string {
  const match = document.cookie
    .split(";")
    .find((c) => c.trim().startsWith("admin_pin="));
  return match?.split("=")[1] || "";
}

function daysUntil(dateStr: string): number {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function StatusBadge({ gallery }: { gallery: Gallery }) {
  const days = daysUntil(gallery.expiresAt);
  if (days <= 0) return <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded-full">Expired</span>;
  if (days <= 14) return <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full">Expires in {days}d</span>;
  return <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">{days}d left</span>;
}

export default function AdminGalleriesPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ clientName: "", sessionDate: "", sessionType: "Family", clientEmail: "", message: "" });
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const fetchGalleries = useCallback(async () => {
    const pin = getPin();
    if (!pin) { router.replace("/admin"); return; }

    const res = await fetch("/api/admin/galleries", {
      headers: { "x-admin-pin": pin },
    });
    if (res.status === 401) { router.replace("/admin"); return; }
    const data = await res.json();
    setGalleries(data.galleries || []);
    setLoading(false);
  }, [router]);

  useEffect(() => { fetchGalleries(); }, [fetchGalleries]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    const pin = getPin();
    const res = await fetch("/api/admin/galleries", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-pin": pin },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const gallery = await res.json();
      setShowCreate(false);
      setForm({ clientName: "", sessionDate: "", sessionType: "Family", clientEmail: "", message: "" });
      router.push(`/admin/galleries/${gallery.id}`);
    }
    setCreating(false);
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete gallery for "${name}"? This removes all photos permanently.`)) return;
    // Snapshot current state so we can roll back if the server delete fails.
    let snapshot: typeof galleries | null = null;
    setGalleries((prev) => { snapshot = prev; return prev.filter((g) => g.id !== id); });
    const pin = getPin();
    try {
      const res = await fetch(`/api/admin/galleries/${id}`, {
        method: "DELETE",
        headers: { "x-admin-pin": pin },
      });
      if (!res.ok) {
        const errText = await res.text();
        alert(`Delete failed (${res.status}). ${errText.slice(0, 200)}`);
        if (snapshot) setGalleries(snapshot);
      }
    } catch (err) {
      alert(`Delete failed: ${err instanceof Error ? err.message : "network error"}`);
      if (snapshot) setGalleries(snapshot);
    }
  }

  async function handleExtend(id: string, days: number) {
    // Update UI immediately
    setGalleries((prev) =>
      prev.map((g) =>
        g.id === id
          ? { ...g, expiresAt: new Date(new Date(g.expiresAt).getTime() + days * 24 * 60 * 60 * 1000).toISOString() }
          : g
      )
    );
    const pin = getPin();
    await fetch(`/api/admin/galleries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-pin": pin },
      body: JSON.stringify({ extendDays: days }),
    });
  }

  function copyLink(id: string) {
    navigator.clipboard.writeText(`https://tovyphotography.com/client-gallery/${id}`);
  }

  const active = galleries.filter((g) => daysUntil(g.expiresAt) > 0);
  const expired = galleries.filter((g) => daysUntil(g.expiresAt) <= 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-charcoal-light">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl text-charcoal">
              Client Galleries
            </h1>
            <p className="text-charcoal-light text-sm mt-1">
              {active.length} active {active.length === 1 ? "gallery" : "galleries"}
            </p>
          </div>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="px-5 py-2.5 bg-sage text-white text-sm font-medium uppercase tracking-wider hover:bg-sage-dark transition-colors"
          >
            + New Gallery
          </button>
        </div>

        {/* Create Form */}
        {showCreate && (
          <form onSubmit={handleCreate} className="bg-white p-6 mb-8 border border-charcoal/10 space-y-4">
            <h2 className="font-[family-name:var(--font-cormorant)] text-xl text-charcoal mb-2">New Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  className="w-full px-3 py-2 border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-sage text-sm"
                  placeholder="Smith Family"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1">Client Email <span className="normal-case text-charcoal-light/60">(optional)</span></label>
                <input
                  type="email"
                  value={form.clientEmail}
                  onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-sage text-sm"
                  placeholder="client@email.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1">Session Date</label>
                <input
                  type="date"
                  required
                  value={form.sessionDate}
                  onChange={(e) => setForm({ ...form, sessionDate: e.target.value })}
                  className="w-full px-3 py-2 border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-sage text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1">Session Type</label>
                <select
                  value={form.sessionType}
                  onChange={(e) => setForm({ ...form, sessionType: e.target.value })}
                  className="w-full px-3 py-2 border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-sage text-sm"
                >
                  <option>Family</option>
                  <option>Newborn</option>
                  <option>Milestone</option>
                  <option>Event</option>
                  <option>Mini</option>
                  <option>Maternity</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1">Personal Message <span className="normal-case text-charcoal-light/60">(optional — shown on gallery page)</span></label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-3 py-2 border border-charcoal/20 bg-white text-charcoal focus:outline-none focus:border-sage text-sm"
                placeholder="It was such a joy photographing your family..."
                rows={2}
              />
            </div>
            <p className="text-xs text-charcoal-light">Gallery will expire in 90 days. You can extend anytime.</p>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={creating}
                className="px-5 py-2 bg-sage text-white text-sm font-medium uppercase tracking-wider hover:bg-sage-dark transition-colors disabled:opacity-50"
              >
                {creating ? "Creating..." : "Create Gallery"}
              </button>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                className="px-5 py-2 border border-charcoal/20 text-charcoal-light text-sm hover:border-charcoal/40 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Active Galleries */}
        {active.length === 0 && !showCreate && (
          <div className="text-center py-16">
            <p className="text-charcoal-light mb-4">No galleries yet</p>
            <button
              onClick={() => setShowCreate(true)}
              className="text-sage hover:text-sage-dark text-sm font-medium uppercase tracking-wider"
            >
              Create your first gallery
            </button>
          </div>
        )}

        <div className="space-y-4">
          {active.map((g) => (
            <div key={g.id} className="bg-white border border-charcoal/10 p-5 flex flex-col md:flex-row md:items-center gap-4">
              {/* Thumbnail */}
              <div className="w-16 h-16 bg-cream flex-shrink-0 overflow-hidden">
                {g.photos.length > 0 ? (
                  <img
                    src={(g.photos.find((p) => p.id === g.coverPhotoId) || g.photos[0]).url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-charcoal-light text-xs">
                    No photos
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-medium text-charcoal">{g.clientName}</h3>
                  <StatusBadge gallery={g} />
                </div>
                <p className="text-xs text-charcoal-light mt-0.5">
                  {g.sessionType} &middot; {formatDateOnly(g.sessionDate)} &middot; {g.photos.length} photos
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                <button
                  onClick={() => copyLink(g.id)}
                  className="px-3 py-1.5 text-xs border border-charcoal/20 text-charcoal-light hover:bg-charcoal hover:text-white transition-colors"
                  title="Copy client link"
                >
                  Copy Link
                </button>
                <Link
                  href={`/admin/galleries/${g.id}`}
                  className="px-3 py-1.5 text-xs bg-sage text-white hover:bg-sage-dark transition-colors"
                >
                  Manage
                </Link>
                <button
                  onClick={() => handleExtend(g.id, -30)}
                  className="px-3 py-1.5 text-xs border border-charcoal/20 text-charcoal-light hover:border-amber-500 hover:text-amber-600 transition-colors"
                  title="Shorten 30 days"
                >
                  −30d
                </button>
                <button
                  onClick={() => handleExtend(g.id, 30)}
                  className="px-3 py-1.5 text-xs border border-charcoal/20 text-charcoal-light hover:border-sage hover:text-sage transition-colors"
                  title="Extend 30 days"
                >
                  +30d
                </button>
                <button
                  onClick={() => handleDelete(g.id, g.clientName)}
                  className="px-3 py-1.5 text-xs border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Expired section */}
        {expired.length > 0 && (
          <div className="mt-12">
            <h2 className="font-[family-name:var(--font-cormorant)] text-xl text-charcoal-light mb-4">
              Expired ({expired.length})
            </h2>
            <div className="space-y-3 opacity-60">
              {expired.map((g) => (
                <div key={g.id} className="bg-white border border-charcoal/10 p-4 flex flex-col md:flex-row md:items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-charcoal">{g.clientName}</span>
                      <StatusBadge gallery={g} />
                    </div>
                    <p className="text-xs text-charcoal-light">
                      {g.sessionType} &middot; {g.photos.length} photos &middot; Expired {new Date(g.expiresAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleExtend(g.id, 30)}
                      className="px-3 py-1.5 text-xs border border-sage text-sage hover:bg-sage hover:text-white transition-colors"
                    >
                      Reactivate (+30d)
                    </button>
                    <button
                      onClick={() => handleDelete(g.id, g.clientName)}
                      className="px-3 py-1.5 text-xs border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Logout */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              document.cookie = "admin_pin=; path=/; max-age=0";
              router.replace("/admin");
            }}
            className="text-xs text-charcoal-light hover:text-charcoal uppercase tracking-wider"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
