"use client"

import { useState } from "react"
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreemLoading"
import { useStudents } from "./hooks/useStudents"
import type { StudentsResponse } from "@/interface/students.response"

// Componentes de UI (Shadcn/ui)
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2 } from "lucide-react"
import { StudentModal } from "../students/ui/StudentModal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

export const StudentsPage = () => {
  // 1. DATA REAL
  const { data: students = [], isLoading } = useStudents(1)
  
  // 2. ESTADOS LOCALES
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCourse, setFilterCourse] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<StudentsResponse | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8 

  // 3. LÓGICA DE FILTRADO (Adaptada para incluir los nuevos selects)
  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = filterCourse === "all" || student.course_id === filterCourse;
    
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" ? student.active : !student.active);

    return matchesSearch && matchesCourse && matchesStatus;
  })

  // Obtener cursos únicos para el filtro
  const uniqueCourses = Array.from(new Set(students.map(s => JSON.stringify({id: s.course_id, name: s.course_name}))))
    .map(c => JSON.parse(c))
    .filter(c => c.id !== null);

  // Paginación
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage)

  // Handlers
  const handleEdit = (student: StudentsResponse) => {
    setEditingStudent(student)
    setIsModalOpen(true)
  }

  const handleAddNew = () => {
    setEditingStudent(null)
    setIsModalOpen(true)
  }

  const handleDelete = (id: string) => {
    console.log("Eliminando ID:", id)
    setDeleteId(null)
  }

  if (isLoading) return <CustomFullScreenLoading />

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Encabezado */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Gestión de Estudiantes</h1>
        <p className="text-slate-500 text-sm">Administra la información de los alumnos registrados.</p>
      </div>

      {/* --- ESTA ES LA PARTE DEL DISEÑO QUE ME PEDISTE --- */}
      <Card className="shadow-sm border-slate-200">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="flex gap-3 flex-wrap">
              <Select value={filterCourse} onValueChange={(val) => { setFilterCourse(val); setCurrentPage(1); }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Todos los cursos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los cursos</SelectItem>
                  {uniqueCourses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={(val) => { setFilterStatus(val); setCurrentPage(1); }}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activos</SelectItem>
                  <SelectItem value="inactive">Inactivos</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Agregar Estudiante
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* --- FIN BARRA DE FILTROS --- */}

      {/* Tabla Principal */}
      <Card className="shadow-sm border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="font-semibold text-slate-700">Nombre</TableHead>
              <TableHead className="font-semibold text-slate-700">Correo Electrónico</TableHead>
              <TableHead className="font-semibold text-slate-700">Edad</TableHead>
              <TableHead className="font-semibold text-slate-700">Curso</TableHead>
              <TableHead className="font-semibold text-center text-slate-700">Estado</TableHead>
              <TableHead className="font-semibold text-right text-slate-700">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedStudents.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                  No se encontraron estudiantes
                </TableCell>
              </TableRow>
            ) : (
              paginatedStudents.map((student) => (
                <TableRow key={student.id} className="hover:bg-slate-50/80 transition-colors">
                  <TableCell className="font-medium text-slate-900">{student.name}</TableCell>
                  <TableCell className="text-slate-600">{student.email}</TableCell>
                  <TableCell className="text-slate-600">{student.age}</TableCell>
                  <TableCell className="text-slate-600">
                    {student.course_name || <span className="text-slate-400 italic">No asignado</span>}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={student.active ? "default" : "secondary"}
                      className={student.active ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-slate-100 text-slate-600"}
                    >
                      {student.active ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEdit(student)}
                        className="h-8 w-8 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setDeleteId(student.id)} 
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
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

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/30">
            <span className="text-sm text-slate-500">
              Mostrando {paginatedStudents.length} de {filteredStudents.length} estudiantes
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </Button>
            </div>
          </div>
        )}
      </Card>

      <StudentModal 
        key={editingStudent?.id || "new-student"}
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        student={editingStudent} 
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Confirmar eliminación?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará al estudiante de la base de datos de forma permanente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteId && handleDelete(deleteId)} 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Eliminar Definitivamente
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

// import { useState } from "react"
// import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreemLoading"
// import { useStudents } from "./hooks/useStudents"
// import type { StudentsResponse } from "@/interface/students.response"

// // Componentes de UI (Shadcn/ui)
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Plus, Search, Edit, Trash2 } from "lucide-react"
// import { StudentModal } from "../students/ui/StudentModal"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"

// export const StudentsPage = () => {
//   // 1. DATA REAL
//   const { data: students = [], isLoading } = useStudents(1)
  
//   // 2. ESTADOS LOCALES
//   const [searchTerm, setSearchTerm] = useState("")
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [editingStudent, setEditingStudent] = useState<StudentsResponse | null>(null)
//   const [deleteId, setDeleteId] = useState<string | null>(null)
//   const [currentPage, setCurrentPage] = useState(1)
//   const itemsPerPage = 8 

//   // 3. LÓGICA DE FILTRADO
//   const filteredStudents = students.filter((student) => {
//     return (
//       student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       student.email.toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   })

//   // Paginación
//   const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
//   const startIndex = (currentPage - 1) * itemsPerPage
//   const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage)

//   // Handlers
//   const handleEdit = (student: StudentsResponse) => {
//     setEditingStudent(student)
//     setIsModalOpen(true)
//   }

//   const handleAddNew = () => {
//     setEditingStudent(null)
//     setIsModalOpen(true)
//   }

//   const handleDelete = (id: string) => {
//     // Aquí conectas con tu hook de eliminación si existe
//     console.log("Eliminando ID:", id)
//     setDeleteId(null)
//   }

//   if (isLoading) return <CustomFullScreenLoading />

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-6">
//       {/* Encabezado */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Gestión de Estudiantes</h1>
//           <p className="text-slate-500 text-sm">Administra la información de los alumnos registrados.</p>
//         </div>
//         <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700">
//           <Plus className="h-4 w-4 mr-2" />
//           Nuevo Estudiante
//         </Button>
//       </div>

//       {/* Filtros */}
//       <Card className="shadow-sm border-slate-200">
//         <CardContent className="p-4">
//           <div className="relative max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
//             <Input
//               placeholder="Buscar por nombre o correo..."
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value)
//                 setCurrentPage(1) // Reset a página 1 al buscar
//               }}
//               className="pl-10"
//             />
//           </div>
//         </CardContent>
//       </Card>

//       {/* Tabla Principal */}
//       <Card className="shadow-sm border-slate-200 overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-slate-50/50">
//               <TableHead className="font-semibold text-slate-700">Nombre</TableHead>
//               <TableHead className="font-semibold text-slate-700">Correo Electrónico</TableHead>
//               <TableHead className="font-semibold text-slate-700">Edad</TableHead>
//               <TableHead className="font-semibold text-slate-700">Curso</TableHead>
//               <TableHead className="font-semibold text-center text-slate-700">Estado</TableHead>
//               <TableHead className="font-semibold text-right text-slate-700">Acciones</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {paginatedStudents.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center py-12 text-slate-500">
//                   No se encontraron estudiantes
//                 </TableCell>
//               </TableRow>
//             ) : (
//               paginatedStudents.map((student) => (
//                 <TableRow key={student.id} className="hover:bg-slate-50/80 transition-colors">
//                   <TableCell className="font-medium text-slate-900">{student.name}</TableCell>
//                   <TableCell className="text-slate-600">{student.email}</TableCell>
//                   <TableCell className="text-slate-600">{student.age}</TableCell>
//                   <TableCell className="text-slate-600">
//                     {student.course_name || <span className="text-slate-400 italic">No asignado</span>}
//                   </TableCell>
//                   <TableCell className="text-center">
//                     <Badge
//                       variant={student.active ? "default" : "secondary"}
//                       className={student.active ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "bg-slate-100 text-slate-600"}
//                     >
//                       {student.active ? "Activo" : "Inactivo"}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-right">
//                     <div className="flex justify-end gap-1">
//                       <Button 
//                         variant="ghost" 
//                         size="icon" 
//                         onClick={() => handleEdit(student)}
//                         className="h-8 w-8 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
//                       >
//                         <Edit className="h-4 w-4" />
//                       </Button>
//                       <Button 
//                         variant="ghost" 
//                         size="icon" 
//                         onClick={() => setDeleteId(student.id)} 
//                         className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>

//         {/* Paginación */}
//         {totalPages > 1 && (
//           <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/30">
//             <span className="text-sm text-slate-500">
//               Mostrando {paginatedStudents.length} de {filteredStudents.length} estudiantes
//             </span>
//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                 disabled={currentPage === 1}
//               >
//                 Anterior
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                 disabled={currentPage === totalPages}
//               >
//                 Siguiente
//               </Button>
//             </div>
//           </div>
//         )}
//       </Card>

//       {/* Modales */}
//       <StudentModal 
//         key={editingStudent?.id || "new-student"} // Key para forzar reinicio del formulario
//         isOpen={isModalOpen} 
//         onClose={() => setIsModalOpen(false)} 
//         student={editingStudent} 
//       />

//       <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>¿Confirmar eliminación?</AlertDialogTitle>
//             <AlertDialogDescription>
//               Esta acción eliminará al estudiante de la base de datos de forma permanente.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancelar</AlertDialogCancel>
//             <AlertDialogAction 
//               onClick={() => deleteId && handleDelete(deleteId)} 
//               className="bg-red-600 hover:bg-red-700 text-white"
//             >
//               Eliminar Definitivamente
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   )
// }
