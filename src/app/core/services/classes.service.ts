import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Class } from "../../features/dashboard/classes/models";
import { generateRandomNumber, generateRandomString } from "../../shared/utils";

let CLASSES_DB: Class[] = [
    {
        id: generateRandomString(4),
        name: "Introducción a la Programación",
        teacher: "Laura Gómez",
        hours: generateRandomNumber(1,80),
        classroom: generateRandomNumber(100,9999),
    },
    {
        id: generateRandomString(4),
        name: "Desarrollo Web Básico",
        teacher: "Carlos Pérez",
        hours: 4,
        classroom: generateRandomNumber(100,9999),
    },
    {
        id: generateRandomString(4),
        name: "Bases de Datos",
        teacher: "Ana Martínez",
        hours: generateRandomNumber(1,80),
        classroom: generateRandomNumber(100,9999),
    },
    {
        id: generateRandomString(4),
        name: "Seguridad Informática",
        teacher: "Mariana Torres",
        hours: generateRandomNumber(1,80),
        classroom: generateRandomNumber(100,9999),
    },
    {
        id: generateRandomString(4),
        name: "Algoritmos y Estructuras de Datos",
        teacher: "Francisco Ramírez",
        hours: generateRandomNumber(1,80),
        classroom: generateRandomNumber(100,9999),
    }
];


@Injectable({providedIn: "root"})
export class ClassesService{

    getClasses(): Observable<Class[]>{
        return of([...CLASSES_DB]);
    }

    
}