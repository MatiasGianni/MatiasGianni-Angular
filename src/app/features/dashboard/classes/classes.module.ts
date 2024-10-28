import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesRoutingModule } from './classes-routing.module';
import { ClassesComponent } from './classes.component';
import { ClassesDetailComponent } from './classes-detail/classes-detail.component';
import { ClassesDialogComponent } from './classes-dialog/classes-dialog.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    ClassesComponent,
    ClassesDetailComponent,
    ClassesDialogComponent
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    SharedModule
  ],
  exports: [ClassesComponent]
})
export class ClassesModule { }
