import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.css']
})
export class EventsFormComponent {
  eventForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location
  ) {
    this.eventForm = this.formBuilder.group({
      name_event: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(50)]],
      rules: ['', Validators.required],
      awards: ['', Validators.required]
    });
  }

  addEvent(event: Event) {
    event.preventDefault();

    if (this.eventForm.valid) {
      const name_event = this.eventForm.get('name_event').value;
      const description = this.eventForm.get('description').value;
      const rules = this.eventForm.get('rules').value;
      const awards = this.eventForm.get('awards').value;
      const admin_id = localStorage.getItem('user_id');

      const data = {
        name_event: name_event,
        description: description,
        rules: rules,
        awards: awards,
        admin_id: admin_id
      };

      this.http.post('http://localhost:8000/api/addEvent', data).subscribe(
        (response: any) => {
          this.router.navigate(['/events']);
          alert('Evento creado correctamente');
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

