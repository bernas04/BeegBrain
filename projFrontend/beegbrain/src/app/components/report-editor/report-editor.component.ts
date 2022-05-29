import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';
import { toDoc } from 'ngx-editor';
import { schema } from 'ngx-editor';

// @ts-ignore
import pdfMake from "pdfmake/build/pdfmake";  
// @ts-ignore
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;  
import htmlToPdfmake from 'html-to-pdfmake';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-report-editor',
  templateUrl: './report-editor.component.html',
  styleUrls: ['./report-editor.component.scss']

})
export class ReportEditorComponent implements OnInit, OnDestroy {
  @Input('control') control!: boolean;
  editor!: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    /* ['code', 'blockquote'], */
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  form = new FormGroup({
    editorContent: new FormControl(
      { value: "", disabled: false },   // value : <meter o json>   [fonte]: https://stackblitz.com/edit/ngx-editor?file=src%2Fapp%2Fapp.component.ts 
      Validators.required()
    ),
  });

  
  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }


  generatePDF(option: number) {      
    var html = htmlToPdfmake( this.form.value["editorContent"]  );
    const documentDefinition = { content: html };

    switch( option ) {
      case 1: 
        // PREVIEW PDF
        pdfMake.createPdf(documentDefinition).open();
        break;

      case 2:
        // DOWNLOAD PDF
        pdfMake.createPdf(documentDefinition).download();
        break;
      
      default:
        console.log("ERROR: option not found :/")
    }
     
  }  

  onChange($event: any) {
    console.log("Changes: ",this.form.value["editorContent"] )
  }
}
