import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Course } from "../../features/dashboard/courses/models";
import { generateRandomString } from "../../shared/utils";

let COURSES_DB: Course[] = [
    {
        id: generateRandomString(4),
        name: "Curso de Introducción a la Programación",
        description: "Fundamentos básicos de la programación y lógica computacional.",
        createdAt: new Date("2023-09-01"),
    },
    {
        id: generateRandomString(4),
        name: "Frontend Profesional",
        description: "Desarrollo avanzado de aplicaciones web con HTML, CSS y JavaScript.",
        createdAt: new Date("2023-10-10"),
    },
    {
        id: generateRandomString(4),
        name: "Bases de Datos y SQL",
        description: "Diseño de bases de datos y consultas SQL.",
        createdAt: new Date("2023-11-05"),
    },
    {
        id: generateRandomString(4),
        name: "Desarrollo Web Full Stack",
        description: "Desarrollo completo de aplicaciones web usando tecnologías modernas.",
        createdAt: new Date("2024-02-15"),
    },
    {
        id: generateRandomString(4),
        name: "Ciberseguridad Básica",
        description: "Introducción a prácticas y técnicas de ciberseguridad.",
        createdAt: new Date("2024-03-10"),
    }
];

@Injectable({providedIn: "root"})
export class CoursesService {

    getCourse(): Observable<Course[]> {
        return of([...COURSES_DB]);
    }

    createCourses(course: Omit<Course, 'id' | 'createdAt'>): Observable<Course> {
        const courseCreated = {
            ...course,
            id: generateRandomString(4),
            createdAt: new Date(),
        };
        COURSES_DB.push(courseCreated);
        return of(courseCreated);
    }

    updateCourse(id: string, updatedCourse: Partial<Course>): Observable<Course[]> {
        COURSES_DB = COURSES_DB.map(course => 
            course.id === id ? { ...course, ...updatedCourse } : course
        );
        return of(COURSES_DB);
    }

    deleteCourse(id: string): Observable<Course[]> {
        COURSES_DB = COURSES_DB.filter(course => course.id !== id);
        return of(COURSES_DB);
    }
}
