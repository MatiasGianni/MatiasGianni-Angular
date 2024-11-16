import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSale from './sale.reducer';

export const selectSaleState = createFeatureSelector<fromSale.State>(
  fromSale.saleFeatureKey
);

export const selecRegis = createSelector(
  selectSaleState,
  (state) => state.registrations
)

export const selectCourseOptions = createSelector(
  selectSaleState,
  (state) => state.courseOptions
)

export const selectUserOptions = createSelector(
  selectSaleState,
  (state) => state.userOptions
)