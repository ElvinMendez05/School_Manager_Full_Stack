import { Bell, Menu, ChevronDown, Settings, LogOut } from "lucide-react"
import { Link } from "react-router"
import { useState } from "react"
import { useAuthStore } from "@/auth/store/auth.store"
import { Button } from "@/components/ui/button"

export const DashboardHeader = ({
  onOpenSidebar,
}: {
  onOpenSidebar: () => void
}) => {
  const [open, setOpen] = useState(false)
  const { user, authStatus, logout } = useAuthStore()

  const getInitials = (email?: string | null) => {
    if (!email) return "?"
    return email.slice(0, 2).toUpperCase()
  }

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b shadow-sm flex items-center px-4 lg:px-8">
      {/* Botón menú móvil */}
      <button
        onClick={onOpenSidebar}
        className="lg:hidden text-slate-500 mr-4 p-1 hover:bg-slate-100 rounded-md"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Título de la página */}
      <h1 className="text-lg font-semibold text-slate-800 flex-1">Dashboard</h1>

      {/* Acciones de la derecha */}
      <div className="relative flex items-center gap-4">
        {authStatus === "authenticated" && (
          <button className="text-slate-500 hover:text-blue-600 transition-colors">
            <Bell className="h-5 w-5" />
          </button>
        )}

        {authStatus === "not-authenticated" && (
          <Link to="/auth/login">
            <Button size="sm">Iniciar Sesión</Button>
          </Link>
        )}

        {authStatus === "authenticated" && user && (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-lg p-1 hover:bg-slate-100 transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                {getInitials(user.email)}
              </div>

              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-700 leading-none">
                  {user.email?.split("@")[0]}
                </p>
                <p className="text-[10px] text-slate-500 capitalize mt-1">
                  {user.role}
                </p>
              </div>

              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            {open && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                <div className="absolute right-0 top-12 w-56 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-1 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-50">
                    <p className="text-sm font-semibold text-slate-800 truncate">{user.email}</p>
                    <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                  </div>

                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <Settings className="h-4 w-4 mr-3 text-slate-400" />
                    Configuración
                  </Link>

                  <button
                    onClick={() => {
                      logout()
                      setOpen(false)
                    }}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Cerrar sesión
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

// import { Bell, Menu, ChevronDown, Settings, LogOut } from "lucide-react"
// import { Link } from "react-router"
// import { useState } from "react"
// import { useAuthStore } from "@/auth/store/auth.store"
// import { Button } from "@/components/ui/button"

// export const DashboardHeader = ({
//   onOpenSidebar,
// }: {
//   onOpenSidebar: () => void
// }) => {
//   const [open, setOpen] = useState(false)

//   const { user, authStatus, logout } = useAuthStore()

//   const getInitials = (name?: string | null) => {
//     if (!name) return "?"
//     return name
//       .split(" ")
//       .map(n => n[0])
//       .join("")
//       .slice(0, 2)
//       .toUpperCase()
//   }

//   return (
//     // <header className="sticky top-0 z-10 h-16 bg-white border-b shadow-sm flex items-center px-4 lg:px-6">
//     <header className="sticky top-0 z-10 h-16 bg-white border-b shadow-sm flex items-center px-4 lg:px-6 lg:pl-72">
//       {/* Mobile menu */}
//       <button
//         onClick={onOpenSidebar}
//         className="lg:hidden text-slate-500 mr-4"
//       >
//         <Menu />
//       </button>

//       {/* Title */}
//       <h1 className="text-lg font-semibold flex-1">Dashboard</h1>

//       {/* Right actions */}
//       <div className="relative flex items-center gap-3">

//         {/* Bell */}
//         {authStatus === "authenticated" && (
//           <button className="text-slate-500 hover:text-slate-700">
//             <Bell className="h-5 w-5" />
//           </button>
//         )}

//         {/* 👉 NO AUTENTICADO */}
//         {authStatus === "not-authenticated" && (
//           <Link to="/auth/login">
//             <Button size="sm">Login</Button>
//           </Link>
//         )}

//         {/* 👉 AUTENTICADO */}
//         {authStatus === "authenticated" && user && (
//           <>
//             {/* User button */}
//             <button
//               onClick={() => setOpen(!open)}
//               className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100"
//             >
//               <div className="h-8 w-8 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-semibold">
//                 {getInitials(user.email)}
//               </div>

//               <div className="hidden md:block text-left">
//                 <p className="text-sm font-medium">{user.email}</p>
//                 <p className="text-xs text-slate-500 capitalize">
//                   {user.role}
//                 </p>
//               </div>

//               <ChevronDown className="h-4 w-4 text-slate-400" />
//             </button>

//             {/* Dropdown */}
//             {open && (
//               <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg border z-50">
//                 <div className="px-4 py-3 border-b">
//                   <p className="text-sm font-medium">{user.email}</p>
//                   <p className="text-xs text-slate-500 capitalize">
//                     {user.role}
//                   </p>
//                 </div>

//                 <div className="py-1">
//                   <Link
//                     to="/settings"
//                     className="flex items-center px-4 py-2 text-sm hover:bg-slate-100"
//                     onClick={() => setOpen(false)}
//                   >
//                     <Settings className="h-4 w-4 mr-2" />
//                     Configuración
//                   </Link>

//                   <button
//                     onClick={() => {
//                       logout()
//                       setOpen(false)
//                     }}
//                     className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//                   >
//                     <LogOut className="h-4 w-4 mr-2" />
//                     Cerrar sesión
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </header>
//   )
// }


// import { Bell, Menu, ChevronDown, Settings, LogOut } from "lucide-react"
// import { Link } from "react-router"
// import { useState } from "react"
// import { useAuthStore } from "@/auth/store/auth.store"

// export const DashboardHeader = ({
//   onOpenSidebar,
// }: {
//   onOpenSidebar: () => void
// }) => {
//   const [open, setOpen] = useState(false)

//   // 👉 MOCK USER (temporal)
//   // const user = {
//   //   name: "Manu Castillo",
//   //   role: "admin",
//   //   email: "manu@email.com",
//   // }

//   const {user} = useAuthStore()

//   const getInitials = (name?: string | null) => {
//     if (!name) return "?"

//     return name
//       .split(" ")
//       .map(n => n[0])
//       .join("")
//       .slice(0, 2)
//       .toUpperCase()
//   }
  
//   return (
//     <header className="sticky top-0 z-10 h-16 bg-white border-b shadow-sm flex items-center px-4 lg:px-6">
//       {/* Mobile menu */}
//       <button
//         onClick={onOpenSidebar}
//         className="lg:hidden text-slate-500 mr-4"
//       >
//         <Menu />
//       </button>

//       {/* Title */}
//       <h1 className="text-lg font-semibold flex-1">Dashboard</h1>

//       {/* Right actions */}
//       <div className="relative flex items-center gap-3">
//         {/* Bell */}
//         <button className="text-slate-500 hover:text-slate-700">
//           <Bell className="h-5 w-5" />
//         </button>

//         {/* User menu */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-100"
//         >
//           <div className="h-8 w-8 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-semibold">
//             {getInitials(user?.email)}
//           </div>

//           <div className="hidden md:block text-left">
//             <p className="text-sm font-medium">{user?.email}</p>
//             <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
//           </div>

//           <ChevronDown className="h-4 w-4 text-slate-400" />
//         </button>

//         {/* Dropdown */}
//         {open && (
//           <div className="absolute right-0 top-12 w-56 bg-white rounded-lg shadow-lg border z-50">
//             <div className="px-4 py-3 border-b">
//               <p className="text-sm font-medium">{user?.email}</p>
//               <p className="text-xs text-slate-500">{user?.email}</p>
//             </div>

//             <div className="py-1">
//               <Link
//                 to="/settings"
//                 className="flex items-center px-4 py-2 text-sm hover:bg-slate-100"
//               >
//                 <Settings className="h-4 w-4 mr-2" />
//                 Configuración
//               </Link>

//               <button
//                 onClick={() => alert("Logout (mock)")}
//                 className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//               >
//                 <LogOut className="h-4 w-4 mr-2" />
//                 Cerrar sesión
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   )
// }
