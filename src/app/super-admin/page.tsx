import Link from "next/link";
import AdminsTable from "@/components/SuperAdmin/AdminsTable";
import {
  HomeIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export default async function SuperAdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <ShieldCheckIcon className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Super Admin
                </h1>
                <p className="text-sm text-gray-500">Toàn quyền hệ thống</p>
              </div>
            </div>
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
            >
              <HomeIcon className="h-5 w-5" />
              <span>Về trang chủ</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BuildingOffice2Icon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Tổng tenant</p>
                <p className="text-2xl font-semibold text-gray-900">-</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <UserGroupIcon className="h-8 w-8 text-emerald-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Tổng admin</p>
                <p className="text-2xl font-semibold text-gray-900">-</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <GlobeAltIcon className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Domain hoạt động</p>
                <p className="text-2xl font-semibold text-gray-900">-</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-amber-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Bài đăng hôm nay</p>
                <p className="text-2xl font-semibold text-gray-900">-</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admins management */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quản lý Admin</h2>
          </div>
          <div className="p-6">
            <AdminsTable />
          </div>
        </div>
      </div>
    </div>
  );
}
