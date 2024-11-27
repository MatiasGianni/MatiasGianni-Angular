import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SaleActions } from './store/sale.actions';
import { Observable } from 'rxjs';
import { Registration } from './models';
import {
  selectError,
  selectRegistrations,
} from './store/sale.selectors';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationDialogComponent } from './registrations-dialog/registrations-dialog.component';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.scss'],
})
export class RegistrationsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'course', 'student', 'actions'];
  regis$: Observable<Registration[]>;
  loadSalesError$: Observable<Error | null>;

  constructor(private store: Store, private matDialog: MatDialog) {
    this.regis$ = this.store.select(selectRegistrations);
    this.loadSalesError$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(SaleActions.loadRegistrations());
    this.store.dispatch(SaleActions.loadUsersAndCoursesOptions());
  }

  onDelete(id: string): void {
    if (confirm('¿Está seguro que desea eliminar esta inscripción?')) {
      this.store.dispatch(SaleActions.deleteRegistration({ id }));
    }
  }

  openModal(editingRegistration?: Registration): void {
    this.matDialog
      .open(RegistrationDialogComponent, {
        height: '50%',
        width: '60%',
        data: { editingRegistration },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          if (editingRegistration) {
            this.store.dispatch(
              SaleActions.updateRegistration({ id: result.id, registration: result })
            );
          } else {
            this.store.dispatch(SaleActions.createRegistration(result));
          }
        }
      });
  }
}
