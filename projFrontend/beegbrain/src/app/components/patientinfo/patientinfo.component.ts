import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';
import { Patient } from 'src/app/classes/Patient';

@Component({
  selector: 'app-patientinfo',
  templateUrl: './patientinfo.component.html',
  styleUrls: ['./patientinfo.component.css']
})
export class PatientinfoComponent implements OnInit {

  constructor(private services:PatientsService) { }
  
  public listOfPatients: Patient[] = []
  public patient!: Patient
  public text: string = "367879615";

  ngOnInit(): void {
    this.getPatients();
    this.getPatientsbySSN(); // apagar depois
  }

  getPatients() {
    this.services.getPatients().subscribe((info) => {
      this.listOfPatients = info;
      console.log(this.listOfPatients);
    });
  } 

  getPatientsbySSN(){
    // this.text = (<HTMLInputElement>document.getElementById("patient_search")).value;
    if (this.text == "") return

    console.log(this.text)

    this.services.getPatientsbySSN( this.text ).subscribe((info) => {
      this.patient = info;
      console.log(this.patient);
    });
  } 

}
