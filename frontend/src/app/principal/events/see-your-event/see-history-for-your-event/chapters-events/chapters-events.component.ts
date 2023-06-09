import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

declare var Quill: any;

@Component({
  selector: 'app-chapters-events',
  templateUrl: './chapters-events.component.html',
  styleUrls: ['./chapters-events.component.css']
})
export class ChaptersEventsComponent implements OnInit, AfterViewInit {
  chapterEventForm: FormGroup;
  editor: any;
  editorContent: string;
  historyId = this.route.snapshot.paramMap.get('history_id');

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.chapterEventForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required])
    });
    this.editorContent = '';
  }

  ngAfterViewInit() {
    this.editor = new Quill('#editor-container', {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
          [{ font: [] }],
          ['size'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6] }],
          [{ indent: '+1' }, { indent: '-1' }],
          ['link', 'image', 'video']
        ]
      }
    });
    this.editor.on('text-change', () => {
      this.editorContent = this.editor.root.innerHTML;
    });
  }

  increaseIndent() {
    const range = this.editor.getSelection();
    this.editor.formatText(range.index, range.length, 'indent', '+1');
  }

  decreaseIndent() {
    const range = this.editor.getSelection();
    this.editor.formatText(range.index, range.length, 'indent', '-1');
  }

  addChapter(event: Event) {
    event.preventDefault();

    if (this.chapterEventForm.valid) {
      const title = this.chapterEventForm.get('title').value;
      const number = this.chapterEventForm.get('number').value;

      const data = {
        title: title,
        number: number,
        body: this.editorContent,
        history_id: this.historyId
      };

      this.http.post('http://localhost:8000/api/addChapterEvent', data).subscribe(
        (response: any) => {
          this.goBack();
          alert('Se ha añadido un cappítulo a esta historia');
        },
        (error) => {
          alert('Ha ocurrido un error');
        }
      );
    } else {
      this.chapterEventForm.markAllAsTouched();
    }
  }

  goBack() {
    this.location.back();
  }
}

