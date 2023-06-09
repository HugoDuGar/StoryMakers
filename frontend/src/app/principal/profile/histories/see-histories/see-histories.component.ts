import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-see-histories',
  templateUrl: './see-histories.component.html',
  styleUrls: ['./see-histories.component.css']
})

export class SeeHistoriesComponent implements OnInit {

  history: any = {};
  user: any = {};
  historyId = this.route.snapshot.paramMap.get('history_id');
  score: any = {};
  currentScore: any = {};
  scoreMade: boolean = false;
  addedHistory: boolean = false;
  savedHistory: any = {};
  userIdActual = localStorage.getItem('user_id');
  chapters: any = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef, private location: Location) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const user_id = params['user_id'];
      const history_id = params['history_id'];

      this.http.get<any>('http://localhost:8000/api/getHistory/' + history_id).subscribe(
        data => {
          this.history = data;
          this.http.get<any>('http://localhost:8000/api/getPunctuation/' + history_id + '/' + user_id).subscribe(
            (datados: any) => {
              this.score = datados;
              this.currentScore = this.score[0].punctuation;
              if (this.score[0].user_id == this.userIdActual) {
                this.scoreMade = true;
              }
              const starsInput = document.querySelector(`input[value="${this.currentScore}"]`) as HTMLInputElement;
              if (starsInput) {
                starsInput.checked = true;
              }
            }
          );
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
      this.http.get(`http://localhost:8000/api/getSavedHistory/` + history_id + `/` + user_id).subscribe(
        (response: any) => {
          this.savedHistory = response;
          console.log(response);
          if (this.savedHistory[0].user_id == this.userIdActual) {
            this.addedHistory = true;
          }
        }
      );
      this.http.get(`http://localhost:8000/api/getChaptersByHistoryId/` + this.historyId).subscribe(
        data => {
          this.chapters = data;
        },
      );
    });
  }

  /**
   * Añade una historia a la biblioteca
   */

  addSavedHistory(saveHistory: any) {
    const title = saveHistory.title;
    const description_history = saveHistory.description;
    const category = saveHistory.category;
    const audience = saveHistory.audience;
    const user_id = localStorage.getItem('user_id');
    const history_id = this.historyId;

    console.log(title, description_history, category, audience, user_id, history_id);

    const data = {
      title: title,
      description: description_history,
      category: category,
      audience: audience,
      user_id: user_id,
      history_id: history_id
    };
    this.http.post('http://localhost:8000/api/addSavedHistory', data).subscribe(
      (response: any) => {
        console.log(response);
        alert('La historia ha sido agregada a tu biblioteca');
        location.reload();
      },
      (error) => {
        console.log(error);
        alert('No se pudo agregar la historia');
      }
    )
  }

  /**
   * Puntua la historia
   */

  scoreStory(event: Event) {
    event.preventDefault();

    const stars = (document.querySelector('input[name="stars"]:checked') as HTMLInputElement).value;
    const id = this.history.id;
    const user_id = localStorage.getItem('user_id');

    const data = {
      punctuation: stars,
      user_id: user_id,
      history_id: id

    };

    this.http.post('http://localhost:8000/api/addPunctuation', data).subscribe(
      (response: any) => {
        this.currentScore = parseInt(stars);
        alert('Has puntuado esta historia')
        location.reload();
      },
      (error: any) => {
        console.log(error)
        alert('No se pudo puntuar la historia')
      }
    );
  }

  /**
   * Actualiza la puntuación
   */

  updatePunctuation() {
    const stars = (document.querySelector('input[name="stars"]:checked') as HTMLInputElement).value;
    this.route.params.subscribe(params => {
      const user_id = params['user_id'];
      const history_id = params['history_id'];

      const data = {
        punctuation: stars
      };

      this.http.put('http://localhost:8000/api/updatePunctuation/' + history_id + '/' + user_id, data).subscribe(
        (response: any) => {
          this.currentScore = parseInt(stars);
          alert('Tu puntuación ha sido actualizada');
          location.reload();
        },
        (error: any) => {
          alert('No se pudo actualizar la puntuación');
        }
      );

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
