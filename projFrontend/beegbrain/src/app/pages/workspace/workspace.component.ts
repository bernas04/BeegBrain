import { Component, OnInit } from '@angular/core';
import { EEG } from 'src/app/classes/EEG';
import { Patient } from 'src/app/classes/Patient';
import { PatientsService } from 'src/app/services/patients.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  lst_eeg: EEG[] = [];  
  lst_patient: Patient[] = [];
  EEGpacient = new Map<number, Patient>();

  constructor(private service: WorkspaceService, private patient_service: PatientsService) { }

  ngOnInit(): void {
    this.getEEG();
    this.getPatients();
  }

  getEEG() {
    this.service.getAllEEG().subscribe((info) => {
      this.lst_eeg = info;
      
      /* 
      this.patient_service.getPatients().subscribe((info1) => {
        this.lst_patient = info1;
      });

      console.log(this.lst_eeg)
      console.log(this.lst_patient)

      let patient!: Patient;

      this.lst_eeg.forEach( (eeg) => {
        let id = eeg.patient
        console.log(id)
        this.lst_patient.forEach( (pat) => { 
          console.log(pat.id )
          if (pat.id == id) patient = pat
        })
        console.log("aqui "+ patient)
      })

      console.log("aqui "+ patient) 
      */

    });
  }

  getPatients() {
    this.patient_service.getPatients().subscribe((info) => {
      this.lst_patient = info;
      console.log(this.lst_patient)
    });
  }

  /*   
  getPatientByID(identifier : string) {
    const id = parseInt(identifier)
    const p = this.lst_patient.find(elem => elem.id == id)
  } 
  */

  onDelete(id : number) {
    this.service.deleteEEG(id).subscribe();
  }

  refresh() {
    window.location.reload();
  }



}
