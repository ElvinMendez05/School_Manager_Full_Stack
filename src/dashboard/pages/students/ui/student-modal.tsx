"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useData } from "@/lib/data-store"
import type { Student } from "@/lib/data-store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

type StudentModalProps = {
  isOpen: boolean
  onClose: () => void
  student: Student | null
}

export function StudentModal({ isOpen, onClose, student }: StudentModalProps) {
  const { courses, addStudent, updateStudent } = useData()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    courseId: "",
    active: true,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        age: student.age.toString(),
        courseId: student.courseId,
        active: student.active,
      })
    } else {
      setFormData({
        name: "",
        email: "",
        age: "",
        courseId: courses[0]?.id || "",
        active: true,
      })
    }
    setErrors({})
  }, [student, courses, isOpen])

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }

    const age = Number.parseInt(formData.age)
    if (!formData.age || isNaN(age) || age < 5 || age > 100) {
      newErrors.age = "La edad debe estar entre 5 y 100"
    }

    if (!formData.courseId) {
      newErrors.courseId = "Debes seleccionar un curso"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    if (student) {
      updateStudent(student.id, {
        name: formData.name,
        email: formData.email,
        age: Number.parseInt(formData.age),
        courseId: formData.courseId,
        active: formData.active,
      })
    } else {
      addStudent({
        name: formData.name,
        email: formData.email,
        age: Number.parseInt(formData.age),
        courseId: formData.courseId,
        active: formData.active,
      })
    }

    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-900">
            {student ? "Editar Estudiante" : "Agregar Estudiante"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ej: Ana García"
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="ejemplo@correo.com"
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Edad</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="15"
              min="5"
              max="100"
            />
            {errors.age && <p className="text-sm text-red-600">{errors.age}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Curso</Label>
            <Select value={formData.courseId} onValueChange={(value) => setFormData({ ...formData, courseId: value })}>
              <SelectTrigger id="course">
                <SelectValue placeholder="Seleccionar curso" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.courseId && <p className="text-sm text-red-600">{errors.courseId}</p>}
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-1">
              <Label htmlFor="active">Estado</Label>
              <p className="text-sm text-slate-500">Activar o desactivar estudiante</p>
            </div>
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {student ? "Actualizar" : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
