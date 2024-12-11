import { createFeature, createReducer, on } from '@ngrx/store';
import { SaleActions } from './sale.actions';
import { Registration } from '../models';
import { User } from '../../users/models';
import { Course } from '../../courses/models';
import { state } from '@angular/animations';

export const saleFeatureKey = 'sale';

export interface State {
  registrations: Registration[];
  users: User[];
  courses: Course[];
  isLoading: boolean;
  error: Error | null;
}

export const initialState: State = {
  registrations: [],
  users: [],
  courses: [],
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,


  on(SaleActions.loadRegistrations, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(SaleActions.loadRegistrationsSuccess, (state, { data }) => ({
    ...state,
    registrations: data,
    isLoading: false,
    error: null,
  })),
  on(SaleActions.loadRegistrationsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),
  on(SaleActions.loadUsersAndCoursesOptions, (state) => {
    return {
      ...state
    };
  }),
  on(SaleActions.loadUsersAndCoursesOptionsSuccess, (state, action) => {
    return {
      ...state,
      loadInscriptionError: null,
      userOption: action.users,
      courseOption: action.courses
    };
  }),
  on(SaleActions.loadUsersAndCoursesOptionsFailure, (state, action) => {
    return {
      ...state,
      loadInscriptionError: action.error,
    }
  }),


  on(SaleActions.loadOptions, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(SaleActions.loadOptionsSuccess, (state, { users, courses }) => ({
    ...state,
    users,
    courses,
    isLoading: false,
    error: null,
  })),
  on(SaleActions.loadOptionsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),


  on(SaleActions.createRegistration, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),
  on(SaleActions.createRegistrationSuccess, (state, { data }) => ({
    ...state,
    registrations: data,
    isLoading: false,
    error: null,
  })),
  on(SaleActions.createRegistrationFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);

export const saleFeature = createFeature({
  name: saleFeatureKey,
  reducer,
});
