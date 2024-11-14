import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, concatMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Course } from '../../features/dashboard/courses/models';
import { generateRandomString } from '../../shared/utils';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private baseURL = environment.apiBaseURL; 

  constructor(private httpClient: HttpClient) {}

 
  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${this.baseURL}/courses`).pipe(
      catchError(this.handleError)
    );
  }


  getById(id: string): Observable<Course | undefined> {
    return this.getCourses().pipe(
      map((courses) => courses.find((course) => course.id === id))
    );
  }

 
  removeCourseById(id: string): Observable<Course[]> {
    return this.httpClient.delete<void>(`${this.baseURL}/courses/${id}`).pipe(
      concatMap(() => this.getCourses()), 
      catchError(this.handleError)
    );
  }


  updateCourseById(id: string, update: Partial<Course>): Observable<Course[]> {
    if (!id) {
      console.error("ID del curso no válido:", id); 
      return throwError(() => new Error('ID no válido')); 
    }
  
    return this.httpClient.patch<Course>(`${this.baseURL}/courses/${id}`, update).pipe(
      concatMap(() => this.getCourses()), 
    );
  }
  

 
  createCourse(newCourse: Omit<Course, 'id' | 'createdAt'>): Observable<Course[]> {
    const courseWithId = {
      ...newCourse,
      id: generateRandomString(4), 
      createdAt: new Date(),
    };
    return this.httpClient.post<Course>(`${this.baseURL}/courses`, courseWithId).pipe(
      concatMap(() => this.getCourses()), 
      catchError(this.handleError)
    );
  }

 
  private handleError(error: any): Observable<never> {
    console.error('Error occurred:', error);
    throw error; }
}
