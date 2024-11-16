import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { generateRandomString } from '../../shared/utils';
import { User } from '../../features/dashboard/users/models';
@Injectable({
  providedIn: 'root',
})
export class RegisterNewService {
  private baseURL = environment.apiBaseURL;
  constructor(private httpClient: HttpClient) {}
  registerUser(
    newUser: Omit<User, 'id' | 'createdAt' | 'token'>
  ): Observable<User[]> {
    const userWithIdAndToken = {
      ...newUser,
      id: generateRandomString(4),
      createdAt: new Date().toISOString(),
      token: generateRandomString(15),
    };
    return this.httpClient
      .post<User>(`${this.baseURL}/users`, userWithIdAndToken)
      .pipe(
        concatMap(() => this.getUsers()),
        catchError(this.handleError)
      );
  }
  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(`${this.baseURL}/users`)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: any): Observable<never> {
    console.error('Error ocurrido:', error);
    if (error.error instanceof ErrorEvent) {
      console.error('Error en el cliente:', error.error.message);
    } else {
      console.error(`Código de error: ${error.status}`);
      console.error('Cuerpo del error:', error.error);
    }
    return throwError(() => new Error('Error en el servicio de registro.'));
  }
}
