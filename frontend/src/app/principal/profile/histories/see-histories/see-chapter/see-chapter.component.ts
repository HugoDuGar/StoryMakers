import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-see-chapter',
  templateUrl: './see-chapter.component.html',
  styleUrls: ['./see-chapter.component.css']
})
export class SeeChapterComponent implements OnInit {

  chapter: any = {};
  id = this.route.snapshot.paramMap.get('id');
  editorContent: string;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private cdr: ChangeDetectorRef, private location: Location) { }

  ngOnInit(): void {
    this.http.get(`http://localhost:8000/api/getChapter/` + this.id).subscribe(
      (response) => {
        this.chapter = response;
        this.editorContent = this.chapter.body;
      }
    );
  }

  goBack() {
    this.location.back();
  }

}
