import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-history-for-your-event',
  templateUrl: './edit-history-for-your-event.component.html',
  styleUrls: ['./edit-history-for-your-event.component.css']
})
export class EditHistoryForYourEventComponent implements OnInit{

  history: any = {};
  userId = localStorage.getItem('user_id');
  event_id = this.route.snapshot.paramMap.get('id');

  constructor(private http: HttpClient, private router: Router, private dataService: DataService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/getHistoriesForEventById/' + this.event_id + '/' + this.userId).subscribe(
      data => {
        this.history = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * Método para actualizar la historia enviada al evento.
   */

  updateHistoryForEvent(event: Event){
    event.preventDefault();

    const title = (<HTMLInputElement>document.getElementById('title')).value;
    const description = (<HTMLInputElement>document.getElementById('description_history')).value;
    const category = (<HTMLInputElement>document.getElementById('category')).value;
    const audience = (<HTMLInputElement>document.getElementById('audience')).value;

    const data = {
      title: title,
      description: description,
      category: category,
      audience: audience
    };

    this.http.put('http://localhost:8000/api/updateHistoryForEvent/' + this.event_id + '/' + this.userId, data).subscribe(
      (response) => {
        this.goBack();
        alert('Historia actualizada correctamente');
      },
      (error) => {
        alert('Ha ocurrido un error, revisa los datos');
      }
    );
  }

  goBack() {
    this.location.back();
  }

}
