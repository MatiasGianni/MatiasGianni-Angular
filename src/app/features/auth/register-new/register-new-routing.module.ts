import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterNewModule } from './register-new.module';

const routes: Routes = [
  {
    path:"",
    component:RegisterNewModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterNewRoutingModule { }
