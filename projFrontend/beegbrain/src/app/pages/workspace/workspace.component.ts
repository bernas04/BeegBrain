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

  token = ''+localStorage.getItem('token');

  constructor(private service: WorkspaceService, private patient_service: PatientsService) { }

  ngOnInit(): void {
    this.getEEG();
    this.getPatients();
  }

  getEEG() {
    this.service.getAllEEG(this.token).subscribe((info) => {
      this.lst_eeg = info;
      console.log("eegs:",this.lst_eeg)
    });
  }


  getPatients() {
    this.patient_service.getPatients(this.token).subscribe((info) => {
      this.lst_patient = info;
      console.log(this.lst_patient)
    });
  }

  onDelete(id : number) {
    this.service.deleteEEG(id, this.token).subscribe();
  }

  refresh() {
    window.location.reload();
  }



}
