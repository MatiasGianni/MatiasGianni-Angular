import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassesComponent } from './classes.component';
import { ClassesDetailComponent } from './classes-detail/classes-detail.component';

const routes: Routes = [
  {
    path:"",
    component:ClassesComponent
  },
  {
    path: ":id/detail",
    component: ClassesDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
