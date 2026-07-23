"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ArrowLeft, KeyRound, Sparkles } from "lucide-react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Successful login, route to dashboard
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-200 flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Background glow animations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-900/15 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute top-10 left-10 w-[200px] h-[200px] bg-cyan-900/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Back to Site link */}
      <div className="absolute top-8 left-8 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Title branding */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-3 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
            <KeyRound size={28} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Admin CMS Portal
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Sign in to manage your portfolio contents
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="glass-panel p-8 rounded-3xl border border-white/5 flex flex-col gap-5 shadow-2xl"
        >
          {error && (
            <div className="px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-300 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Email field */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-gray-400">
              Admin Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                <Mail size={16} />
              </span>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@portfolio.com"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <label htmlFor="pass" className="text-xs font-semibold text-gray-400">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-500">
                <Lock size={16} />
              </span>
              <input
                type="password"
                id="pass"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 transition-all duration-200"
              />
              <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide" : "Show"}
          style={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
            </div>
          </div>

          {/* Helper hint for default details */}
          {/* <div className="text-[10px] text-gray-500 leading-normal bg-white/5 p-3 rounded-xl border border-white/5 flex items-start gap-2">
            <Sparkles size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Demo Hint:</strong> If environment keys are not configured, use <code>admin@portfolio.com</code> and password <code>admin</code>.
            </span>
          </div> */}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="glow-btn py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300 flex items-center justify-center cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed text-sm"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
