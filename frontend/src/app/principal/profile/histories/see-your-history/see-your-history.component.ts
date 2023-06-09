import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-see-your-history',
  templateUrl: './see-your-history.component.html',
  styleUrls: ['./see-your-history.component.css']
})
export class SeeYourHistoryComponent implements OnInit {

  history: any = {};
  user: any = {};
  chapters: any = [];
  historyId = this.route.snapshot.paramMap.get('id');

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const historyId = this.route.snapshot.paramMap.get('id');
    this.http.get<any>('http://localhost:8000/api/getHistory/' + historyId).subscribe(
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
      },
      error => {
        console.log(error);
      }
    );
    this.http.get(`http://localhost:8000/api/getChaptersByHistoryId/` + this.historyId).subscribe(
      data => {
        this.chapters = data;
      },
    );
  }

  /**
   * Agrega una historia a la biblioteca
   */

  addFinishedHistory(finishedHistory: any) {
    const title = finishedHistory.title;
    const description_history = finishedHistory.description;
    const category = finishedHistory.category;
    const audience = finishedHistory.audience;
    const user_id = localStorage.getItem('user_id');
    const history_id = this.historyId;

    const data = {
      title: title,
      description: description_history,
      category: category,
      audience: audience,
      user_id: user_id,
      history_id: history_id
    };
    this.http.post('http://localhost:8000/api/addFinishedHistory', data).subscribe(
      (response: any) => {
        const finished = 'Si';
        const data = {
          finished: finished
        }
        this.http.put(`http://localhost:8000/api/finishHistory/` + history_id, data).subscribe(
          (response: any) => {
            alert('Esta historia queda finalizada');
            location.reload();
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    )
  }

  deleteHistory(id: any) {
    this.http.delete<any>('http://localhost:8000/api/deleteHistory/' + id).subscribe(
      (response: any) => {
        alert('Has eliminado tu historia');
        this.router.navigate(['/profile']);
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

}
