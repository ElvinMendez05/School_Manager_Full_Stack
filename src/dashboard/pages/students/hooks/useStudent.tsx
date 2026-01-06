import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateStudentAction } from "../actions/create-update-students.action";
import { deleteStudentAction } from "../actions/delete-students.action";
import type { StudentsResponse } from "@/interface/students.response";

export const useStudent = () => {
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: createUpdateStudentAction,
    onSuccess: (student: StudentsResponse) => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.setQueryData(["student", student.id], student);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteStudentAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });

  return {
    saveStudent: saveMutation,
    deleteStudent: deleteMutation,
  };
};
