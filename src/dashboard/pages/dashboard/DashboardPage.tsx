import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, BookOpen, UserCog, TrendingUp } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

// 🔹 DATA TEMPORAL (mock)
const students = [
  { id: 1, active: true, courseId: 1 },
  { id: 2, active: false, courseId: 1 },
  { id: 3, active: true, courseId: 2 },
]

const courses = [
  { id: 1, name: "React" },
  { id: 2, name: "Node.js" },
]

export const DashboardPage = () => {
  const activeStudents = students.filter((s) => s.active).length
  const totalUsers = 2

  const chartData = courses.map((course) => ({
    name: course.name,
    estudiantes: students.filter((s) => s.courseId === course.id).length,
  }))

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
    <div className="space-y-0">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm text-slate-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Estudiantes por Curso</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="estudiantes" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
