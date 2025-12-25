import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useData } from "@/lib/data-store"
import type { Course } from "@/lib/data-store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2, Users } from "lucide-react"
import { CourseModal } from "@/components/course-modal"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function CoursesPage() {
  
  const { courses, students, deleteCourse } = useData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleEdit = (course: Course) => {
    setEditingCourse(course)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    deleteCourse(id)
    setDeleteId(null)
  }

  const handleAddNew = () => {
    setEditingCourse(null)
    setIsModalOpen(true)
  }

  const getStudentCount = (courseId: string) => {
    return students.filter((s) => s.courseId === courseId).length
  }

  return (
    <AuthGuard>
      <DashboardLayout title="Cursos">
        <div className="space-y-6">
          {/* Header */}
          <Card className="shadow-sm">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">Gestión de Cursos</h2>
                  <p className="text-sm text-slate-500 mt-1">Administra los cursos disponibles en el sistema</p>
                </div>
                <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Crear Curso
                </Button>
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
                      <TableHead className="font-semibold text-slate-700 w-[30%]">Nombre del Curso</TableHead>
                      <TableHead className="font-semibold text-slate-700">Descripción</TableHead>
                      <TableHead className="font-semibold text-slate-700 w-[180px]">Estudiantes Inscritos</TableHead>
                      <TableHead className="font-semibold text-slate-700 text-right w-[140px]">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8 text-slate-500">
                          No hay cursos disponibles
                        </TableCell>
                      </TableRow>
                    ) : (
                      courses.map((course) => (
                        <TableRow key={course.id} className="hover:bg-slate-50 transition-colors">
                          <TableCell className="font-medium text-slate-900">{course.name}</TableCell>
                          <TableCell className="text-slate-600">{course.description}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 text-slate-700">
                              <Users className="h-4 w-4 text-slate-400" />
                              <span className="font-medium">{getStudentCount(course.id)}</span>
                              <span className="text-slate-500">estudiantes</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(course)}
                                className="hover:bg-blue-50 hover:text-blue-600"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeleteId(course.id)}
                                className="hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Modal */}
        <CourseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} course={editingCourse} />

        {/* Delete Confirmation */}
        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. El curso será eliminado permanentemente. Los estudiantes asignados a
                este curso deberán ser reasignados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteId && handleDelete(deleteId)}
                className="bg-red-600 hover:bg-red-700"
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DashboardLayout>
    </AuthGuard>
  )
}
