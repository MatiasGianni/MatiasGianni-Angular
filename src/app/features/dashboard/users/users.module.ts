import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MatButtonModule } from '@angular/material/button';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [UsersComponent, UsersDialogComponent],
  imports: [CommonModule, UsersRoutingModule, MatButtonModule,SharedModule],
  exports: [UsersComponent],
})
export class UsersModule {}