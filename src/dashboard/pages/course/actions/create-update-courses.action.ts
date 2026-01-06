import { schoolApi } from "@/api/schoolApi";
import type { CoursesResponse } from "@/interface/courses.response";

export const createUpdateCourseAction = async (
  course: Partial<CoursesResponse> & { id?: string }
): Promise<CoursesResponse> => {
  const isCreating = !course.id;

  const payload = {
    name: course.name,
    description: course.description,
    created_at: course.created_at,
  };

  const { data } = await schoolApi<CoursesResponse>({
    url: isCreating ? "/courses" : `/courses/${course.id}`,
    method: isCreating ? "POST" : "PATCH",
    data: payload,
  });

  return data;
};

