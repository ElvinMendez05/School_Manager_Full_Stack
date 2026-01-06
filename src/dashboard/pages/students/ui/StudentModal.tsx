import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useStudent } from "../hooks/useStudent";
import type { StudentsResponse } from "@/interface/students.response";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  student: StudentsResponse | null;
}

export const StudentModal = ({ isOpen, onClose, student }: Props) => {
  const { saveStudent } = useStudent();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<StudentsResponse>({
    defaultValues: student ?? {
      name: "",
      email: "",
      age: 18,
      active: true,
      course_id: null,
      course_name: null,
    },
  });

  // Mantener los valores sincronizados cuando el estudiante cambia o se abre el modal
  useEffect(() => {
    if (isOpen) {
      reset(student ?? {
        name: "",
        email: "",
        age: 18,
        active: true,
        course_id: null,
        course_name: null,
      });
    }
  }, [student, isOpen, reset]);

  const onSubmit = async (data: StudentsResponse) => {
    await saveStudent.mutateAsync({
      ...data,
      id: student?.id,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-900">
            {student ? "Editar Estudiante" : "Agregar Estudiante"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-4">
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              placeholder="Ej: Ana García"
              {...register("name", { required: "El nombre es requerido" })}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              {...register("email", { 
                required: "El email es requerido",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email inválido"
                }
              })}
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>

          {/* Edad */}
          <div className="space-y-2">
            <Label htmlFor="age">Edad</Label>
            <Input
              id="age"
              type="number"
              placeholder="15"
              {...register("age", { 
                required: "La edad es requerida",
                min: { value: 5, message: "Mínimo 5 años" },
                max: { value: 100, message: "Máximo 100 años" }
              })}
            />
            {errors.age && <p className="text-sm text-red-600">{errors.age.message}</p>}
          </div>

          {/* Estado / Switch */}
          <div className="flex items-center justify-between py-2">
            <div className="space-y-1">
              <Label htmlFor="active">Estado</Label>
              <p className="text-sm text-slate-500">Activar o desactivar estudiante</p>
            </div>
            <Controller
              name="active"
              control={control}
              render={({ field }) => (
                <Switch
                  id="active"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={saveStudent.isPending}
            >
              {saveStudent.isPending ? "Guardando..." : student ? "Actualizar" : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// import { useForm } from "react-hook-form";
// import { useStudent } from "../hooks/useStudent";
// import type { StudentsResponse } from "@/interface/students.response";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { Switch } from "@/components/ui/switch";

// interface Props {
//   isOpen: boolean;
//   onClose: () => void;
//   student: StudentsResponse | null;
// }

// export const StudentModal = ({ isOpen, onClose, student }: Props) => {
//   const { saveStudent } = useStudent();


//   const { register, handleSubmit } = useForm<StudentsResponse>({
//   defaultValues: student ?? {
//     name: "",
//     email: "",
//     age: 18,
//     active: true,
//     course_id: null,
//     course_name: null,
//   },
// });

//   const onSubmit = async (data: StudentsResponse) => {
//     await saveStudent.mutateAsync({
//       ...data,
//       id: student?.id,
//     });
//     onClose();
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <Input {...register("name", { required: true })} />
//           <Input {...register("email", { required: true })} />
//           <Input type="number" {...register("age", { min: 5 })} />
//           <Switch {...register("active")} />

//           <Button type="submit" disabled={saveStudent.isPending}>
//             {student ? "Actualizar" : "Crear"}
//           </Button>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };
