import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

declare var Quill: any;

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.css']
})
export class EditChapterComponent implements AfterViewInit {

  chapter: any = {};
  editor: any;
  editorContent: string;
  id = this.route.snapshot.paramMap.get('id');

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngAfterViewInit() {

    this.editor = new Quill('#editor-container', {
      theme: 'snow', // Puedes elegir el tema que prefieras
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // Otras opciones predeterminadas de la barra de herramientas
          [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }], // Botones de alineación
          [{ 'font': [] }], // Botón de cambio de fuente
          ['size'], // Botón de cambio de tamaño de fuente
          [{ 'list': 'ordered' }, { 'list': 'bullet' }], // Botones de lista
          [{ 'header': [1, 2, 3, 4, 5, 6] }], // Opciones de encabezado
          [{ 'indent': '+1' }, { 'indent': '-1' }], // Botones de aumentar/reducir sangría
          ['link', 'image', 'video'] // Otras opciones predeterminadas de la barra de herramientas
        ]
      }
    });
    this.http.get(`http://localhost:8000/api/getChapter/` + this.id).subscribe(
      (response) => {
        this.chapter = response;
        this.editorContent = this.chapter.body;
        this.editor.root.innerHTML = this.editorContent;
        this.editor.on('text-change', () => {
          this.editorContent = this.editor.root.innerHTML;
        });
      }
    );
  }

  /**
   * Método para editar el contenido del capítulo
   */

  editChapter(event: Event){
    event.preventDefault();

    const title = (<HTMLInputElement>document.getElementById('title')).value;
    const number = (<HTMLInputElement>document.getElementById('number')).value;

    const data = {
      title: title,
      number: number,
      body: this.editorContent,
    }

    this.http.put('http://localhost:8000/api/editChapter/' + this.id, data).subscribe(
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
