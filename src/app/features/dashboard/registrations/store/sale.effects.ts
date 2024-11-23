import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { SaleActions } from './sale.actions';
import { RegistrationService } from '../../../../core/services/registrations.service';
import { Action } from '@ngrx/store';
import { UsersService } from '../../../../core/services/users.service';
import { CoursesService } from '../../../../core/services/courses.service';

@Injectable()
export class SaleEffects {
  
 

loadSales$: Actions<Action<string>>;
createSale$: Action<Action<string>>;
createSaleSuccess$: Actions<Action<string>>;
loadCourseAndUserOptions$: Action<Action<string>>;

  constructor(
    private actions$: Actions,
    private RegistrationService: RegistrationService,
    private userService: UsersService,
    private courseService: CoursesService,
  ) {
    this.loadSales$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SaleActions.loadSales),
        concatMap(() =>
          this.RegistrationService.getRegistration().pipe(
            map((response) => SaleActions.loadSalesSuccess({ data: response })),
            catchError((error) => of(SaleActions.loadSalesFailure({ error })))
          )
        )
      );
    });
    this.actions$.subscribe(console.log);

    this.createSale$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SaleActions.createRegistration),
        concatMap((action) => this.RegistrationService.createSale({courseId: action.courseId, userId: action.userId,}).pipe(
          map((data) => SaleActions.createRegistration({data}))
        catchError((error) => of(SaleActions.createRegistrationFailure({error})))
        ))
      )
    })

    this.createSaleSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(SaleActions.createRegistration),
        map(() => SaleActions.loadSales())
      );
    });
    this.loadCourseAndUserOptions$ = createEffect() => {
      return this.actions$.pipe(
        ofType(SaleActions.loadCourseAndUserOptions),
        concatMap(() => forkJoin([this.courseService.getCourses(),
          this.userService.getUsers(),
        ]).pipe(
          map((res) => SaleActions.loadCourseAndUserOptionsSuccess({
            course: res[0],
            users: res[1],
          })
        ),
        catchError((error) =>
        of(SaleActions.loadCourseAndUserOptionsFailure({error}))
      )
        )

        )
      )
    }
  }
}
