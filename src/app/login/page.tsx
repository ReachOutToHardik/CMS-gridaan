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
        localStorage.setItem("schoolId", data.schoolId); // Store the UUID
        router.push("/dashboard");
      } else {
        setError(data.error || "Incorrect email or password. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl p-10 space-y-7">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to manage your school website.</p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500">Email</label>
            <input
              type="email"
              required
              autoComplete="email"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm outline-none focus:border-gray-400 transition-colors bg-white text-slate-800 placeholder-gray-500"
              placeholder="admin@school.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-500">Password</label>
            <input
              type="password"
              required
              autoComplete="current-password"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm outline-none focus:border-gray-400 transition-colors bg-white text-slate-800 placeholder-gray-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 px-3 py-2 rounded-md">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2.5 rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
