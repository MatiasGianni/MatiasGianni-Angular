import { createFeature, createReducer, on } from '@ngrx/store';
import { SaleActions } from './sale.actions';

export const saleFeatureKey = 'sale';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(SaleActions.loadSales, state => state),

);

export const saleFeature = createFeature({
  name: saleFeatureKey,
  reducer,
});

