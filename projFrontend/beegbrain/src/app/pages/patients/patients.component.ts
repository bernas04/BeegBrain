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

   getPatients(){
    this.services.getPatients().subscribe((info)=>
      {this.listOfPatients = info;
      console.log(this.listOfPatients);
    }
    )
  } 

  ngOnInit(): void {
    this.getPatients();
  }

}
