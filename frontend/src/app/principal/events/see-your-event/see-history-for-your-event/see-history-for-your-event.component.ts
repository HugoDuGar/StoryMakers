import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-see-history-for-your-event',
  templateUrl: './see-history-for-your-event.component.html',
  styleUrls: ['./see-history-for-your-event.component.css']
})
export class SeeHistoryForYourEventComponent implements OnInit {

  history: any = {};
  user: any = {};
  eventId = this.route.snapshot.paramMap.get('id');
  userId = localStorage.getItem('user_id');
  chaptersEvent: any = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/getHistoriesForEventById/' + this.eventId + '/' + this.userId).subscribe(
      data => {
        this.history = data;
        this.http.get(`http://localhost:8000/api/getUser/` + this.userId).subscribe(
          (response: any) => {
            this.user = response;
          },
          (error) => {
            console.log(error);
          }
        );
        this.http.get(`http://localhost:8000/api/getChaptersByHistoryIdForEvent/` + this.history.id).subscribe(
          datados => {
            this.chaptersEvent = datados;
          },
        );
      },
      error => {
        console.log(error);
      }
    );

  }

  deleteHistory(id: any) {
    this.http.delete<any>('http://localhost:8000/api/deleteHistoryForEvent/' + id).subscribe(
      (response: any) => {
        alert('Has eliminado esta historia');
        this.goBack();
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
