import { EEG } from './../../classes/EEG';
import { EEGService } from 'src/app/services/eeg.service';
import { PatientsService } from './../../services/patients.service';
import { Patient } from 'src/app/classes/Patient';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { send } from 'process';

@Component({
  selector: 'app-eeg-filters',
  templateUrl: './eeg-filters.component.html',
  styleUrls: ['./eeg-filters.component.css'],

})
export class EegFiltersComponent implements OnInit {
  token = '' + localStorage.getItem('token');

  idSearch = '';

  lst_patients: Patient[] = []

  filtersForm !:FormGroup;

  filtering: Boolean = false
  eeg_id :string = ''
  patient_id: string = ''
  operator_id: string = ''
  institution_id: string = ''
  priority: string = ''
  report_status:string = ''
  date: string = ''




  

  constructor(private fb:FormBuilder, private patientService: PatientsService, private eegService:EEGService) { }

  public eegs_filtered: EEG[]=[];

  ngOnInit(): void {
    console.log(this.lst_patients)
    this.getPatientsList()
    this.filtersForm = this.fb.group({
      eeg_id : [null],
      patient_id:[null],
      operator_id: [null],
      institution_id: [null],
      priority: [null],
      report_status:[null],
      date: [null],
    })

  }

  getPatientsList() {
    this.patientService.getPatients(this.token).subscribe((info) => {
      this.lst_patients = info;
    });

  }



  getFiltersFormData(): void {
    const data = this.filtersForm.value
    var x :boolean=false;
    if (data["eeg_id"] !== undefined){
      if (data["eeg_id"] !== null){
        this.eeg_id=data["eeg_id"]
        console.log("new WAY", this.eeg_id)
      }
      else{
        this.eeg_id=''
      }
      x=true;
      
    }
    if (data["patient_id"] !== undefined){
      if (data["patient_id"] !== null){
        this.patient_id=data["patient_id"]
        console.log(this.patient_id)
      }
      else{
        this.patient_id=''
      }
      x=true;

    } 
    if (data["institution_id"] !== undefined){
      if (data["institution_id"] !== null) {
         this.institution_id=data["institution_id"]
      console.log(this.institution_id)
      }
      else{
        this.institution_id=''
      }
      x=true;
      
    }
    if (data["date"] !== undefined){
      if (data["date"] !== null){
         this.date=data["date"]
      console.log(this.date)
      }
      else{
        this.date=''
      }
      x=true;
    }
    if (data["priority"] !== undefined){
      if (data["priority"] !== null){
         this.date=data["priority"]
      console.log(this.priority)
      }
      else{
        this.priority=''
      }
      x=true;
    }
    if (data["report_status"] !== undefined){
      if (data["report_status"] !== null){
         this.date=data["report_status"]
      console.log(this.report_status)
      }
      else{
        this.report_status=''
      }
      x=true;
    }



    if (x){
      this.filtering = true
      this.eegService.getEEGfiltered(this.eeg_id,this.patient_id,this.institution_id,this.date,this.operator_id,this.priority, this.report_status, this.token).subscribe((lst) => {
        this.eegs_filtered = lst;
      });
      this.sendFilters(this.eegs_filtered)
    }
    
  }

  @Output() sendFiltersEvent = new EventEmitter<any>();
  sendFilters(value: EEG[]) {
    console.log(value)
    this.sendFiltersEvent.emit(value);

  }  
  


}
