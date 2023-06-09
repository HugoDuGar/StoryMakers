import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.css']
})
export class HistoriesComponent {
  historyForm: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.historyForm = this.formBuilder.group({
      title: ['', Validators.required],
      description_history: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      audience: ['', Validators.required],
      user_id: localStorage.getItem('user_id')
    });
  }

  addHistory() {
    if (this.historyForm.valid) {
      const data = this.historyForm.value;

      this.http.post('http://localhost:8000/api/addHistory', data).subscribe(
        (response: any) => {
          localStorage.setItem('history_id', response.history_id);
          this.router.navigate(['/profile']);
          alert('Se ha añadido una historia a tu perfil');
        },
        (error) => {
          alert('Ha ocurrido un error');
        }
      );
    }
  }

  goBack() {
    this.location.back();
  }
}

