import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterNewRoutingModule } from './register-new-routing.module';
import { RegisterNewComponent } from './register-new.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    RegisterNewComponent
  ],
  imports: [
    CommonModule,
    RegisterNewRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
    
  ] 
})
export class RegisterNewModule { }
