import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa Validators y FormBuilder

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup; // Crea una variable para el formulario

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder // Inyecta el FormBuilder
  ) {
    // Inicializa el formulario con las validaciones necesarias
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      password_confirmation: ['', Validators.required]
    });
  }

  registerUser() {
    if (this.registerForm.valid) {
      const data = this.registerForm.value;
      this.http.post('http://localhost:8000/api/register', data).subscribe(
        (response: any) => {
          localStorage.setItem('user_id', response.user_id);
          this.router.navigate(['/principal']);
          alert('Registro correcto');
        },
        (error) => {
          alert('Ha ocurrido un error, revisa los datos que has introducido');
        }
      );
    }
  }
}

