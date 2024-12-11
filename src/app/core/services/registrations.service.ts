import { Injectable } from '@angular/core';
import { Registration } from '../../features/dashboard/registrations/models';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { User } from '../../features/dashboard/users/models';
import { Course } from '../../features/dashboard/courses/models';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private baseURL = `${environment.apiBaseURL}/registrations`;

  constructor(private httpClient: HttpClient) {}


  getRegistration(): Observable<Registration[]> {
    return this.httpClient.get<Registration[]>(
      `${this.baseURL}?_embed=user&_embed=course`
    );
  }

  createSale(
    payload: Omit<Registration, 'user' | 'course'>
  ): Observable<Registration[]> {
    return this.httpClient
      .post<Registration>(this.baseURL, payload)
      .pipe(concatMap(() => this.getRegistration()));
  }


  updateRegistration(id: string, payload: Omit<Registration, 'user' | 'course'>): Observable<Registration[]> {
    return this.httpClient
      .patch<Registration>(`${this.baseURL}/registrations/${id}`, payload)
      .pipe(concatMap(() => this.getRegistration())); 
  }
  


  deleteRegistration(id: string): Observable<Registration[]> {
    return this.httpClient
      .delete<Registration>(`${this.baseURL}/${id}`)
      .pipe(concatMap(() => this.getRegistration()));
  }


  getRegistrationsByUserId(userId: string): Observable<Registration[]> {
    return this.httpClient.get<Registration[]>(
      `${this.baseURL}?userId=${userId}&_embed=user&_embed=course`
    );
  }

  getRegistrationsByCourseId(courseId: string): Observable<Registration[]> {
    return this.httpClient.get<Registration[]>(
      `${this.baseURL}?courseId=${courseId}&_embed=user&_embed=course`
    );
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}/users`);
  }

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${this.baseURL}/courses`);
  }



}
