

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Shield, User } from "lucide-react"

// Mock users data
const SYSTEM_USERS = [
  { id: "1", email: "admin@school.com", name: "Administrador", role: "admin", createdAt: "2024-01-15" },
  { id: "2", email: "profesor@school.com", name: "Profesor García", role: "profesor", createdAt: "2024-02-01" },
]

export const UsersPage = () => {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.push("/dashboard")
    }
  }, [user, router])

  if (user?.role !== "admin") {
    return null
  }

  return (
        <div className="space-y-6">
          {/* Header */}
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Gestión de Usuarios</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Administra los usuarios del sistema y sus permisos (solo administradores)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="font-semibold text-slate-700">Email</TableHead>
                      <TableHead className="font-semibold text-slate-700">Nombre</TableHead>
                      <TableHead className="font-semibold text-slate-700">Rol</TableHead>
                      <TableHead className="font-semibold text-slate-700">Fecha de Creación</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {SYSTEM_USERS.map((sysUser) => (
                      <TableRow key={sysUser.id} className="hover:bg-slate-50 transition-colors">
                        <TableCell className="font-medium text-slate-900">{sysUser.email}</TableCell>
                        <TableCell className="text-slate-600">{sysUser.name}</TableCell>
                        <TableCell>
                          <Badge
                            variant={sysUser.role === "admin" ? "default" : "secondary"}
                            className={
                              sysUser.role === "admin" ? "bg-violet-100 text-violet-700" : "bg-blue-100 text-blue-700"
                            }
                          >
                            {sysUser.role === "admin" ? (
                              <>
                                <Shield className="h-3 w-3 mr-1" />
                                Admin
                              </>
                            ) : (
                              <>
                                <User className="h-3 w-3 mr-1" />
                                Profesor
                              </>
                            )}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">{sysUser.createdAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900">Gestión de usuarios del sistema</h3>
                  <p className="text-sm text-blue-800 mt-1">
                    Esta sección muestra los usuarios con acceso al sistema administrativo. Para agregar nuevos usuarios
                    o modificar roles, contacta al administrador del sistema.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
  )
}
