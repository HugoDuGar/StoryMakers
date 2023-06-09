import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: any = {};
  
  constructor(private http: HttpClient, private router: Router, private location: Location) {}

  ngOnInit() {
    const userId = localStorage.getItem('user_id');
    this.http.get<any>('http://localhost:8000/api/getUser/' + userId).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * Método para actualizar el usuario.
   */

  updateUser(event: Event){
    event.preventDefault();

    const id = localStorage.getItem('user_id');
    
    const name = (<HTMLInputElement>document.getElementById('name')).value;
    const description = (<HTMLInputElement>document.getElementById('description')).value;
    const age = (<HTMLInputElement>document.getElementById('age')).value;
    const genders = (<HTMLInputElement>document.getElementById('genders')).value;
    const nationality = (<HTMLInputElement>document.getElementById('nationality')).value;


    const data = {
      name: name,
      description: description,
      age: age,
      genders: genders,
      nationality: nationality,
    };
    
    this.http.put('http://localhost:8000/api/updateUser/' + id, data).subscribe(
      (response) => {
        this.router.navigate(['/profile']);
        alert('Tu perfil ha sido actualizado');
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
