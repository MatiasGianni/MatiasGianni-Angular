import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Registration } from '../models';
import { User } from '../../users/models';
import { Course } from '../../courses/models';

export const SaleActions = createActionGroup({
  source: 'Sale',
  events: {
    'Load Registrations': emptyProps(),
    'Load Registrations Success': props<{ data: Registration[] }>(),
    'Load Registrations Failure': props<{ error: Error }>(),

    'Load Options': emptyProps(),
    'Load Options Success': props<{ users: User[]; courses: Course[] }>(),
    'Load Options Failure': props<{ error: Error }>(),

    'Load Users and Courses Options': emptyProps(),
    'Load Users and Courses Options Success': props<{ users: User[], courses: Course[]}>(),
    'Load Users and Courses Options Failure': props<{ error: Error}>(),

    'Create Registration': props<{ id: string; userId: string; courseId: string }>(),
    'Create Registration Success': props<{ data: Registration[] }>(),
    'Create Registration Failure': props<{ error: Error }>(),

    'Delete Registration': props<{ id: string }>(),
    'Delete Registration Success': emptyProps(),
    'Delete Registration Failure': props<{ error: Error }>(),

    'Update Registration': props<{ id: string; registration: Omit<Registration, 'user' | 'course'> }>(),
    'Update Registration Success': emptyProps(),
    'Update Registration Failure': props<{ error: Error }>(),

  },
});
