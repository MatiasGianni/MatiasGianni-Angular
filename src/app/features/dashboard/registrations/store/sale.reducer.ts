import { createFeature, createReducer, on } from '@ngrx/store';
import { SaleActions } from './sale.actions';
import { Registration } from '../models';
import { Course } from '../../courses/models';
import { User } from '../../users/models';
export const saleFeatureKey = 'sale';
export interface State {
  isLoadingSales: boolean;
  loadSalesError: Error | null,
  registrations: Registration[];
  courseOptions: Course[];
  userOptions: User[];
}
export const initialState: State = {
  isLoadingSales: false,
  loadSalesError:null,
  registrations: [],
  courseOptions: [],
  userOptions: [],
};
export const reducer = createReducer(
  initialState,
  on(SaleActions.loadSales, (state) => {
    return {
      ...state,
      isLoadingSales: true
    };
  }),
  on(SaleActions.loadSales, (state) => {
    return {
      ...state,
      isLoadingSales: true,
    };
  }),
on(SaleActions.loadSalesSuccess, (state, action) => {
  return{
    ...state,
    sales:action.data,
    loadSalesError:null,
    isLoadingSales:false,
  }
}),
on(SaleActions.loadSalesFailure, (state, action) => {
  return {
    ...state,
    ...initialState,
    loadSalesError: action.error,
    isLoadingSales: false,
  };
}),

on(SaleActions.loadCourseAndUserOptions, (state) => {
  return {
    ...state,
    isLoadingSales: true,
  };
}),
on(SaleActions.loadCourseAndUserOptionsSuccess, (state, action) => {
  return {
    ...state,
    loadSalesError: null,
    isLoadingSales: false,
    productOptions: action.course,
    userOptions: action.users,
  };
}),
on(SaleActions.loadCourseAndUserOptionsFailure, (state, { error }) => {
  return {
    ...state,
    loadSalesError: error,
    isLoadingSales: false,
  };
})
);
export const saleFeature = createFeature({
  name: saleFeatureKey,
  reducer,
});
