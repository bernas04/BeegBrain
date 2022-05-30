import { PatientsService } from './../../services/patients.service';
import { Patient } from 'src/app/classes/Patient';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-eeg-filters',
  templateUrl: './eeg-filters.component.html',
  styleUrls: ['./eeg-filters.component.css'],
  
})
export class EegFiltersComponent implements OnInit {
  token = ''+localStorage.getItem('token');
  
  idSearch = '';

  lst_patients: Patient[] = []

  constructor(private patientService:PatientsService) { }

  ngOnInit(): void {
    console.log(this.lst_patients)
    this.getPatientsList()
  }

  getPatientsList(){
    this.patientService.getPatients(this.token).subscribe((info) => {
    this.lst_patients = info;
  });

}



  @Output() searchIdEvent = new EventEmitter<any>();

  onKeyId(value: string) {
    this.idSearch += value + ' | ';
    console.log(this.idSearch)
    this.searchIdEvent.emit(value);

  }

  @Output() searchPriority = new EventEmitter<any>();

  selectPriority(value: string) {
    console.log(value)
    this.searchPriority.emit(value);

  }

  @Output() filterByDateEvent = new EventEmitter<any>();

  selectData(value: string){
    var myDate = new Date(value);
    console.log("tou na componente dos filtros")
    console.log(value)
    console.log(typeof(value))
    this.filterByDateEvent.emit(value)
    console.log(this.lst_patients)

  }

  @Output() filterByOperator = new EventEmitter<any>();
  selectOperator(value: string){
    this.filterByOperator.emit(value)
  }
 


}
