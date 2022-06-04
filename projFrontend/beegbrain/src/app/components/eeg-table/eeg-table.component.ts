import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { EEG } from 'src/app/classes/EEG';
import { Patient } from 'src/app/classes/Patient';
import { TableService } from 'src/app/services/table.service'

@Component({
  selector: 'app-eeg-table',
  templateUrl: './eeg-table.component.html',
  styleUrls: ['./eeg-table.component.css']
})
export class EegTableComponent implements OnInit {

  @Input('allEEG') lst_EEG!: EEG[];
  @Input('allPatients') lst_Patients!: Patient[];
  @Output() eeg_deleted = new EventEmitter<any>();
  private id! : number;
  public map = new Map<number, string>();


  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(model: any) {

    // criar o map com key = id do EEG, e value = nome do paciente
    this.lst_EEG.forEach((eeg) => {

      let pat = this.lst_Patients.find(x => x.id == eeg.patient)

      if(pat) this.map.set(eeg.id, pat.name)
      else this.map.set(eeg.id, 'undefined')
    });

  }

  delete() {
    this.eeg_deleted.emit(this.id);
  }
  
  save2delete(id : number) {
    this.id = id;
  }

  redirect(id: number) {
    this.router.navigate(["/workspace/"+id]);
  }


}
