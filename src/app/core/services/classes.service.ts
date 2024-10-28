import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Class } from '../../features/dashboard/classes/models';
import { generateRandomNumber, generateRandomString } from '../../shared/utils';

let CLASSES_DB: Class[] = [
  {
    id: 'ABCD',
    name: 'Introducción a la Programación',
    teacher: 'Laura Gómez',
    hours: generateRandomNumber(1, 80),
    classroom: generateRandomNumber(100, 9999),
  },
  {
    id: 'EFGH',
    name: 'Desarrollo Web Básico',
    teacher: 'Carlos Pérez',
    hours: 4,
    classroom: generateRandomNumber(100, 9999),
  },
  {
    id: 'IJKL',
    name: 'Bases de Datos',
    teacher: 'Ana Martínez',
    hours: generateRandomNumber(1, 80),
    classroom: generateRandomNumber(100, 9999),
  },
  {
    id: 'MNOP',
    name: 'Seguridad Informática',
    teacher: 'Mariana Torres',
    hours: generateRandomNumber(1, 80),
    classroom: generateRandomNumber(100, 9999),
  },
  {
    id: 'QRST',
    name: 'Algoritmos y Estructuras de Datos',
    teacher: 'Francisco Ramírez',
    hours: generateRandomNumber(1, 80),
    classroom: generateRandomNumber(100, 9999),
  },
];

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  constructor() {}

  getById(id: string): Observable<Class | undefined> {
    return this.getClasses().pipe(
      map((classes) => classes.find((classItem) => classItem.id === id))
    );
  }

  getClasses(): Observable<Class[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(CLASSES_DB);
        observer.complete();
      }, 1000);
    });
  }

  removeClassById(id: string): Observable<Class[]> {
    CLASSES_DB = CLASSES_DB.filter((classItem) => classItem.id !== id);
    return of(CLASSES_DB).pipe(delay(1000));
  }

  updateClassById(id: string, update: Partial<Class>): Observable<Class[]> {
    CLASSES_DB = CLASSES_DB.map((classItem) =>
      classItem.id === id ? { ...classItem, ...update } : classItem
    );
    return of(CLASSES_DB).pipe(delay(1000));
  }

  addClass(newClass: Omit<Class, 'id'>): Observable<Class[]> {
    const classWithId = {
      ...newClass,
      id: generateRandomString(4),
    };
    CLASSES_DB = [...CLASSES_DB, classWithId];
    return of(CLASSES_DB).pipe(delay(1000));
  }
}
