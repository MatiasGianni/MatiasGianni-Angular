import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Class } from '../../features/dashboard/classes/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  private baseURL = environment.apiBaseURL; 
  constructor(private httpClient: HttpClient) {}
  getClasses(): Observable<Class[]> {
    return this.httpClient.get<Class[]>(`${this.baseURL}/classes`);
  }
  getById(id: string): Observable<Class> {
    return this.httpClient.get<Class>(`${this.baseURL}/classes/${id}`);
  }
  removeClassById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/classes/${id}`);
  }
  updateClassById(id: string, update: Partial<Class>): Observable<Class> {
    return this.httpClient.patch<Class>(`${this.baseURL}/classes/${id}`, update);
  }
  addClass(newClass: Omit<Class, 'id'>): Observable<Class> {
    return this.httpClient.post<Class>(`${this.baseURL}/classes`, newClass);
  }
}
