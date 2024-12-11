import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import {
  
  selectCourseOption,
  selectUserOptions,
} from '../store/sale.selectors';
import { SaleActions } from '../store/sale.actions';
import { generateRandomString } from '../../../../shared/utils';
import { Registration } from '../models';
import { User } from '../../users/models';
import { Course } from '../../courses/models';

interface RegistrationDialogData {
  editingRegistration?: Registration;
}

@Component({
  selector: 'app-registrations-dialog',
  templateUrl: './registrations-dialog.component.html',
  styleUrl: './registrations-dialog.component.scss'
})
export class RegistrationDialogComponent implements OnInit {
  registrationForm: FormGroup;
  userOptions$: Observable<User[]>;
  courseOptions$: Observable<Course[]>;

  constructor(
    private matDialogRef: MatDialogRef<RegistrationDialogComponent>,
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data?: RegistrationDialogData
  ) {
    this.registrationForm = this.formBuilder.group({
      userId: [null, [Validators.required]],
      courseId: [null, [Validators.required]],
    });

    this.userOptions$ = this.store.select(selectUserOptions);
    this.courseOptions$ = this.store.select(selectCourseOption);
    this.patchFormValue();
  }

  private get isEditing(): boolean {
    return !!this.data?.editingRegistration;
  }

  ngOnInit(): void {
   
    this.store.dispatch(SaleActions.loadUsersAndCoursesOptions());
    this.patchFormValue();
  }

  private patchFormValue(): void {
    if (this.data?.editingRegistration) {
      this.registrationForm.patchValue(this.data.editingRegistration);
    }
  }

  onSave(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
    } else {
      const result = {
        ...this.registrationForm.value,
        id: this.isEditing
          ? this.data?.editingRegistration?.id
          : generateRandomString(4),
      };

      this.matDialogRef.close(result);
    }
  }
}
