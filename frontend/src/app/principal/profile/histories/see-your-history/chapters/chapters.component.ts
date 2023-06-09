import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

declare var Quill: any;

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent implements OnInit {
  chapterForm: FormGroup;
  editor: any;
  editorContent: string;
  historyId: string;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.historyId = this.route.snapshot.paramMap.get('history_id');
    this.editorContent = '';

    this.chapterForm = this.formBuilder.group({
      title: ['', Validators.required],
      number: ['', Validators.required]
    });

    this.initializeEditor();
  }

  /**
   * Este es el metodo que se encarga de crear la interfaz de edición de texto.
   */

  initializeEditor() {
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

  /**
   * Este método añade el capítulo a la historia.
   */

  addChapter(event: Event) {
    event.preventDefault();

    if (this.chapterForm.valid) {
      const title = this.chapterForm.get('title').value;
      const number = this.chapterForm.get('number').value;

      const data = {
        title: title,
        number: number,
        body: this.editorContent,
        history_id: this.historyId
      };

      this.http.post('http://localhost:8000/api/addChapter', data).subscribe(
        (response: any) => {
          this.goBack();
          alert('Se ha añadido un capítulo a tu historia');
        },
        (error) => {
          alert('Ha ocurrido un error');
        }
      );
    }
  }

  goBack() {
    this.location.back();
  }
}

