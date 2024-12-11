import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { SaleActions } from './sale.actions';
import { RegistrationService } from '../../../../core/services/registrations.service';
import { UsersService } from '../../../../core/services/users.service';
import { CoursesService } from '../../../../core/services/courses.service';
import { Action } from '@ngrx/store';

@Injectable()
export class SaleEffects {
  loadRegistrations$: Actions<Action<string>>;
  loadOptions$: Actions<Action<string>>;
  loadUserAndCourseOptions$: Actions<Action<string>>;
  createRegistration$: Actions<Action<string>>;
  reloadAfterCreate$: Actions<Action<string>>;
  deleteRegistration$: Actions<Action<string>>;
  updateRegistration$: Actions<Action<string>>;
  constructor(
    private actions$: Actions,
    private registrationService: RegistrationService,
    private userService: UsersService,
    private courseService: CoursesService
  ) {
    this.loadRegistrations$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SaleActions.loadRegistrations),
        concatMap(() =>
          this.registrationService.getRegistration().pipe(
            map((response) =>
              SaleActions.loadRegistrationsSuccess({ data: response })
            ),
            catchError((error) =>
              of(SaleActions.loadRegistrationsFailure({ error }))
            )
          )
        )
      );
    });

    this.loadOptions$ = createEffect(() =>
      this.actions$.pipe(
        ofType(SaleActions.loadUsersAndCoursesOptions), 
        concatMap(() =>
          forkJoin({
            courses: this.courseService.getCourses(), 
            users: this.userService.getUsers(), 
          }).pipe(
            map(({ courses, users }) => {
   
              return SaleActions.loadOptionsSuccess({ courses, users });
            }),
            catchError((error) => {
             
              return of(SaleActions.loadOptionsFailure({ error }));
            })
          )
        )
      )
    );
    

    this.loadUserAndCourseOptions$ = createEffect( () => {
      return this.actions$.pipe(
        ofType(SaleActions.loadUsersAndCoursesOptions),
        concatMap( () => 
          forkJoin([
            this.courseService.getCourses(),
            this.userService.getUsers()
          ]).pipe(
            map((res) => 
              SaleActions.loadUsersAndCoursesOptionsSuccess({
                courses: res[0],
                users: res[1]
              })
            ),
            catchError((err) => of(SaleActions.loadUsersAndCoursesOptionsFailure(err)))
          )
        )
      )
    });

    this.createRegistration$ = createEffect(() =>
      this.actions$.pipe(
        ofType(SaleActions.createRegistration),
        concatMap((action) =>
          this.registrationService
            .createSale({
              id: action.id,
              courseId: action.courseId,
              userId: action.userId,
            })
            .pipe(
              map((data) => SaleActions.createRegistrationSuccess({ data })),
              catchError((error) =>
                of(SaleActions.createRegistrationFailure({ error }))
              )
            )
        )
      )
    );

    this.reloadAfterCreate$ = createEffect(() =>
      this.actions$.pipe(
        ofType(SaleActions.createRegistrationSuccess),
        map(() => SaleActions.loadRegistrations())
      )
    );

    this.deleteRegistration$ = createEffect(() =>
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

    this.updateRegistration$ = createEffect(() =>
      this.actions$.pipe(
        ofType(SaleActions.updateRegistration),

        concatMap((action) => {
          return this.registrationService
            .updateRegistration(action.id, action.registration)
            .pipe(
              map(() => {
                return SaleActions.updateRegistrationSuccess();
              }),
              catchError((error) => {
                console.error('Error occurred:', error);
                return of(SaleActions.updateRegistrationFailure({ error }));
              })
            );
        })
      )
    );
  }
}
