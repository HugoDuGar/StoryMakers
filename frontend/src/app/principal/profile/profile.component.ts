import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  histories: any[] = [];
  savedHistories: any[] = [];
  finishedHistories: any[] = [];
  activeEvents: any[] = [];
  userId = localStorage.getItem('user_id');

  constructor(private http: HttpClient, private router: Router, private dataService: DataService, private cdr: ChangeDetectorRef) { }

  /**
   * Este método trae el usuario logueado, las historias guardadas en la biblioteca, las historias escritas,
   * las historias finalizadas y los eventos en los que se ha apuntado.
   */

  ngOnInit() {
    const userId = localStorage.getItem('user_id');

    this.http.get(`http://localhost:8000/api/getUser/${userId}`).subscribe(
      (response: any) => {
        this.user = response;
      },
      (error) => {
        console.log(error);
      }
    );
    this.dataService.getHistoriesByUser(userId).subscribe(
      (data: any) => {
        this.histories = Object.values(data);
        this.cdr.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    );
    this.http.get(`http://localhost:8000/api/getSavedHistoriesByUserId/${userId}`).subscribe(
      (data: any) => {
        this.savedHistories = Object.values(data);
        this.cdr.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    );
    this.http.get(`http://localhost:8000/api/getFinishedHistoriesByUserId/${userId}`).subscribe(
      (data: any) => {
        this.finishedHistories = Object.values(data);
        this.cdr.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    );
    this.http.get(`http://localhost:8000/api/getEventsByParticipant/${userId}`).subscribe(
      (data: any) => {
        this.activeEvents = Object.values(data);
        this.cdr.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /**
   * Elimina una historia de la biblioteca
   */

  deleteSavedHistory(id: any) {
    this.http.delete<any>('http://localhost:8000/api/deleteSavedHistory/' + id).subscribe(
      (response: any) => {
        alert('Has eliminado esta historia de tu biblioteca');
        location.reload();
      });
  }

  /**
   * Elimina una historia propia
   */

  deleteHistory(id: any) {
    this.http.delete<any>('http://localhost:8000/api/deleteHistory/' + id).subscribe(
      (response: any) => {
        alert('Has eliminado tu historia');
        location.reload();
      });
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
        imageUrl = '/assets/default.jpg'; // Imagen por defecto si la categoría no coincide con las anteriores
        break;
    }
    return imageUrl;
  }

  /**
   * Este método coloca una imagen de perfil según el rol del usuario
   */

  getImageProfile(role: string){
    let imageProfile = '';

    switch (role){
      case 'usuario':
        imageProfile = '/assets/perfil.jpg';
        break;
      case 'admin':
        imageProfile = '/assets/admin.jpg';
        break;
    }

    return imageProfile;
  }

  /**
   * Método para borrar la sesión de usuario
   */

  deleteSession() {
    localStorage.removeItem('user_id');
  }

}
