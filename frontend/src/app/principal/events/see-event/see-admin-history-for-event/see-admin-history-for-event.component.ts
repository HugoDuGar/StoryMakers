import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-see-admin-history-for-event',
  templateUrl: './see-admin-history-for-event.component.html',
  styleUrls: ['./see-admin-history-for-event.component.css']
})
export class SeeAdminHistoryForEventComponent implements OnInit {

  history: any = {};
  user: any = {};
  event: any = {};
  historyId = this.route.snapshot.paramMap.get('id');
  event_id = this.route.snapshot.paramMap.get('event_id');
  userId = localStorage.getItem('user_id');
  chaptersEvent: any = [];

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/getHistoryEspecialId/' + this.historyId).subscribe(
      data => {
        this.history = data;
        this.http.get(`http://localhost:8000/api/getUser/${this.history.user_id}`).subscribe(
          (response: any) => {
            this.user = response;
          },
          (error) => {
            console.log(error);
          }
        );
      }
    );
    this.http.get<any>('http://localhost:8000/api/getEventById/' + this.event_id).subscribe(
      data => {
        this.event = data;
      }
    );
    this.http.get(`http://localhost:8000/api/getChaptersByHistoryIdForEvent/` + this.historyId).subscribe(
      datados => {
        this.chaptersEvent = datados;
      },
    );
  }

  /**
   * Este metodo descalifica al participante del evento.
   */

  deleteParticipant() {
    this.http.delete<any>('http://localhost:8000/api/disqualify/' + this.event_id + '/' + this.history.user_id).subscribe(
      (response: any) => {
        console.log(this.history.user_id);
        this.http.delete<any>('http://localhost:8000/api/deleteHistoryForEvent/' + this.history.id).subscribe(
          (response: any) => {
            alert('El usuario ha sido descalificado del evento');
            this.goBack();
          });
      }
    );
  }

  /**
   * Este método sirve para declarar ganadora a la historia del usuario.
   */

  declareWinner() {
    const winnerUser = 'Si';

    const data = {
      winner_user: winnerUser
    };

    this.http.put('http://localhost:8000/api/declareWinner/' + this.event_id + '/' + this.history.user_id, data).subscribe(
      (response: any) => {
        const close = 'Si';
        alert('Este usuario ha sido declarado ganador del evento, el evento queda cerrado');
        const data = {
          close: close,
        };
        this.http.put(`http://localhost:8000/api/closeEvent/` + this.event_id, data).subscribe(
          (response: any) => {
            this.goBack();
          }
        );
      }
    );
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

  /**
   * Método para volver atrás en la página.
   */

  goBack() {
    this.location.back();
  }

}
