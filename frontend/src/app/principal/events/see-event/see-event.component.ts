import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-see-event',
  templateUrl: './see-event.component.html',
  styleUrls: ['./see-event.component.css']
})
export class SeeEventComponent implements OnInit {

  event: any = {};
  userAdmin: any = {};
  user: any = {};
  eventParticipant: any = {};
  targetedUser: boolean = false;
  participants: any = [];
  historiesForParticipants: any = [];
  userId = localStorage.getItem('user_id');

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  /**
   * El método ngOnInit se encarga de traer los datos del evento seleccionado, el usuario apuntado al mismo,
   * las historias que han sido enviadas a ese evento y todos los participantes que hay en el mismo.
   */

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const user_id = params['user_id'];
      const event_id = params['event_id'];
      const userIdActual = localStorage.getItem('user_id');
      this.http.get<any>('http://localhost:8000/api/getEventById/' + event_id).subscribe(
        data => {
          this.event = data;
          this.http.get(`http://localhost:8000/api/getUser/${this.event.admin_id}`).subscribe(
            (response: any) => {
              this.userAdmin = response;
            },
            (error) => {
              console.log(error);
            }
          );
        },
        error => {
          console.log(error);
        }
      );
      this.http.get('http://localhost:8000/api/getEventByUserId/' + event_id + '/' + user_id).subscribe(
        data => {
          this.eventParticipant = data;
          if (this.eventParticipant.user_id == userIdActual) {
            this.targetedUser = true;
          }
        }
      );
      this.http.get(`http://localhost:8000/api/getUser/${this.userId}`).subscribe(
        (response: any) => {
          this.user = response;
        },
        (error) => {
          console.log(error);
        }
      );
      this.http.get(`http://localhost:8000/api/getParticipants/` + event_id).subscribe(
        (data: any) => {
          this.participants = Object.values(data);
        },
        (error) => {
          console.log(error);
        }
      );
      this.http.get(`http://localhost:8000/api/getHistoriesForEvent/` + event_id).subscribe(
        (data: any) => {
          this.historiesForParticipants = data;
        }
      );
    });
  }

  /**
   * Este método se encarga de añadir un participante al evento mediante un boton que solo esta disponible
   * para el usuario normal.
   */

  addParticipant() {
    const name_event = this.event.name_event;
    const user_id = localStorage.getItem('user_id');
    const event_id = this.event.id;

    const data = {
      name_event: name_event,
      user_id: user_id,
      event_id: event_id
    };

    this.http.post(`http://localhost:8000/api/addParticipantEvent`, data).subscribe(
      (response: any) => {
        location.reload();
        alert('Te has apuntado a este evento');
      },
      (error) => {
        alert('Ocurrió un error, no se te pudo inscribir en este evento');
      }
    );
  }

  /**
   * Este es el método que se encarga de cerrar el evento mediante un boton que solo esta disponible para el usuario
   * administrador.
   */

  closeEvent(id: any) {
    const close = 'Si';

    const data = {
      close: close,
    };

    this.http.put(`http://localhost:8000/api/closeEvent/` + id, data).subscribe(
      (response: any) => {
        alert('Este evento queda cerrado');
        location.reload();
        console.log(close);
      },
      (error) => {
        alert('No se ha podido cerrar el evento');
      }
    );
  }

  /**
   * Este método se encarga de añadir las imágenes a las portadas de las historias según la categoría que tengan.
   */

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
