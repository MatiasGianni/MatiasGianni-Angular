import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { generateRandomString } from '../../../../shared/utils';

export interface Class {
  id?: string;
  name: string;
  teacher: string;
  hours: number;
  classroom: number;
}

interface ClassDialogData {
  editingClass?: Class; 
}

@Component({
  selector: 'app-classes-detail',
  templateUrl: './classes-detail.component.html',
  styleUrls: ['./classes-detail.component.scss'],
})
export class ClassesDetailComponent {
  classForm: FormGroup; 

  constructor(
    public matDialogRef: MatDialogRef<ClassesDetailComponent>, 
    private formBuilder: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data?: ClassDialogData 
  ) {
    this.classForm = this.formBuilder.group({ 
      name: [null, [Validators.required]], 
      teacher: [null, [Validators.required]], 
      hours: [null, [Validators.required, Validators.min(1)]], 
      classroom: [null, [Validators.required, Validators.min(100)]], 
    });
    this.patchFormValue(); 
  }

  public get isEditing() {
    return !!this.data?.editingClass; 
  }

  patchFormValue() {
    if (this.data?.editingClass) {
      this.classForm.patchValue(this.data.editingClass); 
    }
  }

  onSave(): void {
    if (this.classForm.invalid) {
      this.classForm.markAllAsTouched(); 
      this.matDialogRef.close({ 
        ...this.classForm.value,
        id: this.isEditing ? this.data!.editingClass!.id : generateRandomString(4), 
      });
    }
  }
}
