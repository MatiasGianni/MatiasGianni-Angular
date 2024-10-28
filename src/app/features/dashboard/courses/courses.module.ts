import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CoursesDetailComponent } from './courses-detail/courses-detail.component';
import { CoursesDialogComponent } from './courses-dialog/courses-dialog.component';



@NgModule({
  declarations: [
    CoursesComponent,
    CoursesDetailComponent,
    CoursesDialogComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
  ],
})
export class CoursesModule { }
