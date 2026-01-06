import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateCourseAction } from "../actions/create-update-courses.action";
import { deleteCourseAction } from "../actions/delete-courses.action";
import type { CoursesResponse } from "@/interface/courses.response";

export const useCourse = () => {
  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: createUpdateCourseAction,
    onSuccess: (course: CoursesResponse) => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.setQueryData(["student", course.id], course);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCourseAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  return {
    saveStudent: saveMutation,
    deleteStudent: deleteMutation,
  };
};
