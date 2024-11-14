import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterNewRoutingModule } from './register-new-routing.module';
import { RegisterNewComponent } from './register-new.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegisterNewComponent
  ],
  imports: [
    CommonModule,
    RegisterNewRoutingModule,
    SharedModule,
    ReactiveFormsModule
    
  ] 
})
export class RegisterNewModule { }
