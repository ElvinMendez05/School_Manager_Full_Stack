import { schoolApi } from "@/api/schoolApi";
import type { StudentsReponse } from "@/interface/students.response";

export const createUpdateStudentAction = async (
  student: Partial<StudentsReponse> & { id?: string }
): Promise<StudentsReponse> => {
  const isCreating = !student.id;

  const payload = {
    name: student.name,
    email: student.email,
    age: student.age,
    active: student.active,
    course_id: student.course_id ?? undefined,
  };

  const { data } = await schoolApi<StudentsReponse>({
    url: isCreating ? "/students" : `/students/${student.id}`,
    method: isCreating ? "POST" : "PATCH",
    data: payload,
  });

  return data;
};
