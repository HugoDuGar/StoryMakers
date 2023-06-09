import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

declare var Quill: any;

@Component({
  selector: 'app-edit-chapter-event',
  templateUrl: './edit-chapter-event.component.html',
  styleUrls: ['./edit-chapter-event.component.css']
})
export class EditChapterEventComponent implements AfterViewInit {

  chapterEvent: any = {};
  editor: any;
  editorContent: string;
  id = this.route.snapshot.paramMap.get('id');

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngAfterViewInit() {

    this.editor = new Quill('#editor-container', {
      theme: 'snow',
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
          [{ 'font': [] }],
          ['size'],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }],
          [{ 'header': [1, 2, 3, 4, 5, 6] }],
          [{ 'indent': '+1' }, { 'indent': '-1' }],
          ['link', 'image', 'video']
        ]
      }
    });
    this.http.get(`http://localhost:8000/api/getChapterEvent/` + this.id).subscribe(
      (response) => {
        this.chapterEvent = response;
        this.editorContent = this.chapterEvent.body;
        this.editor.root.innerHTML = this.editorContent;
        this.editor.on('text-change', () => {
          this.editorContent = this.editor.root.innerHTML;
        });
      }
    );
  }

  editChapterEvent(event: Event){
    event.preventDefault();

    const title = (<HTMLInputElement>document.getElementById('title')).value;
    const number = (<HTMLInputElement>document.getElementById('number')).value;

    const data = {
      title: title,
      number: number,
      body: this.editorContent,
    }

    this.http.put('http://localhost:8000/api/editChapterEvent/' + this.id, data).subscribe(
      (response: any) => {
        this.goBack();
        alert('Capítulo actualizado correctamente');
      },
      (error) => {
        alert('Ha ocurrido un error');
      }
    );
  }

  increaseIndent() {
    const range = this.editor.getSelection();
    this.editor.formatText(range.index, range.length, 'indent', '+1');
  }

  decreaseIndent() {
    const range = this.editor.getSelection();
    this.editor.formatText(range.index, range.length, 'indent', '-1');
  }

  goBack() {
    this.location.back();
  }
}
