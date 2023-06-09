import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-see-your-event',
  templateUrl: './see-your-event.component.html',
  styleUrls: ['./see-your-event.component.css']
})
export class SeeYourEventComponent implements OnInit {

  targetedEvent: any = {};
  event: any = {};
  history: any = {};
  userId = localStorage.getItem('user_id');

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    const user_id = localStorage.getItem('user_id');
    const event_id = this.route.snapshot.paramMap.get('id');
    this.http.get('http://localhost:8000/api/getEventByUserId/' + event_id + '/' + user_id).subscribe(
      data => {
        this.targetedEvent = data;
      }
    );
    this.http.get('http://localhost:8000/api/getEventById/' + event_id).subscribe(
      data => {
        this.event = data;
      }
    );
    this.http.get('http://localhost:8000/api/getHistoriesForEventById/' + event_id + '/' + user_id).subscribe(
      data => {
        this.history = data;
      }
    );
  }

  deleteParticipant(id: any) {
    this.http.delete<any>('http://localhost:8000/api/deleteParticipant/' + id).subscribe(
      (response: any) => {
        alert('Te has desapuntado de este evento');
        this.goBack();
      }
    );
  }

  deleteHistory(id: any) {
    this.http.delete<any>('http://localhost:8000/api/deleteHistoryForEvent/' + id).subscribe(
      (response: any) => {
        alert('Has borrado tu historia para el evento');
        location.reload();
      });
  }

  goBack() {
    this.location.back();
  }

  getImageUrl(category: string): string {
    let imageUrl = '';

    switch (category) {
      case 'Acción':
        imageUrl = '/assets/accion.jpg';
        break;
      case 'Aventura':
        imageUrl = '/assets/aventura.jpg';
        break;
      case 'Ciencia ficción':
        imageUrl = '/assets/ciencia_ficcion.jpg';
        break;
      case 'Fantasía':
        imageUrl = '/assets/fantasia.jpg';
        break;
      case 'Fanfic':
        imageUrl = '/assets/fanfic.jpg';
        break;
      case 'Historia corta':
        imageUrl = '/assets/historia_corta.jpg';
        break;
      case 'Comedia':
        imageUrl = '/assets/comedia.jpg';
        break;
      case 'Romance':
        imageUrl = '/assets/romance.jpg';
        break;
      case 'Terror':
        imageUrl = '/assets/terror.jpg';
        break;
      case 'Paranormal':
        imageUrl = '/assets/paranormal.jpg';
        break;
      case 'Misterio':
        imageUrl = '/assets/misterio.jpg';
        break;
      case 'Un poco de todo':
        imageUrl = '/assets/un_poco_de_todo.jpg';
        break;
      default:
        imageUrl = '/assets/default.jpg';
        break;
    }
    return imageUrl;
  }

}
