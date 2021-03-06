import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EEG } from 'src/app/classes/EEG';
import { Patient } from 'src/app/classes/Patient';
import { EEGService } from 'src/app/services/eeg.service';
/* import Swal from 'sweetalert2'; */

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
  private eeg2delete! : EEG;

  config: any;

  constructor(private service: EEGService) { }

  ngOnInit(): void {
  }

  ngOnChanges(model: any) {

    // criar o map com key = id do EEG, e value = nome do paciente
    this.lst_EEG.forEach((eeg) => {
      let pat = this.lst_Patients.find(x => x.id == eeg.patient)
      if (pat) {
        this.map.set(eeg.id, pat.name)
        
      } else { 
        this.map.set(eeg.id,'undefined')
      }
    });

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: this.lst_EEG.length
    };
  }


  pageChanged(event: any){
    this.config.currentPage = event;
  }

  sendMail() {
    /* let content = (<HTMLInputElement>document.getElementById("mail_content")).value;
    console.log("Conteudo", content);
    this.service.sendEmail(content);  */

    /* 
    // ----------------> ESTÁ A DAR UM ERRO DE IMPORT 
    Swal.fire(
      'Done',
      'Email sent',
      'success'
    ) */
  }


  delete() {
    this.eeg_deleted.emit(this.eeg2delete);
  }
  
  save2delete(eeg : EEG) {
    this.eeg2delete = eeg;
  }

}
