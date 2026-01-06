
 import { useState } from "react"
 import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreemLoading"
 import type { StudentsResponse } from "@/interface/students.response"


 import { Button } from "@/components/ui/button"
 import { Input } from "@/components/ui/input"
 import { Card, CardContent } from "@/components/ui/card"
 // import { Badge } from "@/components/ui/badge"
 import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
 import { Plus, Search, Edit, Trash2 } from "lucide-react"
 import { StudentModal } from "../students/ui/StudentModal"
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
import { useCourses } from "./hook/useCourses"
import type { CoursesResponse } from "@/interface/courses.response"

 export const CoursesPage = () => {
    // 1. DATA REAL
   const { data: courses = [], isLoading } = useCourses(1)
  
    // 2. ESTADOS LOCALES
   const [searchTerm, setSearchTerm] = useState("")
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [editingStudent, setEditingStudent] = useState<CoursesResponse | null>(null)
   const [deleteId, setDeleteId] = useState<string | null>(null)
   const [currentPage, setCurrentPage] = useState(1)
   const itemsPerPage = 8 

    // 3. LÓGICA DE FILTRADO
   const filteredCourses = courses.filter((course) => {
     return (
       course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       course.description!.toLowerCase().includes(searchTerm.toLowerCase())
     )
   })

   // Paginación
   const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
   const startIndex = (currentPage - 1) * itemsPerPage
   const paginatedCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage)

  //  Handlers
   const handleEdit = (course: CoursesResponse) => {
     setEditingStudent(course)
     setIsModalOpen(true)
   }

   const handleAddNew = () => {
     setEditingStudent(null)
     setIsModalOpen(true)
   }

   const handleDelete = (id: string) => {
     // Aquí conectas con tu hook de eliminación si existe
     console.log("Eliminando ID:", id)
     setDeleteId(null)
   }

   if (isLoading) return <CustomFullScreenLoading />

   return (
     <div className="p-6 max-w-7xl mx-auto space-y-6">
       {/* Encabezado */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
           <h1 className="text-2xl font-bold text-slate-900">Gestión de Cursos</h1>
           <p className="text-slate-500 text-sm">Administra la información de los alumnos registrados.</p>
         </div>
         <Button onClick={handleAddNew} className="bg-blue-600 hover:bg-blue-700">
           <Plus className="h-4 w-4 mr-2" />
           Nuevo Curso 
         </Button>
       </div>

       {/* Filtros */}
       <Card className="shadow-sm border-slate-200">
         <CardContent className="p-4">
           <div className="relative max-w-md">
             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
             <Input
               placeholder="Buscar por nombre o correo..."
               value={searchTerm}
               onChange={(e) => {
                 setSearchTerm(e.target.value)
                 setCurrentPage(1)  // Reset a página 1 al buscar
               }}
               className="pl-10"
             />
           </div>
         </CardContent>
       </Card>

       {/* Tabla Principal */}
       <Card className="shadow-sm border-slate-200 overflow-hidden">
         <Table>
           <TableHeader>
             <TableRow className="bg-slate-50/50">
               <TableHead className="font-semibold text-slate-700">Nombre</TableHead>
               <TableHead className="font-semibold text-slate-700">Descripcion</TableHead>
               <TableHead className="font-semibold text-slate-700">Creado el</TableHead>
               <TableHead className="font-semibold text-right text-slate-700">Acciones</TableHead>
             </TableRow>
           </TableHeader>
           <TableBody>
             {paginatedCourses.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={6} className="text-center py-12 text-slate-500">
                   No se encontraron estudiantes
                 </TableCell>
               </TableRow>
             ) : (
               paginatedCourses.map((course) => (
                 <TableRow key={course.id} className="hover:bg-slate-50/80 transition-colors">
                   <TableCell className="font-medium text-slate-900">{course.name}</TableCell>
                   <TableCell className="text-slate-600">{course.description}</TableCell>
                   <TableCell className="text-slate-600">{course.created_at.toString()}</TableCell>
                   
                  
                   <TableCell className="text-right">
                     <div className="flex justify-end gap-1">
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         onClick={() => handleEdit(course)}
                         className="h-8 w-8 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                       >
                         <Edit className="h-4 w-4" />
                       </Button>
                       <Button 
                         variant="ghost" 
                         size="icon" 
                         onClick={() => setDeleteId(course.id)} 
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
               Mostrando {paginatedCourses.length} de {filteredCourses.length} estudiantes
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

       {/* Modales */}
       <StudentModal 
         key={editingStudent?.id || "new-student"} // Key para forzar reinicio del formulario
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
