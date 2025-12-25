import { useState } from "react"
import { Outlet } from "react-router"
import { AdminSidebar } from "../components/AdminSidebar"
import { AdminHeader } from "../components/AdminHeader"

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="lg:pl-72 flex flex-col h-screen">
        <AdminHeader onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div className="py-6 px-4 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout;
