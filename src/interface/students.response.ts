export interface StudentsResponse {
    id:          string;
    name:        string;
    email:       string;
    age:         number;
    active:      boolean;
    course_id:   null | string;
    course_name: null | string;
}
