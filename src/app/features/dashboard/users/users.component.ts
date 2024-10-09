import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { User } from './models';

let ELEMENT_DATA: User[] = [
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

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt', 'actions'];
  dataSource: User[] = ELEMENT_DATA;

  constructor(private matDialog: MatDialog) {}

  onDelete(id: string) {
    this.dataSource = this.dataSource.filter((user) => user.id !== id);
  }

  openModal(editingUser?: User): void {
    this.matDialog
      .open(UsersDialogComponent, {
        data: {
          editingUser,
        },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          console.log('Recibimos:', result);

          if (!!result) {
            if (editingUser) {
              this.dataSource = this.dataSource.map((user) =>
                user.id === editingUser.id ? { ...user, ...result } : user
              );
            } else {
              this.dataSource = [...this.dataSource, result];
            }
          }
        },
      });
  }
}
