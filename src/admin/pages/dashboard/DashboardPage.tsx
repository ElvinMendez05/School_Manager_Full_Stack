import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardLayout } from "@/dashboard/layouts/DashboardLayout"
import { Users, BookOpen, UserCog, TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

export default function DashboardPage() {
  // const { students, courses } = useData()
  // const { user } = useAuth()

  // const activeStudents = students.filter((s) => s.active).length
  // const totalUsers = user?.role === "admin" ? 2 : 1

  // // Calculate students per course for chart
  // const chartData = courses.map((course) => ({
  //   name: course.name,
  //   estudiantes: students.filter((s) => s.courseId === course.id).length,
  // }))

  const stats = [
    {
      title: "Total Estudiantes",
      value: students.length,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Cursos",
      value: courses.length,
      icon: BookOpen,
      color: "text-violet-600",
      bgColor: "bg-violet-50",
    },
    {
      title: "Usuarios Registrados",
      value: totalUsers,
      icon: UserCog,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Estudiantes Activos",
      value: activeStudents,
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ]

  return (
      <DashboardLayout title="Dashboard">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.title} className="shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Chart */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Estudiantes por Curso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="estudiantes" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
  )
}
