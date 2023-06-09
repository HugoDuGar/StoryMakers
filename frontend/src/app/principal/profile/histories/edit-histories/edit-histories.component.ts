import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-histories',
  templateUrl: './edit-histories.component.html',
  styleUrls: ['./edit-histories.component.css']
})
export class EditHistoriesComponent implements OnInit{

  history: any = {};

  constructor(private http: HttpClient, private router: Router, private dataService: DataService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    const historyId = this.route.snapshot.paramMap.get('id');
    console.log('ID de la historia:', historyId);
    this.http.get<any>('http://localhost:8000/api/getHistory/' + historyId).subscribe(
      data => {
        this.history = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * Método para actualizar una historia.
   */

  updateHistory(event: Event){
    event.preventDefault();

    const id = localStorage.getItem('history_id');

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

    this.http.put('http://localhost:8000/api/updateHistory/'+ id, data).subscribe(
      (response) => {
        this.router.navigate(['/profile']);
        alert('Historia actualizada correctamente');
      },
      (error) => {
        alert('Ha ocurrido un error');
      }
    );
  }

  goBack() {
    this.location.back();
  }

}
