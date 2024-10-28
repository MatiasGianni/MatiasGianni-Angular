import { Injectable } from '@angular/core';
import { User } from '../../features/dashboard/users/models';
import { delay, map, Observable, of } from 'rxjs';
import { generateRandomString } from '../../shared/utils';

let DATABASE: User[] = [
  {
    id: 'ABCD',
    firstName: 'Naruto',
    lastName: 'Uzumaki',
    createdAt: new Date('1999-09-21'),
    email: 'naruto.uzumaki@konoha.com',
  },
  {
    id: 'EFGH',
    firstName: 'Monkey D.',
    lastName: 'Luffy',
    createdAt: new Date('1997-07-22'),
    email: 'luffy.d.monkey@strawhats.com',
  },
  {
    id: 'IJKL',
    firstName: 'Goku',
    lastName: 'Son',
    createdAt: new Date('1984-12-03'),
    email: 'goku.son@saiyan.com',
  },
  {
    id: 'MNOP',
    firstName: 'Izuku',
    lastName: 'Midoriya',
    createdAt: new Date('2014-07-07'),
    email: 'izuku.midoriya@ua.com',
  },
  {
    id: 'QRST',
    firstName: 'Tanjiro',
    lastName: 'Kamado',
    createdAt: new Date('2016-02-15'),
    email: 'tanjiro.kamado@demon-slayer.com',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor() {}

  getById(id: string): Observable<User | undefined> {
    return this.getUsers().pipe(map((users) => users.find((u) => u.id === id)));
  }

  getUsers(): Observable<User[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(DATABASE);
        observer.complete();
      }, 1000);
    });
  }

  removeUserById(id: string): Observable<User[]> {
    DATABASE = DATABASE.filter((user) => user.id != id);
    return of(DATABASE).pipe(delay(1000));
  }

  updateUserById(id: string, update: Partial<User>): Observable<User[]> {
    DATABASE = DATABASE.map((user) =>
      user.id === id ? { ...user, ...update } : user
    );
    return of(DATABASE).pipe(delay(1000));
  }

  addUser(newUser: User): Observable<User[]> {
    const newId = generateRandomString(4); 
    const userWithId = { ...newUser, id: newId, createdAt: new Date() };
    DATABASE = [...DATABASE, userWithId];
    return of(DATABASE).pipe(delay(1000));
  }
}
