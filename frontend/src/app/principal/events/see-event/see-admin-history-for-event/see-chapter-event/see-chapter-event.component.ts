import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-see-chapter-event',
  templateUrl: './see-chapter-event.component.html',
  styleUrls: ['./see-chapter-event.component.css']
})
export class SeeChapterEventComponent implements OnInit{

  chapterEvent: any = {};
  id = this.route.snapshot.paramMap.get('id');
  editorContent: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private cdr: ChangeDetectorRef, private location: Location) { }

  ngOnInit(): void {
    this.http.get(`http://localhost:8000/api/getChapterEvent/` + this.id).subscribe(
      (response) => {
        this.chapterEvent = response;
        this.editorContent = this.chapterEvent.body;
      }
    );
  }

  goBack() {
    this.location.back();
  }

}
