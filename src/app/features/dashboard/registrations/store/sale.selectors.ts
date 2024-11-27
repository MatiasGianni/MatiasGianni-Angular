import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSale from './sale.reducer';

export const selectSaleState = createFeatureSelector<fromSale.State>(
  fromSale.saleFeatureKey
);

export const selectRegistrations = createSelector(
  selectSaleState,
  (state) => state.registrations
);

export const selectUserOptions = createSelector(
  selectSaleState,
  (state) => state.users
);

export const selectCourseOption = createSelector(
  selectSaleState,
  (state) => state.courses
);

export const selectIsLoading = createSelector(
  selectSaleState,
  (state) => state.isLoading
);

export const selectError = createSelector(
  selectSaleState,
  (state) => state.error
);
