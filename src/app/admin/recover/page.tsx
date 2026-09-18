"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function getPin(): string {
  const match = document.cookie.split(";").find((c) => c.trim().startsWith("admin_pin="));
  return match?.split("=")[1] || "";
}

interface Snapshot {
  url: string;
  pathname: string;
  uploadedAt: string;
  galleryCount?: number;
  summary?: { id: string; clientName: string; photoCount: number }[];
  error?: string;
}

interface Response {
  currentPointer: string | null;
  snapshotCount: number;
  snapshots: Snapshot[];
}

interface DiscoveredGallery {
  id: string;
  photoCount: number;
  clientName: string;
  sessionType: string;
  sessionDate: string;
  clientEmail: string;
  message: string;
  include: boolean;
}

export default function RecoverPage() {
  const [data, setData] = useState<Response | null>(null);
  const [loading, setLoading] = useState(true);
  const [restoring, setRestoring] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [discovered, setDiscovered] = useState<DiscoveredGallery[] | null>(null);
  const [scanning, setScanning] = useState(false);
  const [rebuilding, setRebuilding] = useState(false);
  const router = useRouter();

  async function load() {
    const pin = getPin();
    if (!pin) { router.replace("/admin"); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/admin/recover-meta", { headers: { "x-admin-pin": pin } });
      if (res.status === 401) { router.replace("/admin"); return; }
      const body = await res.json();
      setData(body);
    } catch (err) {
      setMessage(`Failed to load: ${err instanceof Error ? err.message : "error"}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function restore(url: string, galleryCount: number) {
    if (!confirm(`Restore this snapshot with ${galleryCount} galleries as the active metadata? This overwrites the current gallery list.`)) return;
    const pin = getPin();
    setRestoring(url);
    setMessage("");
    try {
      const res = await fetch("/api/admin/recover-meta", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-pin": pin },
        body: JSON.stringify({ restoreFromUrl: url }),
      });
      const body = await res.json();
      if (res.ok) {
        setMessage(`Restored. Gallery list now has ${body.galleryCount} galleries. Go to /admin/galleries.`);
        await load();
      } else {
        setMessage(`Restore failed: ${body.error || res.status}`);
      }
    } catch (err) {
      setMessage(`Restore failed: ${err instanceof Error ? err.message : "error"}`);
    } finally {
      setRestoring(null);
    }
  }

  async function scanBlobs() {
    const pin = getPin();
    setScanning(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/recover-meta", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-pin": pin },
        body: JSON.stringify({ action: "scan-blobs" }),
      });
      const body = await res.json();
      if (res.ok) {
        const today = new Date().toISOString().slice(0, 10);
        setDiscovered(body.galleries.map((g: { id: string; photoCount: number }) => ({
          id: g.id,
          photoCount: g.photoCount,
          clientName: "",
          sessionType: "Family",
          sessionDate: today,
          clientEmail: "",
          message: "",
          include: true,
        })));
      } else {
        setMessage(`Scan failed: ${body.error || res.status}`);
      }
    } catch (err) {
      setMessage(`Scan failed: ${err instanceof Error ? err.message : "error"}`);
    } finally {
      setScanning(false);
    }
  }

  function updateDiscovered(id: string, patch: Partial<DiscoveredGallery>) {
    setDiscovered((prev) => prev?.map((g) => (g.id === id ? { ...g, ...patch } : g)) ?? null);
  }

  async function rebuildFromDiscovered() {
    if (!discovered) { alert("Nothing to rebuild — click Scan blob storage first."); return; }
    // Any gallery that's checked gets rebuilt. Empty client names get a
    // placeholder so the user isn't blocked; they can rename in admin later.
    const payload = discovered.filter((g) => g.include).map((g) => ({
      ...g,
      clientName: g.clientName.trim() || `Recovered gallery ${g.id}`,
    }));
    if (!payload.length) { alert("Check the box next to at least one gallery to rebuild."); return; }
    if (!confirm(`Rebuild ${payload.length} galleries? This writes new metadata pointing at the photos already in blob storage.`)) return;
    const pin = getPin();
    setRebuilding(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/recover-meta", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-pin": pin },
        body: JSON.stringify({
          action: "rebuild-from-blobs",
          galleries: payload.map((g) => ({
            id: g.id,
            clientName: g.clientName.trim(),
            sessionType: g.sessionType,
            sessionDate: g.sessionDate,
            clientEmail: g.clientEmail.trim() || undefined,
            message: g.message.trim() || undefined,
          })),
        }),
      });
      const body = await res.json();
      if (res.ok) {
        setMessage(`Rebuilt ${body.rebuilt} galleries with ${body.totalPhotos} photos total. Go to /admin/galleries.`);
        await load();
      } else {
        setMessage(`Rebuild failed: ${body.error || res.status}`);
      }
    } catch (err) {
      setMessage(`Rebuild failed: ${err instanceof Error ? err.message : "error"}`);
    } finally {
      setRebuilding(false);
    }
  }

  async function cleanDuplicates(galleryId: string, dryRun: boolean) {
    if (!galleryId.trim()) { alert("Enter a gallery id."); return; }
    const pin = getPin();
    try {
      const res = await fetch("/api/admin/recover-meta", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-pin": pin },
        body: JSON.stringify({
          action: dryRun ? "preview-rebuilt-duplicates" : "clean-rebuilt-duplicates",
          galleryId: galleryId.trim(),
        }),
      });
      const body = await res.json();
      if (!res.ok) { alert(`Failed: ${body.error || res.status}`); return; }
      if (dryRun) {
        alert(
          `Preview for ${galleryId}:\n` +
          `Total photos: ${body.totalPhotos}\n` +
          `Would delete (rebuilt duplicates): ${body.wouldDelete}\n` +
          `Would keep (real filenames): ${body.wouldKeep}\n\n` +
          `Sample of what would be deleted:\n${body.deleteSampleFilenames.join("\n") || "(none)"}\n\n` +
          `Sample of what would be kept:\n${body.keepSampleFilenames.join("\n") || "(none)"}`
        );
      } else {
        alert(`Deleted ${body.deleted} rebuilt duplicates. ${body.kept} photos remain in ${galleryId}.`);
      }
    } catch (err) {
      alert(`Failed: ${err instanceof Error ? err.message : "error"}`);
    }
  }

  return (
    <div className="min-h-screen bg-cream p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-medium mb-2">Metadata Recovery</h1>
        <p className="text-charcoal-light text-sm mb-6">Newest snapshots at top. The one currently in use is marked with (current). If no snapshot has your data, use the &ldquo;Rebuild from blob storage&rdquo; section below.</p>

        {message && (
          <div className="mb-4 p-3 border border-sage/40 bg-sage/10 text-sm">{message}</div>
        )}

        {loading && <p>Loading snapshots...</p>}

        {data && data.snapshots.length === 0 && (
          <p className="text-rose-800">No metadata snapshots found. Only route left is rebuilding by scanning blob storage.</p>
        )}

        {/* Clean rebuilt duplicates */}
        <div className="mt-4 mb-4 border border-charcoal/20 p-5 bg-white">
          <h2 className="text-lg font-medium mb-2">Clean up rebuilt duplicates</h2>
          <p className="text-sm text-charcoal-light mb-3">
            If you rebuilt a gallery from blob storage and then re-uploaded the same photos, you now have both copies. This removes just the &ldquo;rebuilt&rdquo; ones (filenames that look like blob IDs, e.g. <code>abcd1234.jpg</code>) and keeps only the real camera filenames (like <code>IMG_1234.jpg</code>).
          </p>
          <div className="flex items-center gap-2">
            <input
              id="cleanup-gallery-id"
              placeholder="Gallery id (e.g. 2wawjcbu)"
              defaultValue="2wawjcbu"
              className="border border-charcoal/20 px-2 py-1.5 text-sm font-mono flex-1 max-w-xs"
            />
            <button
              onClick={() => {
                const el = document.getElementById("cleanup-gallery-id") as HTMLInputElement;
                cleanDuplicates(el?.value ?? "", true);
              }}
              className="px-3 py-1.5 border border-charcoal text-charcoal text-xs uppercase tracking-wider hover:bg-charcoal hover:text-white"
            >
              Preview
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("cleanup-gallery-id") as HTMLInputElement;
                if (!confirm(`Really delete rebuilt duplicates in ${el?.value}? This deletes blobs. Run Preview first.`)) return;
                cleanDuplicates(el?.value ?? "", false);
              }}
              className="px-3 py-1.5 bg-rose-700 text-white text-xs uppercase tracking-wider hover:opacity-90"
            >
              Delete duplicates
            </button>
          </div>
        </div>

        {/* Rebuild from blob storage */}
        <div className="mt-4 mb-8 border border-charcoal/20 p-5 bg-white">
          <h2 className="text-lg font-medium mb-2">Rebuild from blob storage</h2>
          <p className="text-sm text-charcoal-light mb-3">
            Scan blob storage for gallery folders (the photos themselves survive even when metadata is wiped) and recreate metadata for them. You&rsquo;ll fill in the client name / session type / date for each.
          </p>
          <button
            onClick={scanBlobs}
            disabled={scanning}
            className="px-4 py-2 border border-charcoal text-charcoal text-sm uppercase tracking-wider hover:bg-charcoal hover:text-white disabled:opacity-50"
          >
            {scanning ? "Scanning..." : "Scan blob storage"}
          </button>

          {discovered && discovered.length === 0 && (
            <p className="mt-4 text-sm text-charcoal-light">No gallery folders found in blob storage.</p>
          )}

          {discovered && discovered.length > 0 && (
            <div className="mt-5 space-y-3">
              {discovered.map((g) => (
                <div key={g.id} className={`border ${g.include ? "border-sage/40" : "border-charcoal/10"} p-3`}>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={g.include}
                      onChange={(e) => updateDiscovered(g.id, { include: e.target.checked })}
                    />
                    <span className="font-mono text-sm">{g.id}</span>
                    <span className="text-xs text-charcoal-light">{g.photoCount} photos</span>
                  </div>
                  {g.include && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <input
                        placeholder="Client name *"
                        value={g.clientName}
                        onChange={(e) => updateDiscovered(g.id, { clientName: e.target.value })}
                        className="border border-charcoal/20 px-2 py-1.5"
                      />
                      <input
                        placeholder="Client email (optional)"
                        value={g.clientEmail}
                        onChange={(e) => updateDiscovered(g.id, { clientEmail: e.target.value })}
                        className="border border-charcoal/20 px-2 py-1.5"
                      />
                      <select
                        value={g.sessionType}
                        onChange={(e) => updateDiscovered(g.id, { sessionType: e.target.value })}
                        className="border border-charcoal/20 px-2 py-1.5"
                      >
                        {["Family", "Newborn", "Milestone", "Event", "Mini", "Maternity"].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <input
                        type="date"
                        value={g.sessionDate}
                        onChange={(e) => updateDiscovered(g.id, { sessionDate: e.target.value })}
                        className="border border-charcoal/20 px-2 py-1.5"
                      />
                      <input
                        placeholder="Message (optional)"
                        value={g.message}
                        onChange={(e) => updateDiscovered(g.id, { message: e.target.value })}
                        className="border border-charcoal/20 px-2 py-1.5 md:col-span-2"
                      />
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={rebuildFromDiscovered}
                disabled={rebuilding}
                className="mt-3 px-4 py-2 bg-sage text-white text-sm uppercase tracking-wider hover:bg-sage-dark disabled:opacity-50"
              >
                {rebuilding ? "Rebuilding..." : "Rebuild selected galleries"}
              </button>
            </div>
          )}
        </div>

        <h2 className="text-lg font-medium mt-8 mb-3">Metadata snapshots</h2>
        {data && data.snapshots.map((s) => {
          const isCurrent = s.url === data.currentPointer;
          const canRestore = typeof s.galleryCount === "number" && s.galleryCount > 0 && !isCurrent;
          return (
            <div key={s.url} className={`mb-3 border ${isCurrent ? "border-sage" : "border-charcoal/15"} p-4 bg-white`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">
                    {new Date(s.uploadedAt).toLocaleString()} {isCurrent && <span className="text-sage">(current)</span>}
                  </div>
                  <div className="text-xs text-charcoal-light break-all">{s.pathname}</div>
                  {s.error && <div className="text-xs text-rose-700 mt-1">Error: {s.error}</div>}
                  {typeof s.galleryCount === "number" && (
                    <div className="text-sm mt-2">
                      <strong>{s.galleryCount}</strong> galleries
                      {s.summary && s.summary.length > 0 && (
                        <ul className="mt-1 text-xs text-charcoal-light list-disc list-inside">
                          {s.summary.map((g) => (
                            <li key={g.id}>{g.clientName} <span className="text-charcoal/40">({g.id})</span> — {g.photoCount} photos</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
                {canRestore && (
                  <button
                    onClick={() => restore(s.url, s.galleryCount ?? 0)}
                    disabled={restoring === s.url}
                    className="shrink-0 px-3 py-1.5 border border-sage text-sage text-xs uppercase tracking-wider hover:bg-sage hover:text-white disabled:opacity-50"
                  >
                    {restoring === s.url ? "Restoring..." : "Restore this"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
