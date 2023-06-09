import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {
  histories: any[] = [];
  userId: any = {};

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private dataService: DataService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.userId = localStorage.getItem('user_id');
    console.log(this.userId);
    this.dataService.getHistories().subscribe(
      (data: any) => {
        this.histories = Object.values(data);
        this.histories.sort((a, b) => +b.punctuation - +a.punctuation);
        this.cdr.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
