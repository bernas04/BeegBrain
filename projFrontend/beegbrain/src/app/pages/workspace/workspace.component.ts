import { subscribeOn } from 'rxjs';
import { Institution } from 'src/app/classes/Institution';
import { Operator } from 'src/app/classes/Operator';

import { Component, OnInit } from '@angular/core';
import { EEG } from 'src/app/classes/EEG';
import { Patient } from 'src/app/classes/Patient';
import { PatientsService } from 'src/app/services/patients.service';
import { PersonService } from 'src/app/services/person.services';
import { WorkspaceService } from 'src/app/services/workspace.service';


@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  lst_eeg: EEG[] = [];  
  lst_error_eeg: EEG[] = [];  
  lst_patient: Patient[] = [];
  lst_institutions: Institution[] = []
  lst_operators: Operator[] = []


  EEGpacient = new Map<number, Patient>();

  lst_untouchable: EEG[] = [];
  lst_filtered: EEG[] = []
  files : File[] = [];

  token = ''+localStorage.getItem('token');
  type = ''+localStorage.getItem('type');
  id = ''+localStorage.getItem('id');
  tableService: any;

  public lData!: any[];

  constructor(private service: WorkspaceService, private patient_service: PatientsService) { }

  ngOnInit(): void {


    this.getEEG();
    this.getPatients();
    this.getOperators()
    this.getInstitutions()
    console.log("lista de pacientes workspace", this.lst_operators)
  }


  getEEG() {
    this.service.getAllEEG(this.token, this.type, this.id).subscribe((info) => {

      console.log("ALLEEGs ",info)

      info.forEach((eeg) => {
        if (eeg.status != null) {
          this.lst_error_eeg.push(eeg);

        } else if (eeg.patient == null ) {
          eeg.status = 'patient undefined'
          this.lst_error_eeg.push(eeg);

        } else {
          this.lst_eeg.push(eeg);
        }

      })

    });

  }
  
  sendFilters(lst : EEG[]){
    this.lst_eeg = lst;
  }

  getInstitutions() {
    this.service.getAllInstitutions(this.token).subscribe((info) => {
      this.lst_institutions = info;
      console.log("INSTITUTIONS",this.lst_institutions)
    })

  }
  getPatients() {
    this.patient_service.getPatients(this.token).subscribe((info) => {
      this.lst_patient = info;
      console.log("patients",this.lst_patient)
    });
  }

  onDelete(eeg : EEG) {
    const index = this.lst_eeg.indexOf(eeg, 0);
    if (index > -1) {
      this.lst_eeg.splice(index, 1);
    }

    const index1 = this.lst_error_eeg.indexOf(eeg, 0);
    if (index1 > -1) {
      this.lst_eeg.splice(index1, 1);
    }

    this.service.deleteEEG(eeg.id, this.token).subscribe();
  }

  refresh() {
    window.location.reload();
  }

  getOperators() {
    console.log("ANALYZING")
    this.service.getOperators(this.token).subscribe((info) => {
      this.lst_operators = info;
      console.log("OPERATORS",this.lst_operators)
    });

  }

  getFiles(files : any[]) {
    this.files = files;
  }

}
