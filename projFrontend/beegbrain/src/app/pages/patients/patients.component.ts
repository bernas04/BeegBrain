import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EEG } from 'src/app/classes/EEG';
import { Institution } from 'src/app/classes/Institution';
import { Operator } from 'src/app/classes/Operator';
import { Patient } from 'src/app/classes/Patient';
import { PatientsService } from 'src/app/services/patients.service';
import { WorkspaceService } from 'src/app/services/workspace.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  constructor(private services:PatientsService, private router: Router, private service: WorkspaceService) { }
  
  lst_institutions: Institution[] = []
  lst_operators: Operator[] = []
  public listOfPatients: Patient[] = []
  public listOfEEG: EEG[] = []
  public patient!: Patient
  token = ''+localStorage.getItem('token');
  type = ''+localStorage.getItem('type');
  id = ''+localStorage.getItem('id');

  ngOnInit(): void {

    const url_array = this.router.url.split("/");
    if (!isNaN(+url_array[url_array.length - 1])) {
      let pat_id = +url_array[url_array.length - 1];
      
      this.getPatientbyId(pat_id);
      this.getEEGbyPatient(pat_id);    // para lista os exames EEG da respetiva pessoa
    }

    this.getInstitutions();
    this.getOperators();
  }

  getPatient(){
    let text = (<HTMLInputElement>document.getElementById("patient_search")).value;
    if (+text == NaN) {
      this.services.getPatientsbySSN(text, this.token).subscribe((info) => {
        this.patient = info;
        this.getEEGbyPatient(this.patient.id);   // para lista os exames EEG da respetiva pessoa
      });

    } else {
      console.log("PESQUISA POR NOME")
      this.services.getPatientsbyName(text, this.token).subscribe(data => this.listOfPatients = data);
    }

    
  } 

  getPatientbyId(id: number){
    this.services.getPatientbyId(id, this.token).subscribe((info) => {
      this.patient = info;
    });
  } 

  getEEGbyPatient(id: number) {
    this.services.getEEGbySharedFolder(+this.id, this.type, this.token).subscribe((info) => {
      this.listOfEEG = [];

      console.log(info)
      info.forEach((eeg) => {
        if (eeg.status == null && eeg.patient == id) this.listOfEEG.push(eeg);
      });
    })
  }

  clean() {
    setTimeout(() => this.listOfPatients = [], 500)
  }

  choose(pat_id : number){
    window.location.href = "patients/"+ pat_id
  }

  show() {
    let text = (<HTMLInputElement>document.getElementById("patient_search")).value;
    if (text == "") return false
    return true
  }

  onDelete(eeg : EEG) {
    const index = this.listOfEEG.indexOf(eeg, 0);
    if (index > -1) {
      this.listOfEEG.splice(index, 1);
    }

    this.service.deleteEEG(eeg.id, this.token).subscribe();
  }

  getInstitutions() {
    this.service.getAllInstitutions(this.token).subscribe((info) => {
      this.lst_institutions = info;
      console.log("INSTITUTIONS",this.lst_institutions)
    })
  }

  getOperators() {
    this.service.getOperators(this.token).subscribe((info) => {
      this.lst_operators = info;
      console.log("OPERATORS",this.lst_operators)
    });

  }

}
