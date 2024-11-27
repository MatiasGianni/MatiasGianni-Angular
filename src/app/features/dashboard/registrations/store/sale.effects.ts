import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { SaleActions } from './sale.actions';
import { RegistrationService } from '../../../../core/services/registrations.service';
import { UsersService } from '../../../../core/services/users.service';
import { CoursesService } from '../../../../core/services/courses.service';

@Injectable()
export class SaleEffects {
  constructor(
    private actions$: Actions,
    private registrationService: RegistrationService,
    private userService: UsersService,
    private courseService: CoursesService
  ) {}


  loadRegistrations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.loadRegistrations),
      concatMap(() =>
        this.registrationService.getRegistration().pipe(
          map((data) => SaleActions.loadRegistrationsSuccess({ data })),
          catchError((error) => of(SaleActions.loadRegistrationsFailure({ error })))
        )
      )
    )
  );


  loadOptions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.loadOptions),
      concatMap(() =>
        forkJoin({
          courses: this.courseService.getCourses(),
          users: this.userService.getUsers(),
        }).pipe(
          map(({ courses, users }) =>
            SaleActions.loadOptionsSuccess({ courses, users })
          ),
          catchError((error) =>
            of(SaleActions.loadOptionsFailure({ error }))
          )
        )
      )
    )
  );


  createRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.createRegistration),
      concatMap((action) => 
        this.registrationService.createSale({
          id: action.id,           
          courseId: action.courseId, 
          userId: action.userId     
        }).pipe(
          map((data) =>
            SaleActions.createRegistrationSuccess({ data }) 
          ),
          catchError((error) =>
            of(SaleActions.createRegistrationFailure({ error })) 
          )
        )
      )
    )
  );

 
  reloadAfterCreate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.createRegistrationSuccess),
      map(() => SaleActions.loadRegistrations())
    )
  );


  deleteRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.deleteRegistration),
      concatMap((action) =>
        this.registrationService.deleteRegistration(action.id).pipe(
          map(() => SaleActions.deleteRegistrationSuccess()),
          catchError((error) =>
            of(SaleActions.deleteRegistrationFailure({ error }))
          )
        )
      )
    )
  );

  
  updateRegistration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SaleActions.updateRegistration),
      concatMap((action) =>
        this.registrationService
          .updateRegistration(action.id, action.registration) 
          .pipe(
            map(() => SaleActions.updateRegistrationSuccess()), 
            catchError((error) =>
              of(SaleActions.updateRegistrationFailure({ error }))
            )
          )
      )
    )
  );
  
  
}
