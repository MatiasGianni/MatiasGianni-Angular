import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';

export interface Course {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

interface CourseDialogData {
  editingCourse?: Course; 
}

@Component({
  selector: 'app-courses-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss'],
})
export class CoursesDialogComponent {
  courseForm: FormGroup; 

  constructor(
    private matDialogRef: MatDialogRef<CoursesDialogComponent>, 
    private formBuilder: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data?: CourseDialogData 
  ) {
    this.courseForm = this.formBuilder.group({ 
      name: [null, [Validators.required]], 
      description: [null, [Validators.required]], 
    });
    this.patchFormValue(); 
  }

  private get isEditing() {
    return !!this.data?.editingCourse; 
  }

  patchFormValue() {
    if (this.data?.editingCourse) {
      this.courseForm.patchValue(this.data.editingCourse); 
    }
  }

  onSave(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched(); 
    } else {
      this.matDialogRef.close({ 
        ...this.courseForm.value,
        id: this.isEditing ? this.data!.editingCourse!.id : generateRandomString(4), 
        createdAt: this.isEditing ? this.data!.editingCourse!.createdAt : new Date(), 
      });
    }
  }
}
