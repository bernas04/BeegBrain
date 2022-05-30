import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EEG } from 'src/app/classes/EEG';
import { Patient } from 'src/app/classes/Patient';
import { EEGService } from 'src/app/services/eeg.service';

@Component({
  selector: 'app-errorarea',
  templateUrl: './errorarea.component.html',
  styleUrls: ['./errorarea.component.css']
})
export class ErrorareaComponent implements OnInit {

  @Input('allEEG') lst_EEG!: EEG[];
  @Input('allPatients') lst_Patients!: Patient[];
  @Output() eeg_deleted = new EventEmitter<any>();
  public map = new Map<number, string>();
  private id! : number;

  constructor(private service: EEGService) { }

  ngOnInit(): void {
    // criar o map com key = id do EEG, e value = nome do paciente
    this.lst_EEG.forEach((eeg) => {
      let pat = this.lst_Patients.find(x => x.id == eeg.patient)
      // console.log(pat)
      if (pat) {
        this.map.set(eeg.id, pat.name)
        
      } else { 
        this.map.set(eeg.id,'undefined')
      }
    });

  }

  sendMail() {
    let content = (<HTMLInputElement>document.getElementById("mail_content")).value;
    console.log("Conteudo", content);
    this.service.sendEmail(content);
  }


  delete() {
    this.eeg_deleted.emit(this.id);
  }
  
  save2delete(id : number) {
    this.id = id;
  }

}
