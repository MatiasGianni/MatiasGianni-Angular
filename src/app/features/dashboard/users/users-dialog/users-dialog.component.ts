import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';

interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: Date;
}

interface UserDialogData {
  editingUser?: User;
}
@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styles: ``,
})
export class UsersDialogComponent {
  userForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<UsersDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: UserDialogData
  ) {
    this.userForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });
    this.patchFormValue();
  }

  private get isEditing() {
    return !!this.data!.editingUser;
  }

  patchFormValue() {
    if (this.data?.editingUser) {
      this.userForm.patchValue(this.data.editingUser);
    }
  }

  onSave(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({
        ...this.userForm.value,
        id: this.isEditing
          ? this.data!.editingUser!.id
          : generateRandomString(4),
          createdAt: this.isEditing
          ? this.data!.editingUser!.createdAt 
          : new Date(),
      });
    }
  }
}
