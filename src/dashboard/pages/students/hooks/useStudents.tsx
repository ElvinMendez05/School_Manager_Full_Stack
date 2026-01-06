
import { useQuery } from "@tanstack/react-query";
import { getStudentsAction } from "../actions/get-students.action";
import type { StudentsResponse } from "@/interface/students.response";

export const useStudents = (page = 1, filters?: string) => {
  return useQuery<StudentsResponse[]>({
    queryKey: ["students", { page, filters }],
    queryFn: () => getStudentsAction(page, filters),
    staleTime: 1000 * 60 * 5,
  });
};
