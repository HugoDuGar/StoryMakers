import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginUser() {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
      this.http.post('http://localhost:8000/api/login', data).subscribe(
        (response: any) => {
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('user_id', response.user_id);
          this.router.navigate(['/principal']);
          alert('Inicio de sesión correcto');
        },
        (error) => {
          alert('Ha ocurrido un error, revisa tus credenciales');
        }
      );
    }
  }
}

