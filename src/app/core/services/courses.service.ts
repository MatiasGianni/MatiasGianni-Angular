import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Course } from '../../features/dashboard/courses/models';
import { generateRandomString } from '../../shared/utils';

let COURSES_DB: Course[] = [
  {
    id: 'ABCD',
    name: 'Curso de Introducción a la Programación',
    description: 'Fundamentos básicos de la programación y lógica computacional.',
    createdAt: new Date('2023-09-01'),
  },
  {
    id: 'EFGH',
    name: 'Frontend Profesional',
    description: 'Desarrollo avanzado de aplicaciones web con HTML, CSS y JavaScript.',
    createdAt: new Date('2023-10-10'),
  },
  {
    id: 'IJKL',
    name: 'Bases de Datos y SQL',
    description: 'Diseño de bases de datos y consultas SQL.',
    createdAt: new Date('2023-11-05'),
  },
  {
    id: 'MNOP',
    name: 'Desarrollo Web Full Stack',
    description: 'Desarrollo completo de aplicaciones web usando tecnologías modernas.',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: 'QRST',
    name: 'Ciberseguridad Básica',
    description: 'Introducción a prácticas y técnicas de ciberseguridad.',
    createdAt: new Date('2024-03-10'),
  },
];

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor() {}

  getById(id: string): Observable<Course | undefined> {
    return this.getCourses().pipe(
      map((courses) => courses.find((course) => course.id === id))
    );
  }

  getCourses(): Observable<Course[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(COURSES_DB);
        observer.complete();
      }, 1000);
    });
  }

  removeCourseById(id: string): Observable<Course[]> {
    COURSES_DB = COURSES_DB.filter((course) => course.id !== id);
    return of(COURSES_DB).pipe(delay(1000));
  }

  updateCourseById(id: string, update: Partial<Course>): Observable<Course[]> {
    COURSES_DB = COURSES_DB.map((course) =>
      course.id === id ? { ...course, ...update } : course
    );
    return of(COURSES_DB).pipe(delay(1000));
  }

  addCourse(newCourse: Omit<Course, 'id' | 'createdAt'>): Observable<Course[]> {
    const courseWithId = {
      ...newCourse,
      id: generateRandomString(4),
      createdAt: new Date(),
    };
    COURSES_DB = [...COURSES_DB, courseWithId];
    return of(COURSES_DB).pipe(delay(1000));
  }
}
