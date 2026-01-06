import { schoolApi } from "@/api/schoolApi";

export const deleteStudentAction = async (id: string) => {
  await schoolApi.delete(`/students/${id}`);
  return id;
};