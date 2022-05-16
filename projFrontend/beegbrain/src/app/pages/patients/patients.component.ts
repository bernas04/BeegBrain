import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/classes/Patient';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

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
