"use client";

import { useMemo, useState } from "react";
import Button from "@/components/Button";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  tenantDomain: string;
  role: "owner" | "admin" | "editor";
  createdAt: string;
}

const mockAdmins: AdminUser[] = [
  {
    id: "a1",
    name: "Super Owner",
    email: "owner@system.local",
    tenantDomain: "*",
    role: "owner",
    createdAt: new Date().toISOString(),
  },
  {
    id: "a2",
    name: "Tenant A Admin",
    email: "admin@tenant-a.localhost",
    tenantDomain: "tenant-a.localhost",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "a3",
    name: "Tenant B Editor",
    email: "editor@tenant-b.localhost",
    tenantDomain: "tenant-b.localhost",
    role: "editor",
    createdAt: new Date().toISOString(),
  },
];

export default function AdminsTable() {
  const [rows, setRows] = useState<AdminUser[]>(mockAdmins);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.tenantDomain.toLowerCase().includes(q)
    );
  }, [rows, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex-1">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm theo tên, email, domain tenant..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={() => alert("Thêm admin: cần form + API POST /api/admins")}
          >
            <span className="inline-flex items-center">
              <PlusIcon className="h-4 w-4 mr-2" /> Thêm admin
            </span>
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tenant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quyền
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày tạo
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {r.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {r.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {r.tenantDomain}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    className={
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium " +
                      (r.role === "owner"
                        ? "bg-purple-100 text-purple-800"
                        : r.role === "admin"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800")
                    }
                  >
                    {r.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(r.createdAt).toLocaleString("vi-VN")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() =>
                        alert("Sửa admin: cần form + API PUT /api/admins/[id]")
                      }
                      className="text-yellow-600 hover:text-yellow-900 p-1 rounded"
                      title="Chỉnh sửa"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Xóa admin này?")) {
                          alert("Xóa admin: cần API DELETE /api/admins/[id]");
                        }
                      }}
                      className="text-red-600 hover:text-red-900 p-1 rounded"
                      title="Xóa"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
