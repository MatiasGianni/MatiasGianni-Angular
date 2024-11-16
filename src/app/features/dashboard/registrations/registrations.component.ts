import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SaleActions } from './store/sale.actions';
import { Observable } from 'rxjs';
import { Registration } from './models';
import { selecRegis, selectCourseOptions, selectUserOptions } from './store/sale.selectors';
import { User } from '../users/models';
import { Course } from '../courses/models';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrl: './registrations.component.scss'
})
export class RegistrationsComponent implements OnInit {
  regis$: Observable<Registration[]>;
  userOptions$: Observable<User[]>;
  courseOptions$: Observable<Course[]>;
  constructor (private store: Store) {
    this.regis$ = this.store.select(selecRegis);
    this.userOptions$ = this.store.select(selectUserOptions);
    this.courseOptions$ = this.store.select(selectCourseOptions);
  }

  ngOnInit(): void {
    this.store.dispatch(SaleActions.loadSales());
    this.store.dispatch(SaleActions.loadCourseOptions());
    this.store.dispatch(SaleActions.loadUserOptions());

  }
}
