import { Course } from "../../courses/models";
import { User } from "../../users/models";

export interface Registration {
    id: string;
    userId: string;
    courseId: string;
    user?: User;
    course?: Course;
}