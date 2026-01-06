import { schoolApi } from "@/api/schoolApi";
import type { CoursesResponse } from "@/interface/courses.response";

export const getCoursesAction = async (
  page = 1,
  filters?: string
): Promise<CoursesResponse[]> => {
  const { data } = await schoolApi.get<CoursesResponse[]>("/courses", {
    params: { page, filters },
  });

  return data; // ← data ES UN ARRAY
};