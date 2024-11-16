import { createFeature, createReducer, on } from '@ngrx/store';
import { SaleActions } from './sale.actions';
import { Registration } from '../models';
import { state } from '@angular/animations';
import { Course } from '../../courses/models';
import { User } from '../../users/models';

const REGIS_DB: Registration[] = [
  {
    id: 'asda23',
    userId: 'asd',
    courseId: 'asd2',
  },
];

const COURSE_DB: Course[] = [
  {
    id: "ABCD",
    name: "Curso de Introducción a la Programación",
    description: "Fundamentos básicos de la programación y lógica computacional.",
    createdAt: new Date("2023-09-01T00:00:00Z")
  }
]

const USER_DB: User[] = [
  {
    id: "ABCD",
      firstName: "Naruto",
      lastName: "Uzumaki",
      email: "naruto.uzumaki@konoha.com",
      password: "1235",
      role: "USER",
      token: "asdGFdfgdfHGBFghfghfghFgdfGDfcv",
      createdAt: new Date("1999-09-21T00:00:00.000Z"),
  }
]

export const saleFeatureKey = 'sale';

export interface State {
  registrations: Registration[];
  courseOptions: Course[];
  userOptions: User[];
}

export const initialState: State = {
  registrations: [],
  courseOptions: [],
  userOptions: [],
};

export const reducer = createReducer(
  initialState,
  on(SaleActions.loadSales, (state) => {
    return {
      ...state,
      sales: [...REGIS_DB],
    };
  }),
  on(SaleActions.loadUserOptions, (state) => {
    return{
      ...state,
      userOptions: [...USER_DB]
    }
  }),
  on(SaleActions.loadCourseOptions, (state) => {
    return{
      ...state,
      courseOptions: [...COURSE_DB]
    }
  })
);

export const saleFeature = createFeature({
  name: saleFeatureKey,
  reducer,
});
