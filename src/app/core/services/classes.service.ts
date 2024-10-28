import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Class } from '../../features/dashboard/classes/models';
import { generateRandomNumber, generateRandomString } from '../../shared/utils';

let CLASSES_DB: Class[] = [
    {
        id: generateRandomString(4),
        name: "Introducción a la Programación",
        teacher: "Laura Gómez",
        hours: generateRandomNumber(1, 80),
        classroom: generateRandomNumber(100, 9999),
    },
    {
        id: generateRandomString(4),
        name: "Desarrollo Web Básico",
        teacher: "Carlos Pérez",
        hours: 4,
        classroom: generateRandomNumber(100, 9999),
    },
    {
        id: generateRandomString(4),
        name: "Bases de Datos",
        teacher: "Ana Martínez",
        hours: generateRandomNumber(1, 80),
        classroom: generateRandomNumber(100, 9999),
    },
    {
        id: generateRandomString(4),
        name: "Seguridad Informática",
        teacher: "Mariana Torres",
        hours: generateRandomNumber(1, 80),
        classroom: generateRandomNumber(100, 9999),
    },
    {
        id: generateRandomString(4),
        name: "Algoritmos y Estructuras de Datos",
        teacher: "Francisco Ramírez",
        hours: generateRandomNumber(1, 80),
        classroom: generateRandomNumber(100, 9999),
    }
];

@Injectable({ providedIn: 'root' })
export class ClassesService {
    getClasses(): Observable<Class[]> {
        return of([...CLASSES_DB]); 
    }

    createClass(newClass: Omit<Class, 'id'>): Observable<Class> {
        const classCreated = {
            ...newClass,
            id: generateRandomString(4), 
        };
        CLASSES_DB.push(classCreated); 
        return of(classCreated); 
    }

    updateClass(id: string, updatedClass: Partial<Class>): Observable<Class[]> {
        CLASSES_DB = CLASSES_DB.map(existingClass => 
            existingClass.id === id ? { ...existingClass, ...updatedClass } : existingClass 
        );
        return of(CLASSES_DB); 
    }

    deleteClass(id: string): Observable<Class[]> {
        CLASSES_DB = CLASSES_DB.filter(existingClass => existingClass.id !== id); 
        return of(CLASSES_DB); 
    }
}
