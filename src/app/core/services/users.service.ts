import { Injectable } from '@angular/core';
import { User } from '../../features/dashboard/users/models';
import { concatMap, delay, map, Observable, of } from 'rxjs';
import { generateRandomString } from '../../shared/utils';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

let DATABASE: User[] = [
  {
    id: 'ABCD',
    firstName: 'Naruto',
    lastName: 'Uzumaki',
    createdAt: new Date('1999-09-21'),
    email: 'naruto.uzumaki@konoha.com',
    passwoard: '1235',
    token: generateRandomString(15),
  },
  {
    id: 'EFGH',
    firstName: 'Monkey D.',
    lastName: 'Luffy',
    createdAt: new Date('1997-07-22'),
    email: 'luffy.d.monkey@strawhats.com',
    passwoard: '4567',
    token: generateRandomString(15),
  },
  {
    id: 'IJKL',
    firstName: 'Goku',
    lastName: 'Son',
    createdAt: new Date('1984-12-03'),
    email: 'goku.son@saiyan.com',
    passwoard: '7890',
    token: generateRandomString(15),
  },
  {
    id: 'MNOP',
    firstName: 'Izuku',
    lastName: 'Midoriya',
    createdAt: new Date('2014-07-07'),
    email: 'izuku.midoriya@ua.com',
    passwoard: '2345',
    token: generateRandomString(15),
  },
  {
    id: 'QRST',
    firstName: 'Tanjiro',
    lastName: 'Kamado',
    createdAt: new Date('2016-02-15'),
    email: 'tanjiro.kamado@demon-slayer.com',
    passwoard: '6789',
    token: generateRandomString(15),
  },
];

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseURL = environment.apiBaseURL;

  constructor(private httpClient: HttpClient) {}

  getById(id: string): Observable<User | undefined> {
    return this.httpClient.get<User>(`${this.baseURL}/users/${id}`);
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseURL}/users`);
  }

  createUser(data: Omit<User, 'id'>): Observable<User> {
    return this.httpClient.post<User>(`${this.baseURL}/users`, {
      ...data,
      role: "USER",
      password: generateRandomString(8),
      token: generateRandomString(15),
      createdAt: new Date().toISOString(),
    });
  }

  removeUserById(id: string): Observable<User[]> {
    return this.httpClient
    .delete<User>(`${this.baseURL}/users/${id}`)
    .pipe(concatMap(() => this.getUsers()));
  }

  updateUserById(id: string, update: Partial<User>): Observable<User[]> {
    return this.httpClient.patch<User>(`${this.baseURL}/users/${id}`, update)
    .pipe(concatMap(() => this.getUsers()));
  }

  addUser(newUser: User): Observable<User[]> {
    const newId = generateRandomString(4);
    const userWithId = { ...newUser, id: newId, createdAt: new Date() };
    DATABASE = [...DATABASE, userWithId];
    return of(DATABASE).pipe(delay(1000));
  }
}
