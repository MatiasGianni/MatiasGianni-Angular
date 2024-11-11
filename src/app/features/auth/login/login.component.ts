import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  passwordInputType: "password" | "text" = "password";
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  togglePasswordInputType(): void {
    this.passwordInputType = this.passwordInputType === "password" ? "text" : "password";
  }

  doLogin(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: (result) => {
        this.router.navigate(["dashboard", "home"]);
        
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        if (err.status === 0) {
          alert("No se pudo conectar con el servidor");
        } else if (err.status === 400) {
          alert("Solicitud incorrecta: verifica los datos enviados.");
        } else if (err.status === 401) {
          alert("No autorizado: por favor inicia sesión para continuar.");
        } else if (err.status === 403) {
          alert("Acceso denegado: no tienes permisos para esta acción.");
        } else if (err.status === 404) {
          alert("Recurso no encontrado: verifica la URL o el recurso solicitado.");
        } else if (err.status === 408) {
          alert("Tiempo de espera agotado: intenta nuevamente.");
        } else if (err.status === 429) {
          alert("Demasiadas solicitudes: por favor, intenta nuevamente después de un momento.");
        } else if (err.status === 500) {
          alert("Error interno del servidor: hubo un problema en el servidor.");
        } else if (err.status === 502) {
          alert("Error de puerta de enlace: el servidor intermedio respondió incorrectamente.");
        } else if (err.status === 503) {
          alert("Servicio no disponible: el servidor está temporalmente inactivo.");
        } else if (err.status === 504) {
          alert("Tiempo de espera de puerta de enlace agotado: el servidor no respondió a tiempo.");
        } else if (err.status === 505) {
          alert("No se pudo conectar con el servidor");
        } else {
          alert("Ocurrió un error inesperado. Código de error: " + err.status);
        }
      }
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.doLogin();
    }
  }
}
