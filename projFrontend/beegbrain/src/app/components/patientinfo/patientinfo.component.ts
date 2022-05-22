import { Component, Input, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';
import { Patient } from 'src/app/classes/Patient';

@Component({
  selector: 'app-patientinfo',
  templateUrl: './patientinfo.component.html',
  styleUrls: ['./patientinfo.component.css']
})
export class PatientinfoComponent implements OnInit {

  constructor(private services:PatientsService) { }
  
  @Input('patient') public patient!: Patient

  ngOnInit(): void {

  }

}
