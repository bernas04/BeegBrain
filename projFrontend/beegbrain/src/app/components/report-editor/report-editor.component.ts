import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';

// @ts-ignore
import pdfMake from "pdfmake/build/pdfmake";
// @ts-ignore
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import htmlToPdfmake from 'html-to-pdfmake';
import { ReportService } from 'src/app/services/report.service';
import { Report } from 'src/app/classes/Report';
import { EventService } from 'src/app/services/event.service';


@Component({
  selector: 'app-report-editor',
  templateUrl: './report-editor.component.html',
  styleUrls: ['./report-editor.component.scss']
})
export class ReportEditorComponent implements OnInit, OnDestroy {

  @Input("eeg_id") eeg_id!: number;
  @Input('report') report!: Report;

  token = '' + localStorage.getItem('token');
  type = ''+localStorage.getItem('type');
  id = ''+localStorage.getItem('id');

  progress!: String
  show: boolean = true;
  form!: FormGroup;

  editor!: Editor;;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private service: ReportService, private eventService: EventService) {}
  
  ngOnInit(): void {
    this.editor = new Editor();
    let id = +this.report

    this.service.getReport( id, this.token).subscribe((info) => {
      this.report = info;


      if (this.type == 'operator') {
        this.form = new FormGroup({
          editorContent: new FormControl(
            { value: this.report.content , disabled: true },
            Validators.required()
          ),
        });

      } else {
        if (this.report.progress == "done") {
          this.form = new FormGroup({
            editorContent: new FormControl(
              { value: this.report.content , disabled: true },
              Validators.required()
            ),
          });
  
        } else {
          this.form = new FormGroup({
            editorContent: new FormControl(
              { value: this.report.content , disabled: false },
              Validators.required()
            ),
          });
        }

      }

      this.progress = this.report.progress
      this.show = true;
      console.log(this.report)

    });

 
  }
  

  ngOnDestroy(): void {
    console.log("DESTROY REPORT COMPONENT (se este console log aparacer, descomentar código abaixo)")
    /* 
    console.log("Changes: ", toHTML(this.form.value["editorContent"]) )
    this.report.content = toHTML(this.form.value["editorContent"]);
    this.service.setReport( this.report ).subscribe(); 
    */
    this.editor.destroy();
  }

  save() {
    // de vez em quando esta cena buga, quando isso acontece, é meter toHTML( )
    this.report.content = this.form.value["editorContent"];
    this.report.progress = "in progress";

    this.service.setReport( this.report, this.token ).subscribe();

    let json = { "type": "Report changed", "person": this.id, "eeg_id": ''+this.eeg_id}
    let jsonObject = <JSON><unknown>json;
    this.eventService.addEvent(jsonObject, this.token).subscribe();
  }


  generatePDF(option: number) {      
    var html = htmlToPdfmake(  this.form.value["editorContent"] );
    const documentDefinition = { content: html };

    switch( option ) {
      case 1: 
        // PREVIEW PDF
        pdfMake.createPdf(documentDefinition).open();
        break;

      case 2:
        // DOWNLOAD PDF
        let json = { "type": "Report downloaded", "person": this.id, "eeg_id": ''+this.eeg_id}
        let jsonObject = <JSON><unknown>json;
        this.eventService.addEvent(jsonObject, this.token).subscribe();

        pdfMake.createPdf(documentDefinition).download();
        break;
      
      default:
        console.log("ERROR: option not found :/")
    }
     
  }  

  reportDone() {
    let json = { "type": "Report marked as done", "person": this.id, "eeg_id": ''+this.eeg_id}
    let jsonObject = <JSON><unknown>json;
    this.eventService.addEvent(jsonObject, this.token).subscribe();
    this.progress="done"

    this.report.progress = "done"; //o que vai para editar o report
    this.service.setReport( this.report, this.token).subscribe();

  }

  reportUndo (){  
    let json = { "type": "Report marked as done", "person": this.id, "eeg_id": ''+this.eeg_id}
    let jsonObject = <JSON><unknown>json;
    this.eventService.addEvent(jsonObject, this.token).subscribe();

    this.report.progress = "in progress"; //o que vai para editar o report
    this.progress = "in progress"
    this.service.setReport( this.report, this.token).subscribe();  
  }

   

  



}
