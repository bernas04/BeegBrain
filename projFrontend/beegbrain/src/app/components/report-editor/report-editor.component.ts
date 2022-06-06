import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar, toHTML } from 'ngx-editor';

// @ts-ignore
import pdfMake from "pdfmake/build/pdfmake";  
// @ts-ignore
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;  
import htmlToPdfmake from 'html-to-pdfmake';
import { ReportService } from 'src/app/services/report.service';
import { Report } from 'src/app/classes/Report';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/classes/Event';


@Component({
  selector: 'app-report-editor',
  templateUrl: './report-editor.component.html',
  styleUrls: ['./report-editor.component.scss']

})
export class ReportEditorComponent implements OnInit, OnDestroy {

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

  @Input('report') report!: Report;
  // report!: Report;
  show: boolean = true;
  form!: FormGroup;
  @Input("eeg_id") eeg_id!: number;

  token = '' + localStorage.getItem('token');
  type = ''+localStorage.getItem('type');
  id = ''+localStorage.getItem('id');

  constructor(private service: ReportService, private eventService: EventService) {}
  
  ngOnInit(): void {
    this.editor = new Editor();
    let id = +this.report;

    this.service.getReport( id, this.token).subscribe((info) => {
      this.report = info;

      this.form = new FormGroup({
        editorContent: new FormControl(
          { value: this.report.content , disabled: false },
          Validators.required()
        ),
      });

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
    console.log("Changes: ", this.form.value["editorContent"] )
    this.report.content = this.form.value["editorContent"];
    this.service.setReport( this.report, this.token).subscribe();

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
  }

}
