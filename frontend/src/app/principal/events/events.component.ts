import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: any[] = [];
  user: any;
  userId = localStorage.getItem('user_id');

  constructor(private dataService: DataService, private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');

    this.dataService.getEvents().subscribe(
      (data: any) => {
        this.events = Object.values(data);
        this.cdr.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    );
    this.http.get(`http://localhost:8000/api/getUser/${userId}`).subscribe(
      (response: any) => {
        this.user = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
