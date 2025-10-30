"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Đăng nhập thất bại");

      // Persist minimal session to localStorage (mock)
      localStorage.setItem(
        "session",
        JSON.stringify({ email, role: data.role })
      );

      // Redirect by role
      if (data.role === "super_admin") {
        router.replace("/super-admin");
      } else if (data.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Đăng nhập</h1>
        <p className="text-sm text-gray-500 mb-6">
          Dùng tài khoản mock để vào trang quản trị.
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="super@admin.com hoặc admin@tenant.local"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mật khẩu
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="123456"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </form>

        <div className="mt-6 text-xs text-gray-500">
          <div className="font-medium mb-1">Tài khoản mẫu:</div>
          <div>- super@admin.com / 123456 → Super Admin</div>
          <div>- admin@tenant.local / 123456 → Admin</div>
        </div>
      </div>
    </div>
  );
}
