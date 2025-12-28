import { useState } from "react"
import { Outlet } from "react-router"
import { DashboardSidebar } from "../components/DashboardSidebar"
import { DashboardHeader } from "../components/DashboardHeader"

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Contenedor principal con el padding necesario para el sidebar fijo */}
      <div className="flex flex-col min-h-screen lg:pl-72">
        <DashboardHeader onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto">
          <div className="py-6 px-4 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
