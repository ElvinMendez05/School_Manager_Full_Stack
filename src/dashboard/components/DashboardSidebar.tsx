import { Link, useLocation } from "react-router"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  BookOpen,
  UserCog,
  Settings,
  GraduationCap,
  X,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Estudiantes", href: "/students", icon: Users },
  { name: "Cursos", href: "/courses", icon: BookOpen },
  { name: "Usuarios", href: "/users", icon: UserCog, adminOnly: true },
  { name: "Configuración", href: "/settings", icon: Settings },
]

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const DashboardSidebar = ({ isOpen, onClose }: Props) => {
  const location = useLocation()
  const user = { role: "admin" } // Esto debería venir de tu store en el futuro

  const filteredNavigation = navigation.filter(
    (item) => !item.adminOnly || user.role === "admin"
  )

  return (
    <>
      {/* Overlay para móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header del Sidebar */}
          <div className="flex items-center justify-between px-6 py-5">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="text-white" />
              </div>
              <span className="ml-3 font-bold text-lg text-slate-800">
                School Manager
              </span>
            </div>
            <button onClick={onClose} className="lg:hidden text-slate-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navegación */}
          <nav className="flex-1 px-4 space-y-1">
            {filteredNavigation.map((item) => {
              const isActive =
                location.pathname === item.href ||
                (item.href !== "/" && location.pathname.startsWith(item.href))

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  )}
                >
                  <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-blue-700" : "text-slate-400")} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}
