"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if already authed
    const stored = document.cookie
      .split(";")
      .find((c) => c.trim().startsWith("admin_pin="));
    if (stored) {
      router.replace("/admin/galleries");
    } else {
      setLoading(false);
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Test the PIN against the API
    const res = await fetch("/api/admin/galleries", {
      headers: { "x-admin-pin": pin },
    });

    if (res.ok) {
      // Set cookie (30 days)
      document.cookie = `admin_pin=${pin}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Strict`;
      router.push("/admin/galleries");
    } else {
      setError("Wrong PIN");
      setPin("");
    }
  }

  if (loading) return null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="font-[family-name:var(--font-cormorant)] text-3xl text-center mb-8 text-charcoal">
          Admin
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-charcoal-light mb-1">
              Enter PIN
            </label>
            <input
              id="pin"
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-4 py-3 border border-charcoal/20 bg-white text-charcoal text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-sage transition-colors"
              placeholder="••••"
              autoFocus
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={pin.length < 4}
            className="w-full py-3 bg-sage text-white text-sm font-medium uppercase tracking-widest hover:bg-sage-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
