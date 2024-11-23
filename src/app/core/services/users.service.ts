import { Injectable } from '@angular/core';
import { User } from '../../features/dashboard/users/models';
import {
  catchError,
  concatMap,
  delay,
  map,
  Observable,
  of,
  throwError,
} from 'rxjs';
import { generateRandomString } from '../../shared/utils';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

let DATABASE: User[] = [
  {
    id: 'ABCD',
    firstName: 'Naruto',
    lastName: 'Uzumaki',
    createdAt: new Date('1999-09-21'),
    email: 'naruto.uzumaki@konoha.com',
    password: '1235',
    token: generateRandomString(15),
    role: 'Alum',
  },
  {
    id: 'EFGH',
    firstName: 'Monkey D.',
    lastName: 'Luffy',
    createdAt: new Date('1997-07-22'),
    email: 'luffy.d.monkey@strawhats.com',
    password: '4567',
    token: generateRandomString(15),
    role: 'Alum',
  },
  {
    id: 'IJKL',
    firstName: 'Goku',
    lastName: 'Son',
    createdAt: new Date('1984-12-03'),
    email: 'goku.son@saiyan.com',
    password: '7890',
    token: generateRandomString(15),
    role: 'Alum',
  },
  {
    id: 'MNOP',
    firstName: 'Izuku',
    lastName: 'Midoriya',
    createdAt: new Date('2014-07-07'),
    email: 'izuku.midoriya@ua.com',
    password: '2345',
    token: generateRandomString(15),
    role: 'Alum',
  },
  {
    id: 'QRST',
    firstName: 'Tanjiro',
    lastName: 'Kamado',
    createdAt: new Date('2016-02-15'),
    email: 'tanjiro.kamado@demon-slayer.com',
    password: '6789',
    token: generateRandomString(15),
    role: 'Alum',
  },
];
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseURL = environment.apiBaseURL;
  constructor(private httpClient: HttpClient) {}
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `El servidor devolvió el código: ${error.status}, mensaje de error: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
  getById(id: string): Observable<User | undefined> {
    return this.httpClient
      .get<User>(`${this.baseURL}/users/${id}`)
      .pipe(catchError(this.handleError));
  }
  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(`${this.baseURL}/users`)
      .pipe(catchError(this.handleError));
  }
  createUser(data: Omit<User, 'id'>): Observable<User> {
    return this.httpClient
      .post<User>(`${this.baseURL}/users`, {
        ...data,
        role: 'USER',
        password: generateRandomString(8),
        token: generateRandomString(15),
        createdAt: new Date().toISOString(),
      })
      .pipe(catchError(this.handleError));
  }
  removeUserById(id: string): Observable<User[]> {
    return this.httpClient.delete<User>(`${this.baseURL}/users/${id}`).pipe(
      concatMap(() => this.getUsers()),
      catchError(this.handleError)
    );
  }
  updateUserById(id: string, update: Partial<User>): Observable<User[]> {
    return this.httpClient
      .patch<User>(`${this.baseURL}/users/${id}`, update)
      .pipe(
        concatMap(() => this.getUsers()),
        catchError(this.handleError)
      );
  }
  addUser(newUser: User): Observable<User[]> {
    const newId = generateRandomString(4);
    const userWithId = { ...newUser, id: newId, createdAt: new Date() };
    DATABASE = [...DATABASE, userWithId];
    return of(DATABASE).pipe(delay(1000));
  }
}
