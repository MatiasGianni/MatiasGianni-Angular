import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const SaleActions = createActionGroup({
  source: 'Sale',
  events: {
    'Load Sales': emptyProps(),
    'Load Course Options': emptyProps(),
    'Load User Options': emptyProps(),
    'Create Registration': props<{ userId: string; courseId: string }>(),
  },
});
