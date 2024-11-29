import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../dashboard/users/models';
import { Router } from '@angular/router';
import { RegisterNewService } from '../../../core/services/register-new.service';
@Component({
  selector: 'app-register-new',
  templateUrl: './register-new.component.html',
  styleUrls: ['./register-new.component.scss'],
})
export class RegisterNewComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private registerService: RegisterNewService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const newUser: Omit<User, 'id' | 'createdAt' | 'token'> =
      this.registerForm.value;
    this.registerService.registerUser(newUser).subscribe({
      next: (users) => {
        
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar el usuario', err);
        alert('Hubo un error al registrar el usuario. Intente nuevamente.');
      },
    });
  }
}
