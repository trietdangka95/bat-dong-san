import { getTenantFromHeaders } from "@/lib/tenant";
import { TenantProvider } from "@/contexts/TenantContext";
import ThemedLayout from "@/components/ThemedLayout";
import AdminPropertiesTable from "@/components/Admin/PropertiesTable";
import Link from "next/link";
import {
  HomeIcon,
  BuildingOfficeIcon,
  PlusIcon,
  ChartBarIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

export default async function AdminPage() {
  const tenant = await getTenantFromHeaders();

  if (!tenant) return <div>Loading tenant...</div>;

  return (
    <TenantProvider initialTenant={tenant}>
      <ThemedLayout>
        <div className="min-h-screen bg-gray-50">
          {/* Admin Header */}
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        Admin Panel
                      </h1>
                      <p className="text-sm text-gray-500">{tenant.name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    href="/"
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <HomeIcon className="h-5 w-5" />
                    <span>Về trang chủ</span>
                  </Link>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
                    <CogIcon className="h-5 w-5" />
                    <span>Cài đặt</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <BuildingOfficeIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Tổng bài đăng
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">-</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <ChartBarIcon className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Đã duyệt
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">-</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CogIcon className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Chờ duyệt
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">-</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <PlusIcon className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      Tháng này
                    </p>
                    <p className="text-2xl font-semibold text-gray-900">-</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    Danh sách bất động sản
                  </h2>
                  <div className="flex items-center space-x-3">
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <CogIcon className="h-4 w-4 mr-2" />
                      Bộ lọc
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Thêm mới
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <AdminPropertiesTable />
              </div>
            </div>
          </div>
        </div>
      </ThemedLayout>
    </TenantProvider>
  );
}
