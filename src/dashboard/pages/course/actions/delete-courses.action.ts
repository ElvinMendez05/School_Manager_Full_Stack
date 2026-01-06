import { schoolApi } from "@/api/schoolApi";

export const deleteCourseAction = async (id: string) => {
  await schoolApi.delete(`/courses/${id}`);
  return id;
};