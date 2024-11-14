import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationsRoutingModule } from './registrations-routing.module';
import { RegistrationsComponent } from './registrations.component';
import { EffectsModule } from '@ngrx/effects';
import { SaleEffects } from './store/sale.effects';
import { StoreModule } from '@ngrx/store';
import { saleFeature } from './store/sale.reducer';


@NgModule({
  declarations: [
    RegistrationsComponent
  ],
  imports: [
    CommonModule,
    RegistrationsRoutingModule,
    StoreModule.forFeature(saleFeature),
    EffectsModule.forFeature([SaleEffects])
  ]
})
export class RegistrationsModule { }
