import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-historie-for-your-event',
  templateUrl: './historie-for-your-event.component.html',
  styleUrls: ['./historie-for-your-event.component.css']
})
export class HistorieForYourEventComponent {
  event_id = this.route.snapshot.paramMap.get('id');
  user_id = localStorage.getItem('user_id');
  eventForm: FormGroup;

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location) {
    this.eventForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.minLength(50)]),
      category: new FormControl('', Validators.required),
      audience: new FormControl('', Validators.required)
    });
  }

  addHistoryForEvent(event: Event) {
    event.preventDefault();

    if (this.eventForm.valid) {
      const data = {
        title: this.eventForm.value.title,
        description: this.eventForm.value.description,
        category: this.eventForm.value.category,
        audience: this.eventForm.value.audience,
        user_id: this.user_id,
        event_id: this.event_id
      };

      this.http.post(`http://localhost:8000/api/addHistoryForEvent`, data).subscribe(
        (response: any) => {
          const sent = 'Si';

          const data = {
            sent: sent
          };
          this.http.put(`http://localhost:8000/api/updateSend/` + this.event_id + `/` + this.user_id, data).subscribe(
            (response: any) => {
              this.goBack();
              console.log(response);
              alert('Esta historia ha sido enviada');
            }
          );
        },
        (error) => {
          alert('Ha ocurrido un error');
        }
      );
    } else {
      alert('No se envió debido a un error');
    }
  }

  goBack() {
    this.location.back();
  }
}

