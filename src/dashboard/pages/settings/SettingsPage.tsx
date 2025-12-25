
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Shield } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
      <DashboardLayout title="Configuración">
        <div className="space-y-6 max-w-3xl">
          {/* Profile Card */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Perfil de Usuario</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-blue-600 text-white text-xl">
                    {user ? getInitials(user.name) : "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">{user?.name}</h3>
                  <Badge
                    variant={user?.role === "admin" ? "default" : "secondary"}
                    className={user?.role === "admin" ? "bg-violet-100 text-violet-700" : "bg-blue-100 text-blue-700"}
                  >
                    {user?.role === "admin" ? "Administrador" : "Profesor"}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <User className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Nombre</p>
                    <p className="font-medium text-slate-900">{user?.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Mail className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Email</p>
                    <p className="font-medium text-slate-900">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Shield className="h-5 w-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Rol</p>
                    <p className="font-medium text-slate-900 capitalize">{user?.role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Info Card */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Información del Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Versión</span>
                <span className="font-medium text-slate-900">1.0.0</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-600">Aplicación</span>
                <span className="font-medium text-slate-900">Quick School Admin</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-600">Último acceso</span>
                <span className="font-medium text-slate-900">{new Date().toLocaleDateString("es-ES")}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
  )
}
