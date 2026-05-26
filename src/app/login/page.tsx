"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("schoolId", data.schoolId);
        localStorage.setItem("liveUrl", data.liveUrl || "/preview");
        router.push("/dashboard");
      } else {
        setError(data.error || "Incorrect email or password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-xl p-8 space-y-6 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Admin Login</h1>
          <p className="text-xs text-slate-400 mt-1">Sign in to manage your school website.</p>
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
            <input
              suppressHydrationWarning
              type="email"
              required
              autoComplete="email"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all bg-white text-slate-800 placeholder-slate-400"
              placeholder="admin@school.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
            />
          </div>
          <div className="space-y-1">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
            <input
              suppressHydrationWarning
              type="password"
              required
              autoComplete="current-password"
              className="w-full px-3 py-2 border border-slate-200 rounded-md text-sm outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all bg-white text-slate-800 placeholder-slate-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
            />
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-rose-50 border border-rose-100 text-rose-600 p-3 rounded-md text-xs">
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#0f766e] hover:bg-[#0d605a] text-white py-2.5 rounded-md text-sm font-semibold transition-all cursor-pointer shadow-xs"
          >
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
