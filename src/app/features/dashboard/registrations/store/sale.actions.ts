import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Registration } from '../models';
import { User } from '../../users/models';
import { Course } from '../../courses/models';

export const SaleActions = createActionGroup({
  source: 'Sale',
  events: {
    'Load Sales': emptyProps(),
    'Load Sales Success': props<{data: Registration[]}>(),
    'Load Sales Failure': props<{error: Error}>(),
    'Load Course Options': emptyProps(),
    'Load User Options': emptyProps(),
    'Load Course Options Success': emptyProps(),
    'Load User Options Success': emptyProps(),
    'Create Registration': props<{ userId: string; courseId: string }>(),
    'Create Registration Failure': props<{ error: Error}>(),
    'Load Course and User options': emptyProps(),
    'Load Course and User options Success': props<{ users: User[], courses: Course[]}>,
    'Load Course and User options Failure': props<{error: Error}>,
  },
});
