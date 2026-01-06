
import { useQuery } from "@tanstack/react-query";
import { getCoursesAction } from "../actions/get-courses.action";
import type { CoursesResponse } from "@/interface/courses.response";

export const useCourses = (page = 1, filters?: string) => {
  return useQuery<CoursesResponse[]>({
    queryKey: ["courses", { page, filters }],
    queryFn: () => getCoursesAction(page, filters),
    staleTime: 1000 * 60 * 5,
  });
};
