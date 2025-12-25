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
// import { useAuth } from "@/hooks/useAuth"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Estudiantes", href: "/dashboard/students", icon: Users },
  { name: "Cursos", href: "/dashboard/courses", icon: BookOpen },
  { name: "Usuarios", href: "/dashboard/users", icon: UserCog, adminOnly: true },
  { name: "Configuración", href: "/dashboard/settings", icon: Settings },
]

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const DashboardSidebar = ({ isOpen, onClose }: Props) => {
//   const { user } = useAuth()
  const location = useLocation()

  const filteredNavigation = navigation.filter(
    (item) => !item.adminOnly || user?.role === "admin"
  )

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r">
      <div className="flex items-center justify-between px-6 py-5">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <GraduationCap className="text-white" />
          </div>
          <span className="ml-3 font-bold text-lg">School Manager</span>
        </div>
        <button onClick={onClose} className="lg:hidden">
          <X />
        </button>
      </div>

      <nav className="px-4 space-y-1">
        {filteredNavigation.map((item) => {
          const isActive =
            location.pathname === item.href ||
            location.pathname.startsWith(item.href + "/")

          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg text-sm",
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-700 hover:bg-slate-100"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:w-72">
        {sidebarContent}
      </aside>

      {/* Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <div className="absolute inset-y-0 left-0 w-72">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  )
}
