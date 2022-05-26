import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EEG } from 'src/app/classes/EEG';
import { Patient } from 'src/app/classes/Patient';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  constructor(private services:PatientsService, private router: Router) { }
  
  public listOfPatients: Patient[] = []
  public listOfEEG: EEG[] = []
  public patient!: Patient

  ngOnInit(): void {

    const url_array = this.router.url.split("/");
    if (!isNaN(+url_array[url_array.length - 1])) {
      let pat_id = +url_array[url_array.length - 1];
      this.getPatientbyId(pat_id);
      this.getEEGbyPatient(pat_id);    // para lista os exames EEG da respetiva pessoa
    }

    this.getPatients();
  }

  getPatients() {
    this.services.getPatients().subscribe((info) => {
      this.listOfPatients = info;
    });
  } 

  getPatientsbySSN(){
    let text = (<HTMLInputElement>document.getElementById("patient_search")).value;
    if (text == "") return

    this.services.getPatientsbySSN( text ).subscribe((info) => {
      this.patient = info;
      console.log("PACIENTE ", this.patient)
      this.getEEGbyPatient(this.patient.id);   // para lista os exames EEG da respetiva pessoa
    });
  } 

  getPatientbyId(id: number){
    this.services.getPatientbyId( id ).subscribe((info) => {
      this.patient = info;
      console.log("PACIENTE ", this.patient)
    });
  } 

  getEEGbyPatient(id: number) {
    this.services.getEEGbyPatient( id ).subscribe((info) => {
      this.listOfEEG = info;
      console.log("EEGs ", this.listOfEEG)
    });
  }

}
