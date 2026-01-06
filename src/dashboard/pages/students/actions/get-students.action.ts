import { schoolApi } from "@/api/schoolApi";
import type { StudentsResponse } from "@/interface/students.response";

export const getStudentsAction = async (
  page = 1,
  filters?: string
): Promise<StudentsResponse[]> => {
  const { data } = await schoolApi.get<StudentsResponse[]>("/students", {
    params: { page, filters },
  });

  return data; // ← data ES UN ARRAY
};